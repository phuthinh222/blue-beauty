import Image from "next/image";
import { Star } from "lucide-react";

export type Artist = {
  name: string;
  district: string;
  city: string;
  rating: number;
  photo: string;
  avatar: string;
};

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={artist.photo}
          alt={artist.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 90vw"
          quality={90}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm font-semibold text-white">Xem hồ sơ</span>
        </div>
      </div>
      <div className="relative flex items-center justify-between px-4 pb-4 pt-7">
        <div className="absolute -top-5 left-4 size-10 overflow-hidden rounded-full border-2 border-white shadow">
          <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">{artist.name}</p>
          <p className="text-xs text-slate-500">{artist.district}, {artist.city}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-slate-700">{artist.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
