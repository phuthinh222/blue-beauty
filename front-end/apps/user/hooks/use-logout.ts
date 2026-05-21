"use client";

import { useRouter } from "next/navigation";

import { clearUserSession, logoutUser } from "@/lib/auth";

export function useLogout() {
  const router = useRouter();

  return async function onLogout() {
    try {
      await logoutUser();
    } finally {
      clearUserSession();
      router.replace("/login");
    }
  };
}
