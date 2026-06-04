"use client";

import { useFavorites as _useFavorites } from "@repo/hooks";
import { hasStoredToken } from "@/lib/auth";

export function useFavorites() {
  return _useFavorites(hasStoredToken);
}
