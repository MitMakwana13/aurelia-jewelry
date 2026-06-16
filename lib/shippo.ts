/**
 * Shippo REST API helper (v2).
 * Docs: https://docs.goshippo.com/shippoapi/public-api/
 *
 * We use raw fetch() to avoid SDK version conflicts.
 */

const SHIPPO_API = "https://api.goshippo.com";

function headers() {
  const key = process.env.SHIPPO_API_KEY;
  if (!key) throw new Error("Missing SHIPPO_API_KEY environment variable");
  return {
    "Authorization": `ShippoToken ${key}`,
    "Content-Type": "application/json",
  };
}

// ── Business / sender address ─────────────────────────────────────────────────
function fromAddress() {
  return {
    name: process.env.SHIPPO_FROM_NAME ?? "Aurelia Fine Jewelry",
    street1: process.env.SHIPPO_FROM_STREET1 ?? "100 Fashion Ave",
    city: process.env.SHIPPO_FROM_CITY ?? "New York",
    state: process.env.SHIPPO_FROM_STATE ?? "NY",
    zip: process.env.SHIPPO_FROM_ZIP ?? "10018",
    country: process.env.SHIPPO_FROM_COUNTRY ?? "US",
    email: process.env.SHIPPO_FROM_EMAIL ?? "shipping@aurelia.com",
    phone: process.env.SHIPPO_FROM_PHONE ?? "",
  };
}

// Standard jewelry parcel (override per product weight in production)
const JEWELRY_PARCEL = {
  length: "6",
  width: "4",
  height: "2",
  distance_unit: "in",
  weight: "0.5",
  mass_unit: "lb",
};

// ── Types ─────────────────────────────────────────────────────────────────────
export type ShippoRate = {
  object_id: string;
  provider: string;       // "USPS", "UPS", "FedEx", "DHL"
  servicelevel: { name: string; token: string };
  amount: string;         // e.g. "12.50"
  currency: string;
  estimated_days: number | null;
  duration_terms: string | null;
};

export type ShippoLabel = {
  tracking_number: string;
  label_url: string;
  tracking_url_provider: string;
  status: string;
};

type ToAddressInput = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
};

// ── Get live shipping rates ───────────────────────────────────────────────────
export async function getShippoRates(to: ToAddressInput): Promise<ShippoRate[]> {
  const res = await fetch(`${SHIPPO_API}/shipments/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      address_from: fromAddress(),
      address_to: {
        name: to.name,
        street1: to.street1,
        street2: to.street2 ?? "",
        city: to.city,
        state: to.state,
        zip: to.zip,
        country: to.country,
        phone: to.phone ?? "",
        email: to.email ?? "",
      },
      parcels: [JEWELRY_PARCEL],
      async: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shippo rates error ${res.status}: ${text}`);
  }

  const data = await res.json();
  // Filter to available rates and sort by price
  const rates: ShippoRate[] = (data.rates ?? [])
    .filter((r: ShippoRate & { available: boolean }) => r.available !== false)
    .sort((a: ShippoRate, b: ShippoRate) => parseFloat(a.amount) - parseFloat(b.amount));

  return rates;
}

// ── Create a shipping label (called from Stripe webhook after payment) ────────
export async function createShippoLabel(opts: {
  toName: string;
  toStreet1: string;
  toStreet2?: string;
  toCity: string;
  toState: string;
  toZip: string;
  toCountry: string;
  toPhone?: string;
  rateId?: string;   // Optional: pass chosen rate ID for exact carrier/service
  orderRef?: string; // Stripe PaymentIntent ID for reference
}): Promise<ShippoLabel> {
  // Step 1: Create or re-use a shipment to get a rate
  let rateId = opts.rateId;

  if (!rateId) {
    // No rate selected — pick cheapest available rate automatically
    const rates = await getShippoRates({
      name: opts.toName,
      street1: opts.toStreet1,
      street2: opts.toStreet2,
      city: opts.toCity,
      state: opts.toState,
      zip: opts.toZip,
      country: opts.toCountry,
      phone: opts.toPhone,
    });

    if (rates.length === 0) {
      throw new Error("No Shippo rates available for this destination");
    }
    rateId = rates[0].object_id;
  }

  // Step 2: Purchase the rate to generate a label
  const res = await fetch(`${SHIPPO_API}/transactions/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      rate: rateId,
      label_file_type: "PDF",
      async: false,
      metadata: opts.orderRef ?? "",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shippo label creation error ${res.status}: ${text}`);
  }

  const tx = await res.json();
  if (tx.status !== "SUCCESS") {
    throw new Error(`Shippo transaction failed: ${tx.messages?.map((m: { text: string }) => m.text).join(", ")}`);
  }

  return {
    tracking_number: tx.tracking_number,
    label_url: tx.label_url,
    tracking_url_provider: tx.tracking_url_provider,
    status: tx.status,
  };
}

// ── Track a shipment ──────────────────────────────────────────────────────────
export async function trackShipment(carrier: string, trackingNumber: string) {
  const res = await fetch(`${SHIPPO_API}/tracks/${carrier}/${trackingNumber}/`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Shippo tracking error ${res.status}`);
  return res.json();
}
