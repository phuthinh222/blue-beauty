"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

import { INPUT_CLASS, PRIMARY_BTN_CLASS } from "../../auth-constants";
import { AuthShell } from "../../auth-shell";

export default function ResetPasswordNewPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const canSubmit = Boolean(password) && password === passwordConfirm;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <AuthShell title="Đặt lại mật khẩu" subtitle="Nhập mật khẩu mới của bạn!">
      <Card className="w-full max-w-[420px] border-slate-200 shadow-sm md:max-w-[460px]">
        <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">
                Mật khẩu mới
              </Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT_CLASS}
                placeholder="Nhập mật khẩu mới"
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

            <Button
              type="submit"
              disabled={!canSubmit}
              className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}
            >
              Lưu
            </Button>

            {submitted ? (
              <p className="text-center text-xs text-emerald-700">
                Đổi mật khẩu thành công (demo).{" "}
                <Link href="/login" className="underline">
                  Quay lại đăng nhập
                </Link>
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

