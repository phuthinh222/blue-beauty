import Image from "next/image";
import type { PortfolioItem } from "./types";

type PortfolioCardProps = {
  item: PortfolioItem;
};

function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={item.image}
          alt={item.label}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 90vw"
        />
      </div>
      <p className="mt-2 text-center text-sm font-medium text-slate-700">{item.label}</p>
    </div>
  );
}

type ArtistPortfolioProps = {
  portfolio: PortfolioItem[];
};

export function ArtistPortfolio({ portfolio }: ArtistPortfolioProps) {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-slate-900">Portfolio</h3>
      <div className="grid grid-cols-3 gap-3">
        {portfolio.map((item) => (
          <PortfolioCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
