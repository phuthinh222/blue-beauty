"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Checkbox } from "@repo/ui/checkbox";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";

import {
  DA_NANG_DISTRICTS,
  INPUT_CLASS,
  INPUT_READONLY_CLASS,
  PRIMARY_BTN_CLASS,
  SELECT_TRIGGER_CLASS,
} from "../auth-constants";
import { AuthShell } from "../auth-shell";
import { useRegisterForm } from "@/hooks/use-register-form";

type ArtistFieldsProps = {
  district: string;
  onDistrictChange: (v: string) => void;
};

function ArtistFields({ district, onDistrictChange }: ArtistFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Tỉnh/Thành phố</Label>
        <Input readOnly value="Đà Nẵng" className={INPUT_READONLY_CLASS} />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-medium text-slate-700">Khu vực</Label>
        <Select value={district || undefined} onValueChange={onDistrictChange}>
          <SelectTrigger className={SELECT_TRIGGER_CLASS}>
            <SelectValue placeholder="Chọn khu vực" />
          </SelectTrigger>
          <SelectContent>
            {DA_NANG_DISTRICTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default function RegisterPage() {
  const {
    username, setUsername,
    displayName, setDisplayName,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    passwordConfirm, setPasswordConfirm,
    role, onRoleChange,
    district, setDistrict,
    agreed, setAgreed,
    isMakeupArtist,
    canSubmit,
    error,
    submitted,
    onSubmit,
  } = useRegisterForm();

  return (
    <AuthShell title="Đăng ký" subtitle="Nhập các thông tin bên dưới để đăng ký!">
      <Card className="w-full max-w-105 border-slate-200 shadow-sm md:max-w-120">
        <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Tên tài khoản</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} className={INPUT_CLASS} placeholder="Nhập tên tài khoản" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Tên đại diện</Label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={INPUT_CLASS} placeholder="Nhập tên đại diện" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Số điện thoại</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT_CLASS} placeholder="Nhập số điện thoại" inputMode="tel" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} placeholder="Nhập email" inputMode="email" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Mật khẩu</Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT_CLASS} placeholder="Nhập mật khẩu" type="password" autoComplete="new-password" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Xác nhận mật khẩu</Label>
              <Input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={INPUT_CLASS} placeholder="Nhập lại mật khẩu" type="password" autoComplete="new-password" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">Vai trò</Label>
              <Select value={role || undefined} onValueChange={onRoleChange}>
                <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  <SelectItem value="Thợ trang điểm">Thợ trang điểm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isMakeupArtist && (
              <ArtistFields district={district} onDistrictChange={setDistrict} />
            )}

            <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-600">
              <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} className="mt-0.5" />
              <span>
                Thông qua việc đăng ký và tiếp tục, tôi đồng ý với{" "}
                <span className="font-medium text-brand">Chính sách bảo mật</span>{" "}
                và{" "}
                <span className="font-medium text-brand">Điều khoản và điều kiện</span>{" "}
                của Blue Beauty.
              </span>
            </label>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </p>
            )}

            {submitted && (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                Đăng ký thành công (demo). Bạn có thể quay lại trang đăng nhập.
              </p>
            )}

            <Button type="submit" disabled={!canSubmit} className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}>
              Đăng ký
            </Button>

            <p className="pt-1 text-center text-xs text-slate-600">
              Bạn đã có tài khoản?{" "}
              <Link href="/login" className="font-medium text-brand hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
