"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

import logoAsset from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";

import { CONCEPT_ITEMS } from "@repo/constants/navigation";
import type { UserProfile } from "@/lib/auth";

function ConceptDropdown() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`cursor-pointer text-sm font-medium transition-colors hover:text-brand ${open ? "text-brand" : "text-slate-700"}`}
      >
        Concept
      </button>

      {open && (
        <div className="absolute left-1/2 top-full mt-[22px] w-[480px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {CONCEPT_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group cursor-pointer text-left"
              >
                <p className="flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-brand">
                  {item.title}
                  <span className="text-brand">›</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type UserMenuProps = {
  user: UserProfile;
  onLogout: () => void;
};

function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  const displayName = user.displayName ?? user.username ?? "Người dùng";
  const initials = displayName.charAt(0).toUpperCase();

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-3">
      {/* Online status toggle button */}
      <button
        onClick={() => setIsOnline((v) => !v)}
        className="flex cursor-pointer items-center gap-2 transition hover:opacity-80"
        title={isOnline ? "Đang hoạt động" : "Không hoạt động"}
      >
        <span className={`w-24 text-xs font-semibold transition-colors duration-300 text-right ${isOnline ? "text-green-500" : "text-slate-500"}`}>
          {isOnline ? "Đang hoạt động" : "Không hoạt động"}
        </span>
        <div className={`relative h-6 w-11 rounded-full transition-all duration-300 ${isOnline ? "bg-green-500" : "bg-slate-300"}`}>
          <div
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 ${
              isOnline ? "translate-x-5.5" : "translate-x-0.5"
            }`}
          />
        </div>
      </button>

      {/* Avatar and name */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2 rounded-full transition hover:opacity-80"
      >
        <div className="relative size-9 overflow-hidden rounded-full border-2 border-slate-200">
          {user.avatar ? (
            <Image src={user.avatar} alt={displayName} fill className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center bg-brand text-sm font-semibold text-white">
              {initials}
            </div>
          )}
        </div>
        <span className="hidden text-sm font-semibold text-slate-800 sm:block">{displayName}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3.5 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <Link
            href="/dashboard/users"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            <User className="size-4 text-slate-400" />
            Hồ sơ cá nhân
          </Link>
          <div className="mx-3 border-t border-slate-100" />
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

type SiteHeaderProps = {
  onLogout?: () => void;
  user?: UserProfile | null;
};

export function SiteHeader({ onLogout, user }: SiteHeaderProps) {
  const isLoggedIn = !!onLogout;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2">
          <Image src={logoAsset} alt="BlueBeauty" width={140} height={40} className="h-9 w-auto sm:h-10" priority />
          <Image src="/images/blue-beauty.png" alt="Blue Beauty" width={120} height={40} className="h-8 w-auto sm:h-9" priority />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/dashboard" className="hover:text-brand">Trang chủ</Link>
          <Link href="/dashboard/profile" className="hover:text-brand">Hồ sơ</Link>
          <Link href="/dashboard/promotions" className="hover:text-brand">Marketing</Link>
        </nav>

        {isLoggedIn && onLogout ? (
          <UserMenu user={user ?? {}} onLogout={onLogout} />
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/register">
              <Button
                type="button"
                variant="outline"
                className="h-9 cursor-pointer rounded-lg border-brand px-3 text-sm font-semibold text-brand hover:bg-brand/5 sm:px-4"
              >
                Đăng ký
              </Button>
            </Link>
            <Link href="/login">
              <Button
                type="button"
                className="h-9 cursor-pointer rounded-lg bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-dark sm:px-4"
              >
                Đăng nhập
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden">
        <nav className="flex gap-4 overflow-x-auto pb-1 text-xs font-medium text-slate-600 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/dashboard" className="shrink-0 hover:text-brand">Trang chủ</Link>
          <Link href="/dashboard/profile" className="shrink-0 hover:text-brand">Hồ sơ</Link>
          <Link href="/dashboard/promotions" className="shrink-0 hover:text-brand">Marketing</Link>
        </nav>
      </div>
    </header>
  );
}
