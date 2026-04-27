"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { getUserMe } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await getUserMe();
        if (!cancelled) setReady(true);
      } catch {
        const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
        router.replace(`/login${next}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-white text-sm text-slate-600">
        Đang tải…
      </div>
    );
  }

  return <>{children}</>;
}
