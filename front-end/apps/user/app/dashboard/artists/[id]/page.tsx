"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArtistServices } from "@/components/artist-profile/artist-services";
import { ProfileTabs } from "@/components/artist-profile/profile-tabs";
import { BookingModal } from "@/components/artist-profile/booking-modal";
import type { ArtistService } from "@/components/artist-profile/types";
import type { TabId } from "@/components/artist-profile/profile-tabs";
import { useLogout } from "@/hooks/use-logout";
import { getArtistById } from "./data";

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const onLogout = useLogout();
  const artist = getArtistById(id);

  const [activeTab, setActiveTab] = useState<TabId>("intro");
  const [showBooking, setShowBooking] = useState(false);
  const [initialService, setInitialService] = useState<ArtistService | undefined>();

  const openBooking = (svc?: ArtistService) => {
    setInitialService(svc);
    setShowBooking(true);
  };
  const closeBooking = () => {
    setShowBooking(false);
    setInitialService(undefined);
  };

  if (!artist) notFound();

  return (
    <div className="min-h-dvh bg-slate-50 pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">
            Trang chủ
          </Link>
          <span>›</span>
          <Link href="/dashboard/artists" className="hover:text-brand">
            Thợ trang điểm
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-700">{artist.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-2xl space-y-4 px-4 sm:px-6">
        {/* Hero luôn hiển thị */}
        <ArtistHero
          name={artist.name}
          district={artist.district}
          city={artist.city}
          rating={artist.rating}
          coverPhoto={artist.coverPhoto}
          avatar={artist.avatar}
          onBooking={() => openBooking()}
        />

        {/* Stats + tabs — một card thống nhất */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ArtistStatsBar stats={artist.stats} />
          <div className="sticky top-0 z-10 bg-white">
            <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Nội dung tab */}
      <main className="mx-auto max-w-2xl px-4 py-5 pb-10 sm:px-6">
        {activeTab === "intro" && (
          <ArtistBio
            bio={artist.bio}
            bookingArea={artist.bookingArea}
            workPrinciples={artist.workPrinciples}
          />
        )}
        {activeTab === "services" && (
          <ArtistServices
            services={artist.services}
            onBook={(svc) => openBooking(svc)}
          />
        )}
        {activeTab === "portfolio" && (
          <ArtistPortfolio portfolio={artist.portfolio} />
        )}
        {activeTab === "reviews" && (
          <ArtistReviews
            rating={artist.rating}
            reviewCount={artist.reviews.length}
            reviews={artist.reviews}
          />
        )}
      </main>

      {showBooking && (
        <BookingModal
          artistName={artist.name}
          services={artist.services}
          initialService={initialService}
          onClose={closeBooking}
          onNavigateToCheckout={(params) => router.push(`/dashboard/checkout?${params.toString()}`)}
        />
      )}

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
