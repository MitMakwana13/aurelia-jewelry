import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthClient from "./AuthClient";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  // If the user is already authenticated, redirect them to the Dashboard
  if (session) {
    redirect("/account/dashboard");
  }

  // Otherwise, render the client-side login/register forms
  return <AuthClient />;
}
