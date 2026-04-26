import {
  Bell,
  Calendar,
  Home,
  MessageCircle,
  Star,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Trang chủ", icon: Home },
  { href: "/dashboard/users", label: "Người dùng", icon: Users },
  { href: "/dashboard/services", label: "Dịch vụ", icon: Wrench },
  { href: "/dashboard/feedback", label: "Phản hồi", icon: MessageCircle },
  { href: "/dashboard/notifications", label: "Thông báo", icon: Bell },
  { href: "/dashboard/ratings", label: "Đánh giá", icon: Star },
  { href: "/dashboard/bookings", label: "Đặt lịch", icon: Calendar },
];

