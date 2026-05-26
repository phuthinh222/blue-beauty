"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ApiError } from "@/lib/api";
import { loginUser } from "@/lib/auth";

const ACCESS_TOKEN_KEY = "user_access_token";

function getPostLoginPath() {
  if (typeof window === "undefined") return "/dashboard";
  const next = new URLSearchParams(window.location.search).get("next");
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/dashboard";
}

function storeToken(token: string, rememberMe: boolean) {
  if (rememberMe) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function useLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("artist");
  const [password, setPassword] = useState("artist");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const safeUsername = username.trim();
    if (!safeUsername || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser({ username: safeUsername, password });
      if (res.accessToken) storeToken(res.accessToken, rememberMe);
      toast.success("Đăng nhập thành công!");
      router.replace(getPostLoginPath());
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? "Sai tài khoản hoặc mật khẩu." : (err.message || "Đăng nhập thất bại."));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { username, setUsername, password, setPassword, rememberMe, setRememberMe, isLoading, error, onSubmit };
}
