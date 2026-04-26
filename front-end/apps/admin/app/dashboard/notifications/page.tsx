"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, Plus } from "lucide-react";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

import {
  DashboardListCard,
  DashboardPageHeader,
  DashboardSearchInput,
  DetailField,
  TableIconButton,
  TablePaginationControls,
} from "@/components/dashboard";
import { usePaginatedSlice } from "@/hooks/use-paginated-slice";

type NotificationStatus = "scheduled" | "sent";

type NotificationRow = {
  id: string;
  title: string;
  description: string;
  recipientsCount: number;
  scheduledAt: string;
  status: NotificationStatus;
};

const MOCK_NOTIFICATIONS: NotificationRow[] = Array.from({ length: 18 }).map(
  (_, i) => {
    const idx = i + 1;
    const scheduled = idx % 2 === 1;
    const day = String(((idx * 2 - 1) % 28) + 1).padStart(2, "0");
    return {
      id: String(idx),
      title: "Chương trình giảm giá",
      description:
        "Voucher giảm giá 15% cho các dịch vụ là một ưu đãi đặc biệt dành cho khách hàng, ...",
      recipientsCount: 15,
      scheduledAt: `${day}/10/2024`,
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

  const { totalPages, safePage, start, pageRows } = usePaginatedSlice(
    filtered,
    page,
  );

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Danh sách thông báo cho khách hàng"
        currentLabel="Thông báo"
        endContent={
          <Link href="/dashboard/notifications/new" className="shrink-0">
            <Button className="h-10 cursor-pointer rounded-lg bg-[#257CBA] px-4 font-semibold hover:bg-[#1F6FA1]">
              <Plus className="size-4" />
              Tạo mới
            </Button>
          </Link>
        }
      />

      <DashboardListCard>
        <div className="mb-4">
          <DashboardSearchInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm thông báo..."
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-14 min-w-14 text-center">STT</TableHead>
                <TableHead className="w-[220px]">Tiêu đề</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead className="w-[160px] text-center">
                  Số lượng(người)
                </TableHead>
                <TableHead className="w-[180px] text-center">
                  Thời gian
                </TableHead>
                <TableHead className="w-[140px] text-center">
                  Tình trạng
                </TableHead>
                <TableHead className="w-[100px] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((r, i) => (
                <TableRow key={r.id}>
                  <TableCell className="text-center text-slate-700 tabular-nums">
                    {start + i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {r.title}
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                      {r.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-center tabular-nums text-slate-700">
                    {r.recipientsCount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center text-sm text-slate-700">
                    {r.scheduledAt}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <TableIconButton
                      aria-label="Detail"
                      onClick={() => setDetailTarget(r)}
                    >
                      <Eye className="size-4 text-slate-700" />
                    </TableIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TablePaginationControls
          className="mt-4"
          safePage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </DashboardListCard>

      <Dialog
        open={Boolean(detailTarget)}
        onOpenChange={(open) => {
          if (!open) setDetailTarget(null);
        }}
      >
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Chi tiết thông báo</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="mt-3 space-y-0">
            <DetailField label="Tiêu đề:">
              <span className="font-semibold text-slate-900">
                {detailTarget?.title}
              </span>
            </DetailField>
            <DetailField label="Mô tả:">{detailTarget?.description}</DetailField>
            <DetailField label="Người nhận:">
              {detailTarget?.recipientsCount}
            </DetailField>
            <DetailField label="Thời gian:">
              {detailTarget?.scheduledAt}
            </DetailField>
            <DetailField label="Tình trạng:">
              {detailTarget ? <StatusBadge status={detailTarget.status} /> : null}
            </DetailField>
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
