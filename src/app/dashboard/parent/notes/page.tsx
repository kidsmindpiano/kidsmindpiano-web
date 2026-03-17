"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const notes = [
  { date: "2026-03-16", mood: "😊", title: "바이엘 42번 양손 연습", content: "오른손 멜로디 정확도 향상! 왼손 반주 리듬 연습 필요.", homework: "매일 10번씩 연습", comment: "집중력이 점점 좋아지고 있어요 💪" },
  { date: "2026-03-13", mood: "🌸", title: "즉흥연주 - 봄 느낌 표현", content: "봄바람을 피아노로 표현해봤어요. 높은 음역대 활용이 인상적!", homework: "좋아하는 봄 노래 1곡 선택", comment: "창의력이 정말 좋아요! 🎨" },
  { date: "2026-03-09", mood: "🎉", title: "바이엘 41번 완주!", content: "드디어 41번 완주! 박자감이 많이 좋아졌어요.", homework: "42번 오른손 예습", comment: "축하해요! 연주회 곡 선정 시작합시다 🎵" },
];

export default function ParentNotesPage() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📝 수업 일지</motion.h1>
      <div className="space-y-4">
        {notes.map((n, i) => (
          <motion.div key={n.date} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{n.mood}</span>
                  <div>
                    <h3 className="font-bold text-lg">{n.title}</h3>
                    <p className="text-sm text-muted-foreground">{n.date}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3">{n.content}</p>
                <div className="bg-primary/5 rounded-xl p-4 mb-3">
                  <p className="text-sm font-medium">📌 과제: {n.homework}</p>
                </div>
                <div className="bg-[#FFB547]/5 rounded-xl p-4">
                  <p className="text-sm">💬 선생님: {n.comment}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
