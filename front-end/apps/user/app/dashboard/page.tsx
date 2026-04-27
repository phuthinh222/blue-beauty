"use client";

import { useRouter } from "next/navigation";

import { clearUserSession, logoutUser } from "@/lib/auth";

import { UserDashboardLanding } from "./user-dashboard-landing";

export default function UserDashboardPage() {
  const router = useRouter();

  async function onLogout() {
    try {
      await logoutUser();
    } finally {
      clearUserSession();
      router.replace("/login");
    }
  }

  return <UserDashboardLanding onLogout={onLogout} />;
}
