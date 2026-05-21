"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { ArtistHero } from "@/components/artist-profile/artist-hero";
import { ArtistStatsBar } from "@/components/artist-profile/artist-stats-bar";
import { ArtistBio } from "@/components/artist-profile/artist-bio";
import { ArtistPortfolio } from "@/components/artist-profile/artist-portfolio";
import { ArtistReviews } from "@/components/artist-profile/artist-reviews";
import { useLogout } from "@/hooks/use-logout";
import { getArtistById } from "./data";

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const onLogout = useLogout();
  const artist = getArtistById(id);

  if (!artist) notFound();

  return (
    <div className="min-h-dvh bg-slate-50 pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-[#257CBA]">
            Trang chủ
          </Link>
          <span>›</span>
          <Link href="/dashboard/artists" className="hover:text-[#257CBA]">
            Thợ trang điểm
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-700">{artist.name}</span>
        </nav>
      </div>

      <main className="mx-auto max-w-2xl space-y-4 px-4 pb-10 sm:px-6">
        <ArtistHero
          name={artist.name}
          district={artist.district}
          city={artist.city}
          rating={artist.rating}
          coverPhoto={artist.coverPhoto}
          avatar={artist.avatar}
        />

        <ArtistStatsBar stats={artist.stats} />

        <ArtistBio
          bio={artist.bio}
          bookingArea={artist.bookingArea}
          workPrinciples={artist.workPrinciples}
        />

        <ArtistPortfolio portfolio={artist.portfolio} />

        <ArtistReviews
          rating={artist.rating}
          reviewCount={artist.reviews.length}
          reviews={artist.reviews}
        />
      </main>

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
