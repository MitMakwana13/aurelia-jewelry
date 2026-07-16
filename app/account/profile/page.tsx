import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { requireOnboarding } from "@/lib/utils/onboarding";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/account");
  }

  const user = await requireOnboarding(session.user?.email);

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Profile" }]} />
      
      <div className="mt-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <AccountNav />
        
        <div className="flex-1 max-w-2xl">
          <h1 className="font-serif text-3xl mb-10">Account Details</h1>

          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-xs uppercase tracking-[0.15em] text-ink/60 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Name</label>
                  <div className="w-full border border-border px-4 py-3 text-sm bg-transparent">
                    {user.fullName || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Phone</label>
                  <div className="w-full border border-border px-4 py-3 text-sm bg-transparent">
                    {user.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Email Address</label>
                  <div className="w-full border border-border px-4 py-3 text-sm bg-transparent text-ink/70">
                    {session.user?.email}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-ink/50">
                To update your personal information, please contact our concierge service.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
