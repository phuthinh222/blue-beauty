import { apiFetch } from "./api";

export type AdminLoginRequest = {
  username: string;
  password: string;
};

export type AdminLoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  user?: unknown;
};

export type AdminMeResponse = {
  user?: unknown;
  [key: string]: unknown;
};

/**
 * Admin login via same-origin proxy route.
 * Server should set httpOnly cookies OR return accessToken in JSON.
 */
export async function loginAdmin(body: AdminLoginRequest): Promise<AdminLoginResponse> {
  return apiFetch<AdminLoginResponse>("/api/auth/login", {
    method: "POST",
    json: body,
  });
}

export async function getAdminMe(): Promise<AdminMeResponse> {
  return apiFetch<AdminMeResponse>("/api/auth/me", { method: "GET" });
}

export async function logoutAdmin(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}

