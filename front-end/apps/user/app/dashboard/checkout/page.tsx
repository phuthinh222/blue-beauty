"use client";

import { Suspense } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useLogout } from "@/hooks/use-logout";
import { useCheckoutParams, useVoucher, useCheckoutNavigation } from "@/hooks/use-checkout";

function CheckoutContent() {
  const onLogout = useLogout();
  const { artist, concept, price, date, time, location, bookedAt, note: initialNote } = useCheckoutParams();
  const { voucher, setVoucher, discount, applyVoucher } = useVoucher(price);
  const { goToConfirm } = useCheckoutNavigation();

  const total = Math.max(0, price - discount);

  function handleConfirm() {
    goToConfirm({ artist, concept, price: String(total), date, time, location });
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader onLogout={onLogout} />

      <div className="mx-auto max-w-xl px-4 py-3 sm:px-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Thanh toán</span>
        </nav>
      </div>

      <main className="mx-auto max-w-xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10">
            <CalendarDays className="size-7 text-brand" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Thanh toán</h1>
          <p className="mt-1 text-sm text-slate-500">Nhập các thông tin bên dưới để tiến hành thanh toán!</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-center text-base font-semibold text-brand">Hóa đơn của bạn</h2>
          </div>

          <div className="divide-y divide-slate-100 px-6">
            <InvoiceRow label="Thợ trang điểm" value={artist} />
            <InvoiceRow label="Địa điểm" value={location} />
            <InvoiceRow label="Ngày đặt lịch" value={bookedAt || new Date().toLocaleString("vi-VN")} />
            <InvoiceRow label="Ngày hẹn" value={`${date} ${time}`} />
            <InvoiceRow label="Concept" value={concept} />
            <InvoiceRow label="Giá tiền" value={`${price.toLocaleString("vi-VN")}đ`} />

            <div className="py-4">
              <p className="mb-2 text-sm text-slate-600">Voucher</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập voucher"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                  onClick={applyVoucher}
                  className="rounded-xl bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/20"
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

            <div className="py-4">
              <p className="mb-2 text-sm text-slate-600">Ghi chú</p>
              <NoteField defaultValue={initialNote} />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <span className="font-semibold text-brand">Tổng hóa đơn</span>
            <span className="text-lg font-bold text-slate-900">{total.toLocaleString("vi-VN")}đ</span>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={handleConfirm}
              className="mt-4 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
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

function NoteField({ defaultValue }: { defaultValue: string }) {
  return (
    <textarea
      rows={2}
      placeholder="Có mặt tại địa điểm sớm hơn 15 phút"
      defaultValue={defaultValue}
      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
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
