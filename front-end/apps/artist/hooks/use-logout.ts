"use client";

import { useLogout as _useLogout } from "@repo/hooks";
import { logoutUser, clearUserSession } from "@/lib/auth";

export function useLogout() {
  return _useLogout(logoutUser, clearUserSession);
}
