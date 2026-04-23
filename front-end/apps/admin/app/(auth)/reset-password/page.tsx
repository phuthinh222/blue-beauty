import Link from "next/link";
import Image from "next/image";

import logo from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-7 pt-8 pb-7 sm:px-10">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-white">
              <Image src={logo} alt="Blue Beauty" className="h-10 w-auto" priority />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Blue Beauty</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Quên mật khẩu
              </h1>
            </div>
          </div>

          <p className="mt-5 text-[15px] leading-6 text-slate-600">
            Nhập email để nhận mã xác thực và tạo mật khẩu mới.
          </p>

          <div className="mt-7 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email"
                className="h-11 rounded-md border-slate-200 bg-white px-3.5 text-slate-700 placeholder:text-slate-400 focus-visible:border-slate-600 focus-visible:ring-0"
              />
            </div>

            <Button
              type="button"
              className="h-11 w-full bg-[#2580B9] text-white hover:bg-[#1F6FA1]"
            >
              Gửi yêu cầu
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm font-medium text-[#2580B9] hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

