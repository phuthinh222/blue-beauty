"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, MessageCircle, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import logo from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Checkbox } from "@repo/ui/checkbox";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Separator } from "@repo/ui/separator";

import { ApiError } from "../../../lib/api";
import { loginAdmin } from "../../../lib/auth";

const PRIMARY_BTN_CLASS = "bg-[#2580B9] text-white hover:bg-[#1F6FA1]";
const INPUT_CLASS =
  "h-9 rounded border-slate-200 bg-white px-3 text-sm text-slate-800 focus-visible:ring-0";
const FAB_CLASS =
  "size-12 rounded-full bg-[#2580B9] text-white shadow-lg ring-1 ring-black/5 hover:bg-[#1F6FA1]";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  // Keep as SVG to match the brand mark exactly.
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

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState("admin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const didAutoLoginRef = React.useRef(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const safeUsername = username.trim();
    if (!safeUsername || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginAdmin({ username: safeUsername, password });

      if (res.accessToken) {
        if (rememberMe) {
          localStorage.setItem("admin_access_token", res.accessToken);
          sessionStorage.removeItem("admin_access_token");
        } else {
          sessionStorage.setItem("admin_access_token", res.accessToken);
          localStorage.removeItem("admin_access_token");
        }
      }

      toast.success("Đăng nhập thành công");
      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Sai tài khoản hoặc mật khẩu.");
        } else if (err.status === 400) {
          setError(err.message || "Dữ liệu đăng nhập không hợp lệ.");
        } else {
          setError(err.message || "Hệ thống đang bận. Vui lòng thử lại.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (didAutoLoginRef.current) return;
    didAutoLoginRef.current = true;

    // Auto-login once on page load for dev/demo.
    const loggedOut =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("logged_out") === "1";
    if (!loggedOut) {
      onSubmit({ preventDefault() {} } as unknown as React.FormEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-white">
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-10">
        <div className="mb-6 flex flex-col items-center">
          <div className="grid size-28 place-items-center rounded-full bg-white">
            <Image
              src={logo}
              alt="Blue Beauty"
              className="h-24 w-24"
              priority
            />
          </div>
          <h1 className="mt-3 text-lg font-semibold text-slate-900">
            Đăng nhập
          </h1>
        </div>

        <Card className="w-full max-w-[380px] border-slate-200 shadow-sm">
          <CardContent className="px-7 py-8">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-xs font-medium text-slate-700"
                >
                  Tên tài khoản
                </Label>
                <Input
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-700"
                >
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${INPUT_CLASS} pr-10`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(Boolean(v))}
                  />
                  Remember me
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs text-[#2580B9] hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isLoading}
                className={`h-9 w-full ${PRIMARY_BTN_CLASS}`}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
          </CardContent>
        </Card>
      </div>

      <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        <Button
          asChild
          size="icon"
          className={FAB_CLASS}
          aria-label="Chat"
        >
          <a href="#">
            <MessageCircle className="size-6" />
          </a>
        </Button>

        <Button
          asChild
          size="icon"
          className={FAB_CLASS}
          aria-label="Gọi điện"
        >
          <a href="tel:">
            <Phone className="size-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}
