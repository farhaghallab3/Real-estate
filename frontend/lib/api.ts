import { cookies } from "next/headers";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  async function callBackend(token: string | undefined) {
    return fetch(`${process.env.BACKEND_API_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }

  let res = await callBackend(accessToken);

  // Access token expired — refresh once, then retry the original request.
  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.BACKEND_API_URL}/auth/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: cookieStore.get("refresh_token")?.value,
        }),
      },
    );

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      cookieStore.set("access_token", data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });
      res = await callBackend(data.access); // retry with fresh token
    }
  }

  return res;
}
