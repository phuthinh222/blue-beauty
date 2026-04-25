import type { ReactNode } from "react";

import { AdminShell } from "./shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

