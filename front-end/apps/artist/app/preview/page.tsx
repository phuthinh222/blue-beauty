"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Share2, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@repo/ui/button";
import { ArtistHero } from "@/components/artist-profile/artist-hero";
import { ArtistPortfolio } from "@/components/artist-profile/artist-portfolio";
import { ArtistBio } from "@/components/artist-profile/artist-bio";
import { ArtistServices } from "@/components/artist-profile/artist-services";
import { ArtistReviews } from "@/components/artist-profile/artist-reviews";
import { SiteFooter } from "@/components/layout/site-footer";
import type { ArtistProfile } from "@/components/artist-profile/types";

// Mock data - same as dashboard profile
const mockProfile: ArtistProfile = {
  id: "1",
  name: "Linh Nguyễn",
  district: "Quận 1",
  city: "TP. Hồ Chí Minh",
  rating: 4.9,
  coverPhoto: "/images/cover.jpg",
  avatar: "/images/avatar.jpg",
  bio: "Makeup Artist chuyên về Bridal makeup, Natural makeup và Creative makeup. Tôi mong muốn mang đến cho bạn một trải nghiệm tuyệt vời và làm bạn cảm thấy tự tin nhất.",
  bookingArea: "Toàn TP. Hồ Chí Minh",
  workPrinciples: [
    "Tôn trọng ý kiến của khách hàng",
    "Sử dụng sản phẩm Cosmetics chất lượng cao",
    "Luôn cập nhật các xu hướng mới nhất",
    "Cam kết vệ sinh và chuyên nghiệp",
  ],
  stats: {
    profiles: 34,
    reviews: 28,
    services: 8,
    agreements: 156,
  },
  portfolio: [
    {
      label: "Makeup Artist",
      images: [
        "/images/makeup1.jpg",
        "/images/makeup2.jpg",
        "/images/makeup3.jpg",
      ],
    },
    {
      label: "Concept",
      images: [
        "/images/concept1.jpg",
        "/images/concept2.jpg",
        "/images/concept3.jpg",
      ],
    },
    {
      label: "Motion",
      images: [
        "/images/motion1.jpg",
        "/images/motion2.jpg",
        "/images/motion3.jpg",
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      reviewerName: "Hà Anh",
      reviewerLocation: "Quận 7, TP. Hồ Chí Minh",
      reviewerAvatar: "/images/reviewer1.jpg",
      date: "15/05/2025",
      rating: 5,
      comment: "Linh rất tài năng và chuyên nghiệp. Makeup rất đẹp và bền vț.",
    },
    {
      id: "r2",
      reviewerName: "Minh Anh",
      reviewerLocation: "Quận 1, TP. Hồ Chí Minh",
      reviewerAvatar: "/images/reviewer2.jpg",
      date: "10/05/2025",
      rating: 5,
      comment: "Dịch vụ tuyệt vời, Linh giỏi tư vấn màu makeup phù hợp.",
    },
  ],
  services: [
    {
      id: "s1",
      concept: "Bridal Makeup",
      price: 2500000,
      duration: "2-3 giờ",
      includes: ["Consultation", "Makeup", "Touch-up service"],
      description: ["Makeup cho cô dâu", "2 lần thử makeup", "Chỉnh sửa bất kỳ lúc nào trong ngày cưới"],
    },
    {
      id: "s2",
      concept: "Event Makeup",
      price: 1500000,
      duration: "1-2 giờ",
      includes: ["Consultation", "Makeup"],
      description: ["Makeup cho các sự kiện", "Phù hợp với từng dạo sự kiện"],
    },
  ],
};

export default function PreviewPage() {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleBooking = () => {
    // Handle booking action
    router.push("/dashboard/bookings?create=true");
  };

  const handleBackToDashboard = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="gap-2"
          >
            ← Quay lại
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isFavorited ? "Đã yêu thích" : "Yêu thích"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Profile Hero */}
        <div className="mb-8">
          <ArtistHero
            name={mockProfile.name}
            district={mockProfile.district}
            city={mockProfile.city}
            rating={mockProfile.rating}
            coverPhoto={mockProfile.coverPhoto}
            avatar={mockProfile.avatar}
            onBooking={handleBooking}
            isFavorited={isFavorited}
            onToggleFavorite={() => setIsFavorited(!isFavorited)}
          />
        </div>

        {/* Contact Info */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">
              {mockProfile.stats.agreements}
            </div>
            <p className="text-xs text-slate-500">Booking thành công</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">
              {mockProfile.stats.reviews}
            </div>
            <p className="text-xs text-slate-500">Đánh giá</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">
              {mockProfile.stats.services}
            </div>
            <p className="text-xs text-slate-500">Dịch vụ</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <ArtistBio
            bio={mockProfile.bio}
            bookingArea={mockProfile.bookingArea}
            workPrinciples={mockProfile.workPrinciples}
          />
        </div>

        {/* Portfolio */}
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <ArtistPortfolio portfolio={mockProfile.portfolio} />
        </div>

        {/* Services */}
        {mockProfile.services.length > 0 && (
          <div className="mb-8">
            <ArtistServices
              services={mockProfile.services}
              onBook={handleBooking}
            />
          </div>
        )}

        {/* Reviews */}
        {mockProfile.reviews.length > 0 && (
          <div className="mb-8">
            <ArtistReviews
              rating={mockProfile.rating}
              reviewCount={mockProfile.reviews.length}
              reviews={mockProfile.reviews}
            />
          </div>
        )}

        {/* Contact Section */}
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Liên hệ</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Vị trí</p>
                <p className="text-sm text-slate-600">
                  {mockProfile.district}, {mockProfile.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Điện thoại</p>
                <p className="text-sm text-slate-600">0123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900">Tin nhắn</p>
                <p className="text-sm text-slate-600">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-brand hover:text-brand-dark"
                  >
                    Gửi tin nhắn
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
