export type Role = "Thợ makeup" | "Khách hàng";

export type UserRow = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  role: Role;
  active: boolean;
  banned?: boolean;
  banReason?: string;
};

export const DA_NANG_DISTRICTS = [
  "Quận Hải Châu",
  "Quận Thanh Khê",
  "Quận Sơn Trà",
  "Quận Ngũ Hành Sơn",
  "Quận Liên Chiểu",
  "Quận Cẩm Lệ",
  "Huyện Hòa Vang",
] as const;

export function districtFromStylistAddress(address: string): string {
  const head = address.split(",")[0]?.trim() ?? "";
  return DA_NANG_DISTRICTS.includes(head as (typeof DA_NANG_DISTRICTS)[number])
    ? head
    : "";
}

export const MOCK_USERS: UserRow[] = Array.from({ length: 21 }).map((_, i) => {
  const idx = i + 1;
  const role: Role = idx % 3 === 0 ? "Thợ makeup" : "Khách hàng";
  return {
    id: String(idx),
    name: idx % 2 === 0 ? "Nguyễn Thị Tuyết" : "Trần Nam Anh",
    address: "Đà Nẵng, Việt Nam",
    email: idx % 2 === 0 ? "stanley.j@hotmail.com" : "jone.blake@hotmail.com",
    phone: "0123456789",
    role,
    active: true,
    banned: false,
  };
});
