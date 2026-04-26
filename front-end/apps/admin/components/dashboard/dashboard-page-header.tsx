import Link from "next/link";
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

export type DashboardBreadcrumbItem = {
  label: string;
  href?: string;
};

type DashboardPageHeaderProps = {
  title: string;
  /** Nhãn mục hiện tại sau “Trang chủ ›” (khi không dùng `breadcrumbs`) */
  currentLabel?: string;
  /** Các mục sau “Trang chủ ›”; mục cuối không `href` = trang hiện tại */
  breadcrumbs?: DashboardBreadcrumbItem[];
  /** Ẩn hẳn dòng breadcrumb (vd. trang tổng quan dashboard) */
  omitBreadcrumb?: boolean;
  /** Dòng mô tả / trạng thái dưới tiêu đề */
  description?: React.ReactNode;
  /** Ghi đè cỡ chữ tiêu đề (vd. trang chủ lớn hơn) */
  titleClassName?: string;
  className?: string;
  endContent?: React.ReactNode;
};

export function DashboardPageHeader({
  title,
  currentLabel,
  breadcrumbs,
  omitBreadcrumb = false,
  description,
  titleClassName,
  className,
  endContent,
}: DashboardPageHeaderProps) {
  const linkClass =
    "cursor-pointer font-medium text-[#257CBA] hover:underline";

  const renderBreadcrumbTrail = () => {
    if (breadcrumbs?.length) {
      return (
        <>
          <Link href="/dashboard" className={linkClass}>
            Trang chủ
          </Link>
          {breadcrumbs.map((item, i) => (
            <React.Fragment key={`${item.label}-${i}`}>
              <span className="text-slate-400">›</span>
              {item.href ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-500">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </>
      );
    }
    if (currentLabel) {
      return (
        <>
          <Link href="/dashboard" className={linkClass}>
            Trang chủ
          </Link>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">{currentLabel}</span>
        </>
      );
    }
    return null;
  };

  const trail = !omitBreadcrumb ? renderBreadcrumbTrail() : null;

  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
        className,
      )}
    >
      <div>
        <h1
          className={cn(
            "text-[28px] font-semibold tracking-tight text-slate-800",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {trail ? (
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
            {trail}
          </div>
        ) : null}
        {description ? (
          <p
            className={cn(
              "text-sm text-slate-500",
              trail ? "mt-2" : "mt-1",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {endContent ? (
        <div className="flex shrink-0 flex-wrap items-center gap-6 lg:justify-end">
          {endContent}
        </div>
      ) : null}
    </div>
  );
}
