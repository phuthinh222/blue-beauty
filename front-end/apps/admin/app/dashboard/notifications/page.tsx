"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, Plus } from "lucide-react";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@repo/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

type NotificationStatus = "scheduled" | "sent";

type NotificationRow = {
  id: string;
  title: string;
  description: string;
  recipientsCount: number;
  scheduledAt: string; // display string
  status: NotificationStatus;
};

const MOCK_NOTIFICATIONS: NotificationRow[] = Array.from({ length: 18 }).map(
  (_, i) => {
    const idx = i + 1;
    const scheduled = idx % 2 === 1;
    return {
      id: String(idx),
      title: "Chương trình giảm giá",
      description:
        "Voucher giảm giá 15% cho các dịch vụ là một ưu đãi đặc biệt dành cho khách hàng, ...",
      recipientsCount: 15,
      scheduledAt: "15:00 (15/10/2024)",
      status: scheduled ? "scheduled" : "sent",
    };
  },
);

function StatusBadge({ status }: { status: NotificationStatus }) {
  return status === "sent" ? (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700"
    >
      <span className="text-[10px] leading-none">●</span>
      Đã gửi
    </Badge>
  ) : (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-violet-50 px-3 py-1 text-violet-700"
    >
      <span className="text-[10px] leading-none">●</span>
      Đã lên lịch
    </Badge>
  );
}

export default function NotificationsPage() {
  const [rows] = React.useState(MOCK_NOTIFICATIONS);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [detailTarget, setDetailTarget] =
    React.useState<NotificationRow | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.title, r.description, String(r.recipientsCount), r.scheduledAt].some(
        (x) => String(x).toLowerCase().includes(q),
      ),
    );
  }, [rows, query]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  React.useEffect(() => setPage(1), [query]);

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-slate-800">
            Danh sách thông báo cho khách hàng
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Link
              href="/dashboard"
              className="cursor-pointer font-medium text-[#257CBA] hover:underline"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-500">Thông báo</span>
          </div>
        </div>

        <Link href="/dashboard/notifications/new" className="shrink-0">
          <Button className="h-10 cursor-pointer rounded-lg bg-[#257CBA] px-4 font-semibold hover:bg-[#1F6FA1]">
            <Plus className="size-4" />
            Tạo mới
          </Button>
        </Link>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 w-full max-w-[420px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm thông báo..."
              className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[220px]">Nội dung thông báo</TableHead>
                  <TableHead>Mô tả thông báo</TableHead>
                  <TableHead className="w-[160px] text-center">
                    Số lượng người nhận
                  </TableHead>
                  <TableHead className="w-[180px] text-center">
                    Thời gian gửi
                  </TableHead>
                  <TableHead className="w-[140px] text-center">
                    Tình trạng
                  </TableHead>
                  <TableHead className="w-[100px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium text-slate-900">
                      {r.title}
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                        {r.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-center text-slate-700">
                      {r.recipientsCount} (người)
                    </TableCell>
                    <TableCell className="text-center text-slate-700">
                      {r.scheduledAt}
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 cursor-pointer rounded-full bg-slate-100 hover:bg-slate-200"
                        aria-label="Detail"
                        onClick={() => setDetailTarget(r)}
                      >
                        <Eye className="size-4 text-slate-700" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    className={`h-9 w-9 ${safePage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                  >
                    ‹
                  </PaginationLink>
                </PaginationItem>

                {Array.from({ length: totalPages }).slice(0, 5).map((_, idx) => {
                  const n = idx + 1;
                  return (
                    <PaginationItem key={n}>
                      <PaginationLink
                        href="#"
                        isActive={n === safePage}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(n);
                        }}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={false}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={`h-9 w-9 ${safePage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                  >
                    ›
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(detailTarget)}
        onOpenChange={() => setDetailTarget(null)}
      >
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Chi tiết thông báo</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Tiêu đề:</p>
              <p className="text-sm font-semibold text-slate-900">
                {detailTarget?.title}
              </p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Mô tả:</p>
              <p className="text-sm text-slate-700">{detailTarget?.description}</p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Người nhận:</p>
              <p className="text-sm text-slate-700">
                {detailTarget?.recipientsCount} (người)
              </p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Thời gian:</p>
              <p className="text-sm text-slate-700">{detailTarget?.scheduledAt}</p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Tình trạng:</p>
              <div>{detailTarget ? <StatusBadge status={detailTarget.status} /> : null}</div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setDetailTarget(null)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

