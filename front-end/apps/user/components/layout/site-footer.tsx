import Image from "next/image";
import Link from "next/link";

import logoAsset from "@repo/assets/logo.png";

const FOOTER_LINKS = [
  { label: "Concept", href: "#concept" },
  { label: "Thợ trang điểm", href: "#artists" },
  { label: "Khuyến mãi", href: "#promo" },
  { label: "Đăng ký", href: "/register" },
  { label: "Đăng nhập", href: "/login" },
];

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: IconFacebook, label: "Facebook", href: "#" },
  { icon: IconInstagram, label: "Instagram", href: "#" },
  { icon: IconYoutube, label: "YouTube", href: "#" },
  { icon: IconTwitter, label: "Twitter", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Logo + mô tả */}
          <div>
            <div className="flex items-center gap-2">
              <Image src={logoAsset} alt="BlueBeauty" className="h-10 w-auto" />
              <Image src="/images/blue-beauty.png" alt="Blue Beauty" width={120} height={40} className="h-9 w-auto" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              BLUE là trang web hàng đầu tại Việt Nam về việc kết nối thợ trang điểm chuyên nghiệp với khách hàng
            </p>
          </div>

          {/* Liên kết */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Liên kết hữu ích</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Kết nối với chúng tôi</h3>
            <div className="mt-3 flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} BlueBeauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
