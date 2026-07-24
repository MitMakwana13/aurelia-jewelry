"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  title?: string;
  quantity?: number;
  price?: number | { amount: number };
}

interface Order {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  shiprocketOrderId: string | null;
  customerDetails: any;
  items: any;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status === "PAID" || o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.amount, 0);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c49a45] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-ink">Customer Orders</h1>
        <p className="text-sm text-ink/50 mt-1">Track online payment transactions, fulfillment, and shipment status.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Total Orders</p>
          <p className="font-serif text-3xl text-ink mt-2">{orders.length}</p>
        </div>
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Total Revenue (₹)</p>
          <p className="font-serif text-3xl text-gold-dark mt-2">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Pending Shipments</p>
          <p className="font-serif text-3xl text-purple-700 mt-2">
            {orders.filter((o) => o.status === "PAID" && !o.shiprocketOrderId).length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-ink/5 bg-cream-light/35">
          <h2 className="font-serif text-lg text-ink">Order History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-cream-light/20 border-b border-ink/5">
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Order ID</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Customer Details</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Amount</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Payment Status</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {orders.map((order) => {
                const customer = order.customerDetails ?? {};
                return (
                  <tr key={order.id} className="hover:bg-cream-light/10 transition">
                    <td className="p-4">
                      <p className="text-xs font-mono font-semibold text-ink">{order.razorpayOrderId}</p>
                      {order.razorpayPaymentId && (
                        <p className="text-[10px] text-ink/40 font-mono mt-0.5">Pay ID: {order.razorpayPaymentId}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-xs font-semibold text-ink">{customer.name || customer.email || "Customer"}</p>
                      {customer.phone && <p className="text-xs text-ink/50 font-mono">{customer.phone}</p>}
                    </td>
                    <td className="p-4 text-xs font-semibold text-ink">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${
                          order.status === "PAID"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-ink/60 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-xs text-ink/40">
                    No online orders placed yet. Online store sales will automatically show up here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
