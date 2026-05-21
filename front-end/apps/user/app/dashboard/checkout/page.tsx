"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useLogout } from "@/hooks/use-logout";

function CheckoutContent() {
  const params = useSearchParams();
  const router = useRouter();
  const onLogout = useLogout();

  const artist   = params.get("artist")   ?? "";
  const concept  = params.get("concept")  ?? "";
  const price    = Number(params.get("price") ?? 0);
  const date     = params.get("date")     ?? "";
  const time     = params.get("time")     ?? "";
  const location = params.get("location") ?? "";
  const bookedAt = params.get("bookedAt") ?? "";

  const [voucher, setVoucher] = useState("");
  const [note, setNote]       = useState(params.get("note") ?? "");
  const [discount, setDiscount] = useState(0);

  const MOCK_VOUCHERS: Record<string, number> = {
    BLUE10: 0.1,
    BLUE20: 0.2,
    BEAUTY50K: 50000,
  };

  function applyVoucher() {
    const v = voucher.trim().toUpperCase();
    const val = MOCK_VOUCHERS[v];
    if (!val) return;
    setDiscount(val < 1 ? Math.round(price * val) : val);
  }

  const total = Math.max(0, price - discount);

  function goToConfirm() {
    const p = new URLSearchParams({
      artist, concept, price: String(total), date, time, location,
    });
    router.push(`/dashboard/checkout/confirm?${p.toString()}`);
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-xl px-4 py-3 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-[#257CBA]">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Thanh toán</span>
        </nav>
      </div>

      <main className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        {/* Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#257CBA]/10">
            <CalendarDays className="size-7 text-[#257CBA]" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Thanh toán</h1>
          <p className="mt-1 text-sm text-slate-500">Nhập các thông tin bên dưới để tiến hành thanh toán!</p>
        </div>

        {/* Invoice card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-center text-base font-semibold text-[#257CBA]">Hóa đơn của bạn</h2>
          </div>

          <div className="divide-y divide-slate-100 px-6">
            <InvoiceRow label="Thợ trang điểm" value={artist} />
            <InvoiceRow label="Địa điểm" value={location} />
            <InvoiceRow label="Ngày đặt lịch" value={bookedAt || new Date().toLocaleString("vi-VN")} />
            <InvoiceRow label="Ngày hẹn" value={`${date} ${time}`} />
            <InvoiceRow label="Concept" value={concept} />
            <InvoiceRow label="Giá tiền" value={`${price.toLocaleString("vi-VN")}đ`} />

            {/* Voucher */}
            <div className="py-4">
              <p className="mb-2 text-sm text-slate-600">Voucher</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập voucher"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-[#257CBA] focus:ring-2 focus:ring-[#257CBA]/20"
                />
                <button
                  onClick={applyVoucher}
                  className="rounded-xl bg-[#257CBA]/10 px-4 py-2 text-sm font-semibold text-[#257CBA] transition hover:bg-[#257CBA]/20"
                >
                  Áp dụng
                </button>
              </div>
              {discount > 0 && (
                <p className="mt-1.5 text-xs text-green-600">
                  Giảm {discount.toLocaleString("vi-VN")}đ
                </p>
              )}
            </div>

            {/* Note */}
            <div className="py-4">
              <p className="mb-2 text-sm text-slate-600">Ghi chú</p>
              <textarea
                rows={2}
                placeholder="Có mặt tại địa điểm sớm hơn 15 phút"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-[#257CBA] focus:ring-2 focus:ring-[#257CBA]/20"
              />
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <span className="font-semibold text-[#257CBA]">Tổng hóa đơn</span>
            <span className="text-lg font-bold text-slate-900">
              {total.toLocaleString("vi-VN")}đ
            </span>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={goToConfirm}
              className="mt-4 w-full rounded-xl bg-[#257CBA] py-3 text-sm font-semibold text-white transition hover:bg-[#1e6aa0]"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function InvoiceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
