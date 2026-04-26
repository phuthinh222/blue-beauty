"use client";

import * as React from "react";
import Link from "next/link";
import { EyeOff, Star as StarIcon, Trash2 } from "lucide-react";

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

type RatingRow = {
  id: string;
  reviewer: string;
  content: string;
  score: number; // 0..5
  serviceName: string;
  artistName: string;
  hidden?: boolean;
};

const MOCK_RATINGS: RatingRow[] = Array.from({ length: 23 }).map((_, i) => {
  const idx = i + 1;
  return {
    id: String(idx),
    reviewer: "Nguyễn Thị Vân Anh",
    content:
      "Nhân viên của BLUE thân thiện, nhiệt tình, tư vấn layout rất hợp với mình và dịch vụ quá tuyệt vời",
    score: 4.5,
    serviceName: "Trang điểm make up cô dâu lễ gia tiên",
    artistName: "Nguyễn Thị Vân Anh",
    hidden: idx % 5 === 0,
  };
});

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full;
        const half = i === full && hasHalf;
        return (
          <span key={i} className="relative inline-flex">
            <StarIcon
              className="size-4 text-slate-300"
              fill="currentColor"
            />
            {(filled || half) ? (
              <StarIcon
                className="absolute left-0 top-0 size-4 text-amber-400"
                fill="currentColor"
                style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export default function RatingsPage() {
  const [rows, setRows] = React.useState<RatingRow[]>(MOCK_RATINGS);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [deleteTarget, setDeleteTarget] = React.useState<RatingRow | null>(null);
  const [hideTarget, setHideTarget] = React.useState<RatingRow | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.reviewer, r.content, r.serviceName, r.artistName].some((x) =>
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
          Danh sách đánh giá của khách hàng
        </h1>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <Link
            href="/dashboard"
            className="cursor-pointer font-medium text-[#257CBA] hover:underline"
          >
            Trang chủ
          </Link>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">Đánh giá</span>
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 w-full max-w-[420px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm người đánh giá, dịch vụ..."
              className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[160px]">Người đánh giá</TableHead>
                  <TableHead className="w-[320px]">Mô tả đánh giá</TableHead>
                  <TableHead className="w-[170px] text-center">
                    Mức độ hài lòng
                  </TableHead>
                  <TableHead className="w-[240px]">Tên dịch vụ</TableHead>
                  <TableHead className="w-[180px]">Thợ makeup</TableHead>
                  <TableHead className="w-[120px] text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((r) => (
                  <TableRow key={r.id} className={r.hidden ? "opacity-80" : ""}>
                    <TableCell className="text-slate-700">{r.reviewer}</TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                        {r.content}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-sm font-semibold text-slate-800">
                          {r.score.toFixed(1)}
                        </span>
                        <Stars value={r.score} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-xs leading-5 text-slate-600">
                        {r.serviceName}
                      </p>
                    </TableCell>
                    <TableCell className="text-slate-700">{r.artistName}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-full bg-slate-100 hover:bg-slate-200"
                          aria-label="Hide"
                          onClick={() => setHideTarget(r)}
                        >
                          <EyeOff className="size-4 text-slate-700" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 cursor-pointer rounded-full bg-rose-50 hover:bg-rose-100"
                          aria-label="Delete"
                          onClick={() => setDeleteTarget(r)}
                        >
                          <Trash2 className="size-4 text-rose-500" />
                        </Button>
                      </div>
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

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xoá</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xoá đánh giá của{" "}
              <span className="font-medium text-slate-900">
                {deleteTarget?.reviewer}
              </span>{" "}
              không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setDeleteTarget(null)}
            >
              Huỷ
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer rounded-lg"
              onClick={() => {
                if (!deleteTarget) return;
                setRows((prev) => prev.filter((x) => x.id !== deleteTarget.id));
                setDeleteTarget(null);
              }}
            >
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(hideTarget)} onOpenChange={() => setHideTarget(null)}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>
              {hideTarget?.hidden ? "Bỏ ẩn đánh giá" : "Ẩn đánh giá"}
            </DialogTitle>
            <DialogDescription>
              {hideTarget?.hidden
                ? "Đánh giá sẽ hiển thị lại với khách hàng."
                : "Đánh giá sẽ bị ẩn khỏi giao diện khách hàng."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setHideTarget(null)}
            >
              Huỷ
            </Button>
            <Button
              className="cursor-pointer rounded-lg bg-[#257CBA] hover:bg-[#1F6FA1]"
              onClick={() => {
                if (!hideTarget) return;
                setRows((prev) =>
                  prev.map((x) =>
                    x.id === hideTarget.id ? { ...x, hidden: !x.hidden } : x,
                  ),
                );
                setHideTarget(null);
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

