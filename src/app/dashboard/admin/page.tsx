"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Video, BarChart3 } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Users, label: "총 학생", value: "36명", color: "bg-primary/10 text-primary" },
  { icon: Users, label: "선생님", value: "3명", color: "bg-[#3DBB7D]/10 text-[#3DBB7D]" },
  { icon: FileText, label: "이번 주 수업 일지", value: "24건", color: "bg-[#FFB547]/10 text-[#FFB547]" },
  { icon: Video, label: "연주 영상", value: "47개", color: "bg-[#FF6B6B]/10 text-[#FF6B6B]" },
];

const recentNotes = [
  { teacher: "안서희", student: "김유나", title: "바이엘 42번 양손 연습", date: "오늘" },
  { teacher: "안서희", student: "곽아린", title: "바이엘 30번 완주!", date: "오늘" },
  { teacher: "김경서", student: "김시온", title: "바이엘 25번 리듬 연습", date: "어제" },
  { teacher: "김경서", student: "설예나", title: "즉흥연주 수업", date: "어제" },
];

export default function AdminDashboard() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>👑 관리자 대시보드</motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-0 shadow-sm"><CardContent className="p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color.split(" ")[0]}`}>
                <s.icon className={`w-5 h-5 ${s.color.split(" ")[1]}`} />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">📝 최근 수업 일지</h2>
            <div className="flex gap-4"><Link href="/dashboard/admin/schedule" className="text-sm text-primary hover:underline">📅 수업 시간 관리 →</Link><Link href="/dashboard/admin/users" className="text-sm text-primary hover:underline">사용자 관리 →</Link></div>
          </div>
          <div className="space-y-3">
            {recentNotes.map((n, i) => (
              <div key={i} className="flex items-center justify-between bg-muted rounded-xl p-4">
                <div>
                  <p className="font-medium">{n.student} — {n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.teacher} 선생님</p>
                </div>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
