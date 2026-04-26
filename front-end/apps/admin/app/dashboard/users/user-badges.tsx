import { Ban } from "lucide-react";

import { Badge } from "@repo/ui/badge";
import { cn } from "@repo/ui/lib/utils";

import type { Role, UserRow } from "./user-model";

export function RoleBadge({ role }: { role: Role }) {
  const cls =
    role === "Thợ makeup"
      ? "bg-[#EAF4FF] text-[#257CBA]"
      : "bg-[#EFFFF7] text-[#16A34A]";
  return (
    <Badge variant="secondary" className={cn("font-medium", cls)}>
      {role}
    </Badge>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 font-medium",
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      )}
    >
      <span className="text-[10px] leading-none">●</span>
      {active ? "Đang hoạt động" : "Không hoạt động"}
    </Badge>
  );
}

export function AccountStatusCell({ user }: { user: UserRow }) {
  if (user.banned) {
    return (
      <Badge
        variant="secondary"
        className="gap-1 border border-rose-200 bg-rose-50 font-medium text-rose-700"
      >
        <Ban className="size-3.5" />
        Đã chặn
      </Badge>
    );
  }
  return <StatusBadge active={user.active} />;
}
