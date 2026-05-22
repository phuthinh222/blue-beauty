"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { hasStoredToken, clearUserSession, logoutUser } from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(hasStoredToken());
  }, []);

  async function onLogout() {
    try {
      await logoutUser();
    } finally {
      clearUserSession();
      setIsLoggedIn(false);
      router.replace("/login");
    }
  }

  return { isLoggedIn, onLogout };
}
