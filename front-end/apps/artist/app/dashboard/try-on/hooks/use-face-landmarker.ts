"use client";

import { useEffect, useRef, useState } from "react";

const WASM_PATH  = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL  = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export type Landmark2D = { x: number; y: number; z: number };

export type DetectSource =
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | ImageBitmap;

type LandmarkerStatus = "idle" | "loading" | "ready" | "error";

export function useFaceLandmarker() {
  const [status, setStatus] = useState<LandmarkerStatus>("idle");
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const landmarkerRef = useRef<any>(null);
  const tsRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    async function init() {
      try {
        const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
        const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          outputFaceBlendshapes: false,
          runningMode: "VIDEO",
          numFaces: 1,
        });
        if (!cancelled) {
          landmarkerRef.current = landmarker;
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  function detect(source: DetectSource): Landmark2D[][] {
    if (!landmarkerRef.current) return [];
    /* VIDEO mode requires monotonically increasing timestamps */
    const ts = Math.max(Date.now(), tsRef.current + 1);
    tsRef.current = ts;
    try {
      const result = landmarkerRef.current.detectForVideo(source, ts);
      return result.faceLandmarks as Landmark2D[][];
    } catch {
      return [];
    }
  }

  return { status, detect };
}
