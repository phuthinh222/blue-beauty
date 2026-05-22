import Image from "next/image";
import { Heart } from "lucide-react";
import { StarRating } from "./star-rating";

type ArtistHeroProps = {
  name: string;
  district: string;
  city: string;
  rating: number;
  coverPhoto: string;
  avatar: string;
  onBooking?: () => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
};

export function ArtistHero({
  name,
  district,
  city,
  rating,
  coverPhoto,
  avatar,
  onBooking,
  isFavorited = false,
  onToggleFavorite,
}: ArtistHeroProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 w-full sm:h-56">
        <Image
          src={coverPhoto}
          alt={`${name} cover`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative px-5 pb-5">
        <div className="absolute -top-8 left-5 size-16 overflow-hidden rounded-full border-4 border-white shadow-md">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>

        <div className="flex items-end justify-between pt-10">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{name}</h1>
            <p className="text-sm text-slate-500">
              {district}, {city}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <StarRating rating={rating} size="sm" />
              <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className={`flex size-10 items-center justify-center rounded-xl border transition ${
                  isFavorited
                    ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-slate-200 bg-white text-slate-400 hover:border-red-300 hover:text-red-500"
                }`}
              >
                <Heart className={`size-5 transition ${isFavorited ? "fill-red-500" : ""}`} />
              </button>
            )}
            <button
              onClick={onBooking}
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
