import * as React from "react";

import { Card, CardContent } from "@repo/ui/card";
import { cn } from "@repo/ui/lib/utils";

type DashboardListCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function DashboardListCard({
  children,
  className,
  contentClassName,
}: DashboardListCardProps) {
  return (
    <Card className={cn("rounded-2xl border-slate-200 shadow-sm", className)}>
      <CardContent className={cn("p-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
