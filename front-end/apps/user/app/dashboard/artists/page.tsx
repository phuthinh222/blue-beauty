"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Star, ArrowDownAZ, ArrowUpZA } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionTitle } from "@/components/shared/section-title";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { Pagination } from "@/components/shared/pagination";
import { ArtistCard } from "@/components/concept/artist-card";
import { useAuth } from "@/hooks/use-auth";
import { useFavorites } from "@/hooks/use-favorites";
import { ALL_ARTISTS, DISTRICTS, TIME_SESSIONS, RATINGS, PAGE_SIZE } from "./data";

export default function ArtistsPage() {
  const { isLoggedIn, user, onLogout } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [district, setDistrict] = useState("Tất cả");
  const [session,  setSession]  = useState("Tất cả");
  const [rating,   setRating]   = useState("Tất cả");
  const [nameAsc,  setNameAsc]  = useState(true);
  const [page,     setPage]     = useState(1);

  function resetPage(fn: () => void) { fn(); setPage(1); }

  const minRating =
    rating === "5 sao"    ? 5.0 :
    rating === "4.5+ sao" ? 4.5 :
    rating === "4.0+ sao" ? 4.0 : 0;

  const filtered = ALL_ARTISTS
    .filter((a) => {
      const districtOk = district === "Tất cả" || a.district === district;
      const sessionOk  = session  === "Tất cả" || a.sessions.includes(session);
      const ratingOk   = a.rating >= minRating;
      return districtOk && sessionOk && ratingOk;
    })
    .sort((a, b) =>
      nameAsc
        ? a.name.localeCompare(b.name, "vi")
        : b.name.localeCompare(a.name, "vi"),
    );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

        {/* ── Filters ───────────────────────────────────────── */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-3">
          {/* Khu vực */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="size-4 shrink-0 text-brand" />
              Khu vực
            </label>
            <Select value={district} onValueChange={(v) => resetPage(() => setDistrict(v))}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thời gian */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock className="size-4 shrink-0 text-brand" />
              Thời gian
            </label>
            <Select value={session} onValueChange={(v) => resetPage(() => setSession(v))}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_SESSIONS.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Đánh giá */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Star className="size-4 shrink-0 text-brand" />
              Đánh giá
            </label>
            <Select value={rating} onValueChange={(v) => resetPage(() => setRating(v))}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RATINGS.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Result count + sort toggle ────────────────────── */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Tìm thấy <span className="font-semibold text-slate-700">{filtered.length}</span> thợ trang điểm
          </p>
          <button
            onClick={() => resetPage(() => setNameAsc((v) => !v))}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-brand"
          >
            {nameAsc
              ? <><ArrowDownAZ className="size-4" /> A → Z</>
              : <><ArrowUpZA   className="size-4" /> Z → A</>
            }
          </button>
        </div>

        {/* ── Grid ─────────────────────────────────────────── */}
        <div className="mt-4">
          {paged.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
