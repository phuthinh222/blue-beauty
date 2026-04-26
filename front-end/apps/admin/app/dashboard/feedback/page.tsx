"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Eye, MoreHorizontal } from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
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

type FeedbackStatus = "pending" | "done";

type FeedbackRow = {
  id: string;
  user: string;
  topic: string;
  detail: string;
  status: FeedbackStatus;
};

const MOCK_FEEDBACK: FeedbackRow[] = Array.from({ length: 17 }).map((_, i) => {
  const idx = i + 1;
  return {
    id: String(idx),
    user: "Nguyễn Thị Vân Anh",
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
  const [detailTarget, setDetailTarget] = React.useState<FeedbackRow | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.user, r.topic, r.detail].some((x) =>
        String(x).toLowerCase().includes(q),
      ),
    );
  }, [rows, query]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <div className="mb-5">
        <h1 className="text-[28px] font-semibold tracking-tight text-slate-800">
          Danh sách phản hồi của khách hàng
        </h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <Link
            href="/dashboard"
            className="cursor-pointer font-medium text-[#257CBA] hover:underline"
          >
            Trang chủ
          </Link>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">Phản hồi</span>
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 w-full max-w-[420px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm người phản hồi, vấn đề..."
              className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[180px]">Người phản hồi</TableHead>
                  <TableHead className="w-[260px]">Vấn đề phản hồi</TableHead>
                  <TableHead>Mô tả cụ thể</TableHead>
                  <TableHead className="w-[180px] text-center">
                    Tình trạng
                  </TableHead>
                  <TableHead className="w-[120px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-slate-700">{r.user}</TableCell>
                    <TableCell className="text-slate-700">{r.topic}</TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                        {r.detail}
                      </p>
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
                            onClick={() => setDetailTarget(r)}
                          >
                            <Eye className="mr-2 size-4 text-slate-700" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
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
                            onClick={() =>
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
            <DialogTitle>Chi tiết phản hồi</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Người gửi:</p>
              <p className="text-sm font-semibold text-slate-900">
                {detailTarget?.user}
              </p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Vấn đề:</p>
              <p className="text-sm text-slate-700">{detailTarget?.topic}</p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Mô tả:</p>
              <p className="text-sm text-slate-700">{detailTarget?.detail}</p>
            </div>
            <div className="flex items-start gap-6 px-1 py-1.5">
              <p className="w-28 shrink-0 text-sm text-slate-600">Tình trạng:</p>
              <div>
                {detailTarget ? <StatusBadge status={detailTarget.status} /> : null}
              </div>
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

