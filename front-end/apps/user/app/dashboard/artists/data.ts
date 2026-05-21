import type { Artist } from "@/components/concept/artist-card";

export const DISTRICTS = [
  "Tất cả",
  "Liên Chiểu",
  "Hải Châu",
  "Cẩm Lệ",
  "Thanh Khê",
  "Ngũ Hành Sơn",
  "Sơn Trà",
];

export const ALL_ARTISTS: Artist[] = [
  { name: "Ngọc Trâm", district: "Liên Chiểu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "N.T.Mỹ Hạnh", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Thanh Thanh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { name: "Thu Hiền", district: "Sơn Trà", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "N.Y.Mỹ Cường", district: "Cẩm Lệ", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "P.Huyền My", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { name: "Khánh Vân", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "Nguyệt Minh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Hà Minh Phương", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { name: "Trang Leo", district: "Cẩm Lệ", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { name: "Minh Tú", district: "Liên Chiểu", city: "Đà Nẵng", rating: 4.9, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { name: "Bảo Châu", district: "Sơn Trà", city: "Đà Nẵng", rating: 4.8, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export const PAGE_SIZE = 6;
