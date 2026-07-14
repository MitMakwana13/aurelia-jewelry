import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendInquiryConfirmationEmail, sendInquiryAdminAlert } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, productId, productName, budget, message, source, utmSource, utmMedium } = body;

    // Only name, phone, and message are truly required
    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, phone, and message are required." }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email?.trim().toLowerCase() ?? null,
        phone: phone.trim(),
        type: type ?? "GENERAL",
        productId: productId ?? null,
        productName: productName ?? null,
        budget: budget ?? null,
        message: message.trim(),
        status: "NEW",
        priority: "NORMAL",
        source: source ?? "website",
        utmSource: utmSource ?? null,
        utmMedium: utmMedium ?? null,
      },
    });

    // Send emails in the background so it doesn't block the response to the user
    (async () => {
      try {
        if (inquiry.email) {
          await sendInquiryConfirmationEmail(inquiry.email, inquiry.name, inquiry.productName);
        }
        
        // Use an environment variable or fallback for the admin email
        const adminEmail = process.env.ADMIN_EMAIL || "mitmakwana13@gmail.com"; 
        
        await sendInquiryAdminAlert(adminEmail, inquiry);
      } catch (emailError) {
        console.error("Failed to send inquiry emails in background:", emailError);
      }
    })();

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry. Please try WhatsApp instead." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Inquiry fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
