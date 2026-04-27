import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu | Blue Beauty",
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

