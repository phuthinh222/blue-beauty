"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import logoAsset from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";

const ROYAL_BLUE = "bg-[#257CBA] hover:bg-[#1F6FA1]";

const CONCEPT_ITEMS = [
  {
    title: "Sự kiện",
    href: "/dashboard/concept/event",
    desc: "Cho những khoảnh khắc đặc biệt, dịch vụ makeup sự kiện của chúng tôi sẽ biến bạn thành trung tâm của sự chú ý",
  },
  {
    title: "Du lịch",
    href: "/dashboard/concept/travel",
    desc: "Chúng tôi mang đến dịch vụ makeup du lịch hoàn hảo, giúp bạn luôn rạng rỡ trong những khoảnh khắc đáng nhớ",
  },
  {
    title: "Hằng ngày",
    href: "/dashboard/concept/daily",
    desc: "Dịch vụ makeup hằng ngày của chúng tôi mang đến cho bạn vẻ đẹp tự nhiên và sự tự tin trong từng khoảnh khắc",
  },
  {
    title: "Chụp ảnh",
    href: "/dashboard/concept/photography",
    desc: "Đảm bảo bạn tỏa sáng trong mọi khung hình với dịch vụ makeup chụp ảnh chuyên nghiệp của chúng tôi",
  },
];

function ConceptDropdown() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`cursor-pointer text-sm font-medium transition-colors hover:text-[#257CBA] ${open ? "text-[#257CBA]" : "text-slate-700"}`}
      >
        Concept
      </button>

      {open && (
        <div className="absolute left-1/2 top-full mt-[22px] w-[480px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {CONCEPT_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group cursor-pointer text-left"
              >
                <p className="flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-[#257CBA]">
                  {item.title}
                  <span className="text-[#257CBA]">›</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ onLogout }: { onLogout?: () => void }) {
  return (
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
          <Image
            src="/images/blue-beauty.png"
            alt="Blue Beauty"
            width={120}
            height={40}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <ConceptDropdown />
          <Link href="/dashboard/artists" className="hover:text-[#257CBA]">
            Thợ trang điểm
          </Link>
          <a href="#promo" className="hover:text-[#257CBA]">
            Khuyến mãi
          </a>
          <a href="#try-on" className="hover:text-[#257CBA]">
            Try on makeup
          </a>
        </nav>

        {onLogout ? (
          <Button
            type="button"
            className={`h-9 shrink-0 rounded-lg px-3 text-sm font-semibold text-white sm:px-4 ${ROYAL_BLUE}`}
            onClick={onLogout}
          >
            Đăng xuất
          </Button>
        ) : (
          <Link href="/login">
            <Button
              type="button"
              className={`h-9 shrink-0 rounded-lg px-3 text-sm font-semibold text-white sm:px-4 ${ROYAL_BLUE}`}
            >
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile nav */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden">
        <nav className="flex gap-4 overflow-x-auto pb-1 text-xs font-medium text-slate-600 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <a href="#concept" className="shrink-0 hover:text-[#257CBA]">Concept</a>
          <Link href="/dashboard/artists" className="shrink-0 hover:text-[#257CBA]">Thợ trang điểm</Link>
          <a href="#promo" className="shrink-0 hover:text-[#257CBA]">Khuyến mãi</a>
          <a href="#try-on" className="shrink-0 hover:text-[#257CBA]">Try on makeup</a>
        </nav>
      </div>
    </header>
  );
}
