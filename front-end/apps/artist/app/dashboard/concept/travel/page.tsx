"use client";

import { useAuth } from "@/hooks/use-auth";
import { ConceptSubPage } from "@/components/concept/concept-sub-page";
import type { Artist } from "@/components/concept/artist-card";

const ARTISTS: Artist[] = [
  { name: "Minh Tú", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "Bảo Châu", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Hồng Nhung", district: "Liên Chiểu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export default function TravelPage() {
  const { isLoggedIn, user, onLogout } = useAuth();
  return (
    <ConceptSubPage
      title="Top thợ trang điểm du lịch nổi bật"
      breadcrumbLabel="Du lịch"
      artists={ARTISTS}
      onLogout={isLoggedIn ? onLogout : undefined}
      user={user}
    />
  );
}
