import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/account");
  }

  // Extract first name for a friendly greeting
  const firstName = session.user?.name?.split(" ")[0] || "there";

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Dashboard" }]} />
      
      <div className="mt-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <AccountNav />
        
        <div className="flex-1">
          <h1 className="font-serif text-3xl">Welcome back, {firstName}.</h1>
          <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-2xl">
            From your account dashboard, you can view your inquiries and bespoke requests, view your wishlist, and manage your account details.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inquiries Card */}
            <div className="border border-border p-8 flex flex-col items-start transition-colors hover:border-ink/30">
              <h3 className="font-serif text-xl mb-4">Your Inquiries</h3>
              <p className="text-sm text-ink-muted mb-8 flex-1">
                Check the status of your bespoke requests and product inquiries.
              </p>
              <Link 
                href="/account/inquiries" 
                className="text-[11px] uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink/70 transition-colors"
              >
                View Inquiries
              </Link>
            </div>

            {/* Profile Card */}
            <div className="border border-border p-8 flex flex-col items-start transition-colors hover:border-ink/30">
              <h3 className="font-serif text-xl mb-4">Account Details</h3>
              <p className="text-sm text-ink-muted mb-8 flex-1">
                Update your personal information, email address, and change your password.
              </p>
              <Link 
                href="/account/profile" 
                className="text-[11px] uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink/70 transition-colors"
              >
                Edit Profile
              </Link>
            </div>

            {/* Wishlist Card */}
            <div className="border border-border p-8 flex flex-col items-start transition-colors hover:border-ink/30">
              <h3 className="font-serif text-xl mb-4">Your Wishlist</h3>
              <p className="text-sm text-ink-muted mb-8 flex-1">
                View and purchase the pieces you've saved for later.
              </p>
              <Link 
                href="/account/wishlist" 
                className="text-[11px] uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink/70 transition-colors"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
