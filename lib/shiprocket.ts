/** Shiprocket integration — Indian domestic shipping */

const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL!;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD!;
const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

interface ShiprocketOrder {
  order_id: string;
  order_date: string;
  pickup_location: string;
  channel_id?: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: Array<{
    name: string;
    sku: string;
    units: number;
    selling_price: number;
  }>;
  payment_method: string;
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

let _token: string | null = null;
let _tokenExpiry = 0;

async function getToken(): Promise<string> {
  const now = Date.now();
  if (_token && now < _tokenExpiry) return _token;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: SHIPROCKET_EMAIL, password: SHIPROCKET_PASSWORD }),
  });

  if (!res.ok) throw new Error("Shiprocket login failed");
  const data = await res.json();
  _token = data.token;
  _tokenExpiry = now + 9 * 60 * 60 * 1000; // 9 hours
  return _token!;
}

export async function createShiprocketOrder(order: ShiprocketOrder) {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shiprocket order creation failed: ${err}`);
  }

  return res.json();
}

export async function trackShiprocketOrder(orderId: string) {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/orders/show/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to track Shiprocket order");
  return res.json();
}
