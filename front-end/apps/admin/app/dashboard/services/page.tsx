"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Eye, MoreHorizontal, XCircle } from "lucide-react";

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
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

type ServiceStatus = "approved" | "pending" | "rejected";

type ServiceRow = {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  author: string;
  price: number;
  status: ServiceStatus;
  rejectReason?: string;
};

const MOCK_SERVICES: ServiceRow[] = [
  {
    id: "1",
    imageSrc: "/images/item1.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup nhẹ nhàng, tự nhiên phù hợp đi làm/đi chơi. Ưu tiên nền mỏng, bền màu, tôn da và giữ tone cả ngày.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "approved",
  },
  {
    id: "2",
    imageSrc: "/images/item2.jpg",
    name: "Makeup hằng ngày",
    description:
      "Phong cách trong trẻo, tập trung highlight và má hồng. Phù hợp chụp ảnh, đi sự kiện nhẹ hoặc hẹn hò.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "pending",
  },
  {
    id: "3",
    imageSrc: "/images/item3.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup tone tây nhẹ: mắt nâu khói, môi nude/đỏ gạch. Có thể tùy chỉnh theo concept và trang phục.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "approved",
  },
  {
    id: "4",
    imageSrc: "/images/item4.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup Hàn Quốc: nền glowy, mắt nhũ nhẹ, môi bóng. Ưu tiên vẻ trẻ trung, phù hợp nhiều độ tuổi.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "pending",
  },
  {
    id: "5",
    imageSrc: "/images/item5.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup dự tiệc: nhấn mắt, tạo khối rõ, giữ lâu. Có thể kèm gắn mi và tạo kiểu tóc đơn giản.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "approved",
  },
  {
    id: "6",
    imageSrc: "/images/item1.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup theo yêu cầu: tư vấn tone phù hợp, che khuyết điểm, tối ưu theo ánh sáng môi trường và thời gian di chuyển.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "pending",
  },
  {
    id: "7",
    imageSrc: "/images/item2.jpg",
    name: "Makeup hằng ngày",
    description:
      "Makeup tone hồng đào: trẻ trung, dễ phối đồ. Phù hợp chụp ảnh ngoài trời và đi chơi ban ngày.",
    author: "Nguyễn Thị Vân Anh",
    price: 199_000,
    status: "approved",
  },
];

function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

function StatusPill({ status }: { status: ServiceStatus }) {
  if (status === "approved") {
    return (
      <Badge
        variant="secondary"
        className="gap-1 rounded-full bg-[#EAF4FF] px-3 py-1 text-[#257CBA]"
      >
        <span className="text-[10px] leading-none">●</span>
        Đã duyệt
      </Badge>
    );
  }
  if (status === "rejected") {
    return (
      <Badge
        variant="secondary"
        className="gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-600"
      >
        <span className="text-[10px] leading-none">●</span>
        Từ chối
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-[#FFF7ED] px-3 py-1 text-[#F59E0B]"
    >
      <span className="text-[10px] leading-none">●</span>
      Đang xử lý
    </Badge>
  );
}

function StatMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-right">
      <p className="text-2xl font-semibold leading-none text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default function ServicesPage() {
  const [rows, setRows] = React.useState<ServiceRow[]>(MOCK_SERVICES);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [approveTarget, setApproveTarget] = React.useState<ServiceRow | null>(
    null,
  );
  const [rejectTarget, setRejectTarget] = React.useState<ServiceRow | null>(
    null,
  );
  const [rejectReason, setRejectReason] = React.useState("");
  const [detailTarget, setDetailTarget] = React.useState<ServiceRow | null>(
    null,
  );

  const approvedCount = rows.filter((r) => r.status === "approved").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.author, String(r.price)].some((x) =>
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
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-slate-800">
            Danh sách dịch vụ của thợ makeup
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Link
              href="/dashboard"
              className="cursor-pointer font-medium text-[#257CBA] hover:underline"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-500">Dịch vụ</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <StatMini label="Đã duyệt" value={approvedCount} />
          <StatMini label="Đang xử lý" value={pendingCount} />
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-[420px]">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm dịch vụ, người đăng..."
                className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[120px]">Hình ảnh</TableHead>
                  <TableHead className="w-[420px]">Tên dịch vụ</TableHead>
                  <TableHead>Người đăng</TableHead>
                  <TableHead>Đơn giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="relative h-32 w-40 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={r.imageSrc}
                          alt={r.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[420px]">
                      <p className="font-medium leading-5 text-slate-900">
                        {r.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-slate-500">
                        {r.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-slate-600">{r.author}</TableCell>
                    <TableCell className="text-slate-700">
                      {formatVnd(r.price)}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 cursor-pointer rounded-lg hover:bg-slate-100"
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

                          {r.status !== "approved" ? (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setApproveTarget(r)}
                              >
                                <CheckCircle2 className="mr-2 size-4 text-[#257CBA]" />
                                Duyệt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-rose-600 focus:text-rose-700"
                                onClick={() => {
                                  setRejectReason(r.rejectReason ?? "");
                                  setRejectTarget(r);
                                }}
                              >
                                <XCircle className="mr-2 size-4 text-rose-500" />
                                Từ chối
                              </DropdownMenuItem>
                            </>
                          ) : null}
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

                {Array.from({ length: totalPages })
                  .slice(0, 5)
                  .map((_, idx) => {
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
        open={Boolean(approveTarget)}
        onOpenChange={() => setApproveTarget(null)}
      >
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Xác nhận duyệt</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn duyệt dịch vụ{" "}
              <span className="font-medium text-slate-900">
                {approveTarget?.name}
              </span>{" "}
              không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setApproveTarget(null)}
            >
              Huỷ
            </Button>
            <Button
              className="cursor-pointer rounded-lg bg-[#257CBA] hover:bg-[#1F6FA1]"
              onClick={() => {
                if (!approveTarget) return;
                setRows((prev) =>
                  prev.map((x) =>
                    x.id === approveTarget.id
                      ? { ...x, status: "approved" }
                      : x,
                  ),
                );
                setApproveTarget(null);
              }}
            >
              Duyệt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(rejectTarget)}
        onOpenChange={() => setRejectTarget(null)}
      >
        <DialogContent className="max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Xác nhận từ chối</DialogTitle>
            <DialogDescription>
              Nhập lý do từ chối cho dịch vụ{" "}
              <span className="font-medium text-slate-900">
                {rejectTarget?.name}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
              className="h-10 rounded-lg border-slate-200 bg-white shadow-sm focus-visible:ring-0"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg"
              onClick={() => setRejectTarget(null)}
            >
              Huỷ
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer rounded-lg"
              disabled={!rejectReason.trim()}
              onClick={() => {
                if (!rejectTarget) return;
                const reason = rejectReason.trim();
                setRows((prev) =>
                  prev.map((x) =>
                    x.id === rejectTarget.id
                      ? { ...x, status: "rejected", rejectReason: reason }
                      : x,
                  ),
                );
                setRejectTarget(null);
              }}
            >
              Từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(detailTarget)}
        onOpenChange={() => setDetailTarget(null)}
      >
        <DialogContent className="max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Chi tiết dịch vụ</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-40 sm:w-56">
              {detailTarget ? (
                <Image
                  src={detailTarget.imageSrc}
                  alt={detailTarget.name}
                  fill
                  sizes="224px"
                  className="object-cover"
                  priority={false}
                />
              ) : null}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-4 px-1 py-1">
                <p className="w-28 shrink-0 text-sm text-slate-600">
                  Tên dịch vụ:
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {detailTarget?.name}
                </p>
              </div>
              <div className="flex items-start gap-4 px-1 py-1">
                <p className="w-28 shrink-0 text-sm text-slate-600">Mô tả:</p>
                <p className="text-sm text-slate-700">
                  {detailTarget?.description}
                </p>
              </div>
              <div className="flex items-start gap-4 px-1 py-1">
                <p className="w-28 shrink-0 text-sm text-slate-600">
                  Người đăng:
                </p>
                <p className="text-sm text-slate-700">{detailTarget?.author}</p>
              </div>
              <div className="flex items-start gap-4 px-1 py-1">
                <p className="w-28 shrink-0 text-sm text-slate-600">Đơn giá:</p>
                <p className="text-sm text-slate-700">
                  {detailTarget ? formatVnd(detailTarget.price) : ""}
                </p>
              </div>
              <div className="flex items-start gap-4 px-1 py-1">
                <p className="w-28 shrink-0 text-sm text-slate-600">
                  Trạng thái:
                </p>
                <div>
                  {detailTarget ? (
                    <StatusPill status={detailTarget.status} />
                  ) : null}
                </div>
              </div>
              {detailTarget?.status === "rejected" &&
              detailTarget.rejectReason ? (
                <div className="flex items-start gap-4 px-1 py-1">
                  <p className="w-28 shrink-0 text-sm text-slate-600">Lý do:</p>
                  <p className="text-sm text-slate-700">
                    {detailTarget.rejectReason}
                  </p>
                </div>
              ) : null}
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
