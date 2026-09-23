import { cookies } from "next/headers";
import { apiFetch } from "./api";
import type { Session } from "@/types/auth";
import type { User } from "@/types/user";

// check if the user is logged in.
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  const res = await apiFetch("/auth/me/", { cache: "no-store" });
  if (!res.ok) return null;

  const user: User = await res.json();
  return { accessToken, user };
}
