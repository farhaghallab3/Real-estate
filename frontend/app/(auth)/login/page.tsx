import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await getSession();

  // Already logged in? Don't show the login page again.
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
