"use client";

import { useRouter } from "next/navigation";

export function useLogout(
  logout: () => Promise<unknown>,
  clearSession: () => void,
) {
  const router = useRouter();

  return async function onLogout() {
    try {
      await logout();
    } finally {
      clearSession();
      router.replace("/login");
    }
  };
}
