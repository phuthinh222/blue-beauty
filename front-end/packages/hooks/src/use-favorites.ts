"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const STORAGE_KEY = "blue_beauty_favorites";

function readFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function writeFavorites(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useFavorites(hasToken: () => boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  function isFavorited(id: string): boolean {
    return favorites.has(id);
  }

  function toggleFavorite(id: string) {
    if (!hasToken()) {
      router.push(`/login?next=${encodeURIComponent(pathname ?? "")}`);
      return;
    }
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      writeFavorites(next);
      return next;
    });
  }

  return { isFavorited, toggleFavorite };
}
