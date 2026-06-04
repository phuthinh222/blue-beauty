"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import { CreditCard, Copy, Check } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useAuth } from "@/hooks/use-auth";
import { BRAND_COLOR } from "@repo/constants/theme";

const BANK_INFO = {
  bankName: "Ngân Hàng Quân Đội MB",
  accountHolder: "LE THI HONG PHUC",
  accountNumber: "9704229202278930701",
  logoColor: "#e85d04",
};

function QRCode({ amount }: { amount: number }) {
  return (
    <div className="flex size-44 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-2">
      {/* Simple SVG QR placeholder */}
      <svg viewBox="0 0 100 100" className="size-full">
        <rect width="100" height="100" fill="white" />
        {/* Top-left finder */}
        <rect x="5" y="5" width="28" height="28" rx="3" fill="black" />
        <rect x="10" y="10" width="18" height="18" rx="1" fill="white" />
        <rect x="14" y="14" width="10" height="10" rx="1" fill="black" />
        {/* Top-right finder */}
        <rect x="67" y="5" width="28" height="28" rx="3" fill="black" />
        <rect x="72" y="10" width="18" height="18" rx="1" fill="white" />
        <rect x="76" y="14" width="10" height="10" rx="1" fill="black" />
        {/* Bottom-left finder */}
        <rect x="5" y="67" width="28" height="28" rx="3" fill="black" />
        <rect x="10" y="72" width="18" height="18" rx="1" fill="white" />
        <rect x="14" y="76" width="10" height="10" rx="1" fill="black" />
        {/* Data dots */}
        {[40,44,48,52,56,60,40,48,56,60,44,52,40,44,52,60,40,48,56].map((x, i) => (
          <rect key={i} x={x} y={38 + (i % 6) * 6} width="3" height="3" fill="black" />
        ))}
        {/* VNPay logo dot */}
        <circle cx="50" cy="50" r="7" fill={BRAND_COLOR} />
        <rect x="46" y="48" width="8" height="4" rx="1" fill="white" />
      </svg>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-lg bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 transition hover:bg-green-200"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Đã sao chép" : "Sao chép"}
    </button>
  );
}

function ConfirmContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const { isLoggedIn, user, onLogout } = useAuth();

  const artist  = params.get("artist")  ?? "";
  const concept = params.get("concept") ?? "";
  const price   = Number(params.get("price") ?? 0);
  const date    = params.get("date")    ?? "";
  const time    = params.get("time")    ?? "";

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader onLogout={isLoggedIn ? onLogout : undefined} user={user} />

      <div className="mx-auto max-w-xl px-4 py-3 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <Link href="/dashboard/checkout" className="hover:text-brand">Thanh toán</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Xác nhận thanh toán</span>
        </nav>
      </div>

      <main className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        {/* Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10">
            <CreditCard className="size-7 text-brand" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Xác nhận thanh toán</h1>
          <p className="mt-1 text-sm text-slate-500">
            Mở app ngân hàng bất kỳ để quét mã VNPAY hoặc chuyển khoản chính xác số tiền bên dưới
          </p>
        </div>

        {/* Payment card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start">
            {/* QR */}
            <div className="shrink-0">
              <QRCode amount={price} />
            </div>

            {/* Bank info */}
            <div className="flex-1 w-full space-y-4">
              {/* Bank name */}
              <div className="flex items-center gap-2">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: BANK_INFO.logoColor }}
                >
                  MB
                </div>
                <span className="text-sm font-semibold text-slate-800">{BANK_INFO.bankName}</span>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <BankRow label="Chủ tài khoản" value={BANK_INFO.accountHolder} />
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-400">Số tài khoản</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">{BANK_INFO.accountNumber}</p>
                  </div>
                  <CopyButton text={BANK_INFO.accountNumber} />
                </div>
                <BankRow label="Số tiền" value={`${price.toLocaleString("vi-VN")}đ`} bold />
                <BankRow label="Nội dung" value="Thanh toán" />
              </div>

              {/* Order summary */}
              <div className="rounded-xl border border-slate-200 p-3 text-xs text-slate-500 space-y-1">
                <p><span className="font-medium text-slate-700">Thợ:</span> {artist}</p>
                <p><span className="font-medium text-slate-700">Dịch vụ:</span> {concept}</p>
                <p><span className="font-medium text-slate-700">Lịch hẹn:</span> {date} – {time}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
            <button
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function BankRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-0.5 text-sm ${bold ? "font-bold text-brand" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  );
}
