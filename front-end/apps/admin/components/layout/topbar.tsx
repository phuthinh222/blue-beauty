"use client";

import * as React from "react";

import {
  Bell,
  LogOut,
  PanelLeft,
  Search,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Input } from "@repo/ui/input";

type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Bạn có 2 booking mới",
    description: "Kiểm tra chi tiết trong mục Booking.",
    time: "2 phút trước",
    read: false,
  },
  {
    id: "n2",
    title: "Thanh toán đã hoàn tất",
    description: "Doanh thu hôm nay đã được cập nhật.",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: "n3",
    title: "Hồ sơ thợ makeup được cập nhật",
    description: "Thông tin liên hệ đã thay đổi.",
    time: "Hôm qua",
    read: true,
  },
];

export function Topbar({
  displayName,
  onLogout,
  isLoggingOut,
  isSidebarCollapsed,
  onToggleSidebar,
}: {
  displayName: string;
  onLogout: () => void;
  isLoggingOut?: boolean;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}) {
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-3 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full hover:bg-slate-100"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"
          }
        >
          <PanelLeft className="size-5 text-slate-700" />
        </Button>

        <div className="relative w-full max-w-[520px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search here"
            className="h-10 rounded-lg border-slate-200 bg-white pl-9 shadow-sm focus-visible:ring-0"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer rounded-full hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="size-5 text-slate-700" />
                {unreadCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-[#257CBA] text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[360px] p-0">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-sm font-semibold text-slate-900">
                  Thông báo
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 cursor-pointer px-2 text-xs text-slate-600 hover:bg-slate-100"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    Đánh dấu đã đọc
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[320px] overflow-auto py-1">
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className="flex cursor-pointer flex-col items-start gap-1 px-3 py-2"
                  >
                    <div className="flex w-full items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900">
                        {n.title}
                      </p>
                      <p className="shrink-0 text-[11px] text-slate-500">
                        {n.time}
                      </p>
                    </div>
                    {n.description ? (
                      <p className="text-xs text-slate-500">{n.description}</p>
                    ) : null}
                    {!n.read ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#257CBA]">
                        <span className="size-1.5 rounded-full bg-[#257CBA]" />
                        Chưa đọc
                      </span>
                    ) : null}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden items-center gap-2 text-sm text-slate-700 sm:flex">
            <span>Chào,</span>
            <span className="font-medium">{displayName}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer rounded-full"
                aria-label="User menu"
              >
                <Avatar className="size-9">
                  <AvatarImage src="/images/avatar.png" alt={displayName} />
                  <AvatarFallback className="bg-slate-100 text-slate-700">
                    {String(displayName).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                disabled={Boolean(isLoggingOut)}
              >
                <LogOut className="mr-2 size-4" />
                {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
