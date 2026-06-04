"use client";

import { useAuthGuard as _useAuthGuard } from "@repo/hooks";
import { getUserMe } from "@/lib/auth";

export function useAuthGuard() {
  return _useAuthGuard(getUserMe);
}
