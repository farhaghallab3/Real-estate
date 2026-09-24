import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { LoginResponse } from "@/types/auth";

export async function POST(request: NextRequest) {
  const { username, password, remember } = await request.json();

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data: LoginResponse = await res.json();
  const cookieStore = await cookies();

  const baseCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  // Access token: short-lived, used on every API call.
  cookieStore.set("access_token", data.access, {
    ...baseCookie,
    maxAge: 60 * 15, // TODO: match with backend later...
  });

  // Refresh token: long-lived, only ever sent to /refresh/.
  // "remember" controls whether it survives closing the browser.
  cookieStore.set("refresh_token", data.refresh, {
    ...baseCookie,
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days vs session cookie
  });

  return NextResponse.json({ success: true, user: data.user });
}
