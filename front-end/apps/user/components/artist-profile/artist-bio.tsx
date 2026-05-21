type ArtistBioProps = {
  bio: string;
  bookingArea: string;
  workPrinciples: string[];
};

export function ArtistBio({ bio, bookingArea, workPrinciples }: ArtistBioProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm leading-relaxed text-slate-700">{bio}</p>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Khu vực nhận lịch
        </span>
        <p className="mt-1 text-sm text-slate-700">{bookingArea}</p>
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Nguyên tắc làm việc
        </span>
        <ul className="mt-2 space-y-1.5">
          {workPrinciples.map((principle, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#257CBA]" />
              {principle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
