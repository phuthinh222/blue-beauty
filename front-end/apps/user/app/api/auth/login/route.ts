import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");
  const USER_LOGIN_PATH = process.env.USER_LOGIN_PATH ?? "/auth/user/login";

  const payload = await req.json().catch(() => null);
  const username =
    payload && typeof payload === "object" && "username" in payload
      ? String((payload as { username: unknown }).username)
      : "";
  const password =
    payload && typeof payload === "object" && "password" in payload
      ? String((payload as { password: unknown }).password)
      : "";

  const mockLogin = () => {
    if (username !== "user" || password !== "user") {
      return NextResponse.json(
        { message: "Sai tài khoản hoặc mật khẩu." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      accessToken: "dev-user-token",
      tokenType: "Bearer",
      user: {
        id: "user",
        name: "Người dùng",
        username: "user",
        role: "USER",
      },
    });
  };

  if (!API_BASE_URL || API_BASE_URL.includes("example.com")) {
    return mockLogin();
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}${USER_LOGIN_PATH}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
  } catch {
    return mockLogin();
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson
    ? await upstream.json().catch(() => ({}))
    : await upstream.text().catch(() => "");

  const res = NextResponse.json(data, { status: upstream.status });

  const getSetCookie = (
    upstream.headers as unknown as { getSetCookie?: () => string[] }
  ).getSetCookie;
  const cookies = getSetCookie?.() ?? [];
  if (cookies.length) {
    for (const c of cookies) res.headers.append("set-cookie", c);
  } else {
    const setCookie = upstream.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);
  }

  return res;
}
