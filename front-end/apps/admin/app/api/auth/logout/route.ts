import { NextResponse, type NextRequest } from "next/server";

function clearAuthCookies(res: NextResponse) {
  const candidates = [
    "accessToken",
    "refreshToken",
    "token",
    "session",
    "sessionId",
    "auth",
    "jwt",
    "admin_access_token",
  ];

  for (const name of candidates) {
    res.cookies.set({
      name,
      value: "",
      path: "/",
      maxAge: 0,
    });
  }
}

export async function POST(req: NextRequest) {
  const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");
  const ADMIN_LOGOUT_PATH = process.env.ADMIN_LOGOUT_PATH ?? "/auth/admin/logout";

  // Mock/dev mode: just clear cookies.
  if (!API_BASE_URL || API_BASE_URL.includes("example.com")) {
    const res = NextResponse.json({ ok: true });
    clearAuthCookies(res);
    return res;
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}${ADMIN_LOGOUT_PATH}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: req.headers.get("authorization") ?? "",
        cookie: req.headers.get("cookie") ?? "",
      },
      credentials: "include",
    });
  } catch {
    const res = NextResponse.json({ ok: true });
    clearAuthCookies(res);
    return res;
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson
    ? await upstream.json().catch(() => ({}))
    : await upstream.text().catch(() => "");

  const res = NextResponse.json(data, { status: upstream.status });

  const getSetCookie = (upstream.headers as unknown as { getSetCookie?: () => string[] })
    .getSetCookie;
  const cookies = getSetCookie?.() ?? [];
  if (cookies.length) {
    for (const c of cookies) res.headers.append("set-cookie", c);
  } else {
    const setCookie = upstream.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);
  }

  // Always clear common auth cookies on our domain too.
  clearAuthCookies(res);
  return res;
}

