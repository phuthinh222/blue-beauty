import Image from "next/image";
import Link from "next/link";

import { Button } from "../button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#e0f2fe] px-4 py-14 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 opacity-20 sm:w-72">
        <Image src="/images/makeup.png" alt="" fill className="object-contain object-left" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 rotate-12 opacity-20 sm:w-72">
        <Image src="/images/makeup.png" alt="" fill className="object-contain object-right" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-lg font-bold text-[#0c4a6e] sm:text-xl md:text-2xl">
          Bạn có phải là một thợ trang điểm chuyên nghiệp và đầy tham vọng?
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Tham gia cộng đồng BlueBeauty và nhận booking job ngay hôm nay
        </p>
        <Link href="/register">
          <Button className="mt-6 h-10 rounded-lg bg-brand px-8 text-sm font-semibold text-white hover:bg-brand-dark">
            Đăng ký
          </Button>
        </Link>
      </div>
    </section>
  );
}
