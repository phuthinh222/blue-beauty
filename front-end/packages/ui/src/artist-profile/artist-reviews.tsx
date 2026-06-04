import Image from "next/image";
import { StarRating } from "./star-rating";
import type { ArtistReview } from "./types";

type ReviewCardProps = {
  review: ArtistReview;
};

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image src={review.reviewerAvatar} alt={review.reviewerName} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">{review.reviewerName}</p>
              <p className="text-xs text-slate-500">{review.reviewerLocation}</p>
            </div>
            <span className="shrink-0 text-xs text-slate-400">{review.date}</span>
          </div>
          <StarRating rating={review.rating} size="sm" className="mt-1" />
          <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
        </div>
      </div>

      {review.reply && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <p className="mb-1 text-xs font-semibold text-brand">Phản hồi từ thợ</p>
          <p className="text-sm text-slate-600">{review.reply}</p>
        </div>
      )}
    </div>
  );
}

type ArtistReviewsProps = {
  rating: number;
  reviewCount: number;
  reviews: ArtistReview[];
};

export function ArtistReviews({ rating, reviewCount, reviews }: ArtistReviewsProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-base font-semibold text-slate-900">Nhận xét</h3>
        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} size="sm" />
          <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
          <span className="text-sm text-slate-400">({reviewCount})</span>
        </div>
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
