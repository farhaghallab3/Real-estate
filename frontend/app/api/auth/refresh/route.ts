import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { RefreshResponse } from "@/types/auth";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    // Refresh token itself expired/invalid — force a full re-login.
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }

  const data: RefreshResponse = await res.json();

  cookieStore.set("access_token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  // Your backend rotates the refresh token too (returns a new one) — store it.
  cookieStore.set("refresh_token", data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ success: true });
}
