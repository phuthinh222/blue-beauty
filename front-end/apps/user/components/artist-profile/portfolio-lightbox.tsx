"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "./types";

const PAGE_SIZE = 3;

type PortfolioLightboxProps = {
  item: PortfolioItem;
  onClose: () => void;
};

export function PortfolioLightbox({ item, onClose }: PortfolioLightboxProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(item.images.length / PAGE_SIZE);
  const paged = item.images.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [onClose, prev, next],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-[#257CBA]">{item.label}</h3>
            <span className="text-base text-slate-400">
              ({item.images.length} ảnh)
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Grid ảnh */}
        <div className="p-10">
          <div className="grid grid-cols-3 gap-6">
            {paged.map((src, i) => (
              <div
                key={page * PAGE_SIZE + i}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`${item.label} ${page * PAGE_SIZE + i + 1}`}
                  fill
                  className="object-cover"
                  sizes="560px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer pagination — chỉ hiện khi có hơn 1 trang */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-8 py-4">
            <button
              onClick={prev}
              disabled={page === 0}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-5" />
              Trước
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`size-2.5 rounded-full transition ${
                    i === page ? "bg-[#257CBA] scale-125" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={page === totalPages - 1}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Tiếp
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
