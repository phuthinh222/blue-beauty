"use client";

import { useLogout } from "@/hooks/use-logout";
import { ConceptSubPage } from "@/components/concept/concept-sub-page";
import type { Artist } from "@/components/concept/artist-card";

const ARTISTS: Artist[] = [
  { name: "Phương Linh", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "Thu Hà", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Ngọc Anh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export default function PhotographyPage() {
  const onLogout = useLogout();
  return (
    <ConceptSubPage
      title="Top thợ trang điểm chụp ảnh nổi bật"
      breadcrumbLabel="Chụp ảnh"
      artists={ARTISTS}
      onLogout={onLogout}
    />
  );
}
