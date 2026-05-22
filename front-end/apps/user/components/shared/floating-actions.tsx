import { Phone, MessageCircle } from "lucide-react";

const FAB =
  "flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-1 ring-black/5 transition hover:bg-brand-dark sm:size-14";

export function FloatingActions() {
  return (
    <>
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-8">
        <a href="tel:" className={`${FAB} pointer-events-auto`} aria-label="Gọi điện">
          <Phone className="size-6" />
        </a>
        <a href="#" className={`${FAB} pointer-events-auto`} aria-label="Chat">
          <MessageCircle className="size-6" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center gap-3 border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <a href="tel:" className={FAB} aria-label="Gọi điện">
          <Phone className="size-5" />
        </a>
        <a href="#" className={FAB} aria-label="Chat">
          <MessageCircle className="size-5" />
        </a>
      </div>
    </>
  );
}
