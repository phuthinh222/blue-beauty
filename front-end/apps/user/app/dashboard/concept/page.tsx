"use client";

import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionTitle } from "@/components/shared/section-title";
import { CtaSection } from "@/components/shared/cta-section";
import { FloatingActions } from "@/components/shared/floating-actions";
import { useLogout } from "@/hooks/use-logout";

const CONCEPTS = [
  {
    label: "Sự kiện",
    desc: "Cho những khoảnh khắc đặc biệt, dịch vụ makeup sự kiện sẽ biến bạn thành trung tâm của sự chú ý",
    img: "/images/item1.jpg",
    href: "/dashboard/concept/event",
  },
  {
    label: "Du lịch",
    desc: "Dịch vụ makeup du lịch hoàn hảo, giúp bạn luôn rạng rỡ trong những khoảnh khắc đáng nhớ",
    img: "/images/ngoaitroi.jpg",
    href: "/dashboard/concept/travel",
  },
  {
    label: "Hằng ngày",
    desc: "Makeup hằng ngày mang đến vẻ đẹp tự nhiên và sự tự tin trong từng khoảnh khắc",
    img: "/images/makeup2.jpg",
    href: "/dashboard/concept/daily",
  },
  {
    label: "Chụp ảnh",
    desc: "Đảm bảo bạn tỏa sáng trong mọi khung hình với dịch vụ makeup chụp ảnh chuyên nghiệp",
    img: "/images/maekup3.jpg",
    href: "/dashboard/concept/photography",
  },
];

export default function ConceptPage() {
  const onLogout = useLogout();

  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-[#257CBA]">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Concept</span>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <SectionTitle>Khám phá các concept trang điểm</SectionTitle>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONCEPTS.map((concept) => (
            <Link
              key={concept.label}
              href={concept.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={concept.img}
                  alt={concept.label}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/25 transition duration-300 group-hover:bg-black/40" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-base font-bold text-white drop-shadow">
                  {concept.label}
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs leading-relaxed text-slate-500">{concept.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
