"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, CalendarCheck, Heart, Phone, MessageCircle, Star, Check } from "lucide-react";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const FAB =
  "flex size-12 items-center justify-center rounded-full bg-[#257CBA] text-white shadow-lg ring-1 ring-black/5 transition hover:bg-[#1F6FA1] sm:size-14";

const SLIDES = [
  "/images/backgound1.png",
  "/images/backgound2.png",
  "/images/background3.png",
];

const FEATURED_ARTISTS = [
  {
    name: "Khánh Vân",
    district: "Hải Châu",
    city: "Đà Nẵng",
    rating: 5.0,
    photo: "/images/makeup1.jpg",
    avatar: "/images/avatar.png",
  },
  {
    name: "Nguyệt Minh",
    district: "Ngã Hành Sơn",
    city: "Đà Nẵng",
    rating: 5.0,
    photo: "/images/makeup2.jpg",
    avatar: "/images/avatar.png",
  },
  {
    name: "Hà Minh Phương",
    district: "Thanh Khê",
    city: "Đà Nẵng",
    rating: 5.0,
    photo: "/images/makeup5.jpg",
    avatar: "/images/avatar.png",
  },
];

const CATEGORIES = [
  { label: "Du lịch", img: "/images/ngoaitroi.jpg" },
  { label: "Sự kiện", img: "/images/item1.jpg" },
  { label: "Hằng ngày", img: "/images/makeup2.jpg" },
  { label: "Chụp ảnh", img: "/images/maekup3.jpg" },
];

const STEPS = [
  {
    icon: Search,
    title: "Tìm kiếm thợ trang điểm",
    desc: "Tìm kiếm những thợ trang điểm xung quanh bạn với đầy đủ thông tin về giá cả, kỹ năng và thêm vào mục yêu thích",
  },
  {
    icon: CalendarCheck,
    title: "Đặt lịch hẹn",
    desc: "Sau khi lựa chọn được thợ phù hợp, nhanh chóng đặt lịch bằng cách nhập địa chỉ và lựa chọn dịch vụ makeup điều phù hợp cho bạn",
  },
  {
    icon: Heart,
    title: "Chia sẻ khoảnh khắc tuyệt vời",
    desc: "Website hỗ trợ bạn đánh giá thợ trang điểm sau khi trải qua dịch vụ. Hãy ủng hộ để chúng tôi cải thiện dịch vụ tốt hơn cho bạn",
  },
];

import logoAsset from "@repo/assets/logo.png";

const customerPoints = [
  "Tìm được thợ phù hợp với nhu cầu",
  "Quy trình và giá cả hợp lý",
  "Đặt lịch nhanh chóng",
  "Dịch vụ chuyên nghiệp",
  "Nhận ưu đãi và voucher khủng",
];

const artistPoints = [
  "Thời gian làm việc tự do",
  "Cùng BLUE chia sẻ lợi nhuận",
  "Nâng tầm vị thế",
  "Giao dịch minh bạch và công bằng",
  "Quyền lợi khi thăng hạng",
];

function BenefitCard({
  accent,
  title,
  subtitle,
  points,
  imageSrc,
  imageAlt,
  decorSrc,
}: {
  accent: "blue" | "pink";
  title: string;
  subtitle: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  decorSrc: string;
}) {
  const accentText = accent === "blue" ? "text-[#257CBA]" : "text-pink-500";
  const accentBorder = accent === "blue" ? "border-[#257CBA]" : "border-pink-500";
  const accentBg = accent === "blue" ? "bg-[#2aa2d8]" : "bg-pink-500";

  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute right-5 top-4 z-30 grid size-16 place-items-center bg-transparent sm:right-6 sm:size-20">
        <Image src={logoAsset} alt="Blue Beauty" width={96} height={96} className="h-14 w-auto sm:h-16" />
      </div>
      <Card className="h-full overflow-hidden border-slate-200 shadow-sm">
        <div className="relative h-full">
          <div className="px-5 pb-[168px] pt-3 sm:px-6 sm:pb-[188px] sm:pt-4 sm:pr-[300px] md:pr-[340px]">
            <p className={`text-[22px] font-bold leading-tight sm:text-2xl ${accentText}`}>{title}</p>
            <p className="-mt-0.5 text-sm font-semibold text-slate-900">{subtitle}</p>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-700 sm:text-sm">
              {points.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className={accentText}>
                    <Check className="mt-0.5 size-4" strokeWidth={3} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`absolute inset-x-0 bottom-0 h-[130px] sm:h-[150px] ${accentBg}`}>
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute bottom-0 left-0 h-full w-[72%]">
                <Image
                  src={decorSrc}
                  alt=""
                  fill
                  className="origin-bottom-left translate-y-5 scale-150 object-contain object-bottom-left"
                  sizes="(min-width: 1024px) 520px, 90vw"
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute right-5 top-[80px] z-20 w-[210px] sm:right-6 sm:top-[104px] sm:w-[230px] md:w-[250px]">
            <div className={`relative overflow-hidden border-2 border-dashed ${accentBorder} bg-white shadow-sm`}>
              <div className="relative m-2 overflow-hidden bg-slate-100">
                <div className="relative aspect-[4/3] sm:aspect-[3/4]">
                  <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 320px, 70vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-[#257CBA] sm:text-xl md:text-2xl">
        {children}
      </h2>
      <div className="mx-auto mt-2 flex justify-center gap-1">
        <span className="h-0.5 w-10 rounded-full bg-[#257CBA]" />
        <span className="h-0.5 w-10 rounded-full bg-pink-400" />
      </div>
    </div>
  );
}

export function UserDashboardLanding({ onLogout }: { onLogout: () => void }) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      {/* ── Slideshow banner ── */}
      <section id="concept" className="relative overflow-hidden">
        <div className="relative aspect-16/5 w-full">
          {SLIDES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Blue Beauty banner"
              fill
              priority={i === 0}
              className={`object-cover object-center transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              sizes="100vw"
              quality={90}
            />
          ))}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quyền lợi ── */}
      <section id="promo" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle>Làm đẹp dễ dàng cùng BlueBeauty</SectionTitle>
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <BenefitCard
            accent="blue"
            title="Quyền lợi của"
            subtitle="Khách hàng"
            points={customerPoints}
            imageSrc="/images/customer.png"
            imageAlt="Khách hàng"
            decorSrc="/images/guest.png"
          />
          <BenefitCard
            accent="pink"
            title="Quyền lợi của"
            subtitle="Thợ trang điểm"
            points={artistPoints}
            imageSrc="/images/makeup.png"
            imageAlt="Thợ trang điểm"
            decorSrc="/images/artist.png"
          />
        </div>
      </section>

      {/* ── Top thợ nổi bật ── */}
      <section id="artists" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <SectionTitle>Top thợ trang điểm nổi bật</SectionTitle>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {FEATURED_ARTISTS.map((artist) => (
            <div
              key={artist.name}
              className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  quality={90}
                />
              </div>
              <div className="relative px-4 pb-4 pt-7">
                <div className="absolute -top-5 left-4 size-10 overflow-hidden rounded-full border-2 border-white shadow">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                </div>
                <p className="font-semibold text-slate-900">{artist.name}</p>
                <p className="text-xs text-slate-500">
                  {artist.district}, {artist.city}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-700">{artist.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Thể loại ── */}
      <section id="promo" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
        <SectionTitle>Thể loại</SectionTitle>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition" />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-white">
                {cat.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── 3 bước ── */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>Làm đẹp với BlueBeauty chỉ với 3 bước</SectionTitle>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-6 text-center shadow-sm"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-pink-400">
                  <Icon className="size-6 text-pink-500" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA thợ trang điểm ── */}
      <section className="relative overflow-hidden bg-[#e0f2fe] px-4 py-14 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 opacity-20 sm:w-72">
          <Image src="/images/makeup.png" alt="" fill className="object-contain object-left" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 rotate-12 opacity-20 sm:w-72">
          <Image src="/images/makeup.png" alt="" fill className="object-contain object-right" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-lg font-bold text-[#0c4a6e] sm:text-xl md:text-2xl">
            Bạn có phải là một thợ trang điểm chuyên nghiệp và đầy tham vọng?
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Tham gia cộng đồng BlueBeauty và nhận booking job ngay hôm nay
          </p>
          <Link href="/register">
            <Button className="mt-6 h-10 rounded-lg bg-[#257CBA] px-8 text-sm font-semibold text-white hover:bg-[#1F6FA1]">
              Đăng ký
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* FAB desktop */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-8">
        <a href="tel:" className={`${FAB} pointer-events-auto`} aria-label="Gọi điện">
          <Phone className="size-6" />
        </a>
        <a href="#" className={`${FAB} pointer-events-auto`} aria-label="Chat">
          <MessageCircle className="size-6" />
        </a>
      </div>

      {/* FAB mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center gap-3 border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <a href="tel:" className={FAB} aria-label="Gọi điện">
          <Phone className="size-5" />
        </a>
        <a href="#" className={FAB} aria-label="Chat">
          <MessageCircle className="size-5" />
        </a>
      </div>
    </div>
  );
}
