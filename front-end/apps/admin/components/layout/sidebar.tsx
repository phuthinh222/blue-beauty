"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@repo/assets/logo.png";
import { navItems } from "./navigation";

export function Sidebar({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const isCollapsed = Boolean(collapsed);

  return (
    <aside
      className={[
        "sticky top-0 hidden h-[100dvh] shrink-0 overflow-y-auto border-r border-slate-200 bg-white py-6 lg:block",
        "transition-[width,padding] duration-200 ease-in-out will-change-[width,padding]",
        isCollapsed ? "w-[84px] px-3" : "w-[260px] px-6",
      ].join(" ")}
    >
      <div className="flex flex-col items-center">
        <Link href="/dashboard" aria-label="Về trang dashboard" className="group flex flex-col items-center">
          <div
            className={[
              "grid place-items-center rounded-full bg-white",
              "transition-[width,height] duration-200 ease-in-out will-change-[width,height]",
              isCollapsed ? "size-12" : "size-20",
            ].join(" ")}
          >
            <Image
              src={logo}
              alt="BlueBeauty"
              width={64}
              height={64}
              priority
              className={[
                "transition-[width,height] duration-200 ease-in-out will-change-[width,height]",
                isCollapsed ? "h-10 w-10" : "h-16 w-16",
              ].join(" ")}
            />
          </div>
          <div
            className={[
              "mt-2 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out",
              isCollapsed ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
            ].join(" ")}
            aria-hidden={isCollapsed}
          >
            <Image
              src="/images/blue-beauty.png"
              alt="BlueBeauty"
              width={170}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </div>
        </Link>
      </div>

      <nav className="mt-10 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href !== "#" &&
            (pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "relative flex items-center rounded-md py-2.5 text-sm transition",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                active
                  ? "bg-[#257CBA] text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100",
              ].join(" ")}
              aria-label={item.label}
              title={isCollapsed ? item.label : undefined}
            >
              {active ? (
                <span
                  className={[
                    "absolute top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-r bg-[#257CBA]",
                    isCollapsed ? "-left-3" : "-left-6",
                    "transition-[left] duration-200 ease-in-out",
                  ].join(" ")}
                />
              ) : null}
              <Icon className="size-4 shrink-0" />
              <span
                className={[
                  "truncate transition-[max-width,opacity] duration-200 ease-in-out",
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100",
                ].join(" ")}
                aria-hidden={isCollapsed}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

