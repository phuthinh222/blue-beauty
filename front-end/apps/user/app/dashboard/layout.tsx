"use client";

import * as React from "react";

import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = useAuthGuard();

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white text-sm text-slate-600">
        Đang tải…
      </div>
    );
  }

  return <>{children}</>;
}
