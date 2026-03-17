"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const students = [
  // 서희쌤
  { name: "Grace", country: "🇺🇸 텍사스", schedule: "토 09:00", teacher: "서희", since: "2026.01" },
  { name: "곽아린", country: "🇺🇸 미서부", schedule: "화 07:45", teacher: "서희", since: "2025.11" },
  { name: "구하라", country: "🇮🇩 인도네시아", schedule: "화 21:00", teacher: "서희", since: "2026.02" },
  { name: "김리온", country: "🇺🇸 미동부", schedule: "화 08:00", teacher: "서희", since: "2025.03" },
  { name: "김유나", country: "🇯🇵 일본", schedule: "수 18:30", teacher: "서희", since: "2025.06" },
  { name: "심준후", country: "🇨🇳 중국", schedule: "목 18:00", teacher: "서희", since: "2025.09" },
  { name: "조우현", country: "🇺🇸 미남부", schedule: "목 08:00", teacher: "서희", since: "2025.10" },
  { name: "하정훈", country: "🇺🇸 미서부", schedule: "금 10:00", teacher: "서희", since: "2024.09" },
  { name: "제인(작곡)", country: "🇺🇸 미중부", schedule: "일 08:00", teacher: "서희", since: "2025.07" },
  { name: "설리나", country: "🇺🇸 미동부", schedule: "월 09:00", teacher: "서희", since: "2026.03" },
  // 경서쌤
  { name: "채지아", country: "🇺🇸 미서부", schedule: "화,목 10:00", teacher: "경서", since: "2025.08" },
  { name: "클레어", country: "🇺🇸 미서부", schedule: "수 13:00", teacher: "경서", since: "2026.03" },
  { name: "김수환", country: "🇺🇸 미서부", schedule: "수 11:30", teacher: "경서", since: "2025.12" },
  { name: "설예나", country: "🇺🇸 미동부", schedule: "화 09:15", teacher: "경서", since: "2025.05" },
  { name: "김시온", country: "🇺🇸 미동부", schedule: "목 08:00", teacher: "경서", since: "2025.08" },
  { name: "이리아", country: "🇺🇸 미서부", schedule: "화,목 11:20", teacher: "경서", since: "2025.11" },
];

export default function StudentsPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? students : students.filter(s => s.teacher === filter);

  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>👨‍👩‍👧 학생 목록</motion.h1>
      <div className="flex gap-2 mb-6">
        {[{ key: "all", label: `전체 (${students.length}명)` }, { key: "서희", label: `🔵 서희쌤 (${students.filter(s=>s.teacher==="서희").length})` }, { key: "경서", label: `🟢 경서쌤 (${students.filter(s=>s.teacher==="경서").length})` }].map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${filter === t.key ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <Badge variant="secondary" className={`border-0 text-xs ${s.teacher === "서희" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>{s.teacher}쌤</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{s.country}</p>
                <p className="text-sm mt-1">📅 {s.schedule} <span className="text-muted-foreground text-xs">(KST)</span></p>
                <p className="text-xs text-muted-foreground mt-2">등록일: {s.since}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
