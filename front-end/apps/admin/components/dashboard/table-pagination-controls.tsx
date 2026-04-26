"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@repo/ui/pagination";

type TablePaginationControlsProps = {
  safePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function TablePaginationControls({
  safePage,
  totalPages,
  onPageChange,
  className,
}: TablePaginationControlsProps) {
  return (
    <div className={className}>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={false}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(1, safePage - 1));
              }}
              className={`h-9 w-9 ${safePage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            >
              ‹
            </PaginationLink>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={n === safePage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(n);
                }}
                className="cursor-pointer"
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={false}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.min(totalPages, safePage + 1));
              }}
              className={`h-9 w-9 ${safePage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            >
              ›
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
