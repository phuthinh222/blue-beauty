"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Upload, RotateCcw, CameraOff, FlipHorizontal } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { useAuth } from "@/hooks/use-auth";

/* ─── Colour palette ─────────────────────────────────────────── */
const COLORS = [
  { hex: "#F72585", label: "Hồng" },
  { hex: "#C4687A", label: "Hồng đất" },
  { hex: "#E0176C", label: "Fuchsia" },
  { hex: "#7B2D8B", label: "Tím" },
  { hex: "#8B0000", label: "Đỏ thẫm" },
];

/* ─── Helpers ────────────────────────────────────────────────── */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function applyLipColor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hex: string,
) {
  const { r, g, b } = hexToRgb(hex);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.55;

  /* Upper lip */
  const cx = w / 2;
  const cy = h * 0.725;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.155, h * 0.038, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fill();

  /* Lower lip — slightly larger */
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.038, w * 0.165, h * 0.045, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/* ─── TryOnCanvas ────────────────────────────────────────────── */
type CanvasProps = {
  mode: "photo" | "camera";
  imageSrc?: string | null;
  selectedColor: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cameraReady: boolean;
  mirrored: boolean;
};

function TryOnCanvas({
  mode,
  imageSrc,
  selectedColor,
  videoRef,
  canvasRef,
  cameraReady,
  mirrored,
}: CanvasProps) {
  /* Redraw photo whenever color or src changes */
  useEffect(() => {
    if (mode !== "photo" || !imageSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      const W = img.naturalWidth;
      const H = img.naturalHeight;
      canvas.width = W;
      canvas.height = H;

      /* Left half — original */
      ctx.drawImage(img, 0, 0);

      /* Right half — with lip colour */
      ctx.save();
      ctx.beginPath();
      ctx.rect(W / 2, 0, W / 2, H);
      ctx.clip();
      ctx.drawImage(img, 0, 0);
      applyLipColor(ctx, W, H, selectedColor);
      ctx.restore();

      /* Divider */
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = Math.max(2, W * 0.003);
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();

      /* Labels */
      const fs = Math.max(12, W * 0.028);
      ctx.font = `600 ${fs}px sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("Trước", W * 0.05, H * 0.05);
      ctx.fillText("Sau", W * 0.55, H * 0.05);
    };
    img.src = imageSrc;
  }, [mode, imageSrc, selectedColor, canvasRef]);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-black">
      {/* Camera video (hidden — canvas is the display) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 hidden h-full w-full object-cover"
      />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-contain ${mirrored && mode === "camera" ? "scale-x-[-1]" : ""}`}
      />

      {mode === "camera" && !cameraReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black text-slate-400">
          <CameraOff className="size-10 opacity-40" />
          <p className="text-sm">Đang kết nối camera…</p>
        </div>
      )}

      {mode === "photo" && !imageSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm text-slate-400">
          Chọn ảnh để bắt đầu
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
type Mode = "demo" | "photo" | "camera";

export default function TryOnPage() {
  const { isLoggedIn, user, onLogout } = useAuth();

  const [selectedColor, setSelectedColor] = useState(COLORS[4].hex);
  const [mode, setMode]                   = useState<Mode>("demo");
  const [photoSrc, setPhotoSrc]           = useState<string | null>(null);
  const [cameraReady, setCameraReady]     = useState(false);
  const [cameraError, setCameraError]     = useState(false);
  const [mirrored, setMirrored]           = useState(true);

  const fileRef     = useRef<HTMLInputElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const streamRef   = useRef<MediaStream | null>(null);
  const rafRef      = useRef<number>(0);

  /* ── Camera draw loop ───────────────────────── */
  const drawCameraFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(drawCameraFrame);
      return;
    }

    const W = video.videoWidth;
    const H = video.videoHeight;
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, W, H);
    applyLipColor(ctx, W, H, selectedColor);

    rafRef.current = requestAnimationFrame(drawCameraFrame);
  }, [selectedColor]);

  /* ── Start camera ───────────────────────────── */
  const startCamera = useCallback(async () => {
    setCameraError(false);
    setCameraReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          setCameraReady(true);
          rafRef.current = requestAnimationFrame(drawCameraFrame);
        };
      }
    } catch {
      setCameraError(true);
    }
  }, [drawCameraFrame]);

  /* ── Stop camera ────────────────────────────── */
  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  useEffect(() => {
    if (mode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  /* Redraw when color changes in camera mode */
  useEffect(() => {
    if (mode === "camera" && cameraReady) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(drawCameraFrame);
    }
  }, [selectedColor, mode, cameraReady, drawCameraFrame]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoSrc(URL.createObjectURL(file));
    setMode("photo");
  }

  function handleReset() {
    stopCamera();
    setMode("demo");
    setPhotoSrc(null);
    setCameraError(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-dvh bg-slate-50 pb-16 md:pb-0">
      <SiteHeader onLogout={isLoggedIn ? onLogout : undefined} user={user} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Try on makeup</span>
        </nav>
      </div>

      <section className="mx-auto max-w-lg px-4 pb-14 sm:px-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-brand">Try on makeup</h1>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-gradient-to-r from-brand to-pink-500" />
        </div>

        {/* Display area */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {mode === "demo" ? (
            <div className="relative aspect-square w-full overflow-hidden bg-pink-50">
              <Image
                src="/images/makeup2.jpg"
                alt="Demo try on makeup"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay split effect on demo */}
              <div className="pointer-events-none absolute inset-0 flex">
                <div className="flex-1" />
                <div
                  className="flex-1"
                  style={{
                    background: `linear-gradient(${selectedColor}44, ${selectedColor}66)`,
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              {/* Divider */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/80" />
              <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">Trước</span>
              <span className="absolute left-1/2 top-3 ml-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">Sau</span>
            </div>
          ) : (
            <TryOnCanvas
              mode={mode === "camera" ? "camera" : "photo"}
              imageSrc={photoSrc}
              selectedColor={selectedColor}
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraReady={cameraReady}
              mirrored={mirrored}
            />
          )}
        </div>

        {/* Camera error */}
        {cameraError && (
          <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-center text-xs text-red-600 border border-red-100">
            Không thể truy cập camera. Vui lòng cấp quyền và thử lại.
          </p>
        )}

        {/* Colour swatches */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              title={c.label}
              className={`size-11 rounded-xl shadow-sm transition hover:scale-110 focus:outline-none ${
                selectedColor === c.hex
                  ? "scale-110 ring-2 ring-slate-700 ring-offset-2"
                  : ""
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        {/* Virtual try-on panel */}
        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-[#E0176C]">
          <div className="bg-[#E0176C] py-2 text-center">
            <p className="text-xs font-bold tracking-widest text-white">VIRTUAL TRY-ON</p>
          </div>

          <div className="space-y-2.5 bg-[#E0176C] px-4 pb-4">
            {/* Selfie mode */}
            <button
              onClick={() => setMode(mode === "camera" ? "demo" : "camera")}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
                mode === "camera"
                  ? "bg-slate-700 text-white hover:bg-slate-800"
                  : "bg-black text-white hover:bg-slate-900"
              }`}
            >
              <Camera className="size-4" />
              {mode === "camera" ? "Dừng camera" : "Selfie Mode"}
            </button>

            {/* Upload photo */}
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              <Upload className="size-4" />
              Upload Photo
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Mirror toggle — camera only */}
            {mode === "camera" && (
              <button
                onClick={() => setMirrored((v) => !v)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 py-2.5 text-xs font-medium text-white transition hover:bg-[#c91d5a]"
              >
                <FlipHorizontal className="size-3.5" />
                {mirrored ? "Tắt gương" : "Bật gương"}
              </button>
            )}

            {/* Reset */}
            {mode !== "demo" && (
              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 py-2.5 text-xs font-medium text-white transition hover:bg-[#c91d5a]"
              >
                <RotateCcw className="size-3.5" />
                Đặt lại
              </button>
            )}
          </div>
        </div>

        {/* Hint */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Chọn màu son → Upload ảnh hoặc bật Selfie Mode để xem thử
        </p>
      </section>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
