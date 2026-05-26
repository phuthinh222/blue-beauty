import { apiFetch } from "./api";

export type UserLoginRequest = {
  username: string;
  password: string;
};

export type UserLoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  user?: unknown;
};

export type UserProfile = {
  displayName?: string;
  username?: string;
  avatar?: string;
  [key: string]: unknown;
};

export type UserMeResponse = UserProfile;

const USER_ACCESS_TOKEN_KEY = "user_access_token";

export function hasStoredToken(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    localStorage.getItem(USER_ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(USER_ACCESS_TOKEN_KEY)
  );
}

export function clearUserSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(USER_ACCESS_TOKEN_KEY);
}

export async function loginUser(
  body: UserLoginRequest,
): Promise<UserLoginResponse> {
  return apiFetch<UserLoginResponse>("/api/auth/login", {
    method: "POST",
    json: body,
  });
}

export async function getUserMe(): Promise<UserMeResponse> {
  return apiFetch<UserMeResponse>("/api/auth/me", { method: "GET" });
}

export async function logoutUser(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}
