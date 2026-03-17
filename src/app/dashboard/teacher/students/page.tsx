"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const students = [
  { name: "김유나", country: "🇯🇵 일본", level: "바이엘 42번", since: "2025.06", teacher: "안서희" },
  { name: "곽아린", country: "🇺🇸 미국 서부", level: "바이엘 30번", since: "2025.11", teacher: "안서희" },
  { name: "김리온", country: "🇺🇸 미국 동부", level: "체르니 100번", since: "2025.03", teacher: "안서희" },
  { name: "Grace", country: "🇺🇸 미국 텍사스", level: "바이엘 20번", since: "2026.01", teacher: "안서희" },
  { name: "구하라", country: "🇮🇩 인도네시아", level: "바이엘 15번", since: "2026.02", teacher: "안서희" },
  { name: "하정훈", country: "🇺🇸 미국 서부", level: "즉흥연주 과정", since: "2024.09", teacher: "안서희" },
  { name: "김시온", country: "🇺🇸 미국 동부", level: "바이엘 25번", since: "2025.08", teacher: "김경서" },
  { name: "설예나", country: "🇺🇸 미국 동부", level: "바이엘 35번", since: "2025.05", teacher: "김경서" },
  { name: "클레어", country: "🇺🇸 미국 서부", level: "바이엘 10번", since: "2026.03", teacher: "김경서" },
];

export default function StudentsPage() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>👨‍👩‍👧 내 학생 목록</motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">{s.teacher}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{s.country}</p>
                <p className="text-sm mt-1">📖 {s.level}</p>
                <p className="text-xs text-muted-foreground mt-2">등록일: {s.since}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
