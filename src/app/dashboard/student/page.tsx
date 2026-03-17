"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Video, MessageSquare, Gamepad2, Calendar } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>안녕! 🎹</motion.h1>
      <p className="text-muted-foreground mb-8">오늘도 즐거운 피아노 시간!</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: Calendar, label: "다음 수업", desc: "수요일 16:00", color: "bg-primary/10", href: "#" },
          { icon: Video, label: "내 연주", desc: "영상 올리기", color: "bg-[#FF6B6B]/10", href: "/dashboard/student/videos" },
          { icon: MessageSquare, label: "커뮤니티", desc: "친구들과 소통", color: "bg-[#FFB547]/10", href: "/dashboard/student/community" },
          { icon: Gamepad2, label: "음악 게임", desc: "놀면서 배우기", color: "bg-[#3DBB7D]/10", href: "/dashboard/student/games" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={item.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
                <CardContent className={`p-6 text-center ${item.color} rounded-xl`}>
                  <item.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-primary/5 px-6 py-4"><h2 className="font-bold">🎹 내 수업 포털</h2></div>
        <iframe src="https://kidsmindpiano.github.io/parent-app/" className="w-full border-0" style={{ height: "60vh" }} />
      </Card>
    </div>
  );
}
