"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const notes = [
  { id: 1, date: "2026-03-16", student: "김유나", mood: "😊", title: "바이엘 42번 양손 연습", homework: "매일 10번씩 연습" },
  { id: 2, date: "2026-03-16", student: "곽아린", mood: "🎉", title: "바이엘 30번 완주!", homework: "31번 오른손 예습" },
  { id: 3, date: "2026-03-15", student: "김리온", mood: "🌸", title: "즉흥연주 - 봄 느낌 표현", homework: "좋아하는 곡 1개 선택" },
  { id: 4, date: "2026-03-15", student: "Grace", mood: "😄", title: "바이엘 20번 리듬 연습", homework: "박수 치기 연습 3분" },
  { id: 5, date: "2026-03-14", student: "하정훈", mood: "🎵", title: "작곡: 태풍매미 완성", homework: "녹음해서 올리기" },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const filtered = notes.filter(n => n.student.includes(search) || n.title.includes(search));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📝 수업 일지</motion.h1>
        <Link href="/dashboard/teacher/notes/new"><Button className="bg-primary hover:bg-primary/90 rounded-full"><Plus className="w-4 h-4 mr-2" /> 새 일지 작성</Button></Link>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="학생 이름 또는 내용 검색..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="space-y-3">
        {filtered.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{n.mood}</span>
                    <div>
                      <h3 className="font-bold">{n.student}</h3>
                      <p className="text-sm text-muted-foreground">{n.date}</p>
                    </div>
                  </div>
                </div>
                <p className="font-medium mt-2">{n.title}</p>
                <p className="text-sm text-muted-foreground mt-1">📌 과제: {n.homework}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
