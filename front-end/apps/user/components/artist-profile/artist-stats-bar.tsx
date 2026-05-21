import type { ArtistStats } from "./types";

type StatItemProps = {
  value: number;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

type ArtistStatsBarProps = {
  stats: ArtistStats;
};

export function ArtistStatsBar({ stats }: ArtistStatsBarProps) {
  const items = [
    { value: stats.profiles, label: "Hồ sơ" },
    { value: stats.reviews, label: "Nhận xét" },
    { value: stats.services, label: "Dịch vụ" },
    { value: stats.agreements, label: "Khách hàng đồng ý" },
  ];

  return (
    <div className="flex items-center justify-around rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-6">
          <StatItem value={item.value} label={item.label} />
          {index < items.length - 1 && (
            <div className="h-8 w-px bg-slate-200" />
          )}
        </div>
      ))}
    </div>
  );
}
