"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { VOUCHERS, calcDiscount } from "./lib/vouchers";

export function useCheckoutParams() {
  const params = useSearchParams();
  return {
    artist:   params.get("artist")   ?? "",
    concept:  params.get("concept")  ?? "",
    price:    Number(params.get("price") ?? 0),
    date:     params.get("date")     ?? "",
    time:     params.get("time")     ?? "",
    location: params.get("location") ?? "",
    bookedAt: params.get("bookedAt") ?? "",
    note:     params.get("note")     ?? "",
  };
}

export function useVoucher(price: number) {
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  function applyVoucher() {
    const key = voucher.trim().toUpperCase();
    const val = VOUCHERS[key];
    if (!val) return;
    setDiscount(calcDiscount(price, val));
  }

  return { voucher, setVoucher, discount, applyVoucher };
}

export function useCheckoutNavigation() {
  const router = useRouter();

  function goToConfirm(params: Record<string, string>) {
    const p = new URLSearchParams(params);
    router.push(`/dashboard/checkout/confirm?${p.toString()}`);
  }

  return { goToConfirm };
}
