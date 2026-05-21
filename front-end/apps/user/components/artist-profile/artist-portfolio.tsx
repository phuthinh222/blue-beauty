"use client";

import { useState } from "react";
import Image from "next/image";
import { PortfolioLightbox } from "./portfolio-lightbox";
import type { PortfolioItem } from "./types";

type PortfolioCardProps = {
  item: PortfolioItem;
  onClick: () => void;
};

function PortfolioCard({ item, onClick }: PortfolioCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
        <Image
          src={item.images[0]}
          alt={item.label}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 90vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <p className="mt-2 text-center text-sm font-medium text-slate-700">{item.label}</p>
    </button>
  );
}

type ArtistPortfolioProps = {
  portfolio: PortfolioItem[];
};

export function ArtistPortfolio({ portfolio }: ArtistPortfolioProps) {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-900">Portfolio</h3>
        <div className="grid grid-cols-3 gap-3">
          {portfolio.map((item) => (
            <PortfolioCard
              key={item.label}
              item={item}
              onClick={() => setActiveItem(item)}
            />
          ))}
        </div>
      </div>

      {activeItem && (
        <PortfolioLightbox
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}
    </>
  );
}
