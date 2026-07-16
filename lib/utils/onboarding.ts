import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function requireOnboarding(email: string | null | undefined) {
  if (!email) redirect("/account");
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, onboardingCompleted: true, fullName: true, phone: true }
  });

  if (!user) redirect("/account");

  if (!user.onboardingCompleted) {
    redirect("/account/onboarding");
  }

  return user;
}
