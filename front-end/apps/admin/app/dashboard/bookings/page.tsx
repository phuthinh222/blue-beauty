"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Eye, MapPin, Plus, XCircle } from "lucide-react";

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
  DashboardListCard,
  DashboardPageHeader,
  DashboardSearchInput,
  DetailField,
  TablePaginationControls,
} from "@/components/dashboard";
import { usePaginatedSlice } from "@/hooks/use-paginated-slice";
import { formatDateBlock, formatVnd } from "@/lib/dashboard/booking-format";

type BookingStatus = "pending" | "approved" | "rejected";

type BookingRow = {
  id: string;
  customerName: string;
  artistName: string;
  concept: string;
  totalPrice: number;
  status: BookingStatus;
  /** ISO datetime for the appointment */
  bookingAt: string;
  createdAtLabel: string;
  location: string;
  rejectReason?: string;
};

function StatusLine({ status }: { status: BookingStatus }) {
  if (status === "approved") {
    return (
      <p className="flex items-center gap-2 text-sm text-slate-700">
        <span className="text-slate-600">Tình trạng:</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
          <CheckCircle2 className="size-4 shrink-0" />
          Đã xác nhận
        </span>
      </p>
    );
  }
  if (status === "rejected") {
    return (
      <p className="flex items-center gap-2 text-sm text-slate-700">
        <span className="text-slate-600">Tình trạng:</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600">
          <XCircle className="size-4 shrink-0" />
          Từ chối
        </span>
      </p>
    );
  }
  return (
    <p className="flex items-center gap-2 text-sm text-slate-700">
      <span className="text-slate-600">Tình trạng:</span>
      <span className="inline-flex items-center gap-1.5 font-medium text-amber-600">
        <Clock3 className="size-4 shrink-0" />
        Đang chờ
      </span>
    </p>
  );
}

function StatusBadgeModal({ status }: { status: BookingStatus }) {
  if (status === "approved") {
    return (
      <Badge
        variant="secondary"
        className="gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700"
      >
        <CheckCircle2 className="size-3.5" />
        Đã xác nhận
      </Badge>
    );
  }
  if (status === "rejected") {
    return (
      <Badge
        variant="secondary"
        className="gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-700"
      >
        <XCircle className="size-3.5" />
        Từ chối
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700"
    >
      <Clock3 className="size-3.5" />
      Đang chờ
    </Badge>
  );
}

const MOCK_BOOKINGS: BookingRow[] = [
  {
    id: "1",
    customerName: "Trần Thị Nguyên Hoài",
    artistName: "Nguyễn Thị Vân Anh",
    concept: "Sự kiện",
    totalPrice: 500_000,
    status: "pending",
    bookingAt: "2024-10-05T10:00:00+07:00",
    createdAtLabel: "15/10/2024 10:00",
    location: "Quận Sơn Trà, Đà Nẵng",
  },
  {
    id: "2",
    customerName: "Lê Minh Khang",
    artistName: "Phạm Thu Hà",
    concept: "Cưới hỏi",
    totalPrice: 2_500_000,
    status: "approved",
    bookingAt: "2024-10-12T14:30:00+07:00",
    createdAtLabel: "10/10/2024 09:15",
    location: "Quận Hải Châu, Đà Nẵng",
  },
  {
    id: "3",
    customerName: "Hoàng Thị Mai",
    artistName: "Nguyễn Thị Vân Anh",
    concept: "Chụp ảnh profile",
    totalPrice: 350_000,
    status: "rejected",
    bookingAt: "2024-10-08T08:00:00+07:00",
    createdAtLabel: "02/10/2024 16:40",
    location: "Quận Ngũ Hành Sơn, Đà Nẵng",
    rejectReason: "Thợ không còn lịch trống.",
  },
  {
    id: "4",
    customerName: "Đặng Quốc An",
    artistName: "Trần Bảo Ngọc",
    concept: "Đi làm hằng ngày",
    totalPrice: 199_000,
    status: "pending",
    bookingAt: "2024-10-20T07:30:00+07:00",
    createdAtLabel: "18/10/2024 11:20",
    location: "Quận Thanh Khê, Đà Nẵng",
  },
  {
    id: "5",
    customerName: "Võ Thị Kim Liên",
    artistName: "Phạm Thu Hà",
    concept: "Dự tiệc tối",
    totalPrice: 890_000,
    status: "approved",
    bookingAt: "2024-10-25T18:00:00+07:00",
    createdAtLabel: "19/10/2024 08:05",
    location: "Quận Liên Chiểu, Đà Nẵng",
  },
  {
    id: "6",
    customerName: "Nguyễn Hữu Phước",
    artistName: "Nguyễn Thị Vân Anh",
    concept: "Sự kiện",
    totalPrice: 650_000,
    status: "pending",
    bookingAt: "2024-10-28T09:00:00+07:00",
    createdAtLabel: "20/10/2024 14:00",
    location: "Quận Cẩm Lệ, Đà Nẵng",
  },
];

export default function BookingsPage() {
  const [rows] = React.useState<BookingRow[]>(MOCK_BOOKINGS);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [detailTarget, setDetailTarget] = React.useState<BookingRow | null>(
    null,
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [
        r.customerName,
        r.artistName,
        r.concept,
        r.location,
        formatVnd(r.totalPrice),
      ].some((x) => String(x).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const { totalPages, safePage, pageRows } = usePaginatedSlice(filtered, page);

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <DashboardPageHeader
        title="Danh sách đặt lịch của khách hàng"
        currentLabel="Đặt lịch"
        endContent={
          <Button
            asChild
            className="h-10 cursor-pointer rounded-lg bg-[#257CBA] px-5 hover:bg-[#1F6FA1]"
          >
            <Link
              href="/dashboard/bookings/new"
              className="inline-flex items-center gap-2"
            >
              <Plus className="size-4" />
              Tạo mới
            </Link>
          </Button>
        }
      />

      <DashboardListCard>
        <DashboardSearchInput
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm kiếm khách hàng, thợ makeup, địa điểm..."
          wrapperClassName="mb-5"
        />

          <div className="flex flex-col gap-4">
            {pageRows.map((r) => {
              const block = formatDateBlock(r.bookingAt);
              return (
                <div
                  key={r.id}
                  className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex w-[140px] shrink-0 flex-col items-center justify-center gap-1 bg-[#E8F3FC] px-3 py-5 text-[#1F6FA1] sm:w-[160px]">
                    <p className="text-center text-xs font-medium leading-tight">
                      {block.monthYear}
                    </p>
                    <p className="text-4xl font-bold leading-none tracking-tight">
                      {block.day}
                    </p>
                    <p className="text-sm font-medium">{block.weekday}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
                      <Clock3 className="size-4 shrink-0" />
                      {block.time}
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-4 sm:flex-row sm:p-5">
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="text-lg font-semibold text-slate-900">
                        {r.customerName}
                      </p>
                      <div className="space-y-1.5 text-sm">
                        <p className="text-slate-700">
                          <span className="text-slate-600">Thợ makeup:</span>{" "}
                          <span className="font-medium text-slate-900">
                            {r.artistName}
                          </span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-slate-600">Concept:</span>{" "}
                          <span className="font-medium text-slate-900">
                            {r.concept}
                          </span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-slate-600">Tổng tiền:</span>{" "}
                          <span className="font-medium text-slate-900">
                            {formatVnd(r.totalPrice)}
                          </span>
                        </p>
                        <StatusLine status={r.status} />
                        {r.status === "rejected" ? (
                          <p className="text-slate-700">
                            <span className="text-slate-600">Lý do:</span>{" "}
                            <span className="font-medium text-slate-900">
                              {r.rejectReason?.trim()
                                ? r.rejectReason
                                : "—"}
                            </span>
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-1 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-1">
                        <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                          <span className="shrink-0 font-medium text-slate-600">
                            Thời gian tạo:
                          </span>
                          <Clock3 className="size-3.5 shrink-0 text-slate-400" />
                          <span className="text-slate-600">{r.createdAtLabel}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5 shrink-0 text-slate-400" />
                          {r.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-start gap-2 sm:flex-col sm:items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer rounded-lg border-[#257CBA] text-[#257CBA] hover:bg-[#E8F3FC]"
                        onClick={() => setDetailTarget(r)}
                      >
                        <Eye className="mr-2 size-4" />
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        <TablePaginationControls
          className="mt-6"
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
        <DialogContent className="max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt lịch</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          {detailTarget ? (
            <div className="mt-2 space-y-3 text-left">
              <DetailField label="Khách hàng:">
                <span className="font-semibold text-slate-900">
                  {detailTarget.customerName}
                </span>
              </DetailField>
              <DetailField label="Thợ makeup:">
                {detailTarget.artistName}
              </DetailField>
              <DetailField label="Concept:">{detailTarget.concept}</DetailField>
              <DetailField label="Tổng tiền:">
                {formatVnd(detailTarget.totalPrice)}
              </DetailField>
              <DetailField label="Thời gian hẹn:">
                {formatDateBlock(detailTarget.bookingAt).monthYear} — ngày{" "}
                {formatDateBlock(detailTarget.bookingAt).day},{" "}
                {formatDateBlock(detailTarget.bookingAt).weekday},{" "}
                {formatDateBlock(detailTarget.bookingAt).time}
              </DetailField>
              <DetailField label="Thời gian tạo:">
                {detailTarget.createdAtLabel}
              </DetailField>
              <DetailField label="Địa điểm:">
                {detailTarget.location}
              </DetailField>
              <DetailField label="Tình trạng:">
                <StatusBadgeModal status={detailTarget.status} />
              </DetailField>
              {detailTarget.status === "rejected" ? (
                <DetailField label="Lý do:">
                  {detailTarget.rejectReason?.trim()
                    ? detailTarget.rejectReason
                    : "—"}
                </DetailField>
              ) : null}
            </div>
          ) : null}

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
