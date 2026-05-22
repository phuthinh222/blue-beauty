export const PRIMARY_BTN_CLASS = "bg-brand text-white hover:bg-brand-dark";

export const INPUT_CLASS =
  "h-9 rounded border-slate-200 bg-white px-3 text-sm text-slate-800 focus-visible:ring-0";

export const INPUT_READONLY_CLASS =
  "h-9 cursor-not-allowed rounded border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus-visible:ring-0";

export const SELECT_TRIGGER_CLASS = "h-9 rounded border-slate-200 shadow-sm";

export const FAB_CLASS =
  "size-11 rounded-full bg-brand text-white shadow-lg ring-1 ring-black/5 hover:bg-brand-dark sm:size-12";

export const DA_NANG_DISTRICTS = [
  "Quận Hải Châu",
  "Quận Thanh Khê",
  "Quận Sơn Trà",
  "Quận Ngũ Hành Sơn",
  "Quận Liên Chiểu",
  "Quận Cẩm Lệ",
  "Huyện Hòa Vang",
] as const;

export type AuthRole = "Khách hàng" | "Thợ trang điểm";

