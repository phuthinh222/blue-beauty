"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, Phone } from "lucide-react";

import logoAsset from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

const ROYAL_BLUE = "bg-[#257CBA] hover:bg-[#1F6FA1]";
const FAB =
  "flex size-12 items-center justify-center rounded-full bg-[#257CBA] text-white shadow-lg ring-1 ring-black/5 transition hover:bg-[#1F6FA1] sm:size-14";

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
  const accentBorder =
    accent === "blue" ? "border-[#257CBA]" : "border-pink-500";
  const accentBg = accent === "blue" ? "bg-[#2aa2d8]" : "bg-pink-500";

  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute right-5 top-4 z-30 grid size-16 place-items-center bg-transparent sm:right-6 sm:size-20">
        <Image
          src={logoAsset}
          alt="Blue Beauty"
          width={96}
          height={96}
          className="h-14 w-auto sm:h-16"
        />
      </div>

      <Card className="h-full overflow-hidden border-slate-200 shadow-sm">
        <div className="relative h-full">
          <div className="px-5 pb-[168px] pt-3 sm:px-6 sm:pb-[188px] sm:pt-4 sm:pr-[300px] md:pr-[340px]">
            <p
              className={`text-[22px] font-bold leading-tight sm:text-2xl ${accentText}`}
            >
              {title}
            </p>
            <p className="-mt-0.5 text-sm font-semibold text-slate-900">
              {subtitle}
            </p>

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

          <div
            className={`absolute inset-x-0 bottom-0 h-[130px] sm:h-[150px] ${accentBg}`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute bottom-0 left-0 h-full w-[72%]">
                <Image
                  src={decorSrc}
                  alt=""
                  fill
                  className="origin-bottom-left scale-150 object-contain object-left-bottom"
                  sizes="(min-width: 1024px) 520px, 90vw"
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-5 top-[80px] z-20 w-[210px] sm:right-6 sm:top-[104px] sm:w-[230px] md:w-[250px]">
            <div
              className={`relative overflow-hidden border-2 border-dashed ${accentBorder} bg-white shadow-sm`}
            >
              <div className="relative m-2 overflow-hidden bg-slate-100">
                <div className="relative aspect-[4/3] sm:aspect-[3/4]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, 70vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function UserDashboardLanding({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-[100dvh] bg-white pb-24 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
            <Image
              src={logoAsset}
              alt="BlueBeauty"
              width={140}
              height={40}
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#concept" className="hover:text-[#257CBA]">
              Concept
            </a>
            <a href="#artists" className="hover:text-[#257CBA]">
              Thợ trang điểm
            </a>
            <a href="#promo" className="hover:text-[#257CBA]">
              Khuyến mãi
            </a>
            <a href="#try-on" className="hover:text-[#257CBA]">
              Try on makeup
            </a>
          </nav>

          <Button
            type="button"
            className={`h-9 shrink-0 rounded-lg px-3 text-sm font-semibold text-white sm:px-4 ${ROYAL_BLUE}`}
            onClick={onLogout}
          >
            Đăng xuất
          </Button>
        </div>
        <div className="border-t border-slate-100 px-4 py-2 md:hidden">
          <nav className="flex gap-4 overflow-x-auto pb-1 text-xs font-medium text-slate-600 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="#concept" className="shrink-0 hover:text-[#257CBA]">
              Concept
            </a>
            <a href="#artists" className="shrink-0 hover:text-[#257CBA]">
              Thợ trang điểm
            </a>
            <a href="#promo" className="shrink-0 hover:text-[#257CBA]">
              Khuyến mãi
            </a>
            <a href="#try-on" className="shrink-0 hover:text-[#257CBA]">
              Try on makeup
            </a>
          </nav>
        </div>
      </header>

      <section id="concept" className="relative overflow-hidden bg-[#c5dff0]">
        <div className="absolute inset-0">
          <Image
            src="/images/background.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-900/10" />
        </div>

        <div className="relative mx-auto flex min-h-[280px] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[340px] sm:py-16 md:min-h-[420px] md:py-20">
          <p
            className="font-[family-name:var(--font-great-vibes)] text-5xl leading-none text-white drop-shadow-[0_3px_0_#1e6ba8] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ textShadow: "2px 4px 12px rgba(30,107,168,0.35)" }}
          >
            Welcome
          </p>
          <p className="mt-4 max-w-xl text-sm font-bold uppercase tracking-wide text-[#0c4a6e] sm:text-base md:text-lg">
            Flawless beauty, one tap with Blue!
          </p>
        </div>

        <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-8">
          <a
            href="tel:"
            className={`${FAB} pointer-events-auto`}
            aria-label="Gọi điện"
          >
            <Phone className="size-6" />
          </a>
          <a
            href="#"
            className={`${FAB} pointer-events-auto`}
            aria-label="Chat"
          >
            <MessageCircle className="size-6" />
          </a>
        </div>
      </section>

      <section
        id="promo"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
            Làm đẹp dễ dàng cùng BlueBeauty
          </h2>
          <div className="mx-auto mt-3 flex justify-center gap-1">
            <span className="h-1 w-10 rounded-full bg-[#257CBA]" />
            <span className="h-1 w-10 rounded-full bg-pink-400" />
          </div>
        </div>

        <div
          id="artists"
          className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8"
        >
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
