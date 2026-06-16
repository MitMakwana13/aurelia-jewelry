import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { createShiprocketOrder } from "@/lib/shiprocket";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // { customerDetails, items, amount }
    } = await request.json();

    // 1. Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Update/Create order in DB
    const dbOrder = await prisma.order.upsert({
      where: { razorpayOrderId: razorpay_order_id },
      update: {
        razorpayPaymentId: razorpay_payment_id,
        status: "PAID",
      },
      create: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: orderData?.amount ?? 0,
        currency: "INR",
        status: "PAID",
        customerDetails: orderData?.customerDetails ?? {},
        items: orderData?.items ?? [],
      },
    });

    // 3. Auto-push to Shiprocket
    const customer = orderData?.customerDetails ?? {};
    const items = orderData?.items ?? [];

    try {
      const shiprocketRes = await createShiprocketOrder({
        order_id: dbOrder.id,
        order_date: new Date().toISOString().split("T")[0],
        pickup_location: "Primary",
        billing_customer_name: customer.firstName ?? "Customer",
        billing_last_name: customer.lastName ?? "",
        billing_address: customer.address ?? "",
        billing_city: customer.city ?? "",
        billing_pincode: customer.pincode ?? "400001",
        billing_state: customer.state ?? "Maharashtra",
        billing_country: "India",
        billing_email: customer.email ?? "",
        billing_phone: customer.phone ?? "",
        shipping_is_billing: true,
        order_items: items.map((item: { name: string; sku: string; quantity: number; price: number }) => ({
          name: item.name,
          sku: item.sku,
          units: item.quantity,
          selling_price: item.price,
        })),
        payment_method: "Prepaid",
        sub_total: dbOrder.amount,
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5,
      });

      // Update DB with Shiprocket order ID
      await prisma.order.update({
        where: { id: dbOrder.id },
        data: {
          shiprocketOrderId: String(shiprocketRes.order_id ?? ""),
          status: "SHIPPED",
        },
      });
    } catch (shipError) {
      // Don't fail the payment if Shiprocket push fails — log and notify
      console.error("Shiprocket push failed (order still paid):", shipError);
    }

    return NextResponse.json({ success: true, orderId: dbOrder.id });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
