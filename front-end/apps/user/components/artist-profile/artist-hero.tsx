import Image from "next/image";
import { StarRating } from "./star-rating";

type ArtistHeroProps = {
  name: string;
  district: string;
  city: string;
  rating: number;
  coverPhoto: string;
  avatar: string;
  onBooking?: () => void;
};

export function ArtistHero({
  name,
  district,
  city,
  rating,
  coverPhoto,
  avatar,
  onBooking,
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
          <button
            onClick={onBooking}
            className="rounded-xl bg-[#257CBA] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e6aa0]"
          >
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
}
