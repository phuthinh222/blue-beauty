"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";

import { PRIMARY_BTN_CLASS } from "../../auth-constants";
import { AuthShell } from "../../auth-shell";

const OTP_LENGTH = 6;

function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  const digits = React.useMemo(() => {
    const clean = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    return Array.from({ length: OTP_LENGTH }).map((_, i) => clean[i] ?? "");
  }, [value]);

  const setAt = (index: number, digit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    onChange(nextDigits.join("").slice(0, OTP_LENGTH));
  };

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      {digits.map((d, i) => (
        <Input
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          onChange={(e) => {
            const next = e.target.value.replace(/\D/g, "").slice(-1);
            setAt(i, next);
            if (next && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData
              .getData("text")
              .replace(/\D/g, "")
              .slice(0, OTP_LENGTH);
            onChange(pasted);
            const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
            refs.current[nextIndex]?.focus();
          }}
          inputMode="numeric"
          className="h-11 w-9 rounded border-slate-200 bg-white p-0 text-center text-base focus-visible:ring-0 sm:w-10"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function ResetPasswordOtpPage() {
  const [otp, setOtp] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const canSubmit = otp.replace(/\D/g, "").length === OTP_LENGTH;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <AuthShell
      title="Đặt lại mật khẩu"
      subtitle="Mã OTP đã được gửi đến email của bạn!"
    >
      <Card className="w-full max-w-[420px] border-slate-200 shadow-sm md:max-w-[460px]">
        <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-700">
                Mã OTP bao gồm 6 chữ số
              </p>
              <OtpInput value={otp} onChange={setOtp} />
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}
            >
              Xác thực
            </Button>

            {submitted ? (
              <p className="text-center text-xs text-emerald-700">
                Xác thực thành công (demo).{" "}
                <Link href="/reset-password/new-password" className="underline">
                  Nhập mật khẩu mới
                </Link>
              </p>
            ) : (
              <p className="text-center text-xs text-slate-600">
                Bạn không nhận được email?{" "}
                <Link href="/reset-password" className="text-[#2580B9] underline">
                  Thử lại
                </Link>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

