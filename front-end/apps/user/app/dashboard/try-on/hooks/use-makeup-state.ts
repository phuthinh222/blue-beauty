"use client";

import { useReducer } from "react";
import type { SkinPalette } from "../lib/skin-analyzer";

export type MakeupTab = "lips" | "blush" | "eyes";

export interface LayerState {
  enabled: boolean;
  color:   string;
  opacity: number;
}

export interface MakeupState {
  lips:      LayerState & { size?: number };
  blush:     LayerState & { size: number };
  eyeshadow: LayerState;
  activeTab: MakeupTab;
}

type Action =
  | { type: "SET_TAB";     tab: MakeupTab }
  | { type: "TOGGLE";      layer: MakeupTab }
  | { type: "SET_COLOR";   layer: MakeupTab; color: string }
  | { type: "SET_OPACITY"; layer: MakeupTab; opacity: number }
  | { type: "SET_SIZE";    size: number }
  | { type: "APPLY_PALETTE"; palette: SkinPalette }
  | { type: "RESET" };

const INITIAL: MakeupState = {
  lips:      { enabled: true,  color: "#C4457A", opacity: 0.65 },
  blush:     { enabled: true,  color: "#FFB5A7", opacity: 0.55, size: 1 },
  eyeshadow: { enabled: false, color: "#C49A8A", opacity: 0.50 },
  activeTab: "lips",
};

function layerKey(tab: MakeupTab): keyof Omit<MakeupState, "activeTab"> {
  return tab === "eyes" ? "eyeshadow" : tab;
}

function reducer(state: MakeupState, action: Action): MakeupState {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    case "TOGGLE": {
      const k = layerKey(action.layer);
      return { ...state, [k]: { ...state[k], enabled: !state[k].enabled } };
    }
    case "SET_COLOR": {
      const k = layerKey(action.layer);
      return { ...state, [k]: { ...state[k], color: action.color } };
    }
    case "SET_OPACITY": {
      const k = layerKey(action.layer);
      return { ...state, [k]: { ...state[k], opacity: action.opacity } };
    }
    case "SET_SIZE":
      return { ...state, blush: { ...state.blush, size: action.size } };
    case "APPLY_PALETTE":
      return {
        ...state,
        lips:      { ...state.lips,      color: action.palette.lips[0].hex },
        blush:     { ...state.blush,     color: action.palette.blush[0].hex },
        eyeshadow: { ...state.eyeshadow, color: action.palette.eyeshadow[0].hex },
      };
    case "RESET":
      return INITIAL;
    default:
      return state;
  }
}

export function useMakeupState() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  return { state, dispatch };
}
