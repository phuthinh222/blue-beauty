"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { useLogout } from "@/hooks/use-logout";

/* ─── Data ───────────────────────────────────────────────────── */

const FEATURES = [
  {
    step: 1,
    title: "Tích điểm",
    desc: "Nhận thưởng cho mọi đơn hàng và hoạt động thành công",
    btnLabel: "Ưu đãi đặc biệt khi tích điểm",
    btnColor: "bg-brand hover:bg-brand-dark",
  },
  {
    step: 2,
    title: "Quy đổi và thưởng",
    desc: "Dễ dàng quy đổi điểm tích lũy để nhận phiếu giảm giá hấp dẫn cho lần đặt tiếp theo",
    btnLabel: "Ưu đãi đặc biệt khi quy đổi điểm",
    btnColor: "bg-[#E8256A] hover:bg-[#c91d5a]",
  },
];

const VOUCHERS = [
  {
    label: "Voucher 3%",
    color: "from-[#E8256A] to-[#c91d5a]",
    items: [
      "Feedback cho thợ trang điểm từ 1–5 lần/lần",
      "Tích điểm",
      "Từ 1000 điểm",
    ],
  },
  {
    label: "Voucher 5%",
    color: "from-[#E8256A] to-[#c91d5a]",
    items: [
      "Feedback cho thợ trang điểm từ 15 lần/lần",
      "Tích điểm",
      "Từ 1000 điểm",
    ],
  },
  {
    label: "Voucher 10%",
    color: "from-[#E8256A] to-[#c91d5a]",
    items: [
      "Feedback cho thợ trang điểm từ 25 lần trở lên",
      "Tích điểm",
      "Từ 1000 điểm",
    ],
  },
];

/* ─── Sub-components ─────────────────────────────────────────── */

function HeroBanner() {
  return (
    <div className="overflow-hidden rounded-2xl">
      <Image
        src="/images/background3.png"
        alt="Gift Voucher"
        width={900}
        height={300}
        className="h-auto w-full object-cover"
        priority
      />
    </div>
  );
}

function FeatureCard({
  step, title, desc, btnLabel, btnColor,
}: (typeof FEATURES)[0]) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
        {step}
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
      <button className={`mt-5 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition ${btnColor}`}>
        {btnLabel}
      </button>
    </div>
  );
}

function VoucherCard({ label, color, items }: (typeof VOUCHERS)[0]) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-sm">
      <div className={`bg-gradient-to-r ${color} px-5 py-3`}>
        <p className="text-center text-base font-extrabold text-white">{label}</p>
      </div>
      <div className="border border-t-0 border-slate-200 bg-white px-5 py-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="mt-0.5 size-3.5 shrink-0 text-[#E8256A]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function PromotionsPage() {
  const onLogout = useLogout();

  return (
    <div className="min-h-dvh bg-white pb-16 md:pb-0">
      <SiteHeader onLogout={onLogout} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Khuyến mãi</span>
        </nav>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <HeroBanner />

        {/* Tính năng voucher */}
        <section>
          <h2 className="mb-6 text-center text-xl font-bold text-brand">
            Các tính năng của Voucher
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <FeatureCard key={f.step} {...f} />
            ))}
          </div>
        </section>

        {/* Đổi điểm thưởng */}
        <section>
          <h2 className="mb-6 text-center text-xl font-bold text-brand">
            Đổi điểm thưởng
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VOUCHERS.map((v) => (
              <VoucherCard key={v.label} {...v} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
