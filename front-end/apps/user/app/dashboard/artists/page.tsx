"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionTitle } from "@/components/shared/section-title";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { FilterChips } from "@/components/shared/filter-chips";
import { Pagination } from "@/components/shared/pagination";
import { ArtistCard } from "@/components/concept/artist-card";
import { useAuth } from "@/hooks/use-auth";
import { useFavorites } from "@/hooks/use-favorites";
import { ALL_ARTISTS, DISTRICTS, TIME_SESSIONS, PAGE_SIZE } from "./data";

export default function ArtistsPage() {
  const { isLoggedIn, user, onLogout } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [district, setDistrict] = useState("Tất cả");
  const [session,  setSession]  = useState("Tất cả");
  const [page, setPage] = useState(1);

  const filtered = ALL_ARTISTS.filter((a) => {
    const districtOk = district === "Tất cả" || a.district === district;
    const sessionOk  = session  === "Tất cả" || a.sessions.includes(session);
    return districtOk && sessionOk;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleDistrictChange(v: string) { setDistrict(v); setPage(1); }
  function handleSessionChange(v: string)  { setSession(v);  setPage(1); }

  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={isLoggedIn ? onLogout : undefined} user={user} />

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Thợ trang điểm</span>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionTitle>Top thợ trang điểm nổi bật</SectionTitle>

        <div className="mt-6 space-y-3">
          <FilterChips
            options={DISTRICTS}
            selected={district}
            onChange={handleDistrictChange}
            icon={<MapPin className="size-4 shrink-0 text-brand" />}
          />
          <FilterChips
            options={TIME_SESSIONS}
            selected={session}
            onChange={handleSessionChange}
            icon={<Clock className="size-4 shrink-0 text-brand" />}
          />
        </div>

        <div className="mt-6">
          {paged.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
                {paged.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    imageAspect="aspect-[3/4]"
                    compact
                    isFavorited={artist.id ? isFavorited(artist.id) : false}
                    onToggleFavorite={artist.id ? () => toggleFavorite(artist.id!) : undefined}
                  />
                ))}
              </div>
              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
              Không tìm thấy thợ trang điểm phù hợp
            </div>
          )}
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
