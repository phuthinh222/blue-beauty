"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getUserMe } from "@/lib/auth";

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

  return { ready };
}
