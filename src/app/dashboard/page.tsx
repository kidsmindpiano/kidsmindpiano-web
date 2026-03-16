"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🎹</div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.name || user.email?.split("@")[0] || "학생";

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div className="flex items-center justify-between mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-3xl font-bold">안녕하세요, {userName}님! 🎹</h1>
          <p className="text-muted-foreground mt-1">키즈마인드피아노 마이페이지</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="rounded-full">
          <LogOut className="w-4 h-4 mr-2" /> 로그아웃
        </Button>
      </motion.div>

      {/* Quick Links */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {[
          { emoji: "📅", label: "수업 시간표", color: "bg-primary/10" },
          { emoji: "📝", label: "수업 일지", color: "bg-[#FFB547]/10" },
          { emoji: "🎬", label: "수업 영상", color: "bg-[#3DBB7D]/10" },
          { emoji: "🎮", label: "게임", color: "bg-[#FF6B6B]/10" },
        ].map((item) => (
          <Card key={item.label} className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
            <CardContent className={`p-4 text-center ${item.color} rounded-xl`}>
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-sm font-medium mt-2">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Parent App Embed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">🎹 학부모 & 학생 포털</h2>
            <a
              href="https://kidsmindpiano.github.io/parent-app/"
              target="_blank"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              새 창으로 열기 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-full" style={{ height: "80vh" }}>
            <iframe
              src="https://kidsmindpiano.github.io/parent-app/"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
