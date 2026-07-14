import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InquiryActions } from "./InquiryActions";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inq = await prisma.inquiry.findUnique({ where: { id } });
  if (!inq) notFound();

  const waMessage = encodeURIComponent(
    `Hello ${inq.name}, thank you for your inquiry${inq.productName ? ` about the ${inq.productName}` : ""}. We'd love to help you - could you share a convenient time to speak?`
  );
  const waUrl = `https://wa.me/${inq.phone.replace(/\D/g, "")}?text=${waMessage}`;
  const mailtoUrl = `mailto:${inq.email ?? ""}?subject=Re: Your Inquiry at Radha Rani&body=Dear ${inq.name},%0A%0AThank you for reaching out to Radha Rani Heritage Collection.%0A%0A`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Link href="/admin/inquiries" className="text-[10px] uppercase tracking-wider text-ink/50 hover:text-ink transition">
            ← All Inquiries
          </Link>
          <h1 className="mt-2 font-serif text-3xl text-ink">{inq.name}</h1>
          <p className="mt-1 text-sm text-ink/50">
            Inquiry #{inq.id.slice(0, 8)} · {new Date(inq.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
            })} · via {inq.source}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 text-[11px] uppercase tracking-wider hover:bg-[#128C7E] transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          {inq.email && (
            <a href={mailtoUrl} className="flex items-center gap-2 border border-ink/20 text-ink px-4 py-2.5 text-[11px] uppercase tracking-wider hover:border-ink transition">
              Email Reply
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Customer + Message */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white border border-ink/8 p-6 rounded-sm">
            <h2 className="font-serif text-lg text-ink mb-4">Customer Details</h2>
            <dl className="space-y-3">
              <div className="flex gap-4">
                <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Name</dt>
                <dd className="text-sm text-ink font-medium">{inq.name}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Phone</dt>
                <dd className="text-sm text-ink">
                  <a href={`tel:${inq.phone}`} className="hover:text-gold-dark transition">{inq.phone}</a>
                </dd>
              </div>
              {inq.email && (
                <div className="flex gap-4">
                  <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Email</dt>
                  <dd className="text-sm text-ink">
                    <a href={`mailto:${inq.email}`} className="hover:text-gold-dark transition">{inq.email}</a>
                  </dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Budget</dt>
                <dd className="text-sm text-ink">{inq.budget ?? "Not specified"}</dd>
              </div>
              {inq.productName && (
                <div className="flex gap-4">
                  <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Product</dt>
                  <dd className="text-sm text-ink">{inq.productName}</dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Source</dt>
                <dd className="text-sm text-ink capitalize">{inq.source}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-[10px] uppercase tracking-wider text-ink/50 w-24">Type</dt>
                <dd className="text-sm text-ink">{inq.type.replace("_", " ")}</dd>
              </div>
            </dl>
          </div>

          {/* Message */}
          <div className="bg-white border border-ink/8 p-6 rounded-sm">
            <h2 className="font-serif text-lg text-ink mb-4">Message</h2>
            <p className="text-sm text-ink/70 leading-relaxed whitespace-pre-wrap">{inq.message}</p>
          </div>
        </div>

        {/* Right: Admin Actions */}
        <div className="space-y-6">
          <InquiryActions inquiry={inq} />
        </div>
      </div>
    </div>
  );
}
