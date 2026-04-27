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
  type AuthRole,
} from "../auth-constants";
import { AuthShell } from "../auth-shell";

export default function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [role, setRole] = React.useState<AuthRole | "">("");
  const [district, setDistrict] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const isMakeupArtist = role === "Thợ trang điểm";

  const canSubmit = React.useMemo(() => {
    const phoneDigits = phone.replace(/[^\d+]/g, "").trim();
    const baseOk =
      Boolean(username.trim()) &&
      Boolean(displayName.trim()) &&
      Boolean(phoneDigits) &&
      Boolean(email.trim()) &&
      Boolean(password) &&
      Boolean(passwordConfirm) &&
      role !== "" &&
      agreed &&
      password === passwordConfirm;
    if (!baseOk) return false;
    if (isMakeupArtist && !district.trim()) return false;
    return true;
  }, [
    agreed,
    district,
    displayName,
    email,
    isMakeupArtist,
    password,
    passwordConfirm,
    phone,
    role,
    username,
  ]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!canSubmit) {
      if (!agreed) {
        setError("Vui lòng đồng ý với điều khoản & chính sách.");
      } else if (password !== passwordConfirm) {
        setError("Mật khẩu xác nhận không khớp.");
      } else if (isMakeupArtist && !district.trim()) {
        setError("Vui lòng chọn khu vực.");
      } else {
        setError("Vui lòng nhập đầy đủ thông tin đăng ký.");
      }
      return;
    }

    // Minimal UI-only submit.
    setSubmitted(true);
  }

  return (
    <AuthShell
      title="Đăng ký"
      subtitle="Nhập các thông tin bên dưới để đăng ký!"
    >
      <Card className="w-full max-w-[420px] border-slate-200 shadow-sm md:max-w-[480px]">
          <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Tên tài khoản
                </Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập tên tài khoản"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Tên đại diện
                </Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập tên đại diện"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Số điện thoại
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập số điện thoại"
                  inputMode="tel"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập email"
                  inputMode="email"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Mật khẩu
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập mật khẩu"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">
                  Xác nhận mật khẩu
                </Label>
                <Input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700">Vai trò</Label>
                <Select
                  value={role || undefined}
                  onValueChange={(v) => {
                    const nextRole = v as AuthRole;
                    setRole(nextRole);
                    if (nextRole !== "Thợ trang điểm") setDistrict("");
                  }}
                >
                  <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                    <SelectItem value="Thợ trang điểm">Thợ trang điểm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isMakeupArtist ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-700">
                      Tỉnh/Thành phố
                    </Label>
                    <Input
                      readOnly
                      value="Đà Nẵng"
                      className={INPUT_READONLY_CLASS}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-700">
                      Khu vực
                    </Label>
                    <Select
                      value={district || undefined}
                      onValueChange={setDistrict}
                    >
                      <SelectTrigger className={SELECT_TRIGGER_CLASS}>
                        <SelectValue placeholder="Chọn khu vực" />
                      </SelectTrigger>
                      <SelectContent>
                        {DA_NANG_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : null}

              <label className="flex cursor-pointer items-start gap-2 text-xs text-slate-600">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(Boolean(v))}
                  className="mt-0.5"
                />
                <span>
                  Thông qua việc đăng ký và tiếp tục, tôi đồng ý với{" "}
                  <span className="font-medium text-[#2580B9]">
                    Chính sách bảo mật
                  </span>{" "}
                  và{" "}
                  <span className="font-medium text-[#2580B9]">
                    Điều khoản và điều kiện
                  </span>{" "}
                  của Blue Beauty.
                </span>
              </label>

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              ) : null}

              {submitted ? (
                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  Đăng ký thành công (demo). Bạn có thể quay lại trang đăng nhập.
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={!canSubmit}
                className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}
              >
                Đăng ký
              </Button>

              <p className="pt-1 text-center text-xs text-slate-600">
                Bạn đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#2580B9] hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </form>
          </CardContent>
      </Card>
    </AuthShell>
  );
}

