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
  { id: "ngoc-tram", name: "Ngọc Trâm", district: "Liên Chiểu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { id: "nt-my-hanh", name: "N.T.Mỹ Hạnh", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { id: "thanh-thanh", name: "Thanh Thanh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { id: "thu-hien", name: "Thu Hiền", district: "Sơn Trà", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { id: "ny-my-cuong", name: "N.Y.Mỹ Cường", district: "Cẩm Lệ", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { id: "p-huyen-my", name: "P.Huyền My", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { id: "khanh-van", name: "Khánh Vân", district: "Hải Châu", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { id: "nguyet-minh", name: "Nguyệt Minh", district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { id: "ha-minh-phuong", name: "Hà Minh Phương", district: "Thanh Khê", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
  { id: "trang-leo", name: "Trang Leo", district: "Cẩm Lệ", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png" },
  { id: "minh-tu", name: "Minh Tú", district: "Liên Chiểu", city: "Đà Nẵng", rating: 4.9, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png" },
  { id: "bao-chau", name: "Bảo Châu", district: "Sơn Trà", city: "Đà Nẵng", rating: 4.8, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png" },
];

export const PAGE_SIZE = 6;
