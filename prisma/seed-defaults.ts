import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Exchange rates
  const rates = [
    { currencyCode: "USD", currencySymbol: "$", rateToInr: 84.5 },
    { currencyCode: "GBP", currencySymbol: "£", rateToInr: 107.2 },
    { currencyCode: "AED", currencySymbol: "د.إ", rateToInr: 23.0 },
    { currencyCode: "SGD", currencySymbol: "S$", rateToInr: 63.1 },
    { currencyCode: "EUR", currencySymbol: "€", rateToInr: 91.8 },
  ];
  for (const r of rates) {
    await prisma.exchangeRate.upsert({
      where: { currencyCode: r.currencyCode },
      update: { rateToInr: r.rateToInr, currencySymbol: r.currencySymbol },
      create: r,
    });
  }
  console.log("✅ Exchange rates seeded");

  // Today's gold rate
  await prisma.goldRate.create({
    data: {
      gold22kPerGramInr: 6850,
      gold24kPerGramInr: 7470,
      silverPerGramInr: 94,
      platinumPerGramInr: 3100,
      source: "manual",
    },
  });
  console.log("✅ Gold rate seeded");

  // Site settings
  const settings = [
    { key: "contact_phone", value: "+91 79840 62415", label: "Contact Phone", category: "contact" },
    { key: "contact_email", value: "radharanigemstone@gmail.com", label: "Contact Email", category: "contact" },
    { key: "whatsapp_number", value: "+917984062415", label: "WhatsApp Number", category: "contact" },
    { key: "boutique_address", value: "123 Gems Lane, Surat, Gujarat 395003, India", label: "Boutique Address", category: "contact" },
    { key: "business_hours", value: "Mon–Sat, 10 AM – 7 PM IST", label: "Business Hours", category: "contact" },
    { key: "instagram_url", value: "https://instagram.com/radharanigemstone", label: "Instagram URL", category: "social" },
    { key: "site_name", value: "Radha Rani Heritage Collection", label: "Site Name", category: "general" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✅ Site settings seeded");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
