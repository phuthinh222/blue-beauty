"use client";

import { useState } from "react";
import Image from "next/image";
import { User, ListOrdered, Lock, Heart, LogOut, Camera, Eye, EyeOff } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useAuth } from "@/hooks/use-auth";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { INPUT_CLASS } from "@/app/(auth)/auth-constants";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Button } from "@repo/ui/button";

type TabId = "profile" | "bookings" | "password" | "favorites";

const TABS = [
  { id: "profile"   as TabId, label: "Cập nhật thông tin", icon: User },
  { id: "bookings"  as TabId, label: "Lịch sử đặt lịch",  icon: ListOrdered },
  { id: "password"  as TabId, label: "Đổi mật khẩu",       icon: Lock },
  { id: "favorites" as TabId, label: "Danh sách yêu thích", icon: Heart },
];

/* ─── Tab: Cập nhật thông tin ────────────────────────────────── */
function ProfileTab({ displayName, username }: { displayName: string; username: string }) {
  const [name, setName]   = useState(displayName);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={onSave} className="space-y-5">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="relative">
          <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-brand text-3xl font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-brand shadow"
          >
            <Camera className="size-3.5 text-white" />
          </button>
        </div>
        <p className="text-xs text-slate-400">Nhấn vào biểu tượng để thay ảnh</p>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Tên tài khoản</Label>
        <Input value={username} readOnly className={`${INPUT_CLASS} cursor-not-allowed bg-slate-50`} />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Tên hiển thị</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} placeholder="Nhập tên hiển thị" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Số điện thoại</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT_CLASS} placeholder="Nhập số điện thoại" inputMode="tel" />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} placeholder="Nhập email" inputMode="email" />
      </div>

      {saved && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          Cập nhật thông tin thành công!
        </p>
      )}

      <Button type="submit" className="h-9 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-dark">
        Lưu thay đổi
      </Button>
    </form>
  );
}

/* ─── Tab: Lịch sử đặt lịch ─────────────────────────────────── */
const MOCK_BOOKINGS = [
  { id: "1", artist: "Ngọc Trâm",    concept: "Trang điểm cô dâu",   date: "2025-06-10", time: "08:00", status: "confirmed",  price: 1500000 },
  { id: "2", artist: "Khánh Vân",    concept: "Trang điểm sự kiện",  date: "2025-05-20", time: "09:30", status: "completed",  price: 600000 },
  { id: "3", artist: "Nguyệt Minh",  concept: "Trang điểm chụp ảnh", date: "2025-04-15", time: "10:00", status: "cancelled",  price: 700000 },
];

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Đã xác nhận", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  completed: { label: "Hoàn thành",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Đã huỷ",      cls: "bg-red-50 text-red-600 border-red-200" },
};

function BookingsTab() {
  if (MOCK_BOOKINGS.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <ListOrdered className="size-12 text-slate-200" />
        <p className="mt-3 text-sm font-medium text-slate-500">Bạn chưa có lịch đặt nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {MOCK_BOOKINGS.map((b) => {
        const s = STATUS_LABEL[b.status];
        return (
          <div key={b.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{b.artist}</p>
                <p className="text-xs text-slate-500">{b.concept}</p>
                <p className="mt-1 text-xs text-slate-400">{b.date} · {b.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.cls}`}>{s.label}</span>
                <span className="text-sm font-bold text-brand">{b.price.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Tab: Đổi mật khẩu ─────────────────────────────────────── */
function PasswordTab() {
  const [current, setCurrent]   = useState("");
  const [next, setNext]         = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext]       = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [saved, setSaved]   = useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!current || !next || !confirm) { setError("Vui lòng điền đầy đủ thông tin."); return; }
    if (next !== confirm) { setError("Mật khẩu xác nhận không khớp."); return; }
    if (next.length < 6)  { setError("Mật khẩu mới phải có ít nhất 6 ký tự."); return; }
    setSaved(true);
    setCurrent(""); setNext(""); setConfirm("");
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={onSave} className="space-y-5">
      <PasswordField label="Mật khẩu hiện tại" value={current} onChange={setCurrent} show={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />
      <PasswordField label="Mật khẩu mới"       value={next}    onChange={setNext}    show={showNext}    onToggle={() => setShowNext((v) => !v)} />
      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Xác nhận mật khẩu mới</Label>
        <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className={INPUT_CLASS} placeholder="Nhập lại mật khẩu mới" autoComplete="new-password" />
      </div>

      {error  && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      {saved  && <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">Đổi mật khẩu thành công!</p>}

      <Button type="submit" className="h-9 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-dark">
        Cập nhật mật khẩu
      </Button>
    </form>
  );
}

function PasswordField({ label, value, onChange, show, onToggle }: {
  label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-slate-700">{label}</Label>
      <div className="relative">
        <Input value={value} onChange={(e) => onChange(e.target.value)} type={show ? "text" : "password"} className={`${INPUT_CLASS} pr-10`} placeholder="••••••••" autoComplete="current-password" />
        <button type="button" onClick={onToggle} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

/* ─── Tab: Danh sách yêu thích ───────────────────────────────── */
const MOCK_FAVORITES = [
  { id: "ngoc-tram",    name: "Ngọc Trâm",       district: "Liên Chiểu",   photo: "/images/makeup1.jpg" },
  { id: "khanh-van",   name: "Khánh Vân",        district: "Hải Châu",     photo: "/images/makeup2.jpg" },
  { id: "nguyet-minh", name: "Nguyệt Minh",      district: "Ngũ Hành Sơn", photo: "/images/makeup5.jpg" },
];

function FavoritesTab() {
  if (MOCK_FAVORITES.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <Heart className="size-12 text-slate-200" />
        <p className="mt-3 text-sm font-medium text-slate-500">Chưa có thợ yêu thích nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {MOCK_FAVORITES.map((a) => (
        <a key={a.id} href={`/dashboard/artists/${a.id}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-brand/40 hover:bg-brand/5">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
            <Image src={a.photo} alt={a.name} fill className="object-cover transition group-hover:scale-105" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-brand">{a.name}</p>
            <p className="text-xs text-slate-500">{a.district}, Đà Nẵng</p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function UserProfilePage() {
  const { ready } = useAuthGuard();
  const { isLoggedIn, user, onLogout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white text-sm text-slate-600">
        Đang tải…
      </div>
    );
  }

  const displayName = user?.displayName ?? user?.username ?? "Người dùng";
  const username    = (user?.username as string) ?? "";

  const tabContent: Record<TabId, React.ReactNode> = {
    profile:   <ProfileTab displayName={displayName} username={username} />,
    bookings:  <BookingsTab />,
    password:  <PasswordTab />,
    favorites: <FavoritesTab />,
  };

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader onLogout={isLoggedIn ? onLogout : undefined} user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-slate-900">Tài khoản của tôi</h1>

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-56 md:shrink-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex w-full items-center gap-3 px-5 py-3.5 text-sm font-medium transition first:rounded-t-2xl last:rounded-b-2xl ${
                      isActive
                        ? "bg-brand text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </button>
                );
              })}
              <div className="border-t border-slate-100" />
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-b-2xl px-5 py-3.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <LogOut className="size-4 shrink-0" />
                Đăng xuất
              </button>
            </div>
          </aside>

          {/* Content */}
          <section className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-bold text-slate-900">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            {tabContent[activeTab]}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
