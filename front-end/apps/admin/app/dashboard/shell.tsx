"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { ApiError } from "../../lib/api";
import { getAdminMe, logoutAdmin, type AdminMeResponse } from "../../lib/auth";
import { Sidebar } from "../../components/layout/sidebar";
import { Topbar } from "../../components/layout/topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [data, setData] = React.useState<AdminMeResponse | null>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const me = await getAdminMe();
        if (!alive) return;
        setData(me);
      } catch (err) {
        if (!alive) return;
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [router]);

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      await logoutAdmin().catch(() => undefined);
    } finally {
      localStorage.removeItem("admin_access_token");
      sessionStorage.removeItem("admin_access_token");
      toast.success("Đăng xuất thành công");
      router.replace("/login?logged_out=1");
      setIsLoggingOut(false);
    }
  }

  const user = data?.user as { name?: string; username?: string } | undefined;
  const displayName =
    (user && (user.name || user.username)) || "Admin";

  return (
    <div className="min-h-[100dvh] bg-[#f4f1f9]">
      <div className="flex min-h-[100dvh] items-start">
        <Sidebar collapsed={isSidebarCollapsed} />
        <div className="min-w-0 flex-1">
          <Topbar
            displayName={String(displayName)}
            onLogout={onLogout}
            isLoggingOut={isLoggingOut}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed((v) => !v)}
          />
          <div className="px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

