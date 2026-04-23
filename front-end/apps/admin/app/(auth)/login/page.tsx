"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Separator } from "@repo/ui/separator";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.268 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.268 35.073 26.779 36 24 36c-5.247 0-9.62-3.317-11.289-7.946l-6.522 5.025C9.504 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.07 12.07 0 0 1-4.084 5.57l.003-.002 6.19 5.238C36.97 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function FloatingIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-12 place-items-center rounded-full bg-[#2580B9] text-white shadow-lg ring-1 ring-black/5 transition hover:bg-[#1F6FA1]"
    >
      {children}
    </a>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-[100dvh] bg-white">
      <div className="flex flex-col items-center">
        <div className=" place-items-center ">
          <Image src={logo} alt="Blue Beauty" className="h-9 w-auto" priority />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-slate-900">Đăng nhập</h1>
      </div>
      <div className="flex min-h-[100dvh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-[380px] rounded-lg border border-slate-200 bg-white px-7 py-8 shadow-sm">
          <form className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-xs font-medium text-slate-700"
              >
                Tên tài khoản
              </Label>
              <Input
                id="username"
                autoComplete="username"
                className="h-9 rounded border-slate-200 bg-white px-3 text-sm text-slate-800 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-slate-700"
              >
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="h-9 rounded border-slate-200 bg-white px-3 text-sm text-slate-800 focus-visible:ring-0"
              />
              <div className="flex justify-end">
                <Link
                  href="/reset-password"
                  className="text-xs text-[#2580B9] hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <Button
              type="button"
              className="h-9 w-full bg-[#2580B9] text-white hover:bg-[#1F6FA1]"
            >
              Đăng nhập
            </Button>

            <div className="pt-2">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[11px] text-slate-500">
                  Hoặc tiếp tục với
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-4 h-9 w-full gap-2"
              >
                <GoogleIcon className="size-4" />
                Google
              </Button>
            </div>

            <p className="pt-1 text-center text-xs text-slate-600">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="#"
                className="font-medium text-[#2580B9] hover:underline"
              >
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        <FloatingIconButton href="#" label="Chat">
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </FloatingIconButton>
        <FloatingIconButton href="tel:" label="Gọi điện">
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.86.3 1.7.57 2.5a2 2 0 0 1-.45 2.11L9.91 10.91a16 16 0 0 0 3.18 3.18l1.58-1.3a2 2 0 0 1 2.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
          </svg>
        </FloatingIconButton>
      </div>
    </div>
  );
}
