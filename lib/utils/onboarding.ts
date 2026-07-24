import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function requireOnboarding(email: string | null | undefined) {
  if (!email) redirect("/account");
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, onboardingCompleted: true, fullName: true, phone: true }
  });

  if (!user) redirect("/account");

  const hasName = Boolean(user.fullName && user.fullName.trim().length > 0);
  const hasPhone = Boolean(user.phone && user.phone.trim().length > 0);

  if (!user.onboardingCompleted || !hasName || !hasPhone) {
    redirect("/account/onboarding");
  }

  return user;
}
