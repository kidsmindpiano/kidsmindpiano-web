"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Users, label: "내 학생", value: "12명", color: "bg-primary/10 text-primary", href: "/dashboard/teacher/students" },
  { icon: FileText, label: "이번 주 수업 일지", value: "8건", color: "bg-[#FFB547]/10 text-[#FFB547]", href: "/dashboard/teacher/notes" },
  { icon: Calendar, label: "오늘 수업", value: "3건", color: "bg-[#3DBB7D]/10 text-[#3DBB7D]", href: "#" },
  { icon: Clock, label: "이번 주 수업", value: "15시간", color: "bg-[#FF6B6B]/10 text-[#FF6B6B]", href: "#" },
];

const todayLessons = [
  { time: "15:00", student: "김유나", status: "완료", zoom: "#" },
  { time: "16:00", student: "곽아린", status: "예정", zoom: "#" },
  { time: "20:00", student: "김리온", status: "예정", zoom: "#" },
];

export default function TeacherDashboard() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        👩‍🏫 선생님 대시보드
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={s.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color.split(" ")[0]}`}>
                    <s.icon className={`w-5 h-5 ${s.color.split(" ")[1]}`} />
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">📅 오늘 수업</h2>
          <div className="space-y-3">
            {todayLessons.map((l) => (
              <div key={l.time} className="flex items-center justify-between bg-muted rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">{l.time}</span>
                  <span className="font-medium">{l.student}</span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${l.status === "완료" ? "bg-[#3DBB7D]/10 text-[#3DBB7D]" : "bg-primary/10 text-primary"}`}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
