"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { canAccessDashboardPath, getDefaultDashboardPath } from "@/lib/authz";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!canAccessDashboardPath(role, pathname)) {
      router.replace(getDefaultDashboardPath(role));
    }
  }, [user, role, loading, pathname, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-4xl animate-bounce">🎹</div>
    </div>
  );

  if (!user) return null;
  if (!canAccessDashboardPath(role, pathname)) return null;

  return (
    <div className="flex min-h-screen bg-[#FFFAF8]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
