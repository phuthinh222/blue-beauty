export type SkinTone = "fair" | "light" | "medium" | "tan" | "deep";

export interface SwatchGroup {
  lips:      { hex: string; name: string }[];
  blush:     { hex: string; name: string }[];
  eyeshadow: { hex: string; name: string }[];
}

export interface SkinPalette extends SwatchGroup {
  tone:        SkinTone;
  label:       string;
  description: string;
}

const PALETTES: Record<SkinTone, SkinPalette> = {
  fair: {
    tone: "fair", label: "Da sáng", description: "Tông da sáng hồng, hợp với màu nhẹ nhàng",
    lips:      [{ hex: "#F4A7B9", name: "Hồng nhạt" }, { hex: "#E8998D", name: "Đào nhạt" }, { hex: "#D4788A", name: "Hồng phấn" }],
    blush:     [{ hex: "#FFB3BA", name: "Hồng pastel" }, { hex: "#FFCBA4", name: "Đào nhẹ" }],
    eyeshadow: [{ hex: "#D4A0A0", name: "Nude hồng" }, { hex: "#B8B8D0", name: "Lavender" }],
  },
  light: {
    tone: "light", label: "Da trắng ấm", description: "Tông da sáng ấm, hợp với màu tự nhiên",
    lips:      [{ hex: "#E07B7B", name: "Hồng đất" }, { hex: "#C4687A", name: "Mauve" }, { hex: "#D4607A", name: "Berry nhẹ" }],
    blush:     [{ hex: "#FFB5A7", name: "San hô nhạt" }, { hex: "#F4978E", name: "Hồng đào" }],
    eyeshadow: [{ hex: "#C49A8A", name: "Nude nâu" }, { hex: "#A0808D", name: "Hồng khói" }],
  },
  medium: {
    tone: "medium", label: "Da bánh mật", description: "Tông da trung tính ấm, hợp với màu đậm hơn",
    lips:      [{ hex: "#C4457A", name: "Berry đậm" }, { hex: "#B5451B", name: "Đỏ gạch" }, { hex: "#9B4E7A", name: "Mận" }],
    blush:     [{ hex: "#E8855A", name: "San hô ấm" }, { hex: "#D4706E", name: "Cánh sen" }],
    eyeshadow: [{ hex: "#8B6355", name: "Nâu đất" }, { hex: "#6B7EA8", name: "Xanh khói" }],
  },
  tan: {
    tone: "tan", label: "Da nâu ấm", description: "Tông da nâu ấm, hợp với màu đất và đậm",
    lips:      [{ hex: "#8B2252", name: "Mận đậm" }, { hex: "#A0341E", name: "Gạch đỏ" }, { hex: "#7A3048", name: "Rượu vang" }],
    blush:     [{ hex: "#B5622A", name: "Cam đất" }, { hex: "#A0503A", name: "Terracotta" }],
    eyeshadow: [{ hex: "#6B4423", name: "Chocolate" }, { hex: "#4A5A7A", name: "Hải quân" }],
  },
  deep: {
    tone: "deep", label: "Da sẫm", description: "Tông da sẫm, hợp với màu rực rỡ và bold",
    lips:      [{ hex: "#5C1E3C", name: "Burgundy" }, { hex: "#8B0000", name: "Đỏ thẫm" }, { hex: "#4A1642", name: "Tím thẫm" }],
    blush:     [{ hex: "#8B3A2A", name: "Nâu đỏ" }, { hex: "#7A4A6A", name: "Berry ấm" }],
    eyeshadow: [{ hex: "#3D2B1F", name: "Nâu thẫm" }, { hex: "#1A3A5C", name: "Xanh thẫm" }],
  },
};

export function classifySkinTone(pixels: { r: number; g: number; b: number }[]): SkinTone {
  if (!pixels.length) return "medium";
  const avg = pixels.reduce(
    (a, p) => ({ r: a.r + p.r / pixels.length, g: a.g + p.g / pixels.length, b: a.b + p.b / pixels.length }),
    { r: 0, g: 0, b: 0 },
  );
  const r = avg.r / 255, g = avg.g / 255, b = avg.b / 255;
  const l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  if (l > 0.75) return "fair";
  if (l > 0.63) return "light";
  if (l > 0.48) return "medium";
  if (l > 0.35) return "tan";
  return "deep";
}

export function getPalette(tone: SkinTone): SkinPalette {
  return PALETTES[tone];
}

export function sampleLandmarkPixels(
  ctx: CanvasRenderingContext2D,
  landmarks: { x: number; y: number }[],
  indices: number[],
  W: number,
  H: number,
  radius = 6,
): { r: number; g: number; b: number }[] {
  const out: { r: number; g: number; b: number }[] = [];
  for (const i of indices) {
    if (i >= landmarks.length) continue;
    const px = Math.round(landmarks[i].x * W);
    const py = Math.round(landmarks[i].y * H);
    try {
      const d = ctx.getImageData(Math.max(0, px - radius), Math.max(0, py - radius), radius * 2, radius * 2).data;
      for (let j = 0; j < d.length; j += 4) out.push({ r: d[j], g: d[j + 1], b: d[j + 2] });
    } catch { /* out of bounds */ }
  }
  return out;
}
