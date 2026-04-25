"use client";

import * as React from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Button } from "@repo/ui/button";
import { Card, CardContent } from "@repo/ui/card";
import { Separator } from "@repo/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Badge } from "@repo/ui/badge";
import { cn } from "@repo/ui/lib/utils";

type StylistRow = {
  name: string;
  address: string;
  email: string;
  phone: string;
  concept: string;
  status: string;
};

type PieRow = { name: string; value: number; color: string };

type TopStyle = {
  initials: string;
  name: string;
  type: string;
  avatarSrc: string;
  heroSrc: string;
};

const STYLISTS: StylistRow[] = [
  {
    name: "Nguyễn Thị Tuyết",
    address: "Đà Nẵng, Việt Nam",
    email: "stanley.j@hotmail.com",
    phone: "0123456789",
    concept: "Hằng ngày",
    status: "Đang hoạt động",
  },
  {
    name: "Đỗ Hải Nam",
    address: "Đà Nẵng, Việt Nam",
    email: "jone.blake@hotmail.com",
    phone: "0123456789",
    concept: "Hằng ngày",
    status: "Đang hoạt động",
  },
  {
    name: "Nguyễn Thị Như Quỳnh",
    address: "Đà Nẵng, Việt Nam",
    email: "jeanette.r@gmail.com",
    phone: "0123456789",
    concept: "Chụp ảnh",
    status: "Đang hoạt động",
  },
  {
    name: "Trần Thị Thu Trang",
    address: "Đà Nẵng, Việt Nam",
    email: "ferguson.o@hotmail.com",
    phone: "0123456789",
    concept: "Sự kiện",
    status: "Đang hoạt động",
  },
  {
    name: "Châu Thị Hải Yến",
    address: "Đà Nẵng, Việt Nam",
    email: "west.sylvia@gmail.com",
    phone: "0123456789",
    concept: "Du lịch",
    status: "Đang hoạt động",
  },
];

const PIE_DATA: PieRow[] = [
  { name: "Hằng ngày", value: 20, color: "#7c3aed" },
  { name: "Sự kiện", value: 25, color: "#14b8a6" },
  { name: "Du lịch", value: 40, color: "#ff4fc3" },
  { name: "Chụp ảnh", value: 15, color: "#f59e0b" },
];

const SERVICE_DATA = [
  { day: "Su", value: 8, date: "2024-10-01" },
  { day: "Mo", value: 15, date: "2024-10-02" },
  { day: "Tu", value: 12, date: "2024-10-03" },
  { day: "We", value: 20, date: "2024-10-04" },
  { day: "Th", value: 10, date: "2024-10-05" },
  { day: "Fr", value: 14, date: "2024-10-06" },
  { day: "Sa", value: 22, date: "2024-10-07" },
];

const TOP_STYLES: TopStyle[] = [
  {
    initials: "NA",
    name: "Trần Nam Anh",
    type: "Sự kiện",
    avatarSrc: "/images/item1.jpg",
    heroSrc: "/images/ngoaitroi.jpg",
  },
  {
    initials: "LP",
    name: "Lê Phương Thảo",
    type: "Du lịch",
    avatarSrc: "/images/item2.jpg",
    heroSrc: "/images/ngoaitroi2.jpg",
  },
  {
    initials: "NT",
    name: "Nguyễn Thị Tường",
    type: "Hằng ngày",
    avatarSrc: "/images/item3.jpg",
    heroSrc: "/images/ngoaitroi3.jpg",
  },
  {
    initials: "TD",
    name: "Trần Diễm",
    type: "Chụp ảnh",
    avatarSrc: "/images/item4.jpg",
    heroSrc: "/images/ngoaitroi4.jpg",
  },
  {
    initials: "HN",
    name: "Hoàng Ngọc",
    type: "Sự kiện",
    avatarSrc: "/images/item5.jpg",
    heroSrc: "/images/ngoaitroi5.jpg",
  },
  {
    initials: "MK",
    name: "Mai Khánh",
    type: "Du lịch",
    avatarSrc: "/images/item1.jpg",
    heroSrc: "/images/ngoaitroi.jpg",
  },
];

function RatingStars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: value }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  accentClass,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accentClass: string;
}) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("grid size-12 place-items-center rounded-full", accentClass)}>
            {icon}
          </div>
          <div>
            <p className="text-3xl font-semibold leading-none text-slate-900">
              {value}
            </p>
            <p className="mt-2 text-xs text-slate-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopStyleCard({ item }: { item: TopStyle }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="relative overflow-hidden p-8 pr-[190px]">
        <div className="flex items-center gap-4">
          <div className="relative size-10 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm">
            <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-slate-700">
              {item.initials}
            </span>
            <Image
              src={item.avatarSrc}
              alt={item.name}
              fill
              sizes="40px"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-slate-900">
              {item.name}
            </p>
            <p className="mt-0.5 text-sm text-slate-400">{item.type}</p>
          </div>
        </div>

        <p className="mt-6 max-w-[340px] text-sm leading-6 text-slate-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever.
        </p>

        <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
          <RatingStars />
          <span className="text-slate-300">|</span>
          <span className="font-medium text-slate-700">5.0</span>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/2 size-44 -translate-y-1/2 overflow-hidden rounded-full bg-slate-100 shadow-[0_16px_36px_rgba(15,23,42,0.18)]">
          <Image
            src={item.heroSrc}
            alt={`${item.name} style`}
            fill
            sizes="176px"
            className="object-cover"
            priority={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

type ServicePoint = {
  day: string;
  value: number;
  date: string; // ISO yyyy-mm-dd
};

function formatServiceDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

function ServiceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ServicePoint }>;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload as ServicePoint | undefined;
  if (!p) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
      <div className="font-semibold">{p.value} Đã book</div>
      <div className="text-[11px] text-slate-500">{formatServiceDate(p.date)}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Layout already validates session; page can load its own data later.
    setIsLoading(false);
    setError(null);
    setMounted(true);
  }, []);

  const stylists = STYLISTS;

  const pieData = PIE_DATA;

  const serviceData = SERVICE_DATA satisfies ServicePoint[];

  const topStyles = TOP_STYLES;

  const [topStyleIndex, setTopStyleIndex] = React.useState(0);
  const [topStylePerPage, setTopStylePerPage] = React.useState(2);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setTopStylePerPage(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const topStyleMaxIndex = Math.max(0, topStyles.length - topStylePerPage);
  const topStyleSlice = topStyles.slice(
    topStyleIndex,
    topStyleIndex + topStylePerPage,
  );

  return (
    <main className="rounded-2xl bg-[#f4f1f9]">
      <div className="mb-5">
        <h1 className="text-[34px] font-semibold tracking-tight text-slate-800">
          Trang chủ
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isLoading
            ? "Đang tải..."
            : error
              ? error
              : null}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          accentClass="bg-[#EAF4FF] text-[#257CBA]"
          icon={<Calendar className="size-6 text-current" />}
          value="75"
          label="Số lượng booking"
        />
        <StatCard
          accentClass="bg-[#EFFFF7] text-[#16A34A]"
          icon={<Wrench className="size-6 text-current" />}
          value="20"
          label="Số lượng thợ makeup"
        />
        <StatCard
          accentClass="bg-[#F3E8FF] text-[#7C3AED]"
          icon={<Users className="size-6 text-current" />}
          value="5"
          label="Số lượng khách hàng"
        />
        <StatCard
          accentClass="bg-[#FFF7ED] text-[#F97316]"
          icon={
            <span className="text-base font-semibold text-current">₫</span>
          }
          value="1,2 triệu"
          label="Doanh thu"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-semibold text-slate-800">
                Biểu đồ hình tròn
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="h-[240px] w-full max-w-[300px]">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={0}
                          outerRadius={96}
                          paddingAngle={2}
                          stroke="white"
                          strokeWidth={2}
                        >
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v: any, n: any) => [`${v}%`, String(n)]}
                          contentStyle={{
                            borderRadius: 12,
                            borderColor: "#e2e8f0",
                            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full rounded-full bg-slate-100" />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 text-base text-slate-700">
                {pieData.map((row) => (
                  <div
                    key={row.name}
                    className="flex w-full max-w-[260px] items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: row.color }}
                      />
                      {row.name}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {row.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-slate-800">
                Biểu đồ dịch vụ
              </p>
              <Button
                variant="outline"
                className="h-9 rounded-full border-[#257CBA]/40 px-4 text-xs font-semibold text-[#257CBA] hover:bg-[#257CBA]/5"
              >
                Save Report
              </Button>
            </div>

            <div className="relative rounded-xl border border-slate-200 bg-white px-2 py-3">
              <div className="h-[200px] w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={serviceData}
                      margin={{ left: 0, right: 10, top: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="serviceFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#257CBA"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="100%"
                            stopColor="#257CBA"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#e2e8f0" vertical={false} />
                      <Tooltip
                        cursor={{ stroke: "#257CBA", strokeWidth: 1 }}
                        content={<ServiceTooltip />}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#257CBA"
                        strokeWidth={3}
                        fill="url(#serviceFill)"
                        dot={{ r: 0 }}
                        activeDot={{
                          r: 6,
                          fill: "#257CBA",
                          stroke: "white",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full rounded-lg bg-slate-50" />
                )}
              </div>

              <div className="mt-2 flex items-center justify-between px-2 text-xs text-slate-500">
                {serviceData.map((d) => (
                  <span key={d.day}>{d.day}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-800">
        Danh sách thợ makeup được đánh giá cao
      </h2>

      <Card className="mt-3">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Concept</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stylists.map((s) => (
                  <TableRow key={s.email}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.address}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>{s.concept}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700"
                      >
                        ● {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Top phong cách trang điểm được lựa chọn nhiều nhất
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => setTopStyleIndex((i) => Math.max(0, i - 1))}
            disabled={topStyleIndex <= 0}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() =>
              setTopStyleIndex((i) => Math.min(topStyleMaxIndex, i + 1))
            }
            disabled={topStyleIndex >= topStyleMaxIndex}
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {topStyleSlice.map((item) => (
          <TopStyleCard key={item.name} item={item} />
        ))}
      </div>
    </main>
  );
}
