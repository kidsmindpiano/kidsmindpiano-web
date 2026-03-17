"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardRedirect() {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role) {
      router.replace(`/dashboard/${role}`);
    }
  }, [role, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-4xl animate-bounce">🎹</div>
    </div>
  );
}
