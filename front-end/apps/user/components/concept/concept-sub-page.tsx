import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionTitle } from "@/components/shared/section-title";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { ArtistCard, type Artist } from "@/components/concept/artist-card";

type ConceptSubPageProps = {
  title: string;
  breadcrumbLabel: string;
  artists: Artist[];
  onLogout: () => void;
};

export function ConceptSubPage({ title, breadcrumbLabel, artists, onLogout }: ConceptSubPageProps) {
  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <Link href="/dashboard/concept" className="hover:text-brand">Concept</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">{breadcrumbLabel}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {artists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
