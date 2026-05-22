import type { Artist } from "@/components/concept/artist-card";

export type ArtistWithSchedule = Artist & { sessions: string[] };

export const DISTRICTS = [
  "Tất cả",
  "Liên Chiểu",
  "Hải Châu",
  "Cẩm Lệ",
  "Thanh Khê",
  "Ngũ Hành Sơn",
  "Sơn Trà",
];

export const TIME_SESSIONS = ["Tất cả", "Sáng", "Chiều", "Tối"];

export const ALL_ARTISTS: ArtistWithSchedule[] = [
  { id: "ngoc-tram",      name: "Ngọc Trâm",      district: "Liên Chiểu",   city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Chiều"] },
  { id: "nt-my-hanh",     name: "N.T.Mỹ Hạnh",    district: "Hải Châu",     city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png", sessions: ["Chiều", "Tối"] },
  { id: "thanh-thanh",    name: "Thanh Thanh",     district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Tối"] },
  { id: "thu-hien",       name: "Thu Hiền",        district: "Sơn Trà",      city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png", sessions: ["Sáng"] },
  { id: "ny-my-cuong",    name: "N.Y.Mỹ Cường",   district: "Cẩm Lệ",       city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png", sessions: ["Chiều", "Tối"] },
  { id: "p-huyen-my",     name: "P.Huyền My",      district: "Thanh Khê",    city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Chiều"] },
  { id: "khanh-van",      name: "Khánh Vân",       district: "Hải Châu",     city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Chiều", "Tối"] },
  { id: "nguyet-minh",    name: "Nguyệt Minh",     district: "Ngũ Hành Sơn", city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png", sessions: ["Chiều"] },
  { id: "ha-minh-phuong", name: "Hà Minh Phương",  district: "Thanh Khê",    city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Tối"] },
  { id: "trang-leo",      name: "Trang Leo",        district: "Cẩm Lệ",       city: "Đà Nẵng", rating: 5.0, photo: "/images/makeup1.jpg", avatar: "/images/avatar.png", sessions: ["Tối"] },
  { id: "minh-tu",        name: "Minh Tú",          district: "Liên Chiểu",   city: "Đà Nẵng", rating: 4.9, photo: "/images/makeup2.jpg", avatar: "/images/avatar.png", sessions: ["Sáng", "Chiều"] },
  { id: "bao-chau",       name: "Bảo Châu",         district: "Sơn Trà",      city: "Đà Nẵng", rating: 4.8, photo: "/images/makeup5.jpg", avatar: "/images/avatar.png", sessions: ["Chiều", "Tối"] },
];

export const RATINGS = ["Tất cả", "5 sao", "4.5+ sao", "4.0+ sao"];

export const SORT_OPTIONS = ["Đánh giá cao nhất", "Tên A–Z"];

export const PAGE_SIZE = 8;
