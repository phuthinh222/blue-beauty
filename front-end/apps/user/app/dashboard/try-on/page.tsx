"use client";

import {
  useState, useRef, useEffect, useCallback, useReducer,
} from "react";
import Link from "next/link";
import {
  Camera, Upload, RotateCcw, Sparkles, Eye, Smile, Brush,
  CameraOff, FlipHorizontal, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";

import { SiteHeader }     from "@/components/layout/site-header";
import { SiteFooter }     from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/shared/floating-actions";
import { useAuth }        from "@/hooks/use-auth";

import { useFaceLandmarker }   from "./hooks/use-face-landmarker";
import { useMakeupState }      from "./hooks/use-makeup-state";
import { drawLips, drawBlush, drawEyeshadow } from "./lib/makeup-renderer";
import { SKIN_SAMPLE_INDICES }  from "./lib/face-landmarks";
import {
  classifySkinTone, getPalette, sampleLandmarkPixels,
  type SkinTone, type SkinPalette,
} from "./lib/skin-analyzer";

/* ─── Constants ──────────────────────────────────────────────── */
const TAB_META = [
  { id: "lips"  as const, label: "Son môi", icon: Smile  },
  { id: "blush" as const, label: "Má hồng", icon: Brush  },
  { id: "eyes"  as const, label: "Mắt",     icon: Eye    },
];

const SKIN_LABELS: Record<SkinTone, string> = {
  fair: "Da sáng", light: "Da trắng ấm", medium: "Da bánh mật",
  tan: "Da nâu ấm", deep: "Da sẫm",
};

/* ─── Canvas drawing ─────────────────────────────────────────── */
function renderMakeup(
  canvas: HTMLCanvasElement,
  source: HTMLImageElement | HTMLVideoElement,
  landmarks: { x: number; y: number }[],
  makeup: ReturnType<typeof useMakeupState>["state"],
) {
  const W = "naturalWidth" in source ? source.naturalWidth  : source.videoWidth;
  const H = "naturalHeight" in source ? source.naturalHeight : source.videoHeight;
  if (!W || !H) return;

  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(source, 0, 0, W, H);

  if (makeup.lips.enabled)
    drawLips(ctx, landmarks, W, H, makeup.lips.color, makeup.lips.opacity);
  if (makeup.blush.enabled)
    drawBlush(ctx, landmarks, W, H, makeup.blush.color, makeup.blush.opacity, makeup.blush.size);
  if (makeup.eyeshadow.enabled)
    drawEyeshadow(ctx, landmarks, W, H, makeup.eyeshadow.color, makeup.eyeshadow.opacity);
}

/* ─── Swatch component ───────────────────────────────────────── */
function Swatch({ hex, active, onClick }: { hex: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={hex}
      className={`size-9 rounded-xl shadow-sm transition hover:scale-110 focus:outline-none ${
        active ? "scale-110 ring-2 ring-offset-2 ring-slate-700" : ""
      }`}
      style={{ backgroundColor: hex }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function TryOnPage() {
  const { isLoggedIn, user, onLogout } = useAuth();
  const { status: mpStatus, detect }  = useFaceLandmarker();
  const { state: makeup, dispatch }    = useMakeupState();

  /* Media state */
  const [mode, setMode]             = useState<"idle" | "photo" | "camera">("idle");
  const [photoSrc, setPhotoSrc]     = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [mirrored, setMirrored]     = useState(true);

  /* Landmark & skin state */
  const [landmarks, setLandmarks]       = useState<{ x: number; y: number }[]>([]);
  const [detecting, setDetecting]       = useState(false);
  const [faceFound, setFaceFound]       = useState<boolean | null>(null);
  const [skinTone, setSkinTone]         = useState<SkinTone | null>(null);
  const [palette, setPalette]           = useState<SkinPalette | null>(null);
  const [analyzing, setAnalyzing]       = useState(false);

  /* Refs */
  const fileRef    = useRef<HTMLInputElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const streamRef  = useRef<MediaStream | null>(null);
  const rafRef     = useRef<number>(0);
  const lmRef      = useRef<{ x: number; y: number }[]>([]);
  const makeupRef  = useRef(makeup);
  const mirrorRef  = useRef(mirrored);

  useEffect(() => { makeupRef.current = makeup; }, [makeup]);
  useEffect(() => { mirrorRef.current = mirrored; }, [mirrored]);

  /* ── Redraw photo whenever makeup or landmarks change ─────── */
  useEffect(() => {
    if (mode !== "photo" || !photoSrc || !landmarks.length) return;
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img || !img.complete) return;
    renderMakeup(canvas, img, landmarks, makeup);
  }, [mode, photoSrc, landmarks, makeup]);

  /* ── Camera RAF loop ─────────────────────────────────────── */
  const cameraLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(cameraLoop);
      return;
    }
    const W = video.videoWidth, H = video.videoHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (mirrorRef.current) {
      ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, W, H);
      ctx.restore();
    } else {
      ctx.drawImage(video, 0, 0, W, H);
    }

    const lm = lmRef.current;
    const mk = makeupRef.current;
    if (lm.length) {
      if (mk.lips.enabled)      drawLips(ctx, lm, W, H, mk.lips.color, mk.lips.opacity);
      if (mk.blush.enabled)     drawBlush(ctx, lm, W, H, mk.blush.color, mk.blush.opacity, mk.blush.size);
      if (mk.eyeshadow.enabled) drawEyeshadow(ctx, lm, W, H, mk.eyeshadow.color, mk.eyeshadow.opacity);
    }
    rafRef.current = requestAnimationFrame(cameraLoop);
  }, []);

  /* ── Start / stop camera ─────────────────────────────────── */
  const startCamera = useCallback(async () => {
    setCameraError(false); setCameraReady(false); setFaceFound(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      const vid = videoRef.current;
      if (vid) {
        vid.srcObject = stream;
        vid.oncanplay = () => {
          void vid.play();
          setCameraReady(true);
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(cameraLoop);
        };
      }
    } catch { setCameraError(true); }
  }, [cameraLoop]);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  useEffect(() => {
    if (mode === "camera") startCamera(); else stopCamera();
    return stopCamera;
  }, [mode, startCamera, stopCamera]);

  /* ── Detect face ─────────────────────────────────────────── */
  async function handleDetect() {
    if (mpStatus !== "ready") return;
    const source = mode === "camera" ? videoRef.current : imgRef.current;
    if (!source) return;
    setDetecting(true); setFaceFound(null);
    await new Promise(r => setTimeout(r, 50)); // let UI update

    const result = detect(source as HTMLImageElement | HTMLVideoElement);
    if (result.length) {
      const lm = result[0];
      setLandmarks(lm);
      lmRef.current = lm;
      setFaceFound(true);
      /* Redraw photo immediately */
      if (mode === "photo") {
        const canvas = canvasRef.current;
        const img    = imgRef.current;
        if (canvas && img) renderMakeup(canvas, img, lm, makeup);
      }
    } else {
      setFaceFound(false);
    }
    setDetecting(false);
  }

  /* ── Analyze skin tone ───────────────────────────────────── */
  async function handleAnalyze() {
    if (!landmarks.length) return;
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 300)); // simulate processing

    const canvas = canvasRef.current;
    if (!canvas) { setAnalyzing(false); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { setAnalyzing(false); return; }

    const pixels = sampleLandmarkPixels(ctx, landmarks, SKIN_SAMPLE_INDICES, canvas.width, canvas.height);
    const tone   = classifySkinTone(pixels);
    const pal    = getPalette(tone);
    setSkinTone(tone);
    setPalette(pal);
    dispatch({ type: "APPLY_PALETTE", palette: pal });
    setAnalyzing(false);
  }

  /* ── Upload photo ────────────────────────────────────────── */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoSrc(url);
    setMode("photo");
    setLandmarks([]);
    lmRef.current = [];
    setFaceFound(null);
    setSkinTone(null);
    setPalette(null);
  }

  function handleReset() {
    stopCamera();
    setMode("idle");
    setPhotoSrc(null);
    setLandmarks([]); lmRef.current = [];
    setFaceFound(null); setSkinTone(null); setPalette(null);
    setCameraError(false);
    dispatch({ type: "RESET" });
    if (fileRef.current) fileRef.current.value = "";
  }

  /* ── Active layer helpers ────────────────────────────────── */
  const activeKey = makeup.activeTab === "eyes" ? "eyeshadow" : makeup.activeTab;
  const activeLayer = makeup[activeKey] as { enabled: boolean; color: string; opacity: number };
  const paletteSwatches = palette
    ? makeup.activeTab === "lips"  ? palette.lips
    : makeup.activeTab === "blush" ? palette.blush
    : palette.eyeshadow
    : null;

  /* ── Status badge ────────────────────────────────────────── */
  const mpLabel =
    mpStatus === "loading" ? "Đang tải mô hình AI…"
    : mpStatus === "error"  ? "Không thể tải mô hình"
    : "Mô hình sẵn sàng";

  return (
    <div className="min-h-dvh bg-slate-50 pb-16 md:pb-0">
      <SiteHeader onLogout={isLoggedIn ? onLogout : undefined} user={user} />

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Try on makeup</span>
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-brand">Try on makeup</h1>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-linear-to-r from-brand to-pink-500" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── Left: canvas + actions ──────────────────────── */}
          <div className="space-y-4">
            {/* Canvas display */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm" style={{ minHeight: 320 }}>
              {/* Hidden source image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={photoSrc ?? undefined} alt="" className="hidden"
                onLoad={() => {
                  const c = canvasRef.current, img = imgRef.current;
                  if (!c || !img) return;
                  const ctx = c.getContext("2d");
                  if (!ctx) return;
                  c.width = img.naturalWidth; c.height = img.naturalHeight;
                  ctx.drawImage(img, 0, 0);
                }} />

              {/* Hidden video */}
              <video ref={videoRef} autoPlay playsInline muted
                className="pointer-events-none absolute opacity-0" style={{ width: 1, height: 1 }} />

              {/* Main canvas */}
              <canvas ref={canvasRef} className="h-full w-full object-contain" />

              {/* Idle placeholder */}
              {mode === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/80 text-white">
                  <Camera className="size-12 opacity-40" />
                  <p className="text-sm text-slate-300">Upload ảnh hoặc bật Selfie Mode để bắt đầu</p>
                </div>
              )}

              {/* Camera connecting */}
              {mode === "camera" && !cameraReady && !cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black text-slate-400">
                  <Loader2 className="size-8 animate-spin" />
                  <p className="text-sm">Đang kết nối camera…</p>
                </div>
              )}

              {/* Camera error */}
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black">
                  <CameraOff className="size-10 text-red-400" />
                  <p className="text-sm text-red-400">Không thể truy cập camera</p>
                </div>
              )}

              {/* Face detection badge */}
              {faceFound !== null && (
                <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
                  faceFound ? "bg-emerald-500/80 text-white" : "bg-red-500/80 text-white"
                }`}>
                  {faceFound ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                  {faceFound ? "Phát hiện khuôn mặt" : "Không tìm thấy mặt"}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark">
                <Upload className="size-4" />
                Upload ảnh
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>

              <button
                onClick={() => setMode(mode === "camera" ? "idle" : "camera")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "camera"
                    ? "bg-slate-700 text-white hover:bg-slate-800"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Camera className="size-4" />
                {mode === "camera" ? "Dừng camera" : "Selfie Mode"}
              </button>

              {mode === "camera" && (
                <button
                  onClick={() => setMirrored(v => !v)}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <FlipHorizontal className="size-4" />
                  {mirrored ? "Tắt gương" : "Bật gương"}
                </button>
              )}

              <button
                onClick={handleDetect}
                disabled={mode === "idle" || mpStatus !== "ready" || detecting}
                className="flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:opacity-40"
              >
                {detecting ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Nhận diện mặt
              </button>

              {mode !== "idle" && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw className="size-4" />
                  Đặt lại
                </button>
              )}
            </div>

            {/* MediaPipe status */}
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
              mpStatus === "loading" ? "bg-yellow-50 text-yellow-700"
              : mpStatus === "error" ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-700"
            }`}>
              {mpStatus === "loading"
                ? <Loader2 className="size-3.5 animate-spin" />
                : mpStatus === "error"
                ? <AlertCircle className="size-3.5" />
                : <CheckCircle2 className="size-3.5" />}
              {mpLabel}
            </div>
          </div>

          {/* ── Right: controls ─────────────────────────────── */}
          <div className="space-y-4">

            {/* Makeup layer tabs */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex border-b border-slate-100">
                {TAB_META.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => dispatch({ type: "SET_TAB", tab: id })}
                    className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                      makeup.activeTab === id
                        ? "border-b-2 border-brand text-brand"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Icon className="size-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-4 p-4">
                {/* Enable toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Bật / Tắt</span>
                  <button
                    onClick={() => dispatch({ type: "TOGGLE", layer: makeup.activeTab })}
                    className={`relative h-6 w-11 rounded-full transition ${
                      activeLayer.enabled ? "bg-brand" : "bg-slate-200"
                    }`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      activeLayer.enabled ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>

                {/* Palette swatches (from AI recommendation) */}
                {paletteSwatches && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-slate-500">Màu gợi ý</p>
                    <div className="flex gap-2">
                      {paletteSwatches.map(s => (
                        <Swatch
                          key={s.hex} hex={s.hex}
                          active={activeLayer.color === s.hex}
                          onClick={() => dispatch({ type: "SET_COLOR", layer: makeup.activeTab, color: s.hex })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom color picker */}
                <div>
                  <p className="mb-2 text-xs font-medium text-slate-500">Chọn màu thủ công</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={activeLayer.color}
                      onChange={e => dispatch({ type: "SET_COLOR", layer: makeup.activeTab, color: e.target.value })}
                      className="h-10 w-10 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                    />
                    <span className="font-mono text-sm text-slate-600">{activeLayer.color.toUpperCase()}</span>
                  </div>
                </div>

                {/* Opacity slider */}
                <div>
                  <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
                    <span>Độ đậm</span>
                    <span>{Math.round(activeLayer.opacity * 100)}%</span>
                  </div>
                  <input
                    type="range" min={0.1} max={1} step={0.05}
                    value={activeLayer.opacity}
                    onChange={e => dispatch({
                      type: "SET_OPACITY", layer: makeup.activeTab, opacity: parseFloat(e.target.value),
                    })}
                    className="h-1.5 w-full cursor-pointer accent-brand"
                  />
                </div>

                {/* Blush size */}
                {makeup.activeTab === "blush" && (
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
                      <span>Kích thước</span>
                      <span>{Math.round(makeup.blush.size * 100)}%</span>
                    </div>
                    <input
                      type="range" min={0.5} max={1.8} step={0.1}
                      value={makeup.blush.size}
                      onChange={e => dispatch({ type: "SET_SIZE", size: parseFloat(e.target.value) })}
                      className="h-1.5 w-full cursor-pointer accent-brand"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Skin tone analysis */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-800">Phân tích tông da</h3>
              </div>
              <div className="p-4">
                {skinTone ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-4 w-4 rounded-full ring-2 ring-white shadow ${
                        skinTone === "fair"   ? "bg-[#F5DEB3]"
                        : skinTone === "light"  ? "bg-[#D2B48C]"
                        : skinTone === "medium" ? "bg-[#C4A27B]"
                        : skinTone === "tan"    ? "bg-[#8B6347]"
                        : "bg-[#4A2E1A]"
                      }`} />
                      <span className="text-sm font-semibold text-slate-800">{SKIN_LABELS[skinTone]}</span>
                    </div>
                    <p className="text-xs text-slate-500">{palette?.description}</p>
                    <p className="text-[10px] text-emerald-600">✓ Đã áp dụng màu gợi ý phù hợp</p>
                  </div>
                ) : (
                  <p className="mb-3 text-xs text-slate-500">
                    Nhận diện mặt xong, nhấn nút để AI phân tích tông da và gợi ý màu phù hợp.
                  </p>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={!landmarks.length || analyzing}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-pink-600 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
                >
                  {analyzing
                    ? <><Loader2 className="size-4 animate-spin" />Đang phân tích…</>
                    : <><Sparkles className="size-4" />Phân tích & gợi ý màu</>}
                </button>
              </div>
            </div>

            {/* Palette preview */}
            {palette && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-800">Bảng màu gợi ý</h3>
                </div>
                <div className="space-y-3 p-4">
                  {[
                    { label: "Son môi", swatches: palette.lips },
                    { label: "Má hồng", swatches: palette.blush },
                    { label: "Mắt",     swatches: palette.eyeshadow },
                  ].map(({ label, swatches }) => (
                    <div key={label}>
                      <p className="mb-1.5 text-xs font-medium text-slate-500">{label}</p>
                      <div className="flex gap-2">
                        {swatches.map(s => (
                          <div key={s.hex} className="flex flex-col items-center gap-1">
                            <div className="size-8 rounded-lg shadow-sm" style={{ backgroundColor: s.hex }} />
                            <span className="text-[9px] text-slate-400">{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
