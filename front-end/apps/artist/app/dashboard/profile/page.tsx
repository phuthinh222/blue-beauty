"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Edit } from "lucide-react";
import { Button } from "@repo/ui/button";
import { ArtistHero } from "@/components/artist-profile/artist-hero";
import { ArtistBio } from "@/components/artist-profile/artist-bio";
import { ArtistPortfolio } from "@/components/artist-profile/artist-portfolio";
import { ArtistServices } from "@/components/artist-profile/artist-services";
import { ArtistReviews } from "@/components/artist-profile/artist-reviews";
import { ProfileProjects } from "@/components/artist-profile/profile-projects";
import { SiteFooter } from "@/components/layout/site-footer";
import type { ArtistProfile } from "@/components/artist-profile/types";
import type { ProfileProject } from "@/components/artist-profile/profile-projects";

// Mock data
const mockProfile: ArtistProfile = {
  id: "1",
  name: "Linh Nguyễn",
  district: "Quận 1",
  city: "TP. Hồ Chí Minh",
  rating: 4.9,
  coverPhoto: "/images/ngoaitroi.jpg",
  avatar: "/images/avatar.png",
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
        "/images/makeup4.jpg",
      ],
    },
    {
      label: "Concept",
      images: [
        "/images/item1.jpg",
        "/images/item2.jpg",
        "/images/item3.jpg",
      ],
    },
    {
      label: "Motion",
      images: [
        "/images/ngoaitroi2.jpg",
        "/images/ngoaitroi3.jpg",
        "/images/ngoaitroi4.jpg",
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      reviewerName: "Hà Anh",
      reviewerLocation: "Quận 7, TP. Hồ Chí Minh",
      reviewerAvatar: "/images/customer.png",
      date: "15/05/2025",
      rating: 5,
      comment: "Linh rất tài năng và chuyên nghiệp. Makeup rất đẹp và bền vị.",
    },
    {
      id: "r2",
      reviewerName: "Minh Anh",
      reviewerLocation: "Quận 1, TP. Hồ Chí Minh",
      reviewerAvatar: "/images/guest.png",
      date: "10/05/2025",
      rating: 5,
      comment: "Dịch vụ tuyệt v�ệu, Linh giỏi tư vấn màu makeup phù hợp.",
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

const mockProjects: ProfileProject[] = [
  {
    id: "1",
    date: "Dự án: 15/05/2025, 09:00AM",
    tasks: [
      "Makeup cho Bridal (Cô dâu)",
      "Tóc cho cô dâu",
      "Makeup cho Bridesmaids",
      "Makeup cho mẹ cô dâu",
    ],
  },
  {
    id: "2",
    date: "Dự án: 20/05/2025, 02:00PM",
    tasks: [
      "Makeup Editorial (Tạp chí)",
      "Product demo",
      "Photo shoot prep",
    ],
  },
  {
    id: "3",
    date: "Dự án: 22/05/2025, 06:00PM",
    tasks: [
      "Makeup cho Event",
      "Touch-up service",
      "Cleanup",
    ],
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const handlePreview = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditProfile = () => {
    router.push(`/dashboard/profile/edit`);
  };

  const handleBooking = () => {
    router.push("/dashboard/bookings?create=true");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with action buttons */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-900">Hồ sơ của tôi</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Xem trước</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleEditProfile}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Chỉnh sửa</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Profile Hero Section */}
        <div className="mb-8">
          <ArtistHero
            name={mockProfile.name}
            district={mockProfile.district}
            city={mockProfile.city}
            rating={mockProfile.rating}
            coverPhoto={mockProfile.coverPhoto}
            avatar={mockProfile.avatar}
            isFavorited={isFavorited}
            onToggleFavorite={() => setIsFavorited(!isFavorited)}
          />
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <ArtistBio
            bio={mockProfile.bio}
            bookingArea={mockProfile.bookingArea}
            workPrinciples={mockProfile.workPrinciples}
          />
        </div>

        {/* Portfolio Section */}
        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <ArtistPortfolio portfolio={mockProfile.portfolio} />
        </div>

        {/* Services Section */}
        {mockProfile.services.length > 0 && (
          <div className="mb-8">
            <ArtistServices
              services={mockProfile.services}
              onBook={handleBooking}
            />
          </div>
        )}

        {/* Reviews Section */}
        {mockProfile.reviews.length > 0 && (
          <div className="mb-8">
            <ArtistReviews
              rating={mockProfile.rating}
              reviewCount={mockProfile.reviews.length}
              reviews={mockProfile.reviews}
            />
          </div>
        )}

        {/* Projects Section */}
        {mockProjects.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Bài viết gần đây</h3>
            <ProfileProjects projects={mockProjects} />
          </div>
        )}
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
