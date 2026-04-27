import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");
  const USER_ME_PATH = process.env.USER_ME_PATH ?? "/auth/user/me";

  const mockMe = () => {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.toLowerCase().startsWith("bearer ")
      ? auth.slice(7)
      : "";

    if (token !== "dev-user-token") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: "user",
        name: "Người dùng",
        username: "user",
        role: "USER",
      },
    });
  };

  if (!API_BASE_URL || API_BASE_URL.includes("example.com")) {
    return mockMe();
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}${USER_ME_PATH}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: req.headers.get("authorization") ?? "",
        cookie: req.headers.get("cookie") ?? "",
      },
      credentials: "include",
    });
  } catch {
    return mockMe();
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
