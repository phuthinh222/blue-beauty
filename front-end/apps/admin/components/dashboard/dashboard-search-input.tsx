"use client";

import * as React from "react";

import { Input } from "@repo/ui/input";
import { cn } from "@repo/ui/lib/utils";

type DashboardSearchInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "className"
> & {
  className?: string;
  /** Bọc ngoài (vd: max-width) */
  wrapperClassName?: string;
};

const inputClass =
  "h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0";

export function DashboardSearchInput({
  wrapperClassName,
  className,
  ...props
}: DashboardSearchInputProps) {
  return (
    <div className={cn("w-full max-w-[420px]", wrapperClassName)}>
      <Input {...props} className={cn(inputClass, className)} />
    </div>
  );
}
