import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function InquiriesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/account");
  }

  // Fetch from Prisma: 
  const inquiries = await prisma.inquiry.findMany({ 
    where: { email: session.user.email },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Inquiries" }]} />
      
      <div className="mt-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <AccountNav />
        
        <div className="flex-1">
          <h1 className="font-serif text-3xl">Your Inquiries</h1>

          {inquiries.length === 0 ? (
            <div className="mt-10 border-y border-border py-16 text-center">
              <p className="text-ink/60 mb-6">You haven't submitted any bespoke requests or product inquiries yet.</p>
              <Link 
                href="/collections/all" 
                className="inline-block bg-ink text-cream px-8 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-ink/90 transition"
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="mt-10 border-y border-border divide-y divide-border">
              {inquiries.map((inq) => (
                <div key={inq.id} className="grid grid-cols-2 items-center gap-4 py-5 md:grid-cols-4">
                  <div>
                    <p className="font-medium text-sm truncate">{inq.productName || "General Inquiry"}</p>
                    <p className="text-xs text-ink/50 uppercase tracking-widest mt-1">ID: {inq.id.slice(0, 8)}</p>
                  </div>
                  <p className="text-sm text-ink-muted">
                    {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(inq.createdAt)}
                  </p>
                  <p className="text-sm">{inq.type.replace("_", " ")}</p>
                  <p className="text-right md:text-left">
                    <span className="inline-block bg-cream-warm px-2 py-1 text-[11px] uppercase tracking-[0.16em]">
                      {inq.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-ink-muted">
            Looking for help with a request?{" "}
            <Link href="/help/faq" className="underline underline-offset-2 hover:text-ink transition-colors">Contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
