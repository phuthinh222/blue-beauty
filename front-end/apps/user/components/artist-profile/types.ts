export type PortfolioItem = {
  image: string;
  label: string;
};

export type ArtistReview = {
  id: string;
  reviewerName: string;
  reviewerLocation: string;
  reviewerAvatar: string;
  date: string;
  rating: number;
  comment: string;
  reply?: string;
};

export type ArtistStats = {
  profiles: number;
  reviews: number;
  services: number;
  agreements: number;
};

export type ArtistProfile = {
  id: string;
  name: string;
  district: string;
  city: string;
  rating: number;
  coverPhoto: string;
  avatar: string;
  bio: string;
  bookingArea: string;
  workPrinciples: string[];
  stats: ArtistStats;
  portfolio: PortfolioItem[];
  reviews: ArtistReview[];
};
