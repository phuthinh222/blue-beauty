"use client";

import Image from "next/image";
import * as React from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@repo/ui/button";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

type ImageLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [zoom, setZoom] = React.useState(1);
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      role="presentation"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-[101] cursor-pointer rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25"
        aria-label="Đóng xem ảnh"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="size-6" />
      </button>
      <div
        className="flex h-[95dvh] w-full max-w-[min(95vw,1600px)] flex-col gap-4"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-0 flex-1 w-full overflow-auto rounded-lg">
          <div
            className="relative mx-auto h-full min-h-[50dvh] w-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="flex shrink-0 justify-center gap-3 pb-1">
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer gap-2 bg-white/90 text-slate-900 shadow-sm hover:bg-white"
            disabled={zoom >= ZOOM_MAX}
            onClick={() =>
              setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))
            }
          >
            <ZoomIn className="size-4" />
            Phóng to
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer gap-2 bg-white/90 text-slate-900 shadow-sm hover:bg-white"
            disabled={zoom <= ZOOM_MIN}
            onClick={() =>
              setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))
            }
          >
            <ZoomOut className="size-4" />
            Thu nhỏ
          </Button>
        </div>
      </div>
    </div>
  );
}
