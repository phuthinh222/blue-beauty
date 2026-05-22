import { SlidersHorizontal } from "lucide-react";

type FilterChipsProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export function FilterChips({ options, selected, onChange }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal className="size-4 shrink-0 text-brand" />
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              selected === option
                ? "bg-brand text-white"
                : "border border-slate-200 text-slate-600 hover:border-brand hover:text-brand"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
