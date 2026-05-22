"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserDashboardLanding } from "./user-dashboard-landing";

export default function UserDashboardPage() {
  const { isLoggedIn, user, onLogout } = useAuth();

  return <UserDashboardLanding onLogout={isLoggedIn ? onLogout : undefined} user={user} />;
}
