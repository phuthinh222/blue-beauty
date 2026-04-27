import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký | Blue Beauty",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

