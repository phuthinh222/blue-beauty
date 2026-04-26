"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, Eye, MoreHorizontal, XCircle } from "lucide-react";

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
import { Input } from "@repo/ui/input";
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
  ImageLightbox,
  StatMini,
  TablePaginationControls,
} from "@/components/dashboard";
import { usePaginatedSlice } from "@/hooks/use-paginated-slice";

type ServiceStatus = "approved" | "pending" | "rejected";

type ServiceRow = {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  author: string;
  createdAt: string;
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
    createdAt: "02/10/2024",
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
    createdAt: "05/10/2024",
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
    createdAt: "08/10/2024",
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
    createdAt: "10/10/2024",
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
    createdAt: "12/10/2024",
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
    createdAt: "14/10/2024",
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
    createdAt: "18/10/2024",
    price: 199_000,
    status: "approved",
  },
  {
    id: "8",
    imageSrc: "/images/item3.jpg",
    name: "Makeup cô dâu lễ gia tiên",
    description:
      "Trang điểm cô dâu truyền thống, bền màu cả ngày, tôn nét dịu dàng. Kèm chỉnh sửa nhẹ theo áo dài và phụ kiện.",
    author: "Trần Bảo Ngọc",
    createdAt: "20/10/2024",
    price: 1_200_000,
    status: "pending",
  },
  {
    id: "9",
    imageSrc: "/images/item4.jpg",
    name: "Makeup dự tiệc tối",
    description:
      "Look sang trọng cho tiệc tối: khối sắc nét, mắt smokey nhẹ hoặc ánh kim tùy concept. Phù hợp ánh đèn trong nhà.",
    author: "Phạm Thu Hà",
    createdAt: "22/10/2024",
    price: 450_000,
    status: "approved",
  },
  {
    id: "10",
    imageSrc: "/images/item5.jpg",
    name: "Makeup chụp lookbook / thương hiệu",
    description:
      "Makeup cho chụp hình thương mại: finish sạch, không lệch tone dưới đèn studio. Có thể điều chỉnh theo moodboard.",
    author: "Nguyễn Thị Vân Anh",
    createdAt: "25/10/2024",
    price: 650_000,
    status: "rejected",
    rejectReason: "Ảnh minh họa chưa đạt yêu cầu độ phân giải.",
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
  const [imagePreview, setImagePreview] = React.useState<{
    src: string;
    alt: string;
  } | null>(null);

  const closeLightbox = React.useCallback(() => setImagePreview(null), []);

  const approvedCount = rows.filter((r) => r.status === "approved").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.author, r.createdAt, String(r.price)].some((x) =>
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
        title="Danh sách dịch vụ của thợ makeup"
        currentLabel="Dịch vụ"
        endContent={
          <div className="flex items-center gap-10">
            <StatMini label="Đã duyệt" value={approvedCount} />
            <StatMini label="Đang xử lý" value={pendingCount} />
          </div>
        }
      />

      <DashboardListCard>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <DashboardSearchInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm dịch vụ, người đăng..."
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-14 min-w-14 text-center">STT</TableHead>
                <TableHead className="w-[240px]">Hình ảnh</TableHead>
                <TableHead className="w-[420px]">Tên dịch vụ</TableHead>
                <TableHead>Người đăng</TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead className="whitespace-nowrap">Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((r, i) => (
                <TableRow key={r.id}>
                  <TableCell className="text-center text-slate-700 tabular-nums">
                    {start + i + 1}
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="relative block h-44 w-56 cursor-pointer overflow-hidden rounded-lg bg-slate-100 p-0 ring-offset-2 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#257CBA]/50"
                      onClick={() =>
                        setImagePreview({ src: r.imageSrc, alt: r.name })
                      }
                      aria-label={`Phóng to ảnh: ${r.name}`}
                    >
                      <Image
                        src={r.imageSrc}
                        alt={r.name}
                        fill
                        sizes="224px"
                        className="object-cover"
                        priority={false}
                      />
                    </button>
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
                  <TableCell className="whitespace-nowrap text-sm text-slate-600">
                    {r.createdAt}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
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
                          {r.status !== "approved" ? (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={() => setApproveTarget(r)}
                              >
                                <CheckCircle2 className="mr-2 size-4 text-[#257CBA]" />
                                Duyệt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-rose-600 focus:text-rose-700"
                                onSelect={() => {
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
        open={Boolean(approveTarget)}
        onOpenChange={(open) => {
          if (!open) setApproveTarget(null);
        }}
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
        onOpenChange={(open) => {
          if (!open) setRejectTarget(null);
        }}
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
        onOpenChange={(open) => {
          if (!open) setDetailTarget(null);
        }}
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

            <div className="flex-1 space-y-0">
              <DetailField label="Tên dịch vụ:">
                <span className="font-semibold text-slate-900">
                  {detailTarget?.name}
                </span>
              </DetailField>
              <DetailField label="Mô tả:">
                {detailTarget?.description}
              </DetailField>
              <DetailField label="Người đăng:">
                {detailTarget?.author}
              </DetailField>
              <DetailField label="Ngày tạo:">
                {detailTarget?.createdAt}
              </DetailField>
              <DetailField label="Đơn giá:">
                {detailTarget ? formatVnd(detailTarget.price) : ""}
              </DetailField>
              <DetailField label="Trạng thái:">
                {detailTarget ? <StatusPill status={detailTarget.status} /> : null}
              </DetailField>
              {detailTarget?.status === "rejected" &&
              detailTarget.rejectReason ? (
                <DetailField label="Lý do:">
                  {detailTarget.rejectReason}
                </DetailField>
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

      {imagePreview ? (
        <ImageLightbox
          src={imagePreview.src}
          alt={imagePreview.alt}
          onClose={closeLightbox}
        />
      ) : null}
    </main>
  );
}
