"use client";

import * as React from "react";
import { CheckCircle2, Clock3, Eye, MoreHorizontal } from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
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
  TablePaginationControls,
} from "@/components/dashboard";
import { usePaginatedSlice } from "@/hooks/use-paginated-slice";

type FeedbackStatus = "pending" | "done";

type FeedbackRow = {
  id: string;
  user: string;
  createdAt: string;
  topic: string;
  detail: string;
  status: FeedbackStatus;
};

const MOCK_FEEDBACK: FeedbackRow[] = Array.from({ length: 17 }).map((_, i) => {
  const idx = i + 1;
  const day = String(((idx * 2 - 1) % 28) + 1).padStart(2, "0");
  return {
    id: String(idx),
    user: "Nguyễn Thị Vân Anh",
    createdAt: `${day}/10/2024`,
    topic: "Đăng ký, đăng nhập của hệ thống",
    detail:
      "Khi tôi đăng nhập hệ thống load hơi chậm và thao tác gặp chút khó khăn",
    status: idx % 2 === 0 ? "done" : "pending",
  };
});

function StatusBadge({ status }: { status: FeedbackStatus }) {
  return status === "done" ? (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700"
    >
      <span className="text-[10px] leading-none">●</span>
      Đã xử lý
    </Badge>
  ) : (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-[#FFF7ED] px-3 py-1 text-[#F59E0B]"
    >
      <span className="text-[10px] leading-none">●</span>
      Đang xử lý
    </Badge>
  );
}

export default function FeedbackPage() {
  const [rows, setRows] = React.useState<FeedbackRow[]>(MOCK_FEEDBACK);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [detailTarget, setDetailTarget] = React.useState<FeedbackRow | null>(
    null,
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.user, r.createdAt, r.topic, r.detail].some((x) =>
        String(x).toLowerCase().includes(q),
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
        title="Danh sách phản hồi của khách hàng"
        currentLabel="Phản hồi"
      />

      <DashboardListCard>
        <div className="mb-4">
          <DashboardSearchInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm người phản hồi, vấn đề..."
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-14 min-w-14 text-center">STT</TableHead>
                <TableHead className="w-[180px]">Người tạo</TableHead>
                <TableHead className="w-[260px]">Vấn đề</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead className="whitespace-nowrap">Ngày tạo</TableHead>
                <TableHead className="w-[180px] text-center">
                  Tình trạng
                </TableHead>
                <TableHead className="w-[120px] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((r, i) => (
                <TableRow key={r.id}>
                  <TableCell className="text-center text-slate-700 tabular-nums">
                    {start + i + 1}
                  </TableCell>
                  <TableCell className="text-slate-700">{r.user}</TableCell>
                  <TableCell className="text-slate-700">{r.topic}</TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                      {r.detail}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-slate-600">
                    {r.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <StatusBadge status={r.status} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-full bg-slate-100 hover:bg-slate-200"
                          aria-label="Actions"
                        >
                          <MoreHorizontal className="size-4 text-slate-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={() => setDetailTarget(r)}
                        >
                          <Eye className="mr-2 size-4 text-slate-700" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={() =>
                            setRows((prev) =>
                              prev.map((x) =>
                                x.id === r.id ? { ...x, status: "pending" } : x,
                              ),
                            )
                          }
                          disabled={r.status === "pending"}
                        >
                          <Clock3 className="mr-2 size-4 text-[#F59E0B]" />
                          Đang xử lý
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={() =>
                            setRows((prev) =>
                              prev.map((x) =>
                                x.id === r.id ? { ...x, status: "done" } : x,
                              ),
                            )
                          }
                          disabled={r.status === "done"}
                        >
                          <CheckCircle2 className="mr-2 size-4 text-emerald-600" />
                          Đã xử lý
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <DialogTitle>Chi tiết phản hồi</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="mt-3 space-y-0">
            <DetailField label="Người gửi:">
              <span className="font-semibold text-slate-900">
                {detailTarget?.user}
              </span>
            </DetailField>
            <DetailField label="Ngày tạo:">{detailTarget?.createdAt}</DetailField>
            <DetailField label="Vấn đề:">{detailTarget?.topic}</DetailField>
            <DetailField label="Mô tả:">{detailTarget?.detail}</DetailField>
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
