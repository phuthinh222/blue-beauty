"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CalendarDays, Clock, MapPin, FileText, CheckCircle2, ChevronLeft } from "lucide-react";

import type { ArtistService } from "./types";

type BookingForm = {
  date: string;
  time: string;
  location: string;
  note: string;
};

export type BookingModalProps = {
  artistName: string;
  services: ArtistService[];
  initialService?: ArtistService;
  timeSlots: readonly string[];
  onClose: () => void;
  onNavigateToCheckout: (params: URLSearchParams) => void;
};

type Step = "info" | "service" | "success";

export function BookingModal({
  artistName,
  services,
  initialService,
  timeSlots,
  onClose,
  onNavigateToCheckout,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>("info");
  const [form, setForm] = useState<BookingForm>({ date: "", time: "", location: "", note: "" });
  const [selectedService, setSelectedService] = useState<ArtistService | null>(initialService ?? null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const today = new Date().toISOString().split("T")[0];
  const infoValid = !!(form.date && form.time && form.location.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "info" && (
          <InfoStep
            artistName={artistName}
            form={form}
            today={today ?? ""}
            timeSlots={timeSlots}
            isValid={infoValid}
            onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
            onNext={() => setStep("service")}
            onClose={onClose}
          />
        )}
        {step === "service" && (
          <ServiceStep
            services={services}
            selected={selectedService}
            form={form}
            onSelect={setSelectedService}
            onBack={() => setStep("info")}
            onConfirm={() => setStep("success")}
            onClose={onClose}
          />
        )}
        {step === "success" && (
          <SuccessStep
            artistName={artistName}
            service={selectedService}
            form={form}
            onClose={onClose}
            onNavigateToCheckout={onNavigateToCheckout}
          />
        )}
      </div>
    </div>
  );
}

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      {[1, 2].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`flex size-6 items-center justify-center rounded-full text-xs font-bold transition ${
              n <= current ? "bg-brand text-white" : "bg-slate-200 text-slate-400"
            }`}
          >
            {n}
          </div>
          {n < 2 && (
            <div className={`h-px w-8 transition ${n < current ? "bg-brand" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

type InfoStepProps = {
  artistName: string;
  form: BookingForm;
  today: string;
  timeSlots: readonly string[];
  isValid: boolean;
  onChange: (field: keyof BookingForm, value: string) => void;
  onNext: () => void;
  onClose: () => void;
};

function InfoStep({ artistName, form, today, timeSlots, isValid, onChange, onNext, onClose }: InfoStepProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Đặt lịch</h2>
          <p className="text-xs text-slate-500">{artistName}</p>
        </div>
        <div className="flex items-center gap-3">
          <StepIndicator current={1} />
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 px-6 py-5">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <CalendarDays className="size-3.5 text-brand" />
            Ngày đặt lịch <span className="text-red-400">*</span>
          </label>
          <input
            type="date" min={today} value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Clock className="size-3.5 text-brand" />
            Giờ bắt đầu <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button key={slot} type="button" onClick={() => onChange("time", slot)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  form.time === slot
                    ? "border-brand bg-brand text-white"
                    : "border-slate-200 text-slate-600 hover:border-brand hover:text-brand"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <MapPin className="size-3.5 text-brand" />
            Địa điểm <span className="text-red-400">*</span>
          </label>
          <input
            type="text" placeholder="Nhập địa chỉ cụ thể..." value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <FileText className="size-3.5 text-brand" />
            Ghi chú cho thợ
          </label>
          <textarea
            placeholder="Ví dụ: phong cách tự nhiên, nhẹ nhàng..." value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <button
          onClick={onNext} disabled={!isValid}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Tiếp theo →
        </button>
      </div>
    </>
  );
}

type ServiceStepProps = {
  services: ArtistService[];
  selected: ArtistService | null;
  form: BookingForm;
  onSelect: (s: ArtistService) => void;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

function ServiceStep({ services, selected, form, onSelect, onBack, onConfirm, onClose }: ServiceStepProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800">
          <ChevronLeft className="size-4" /> Quay lại
        </button>
        <div className="flex items-center gap-3">
          <StepIndicator current={2} />
          <button onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100">
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="mb-4 text-sm font-semibold text-slate-700">Chọn concept dịch vụ</p>
        <div className="mb-4 flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <span>📅 {form.date}</span>
          <span>🕐 {form.time}</span>
          <span className="truncate">📍 {form.location}</span>
        </div>

        <div className="max-h-[26rem] space-y-2 overflow-y-auto pr-1">
          {services.map((svc) => {
            const isSelected = selected?.id === svc.id;
            return (
              <button key={svc.id} onClick={() => onSelect(svc)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  isSelected ? "border-brand bg-brand/5 ring-1 ring-brand" : "border-slate-200 hover:border-brand/50 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{svc.concept}</p>
                    <p className="text-xs text-slate-400">{svc.duration}</p>
                  </div>
                  <p className="shrink-0 text-base font-bold text-brand">{svc.price.toLocaleString("vi-VN")}₫</p>
                </div>
                <ul className="mt-2 space-y-0.5">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="size-1 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                {isSelected && (
                  <div className="mt-3 rounded-lg border border-brand/20 bg-white p-3">
                    <p className="mb-2 text-xs font-semibold text-slate-500">Mô tả dịch vụ</p>
                    <ul className="space-y-1.5">
                      {svc.description.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-xs text-slate-600">
                          <svg className="mt-0.5 size-3.5 shrink-0 text-brand" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button onClick={onConfirm} disabled={!selected}
          className="mt-4 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Xác nhận đặt lịch
        </button>
      </div>
    </>
  );
}

type SuccessStepProps = {
  artistName: string;
  service: ArtistService | null;
  form: BookingForm;
  onClose: () => void;
  onNavigateToCheckout: (params: URLSearchParams) => void;
};

function SuccessStep({ artistName, service, form, onClose, onNavigateToCheckout }: SuccessStepProps) {
  function goToCheckout() {
    if (!service) return;
    const params = new URLSearchParams({
      artist: artistName,
      concept: service.concept,
      price: String(service.price),
      date: form.date,
      time: form.time,
      location: form.location,
      note: form.note,
      bookedAt: new Date().toLocaleString("vi-VN"),
    });
    onClose();
    onNavigateToCheckout(params);
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <CheckCircle2 className="size-16 text-green-500" />
      <h2 className="mt-4 text-lg font-bold text-slate-900">Đặt lịch thành công!</h2>
      <p className="mt-2 text-sm text-slate-500">
        Yêu cầu đã gửi đến <span className="font-semibold text-slate-700">{artistName}</span>. Thợ sẽ liên hệ xác nhận sớm nhất.
      </p>

      {service && (
        <div className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Chi tiết lịch hẹn</p>
          <div className="mt-2 space-y-1.5 text-sm text-slate-700">
            <p><span className="text-slate-400">Dịch vụ:</span> {service.concept}</p>
            <p><span className="text-slate-400">Giá:</span> <span className="font-semibold text-brand">{service.price.toLocaleString("vi-VN")}₫</span></p>
            <p><span className="text-slate-400">Ngày:</span> {form.date} – {form.time}</p>
            <p><span className="text-slate-400">Địa điểm:</span> {form.location}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex w-full gap-3">
        <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
          Đóng
        </button>
        {service && (
          <button onClick={goToCheckout} className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
            Tiến hành thanh toán
          </button>
        )}
      </div>
    </div>
  );
}
