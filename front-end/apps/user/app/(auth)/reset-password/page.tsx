"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

import { INPUT_CLASS, PRIMARY_BTN_CLASS } from "../auth-constants";
import { AuthShell } from "../auth-shell";

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const canSubmit = Boolean(email.trim());

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <AuthShell
      title="Đặt lại mật khẩu"
      subtitle="Nhập email để tiến hành khôi phục mật khẩu của bạn!"
    >
      <Card className="w-full max-w-[420px] border-slate-200 shadow-sm md:max-w-[460px]">
        <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">
                Email khôi phục
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT_CLASS}
                placeholder="Nhập email"
                inputMode="email"
              />
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}
            >
              Gửi yêu cầu
            </Button>

            {submitted ? (
              <p className="text-center text-xs text-emerald-700">
                Đã gửi mã OTP (demo).{" "}
                <Link href="/reset-password/otp" className="underline">
                  Nhập OTP
                </Link>
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

