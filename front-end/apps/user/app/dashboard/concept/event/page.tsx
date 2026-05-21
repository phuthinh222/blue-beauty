"use client";

import { useLogout } from "@/hooks/use-logout";
import { ConceptSubPage } from "@/components/concept/concept-sub-page";
import type { Artist } from "@/components/concept/artist-card";

const ARTISTS: Artist[] = [
  { name: "Ngọc Trâm", district: "Liên Chiểu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "N.T.Mỹ Hạnh", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Thanh Thanh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export default function EventPage() {
  const onLogout = useLogout();
  return (
    <ConceptSubPage
      title="Top thợ trang điểm sự kiện nổi bật"
      breadcrumbLabel="Sự kiện"
      artists={ARTISTS}
      onLogout={onLogout}
    />
  );
}
