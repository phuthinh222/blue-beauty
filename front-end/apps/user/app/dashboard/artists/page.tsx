"use client";

import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionTitle } from "@/components/shared/section-title";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { FilterChips } from "@/components/shared/filter-chips";
import { Pagination } from "@/components/shared/pagination";
import { ArtistCard } from "@/components/concept/artist-card";
import { useLogout } from "@/hooks/use-logout";
import { usePaginatedFilter } from "@/hooks/use-paginated-filter";
import { ALL_ARTISTS, DISTRICTS, PAGE_SIZE } from "./data";

export default function ArtistsPage() {
  const onLogout = useLogout();
  const { selected, page, paged, totalPages, handleSelect, setPage } =
    usePaginatedFilter(
      ALL_ARTISTS,
      PAGE_SIZE,
      "Tất cả",
      (artist, district) => artist.district === district,
    );

  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Thợ trang điểm</span>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionTitle>Top thợ trang điểm nổi bật</SectionTitle>

        <div className="mt-6">
          <FilterChips
            options={DISTRICTS}
            selected={selected}
            onChange={handleSelect}
          />

          <div className="mt-6">
            {paged.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
                  {paged.map((artist) => (
                    <ArtistCard
                      key={artist.name}
                      artist={artist}
                      imageAspect="aspect-[3/4]"
                      compact
                    />
                  ))}
                </div>
                <Pagination
                  current={page}
                  total={totalPages}
                  onChange={setPage}
                />
              </>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
                Không tìm thấy thợ trang điểm trong khu vực này
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
