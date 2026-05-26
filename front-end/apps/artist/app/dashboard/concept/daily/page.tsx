"use client";

import { useAuth } from "@/hooks/use-auth";
import { ConceptSubPage } from "@/components/concept/concept-sub-page";
import type { Artist } from "@/components/concept/artist-card";

const ARTISTS: Artist[] = [
  { name: "Thanh Lan", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "Mai Anh", district: "Cẩm Lệ", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Bích Ngọc", district: "Sơn Trà", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export default function DailyPage() {
  const { isLoggedIn, user, onLogout } = useAuth();
  return (
    <ConceptSubPage
      title="Top thợ trang điểm hằng ngày nổi bật"
      breadcrumbLabel="Hằng ngày"
      artists={ARTISTS}
      onLogout={isLoggedIn ? onLogout : undefined}
      user={user}
    />
  );
}
