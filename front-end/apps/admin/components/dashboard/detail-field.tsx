import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

type DetailFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Cột label: mặc định w-28 / sm:w-36 */
  labelClassName?: string;
};

export function DetailField({
  label,
  children,
  className,
  labelClassName,
}: DetailFieldProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 px-1 py-1 sm:gap-6 sm:py-1.5",
        className,
      )}
    >
      <p
        className={cn(
          "w-28 shrink-0 text-sm text-slate-600 sm:w-36",
          labelClassName,
        )}
      >
        {label}
      </p>
      <div className="min-w-0 flex-1 text-sm text-slate-800">{children}</div>
    </div>
  );
}
