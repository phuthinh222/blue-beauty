import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | Blue Beauty Admin",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

