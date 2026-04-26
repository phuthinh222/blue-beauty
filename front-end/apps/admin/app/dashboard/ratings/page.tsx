"use client";

import * as React from "react";
import { EyeOff, Star as StarIcon, Trash2 } from "lucide-react";

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
  TableIconButton,
  TablePaginationControls,
} from "@/components/dashboard";
import { usePaginatedSlice } from "@/hooks/use-paginated-slice";

type RatingRow = {
  id: string;
  reviewer: string;
  content: string;
  score: number;
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
            {filled || half ? (
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
  const [deleteTarget, setDeleteTarget] = React.useState<RatingRow | null>(
    null,
  );
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

  const { totalPages, safePage, start, pageRows } = usePaginatedSlice(
    filtered,
    page,
  );

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Danh sách đánh giá của khách hàng"
        currentLabel="Đánh giá"
      />

      <DashboardListCard>
        <div className="mb-4">
          <DashboardSearchInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm người đánh giá, dịch vụ..."
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-14 min-w-14 text-center">STT</TableHead>
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
              {pageRows.map((r, i) => (
                <TableRow key={r.id} className={r.hidden ? "opacity-80" : ""}>
                  <TableCell className="text-center text-slate-700 tabular-nums">
                    {start + i + 1}
                  </TableCell>
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
                      <TableIconButton
                        aria-label="Hide"
                        onClick={() => setHideTarget(r)}
                      >
                        <EyeOff className="size-4 text-slate-700" />
                      </TableIconButton>
                      <TableIconButton
                        aria-label="Delete"
                        className="bg-rose-50 hover:bg-rose-100"
                        onClick={() => setDeleteTarget(r)}
                      >
                        <Trash2 className="size-4 text-rose-500" />
                      </TableIconButton>
                    </div>
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
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
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

      <Dialog
        open={Boolean(hideTarget)}
        onOpenChange={(open) => {
          if (!open) setHideTarget(null);
        }}
      >
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
