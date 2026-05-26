import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

export function StarRating({ rating, max = 5, size = "md", className }: StarRatingProps) {
  const starClass = SIZE_MAP[size];

  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`${starClass} ${
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}
