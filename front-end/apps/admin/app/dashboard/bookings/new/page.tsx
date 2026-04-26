"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@repo/ui/button";

import { DashboardListCard, DashboardPageHeader } from "@/components/dashboard";

export default function NewBookingPage() {
  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Tạo đặt lịch mới"
        breadcrumbs={[
          { label: "Đặt lịch", href: "/dashboard/bookings" },
          { label: "Tạo mới" },
        ]}
      />

      <DashboardListCard>
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-slate-600">
            Form tạo đặt lịch sẽ được bổ sung khi có API. Hiện tại bạn có thể
            quay lại danh sách để quản lý các lịch đã có.
          </p>
          <Button
            asChild
            variant="outline"
            className="cursor-pointer rounded-lg"
          >
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
      </DashboardListCard>
    </main>
  );
}
