"use client";

import type * as React from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

import logo from "@repo/assets/logo.png";
import { Button } from "@repo/ui/button";

import { FAB_CLASS } from "./auth-constants";

export function AuthShell({
  title,
  subtitle,
  logoContainerClass = "size-16 sm:size-20 md:size-24",
  logoSizeClass = "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
  children,
}: {
  title: string;
  subtitle?: string;
  logoContainerClass?: string;
  logoSizeClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100dvh] bg-white">
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
        <div className="mb-4 flex flex-col items-center sm:mb-6">
          <div
            className={`grid ${logoContainerClass} place-items-center rounded-full bg-white`}
          >
            <Image
              src={logo}
              alt="Blue Beauty"
              className={logoSizeClass}
              priority
            />
          </div>
          <h1 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg md:text-xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 max-w-[32rem] text-center text-[11px] text-slate-500 sm:text-xs md:text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>

        {children}
      </div>

      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 sm:right-6 sm:gap-3">
        <Button asChild size="icon" className={FAB_CLASS} aria-label="Chat">
          <a href="#">
            <MessageCircle className="size-5 sm:size-6" />
          </a>
        </Button>

        <Button asChild size="icon" className={FAB_CLASS} aria-label="Gọi điện">
          <a href="tel:">
            <Phone className="size-5 sm:size-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}

