"use client";

import * as React from "react";

import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/lib/utils";

export function TableIconButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 cursor-pointer rounded-full bg-slate-100 hover:bg-slate-200",
        className,
      )}
      {...props}
    />
  );
}
