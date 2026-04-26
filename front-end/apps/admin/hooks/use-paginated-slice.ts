"use client";

import * as React from "react";

import { DASHBOARD_PAGE_SIZE } from "@/lib/dashboard/constants";

export function usePaginatedSlice<T>(
  items: T[],
  page: number,
  pageSize: number = DASHBOARD_PAGE_SIZE,
) {
  return React.useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    return {
      totalPages,
      safePage,
      start,
      pageSize,
      pageRows: items.slice(start, start + pageSize),
    };
  }, [items, page, pageSize]);
}
