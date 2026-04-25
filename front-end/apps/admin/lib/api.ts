export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, opts: { status: number; code?: string; details?: unknown }) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
  }
}

function getBaseUrl() {
  // In the browser, prefer same-origin proxy routes under /api.
  // For direct calls, you can set NEXT_PUBLIC_API_BASE_URL.
  return process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ?? "";
}

function getStoredAccessToken() {
  if (typeof window === "undefined") return null;
  return (
    window.sessionStorage.getItem("admin_access_token") ??
    window.localStorage.getItem("admin_access_token")
  );
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = baseUrl ? `${baseUrl}${path}` : path;

  const headers = new Headers(init?.headers);
  headers.set("accept", "application/json");

  const token = getStoredAccessToken();
  if (token && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${token}`);
  }

  let body = init?.body;
  if (init && "json" in init) {
    headers.set("content-type", "application/json");
    body = JSON.stringify(init.json);
  }

  const res = await fetch(url, {
    ...init,
    headers,
    body,
    credentials: init?.credentials ?? "include",
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => "");

  if (!res.ok) {
    const msg =
      (isJson && data && typeof data === "object" && "message" in (data as any) && (data as any).message) ||
      res.statusText ||
      "Request failed";
    const code =
      isJson && data && typeof data === "object" && "code" in (data as any) ? String((data as any).code) : undefined;
    throw new ApiError(String(msg), { status: res.status, code, details: data });
  }

  return data as T;
}

