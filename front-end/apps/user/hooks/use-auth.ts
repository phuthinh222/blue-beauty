"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { hasStoredToken, clearUserSession, logoutUser, getUserMe, type UserProfile } from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!hasStoredToken()) return;
    setIsLoggedIn(true);
    getUserMe()
      .then((profile) => setUser(profile))
      .catch(() => {
        clearUserSession();
        setIsLoggedIn(false);
      });
  }, []);

  async function onLogout() {
    try {
      await logoutUser();
    } finally {
      clearUserSession();
      setIsLoggedIn(false);
      setUser(null);
      router.replace("/login");
    }
  }

  return { isLoggedIn, user, onLogout };
}
