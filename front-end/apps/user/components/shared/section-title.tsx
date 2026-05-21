export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-[#257CBA] sm:text-xl md:text-2xl">
        {children}
      </h2>
      <div className="mx-auto mt-2 flex justify-center gap-1">
        <span className="h-0.5 w-10 rounded-full bg-[#257CBA]" />
        <span className="h-0.5 w-10 rounded-full bg-pink-400" />
      </div>
    </div>
  );
}
