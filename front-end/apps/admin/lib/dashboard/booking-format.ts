const WEEKDAY_VI = [
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
] as const;

export function formatVnd(n: number) {
  return `${new Intl.NumberFormat("vi-VN").format(n)} đồng`;
}

export function parseDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export function formatDateBlock(bookingAt: string) {
  const d = parseDate(bookingAt);
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const day = d.getDate();
  const weekday = WEEKDAY_VI[d.getDay()] ?? "";
  const time = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return {
    monthYear: `Tháng ${month} ${year}`,
    day: String(day),
    weekday,
    time,
  };
}
