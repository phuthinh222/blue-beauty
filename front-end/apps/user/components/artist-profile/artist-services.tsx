"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ArtistService } from "./types";

type ServiceCardProps = {
  service: ArtistService;
  onBook: (service: ArtistService) => void;
};

function ServiceCard({ service, onBook }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">{service.concept}</p>
          <p className="mt-0.5 text-xs text-slate-400">{service.duration}</p>
          <ul className="mt-2 space-y-1">
            {service.includes.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="size-1 shrink-0 rounded-full bg-[#257CBA]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-[#257CBA]">
            {service.price.toLocaleString("vi-VN")}₫
          </p>
          <button
            onClick={() => onBook(service)}
            className="mt-2 rounded-lg bg-[#257CBA] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1e6aa0]"
          >
            Đặt ngay
          </button>
        </div>
      </div>

      {/* Toggle mô tả */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between border-t border-slate-100 px-4 py-2.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
      >
        <span>{expanded ? "Ẩn mô tả" : "Xem mô tả chi tiết"}</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Mô tả mở rộng */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
          <ul className="space-y-2">
            {service.description.map((line) => (
              <li key={line} className="flex items-start gap-2 text-xs text-slate-600">
                <svg
                  className="mt-0.5 size-3.5 shrink-0 text-[#257CBA]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type ArtistServicesProps = {
  services: ArtistService[];
  onBook: (service: ArtistService) => void;
};

export function ArtistServices({ services, onBook }: ArtistServicesProps) {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-slate-900">Dịch vụ &amp; Bảng giá</h3>
      <div className="space-y-3">
        {services.map((svc) => (
          <ServiceCard key={svc.id} service={svc} onBook={onBook} />
        ))}
      </div>
    </div>
  );
}
