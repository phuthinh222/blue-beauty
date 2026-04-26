type StatMiniProps = {
  label: string;
  value: number;
};

export function StatMini({ label, value }: StatMiniProps) {
  return (
    <div className="text-right">
      <p className="text-2xl font-semibold leading-none text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}
