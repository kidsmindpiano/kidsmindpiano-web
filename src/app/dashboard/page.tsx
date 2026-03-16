"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, Video, Gamepad2, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schedule = [
  { day: "월", time: "16:00", teacher: "최지혜 대표", status: "scheduled" },
  { day: "수", time: "16:00", teacher: "최지혜 대표", status: "scheduled" },
];

const notes = [
  { date: "2026-03-13", title: "바이엘 42번 - 양손 연습", summary: "오른손 멜로디 정확도 향상! 왼손 반주 리듬 연습 필요. 다음 주까지 매일 10번씩.", mood: "😊" },
  { date: "2026-03-06", title: "즉흥연주 - 봄 느낌 표현", summary: "봄바람을 피아노로 표현해봤어요. 창의력 폭발! 높은 음역대 활용이 인상적.", mood: "🌸" },
  { date: "2026-02-27", title: "바이엘 41번 완주 🎉", summary: "드디어 41번 완주! 박자감이 많이 좋아졌어요. 연주회 곡 선정 시작.", mood: "🎉" },
];

const videos = [
  { date: "2026-03-13", title: "바이엘 42번 레슨", duration: "38분" },
  { date: "2026-03-06", title: "즉흥연주 수업", duration: "40분" },
  { date: "2026-02-27", title: "바이엘 41번 완주", duration: "42분" },
];

const games = [
  { title: "🎵 음표 퀴즈", desc: "음표와 쉼표를 맞춰보세요!", color: "bg-primary/10" },
  { title: "🎹 건반 찾기", desc: "도레미파솔라시도를 찾아요!", color: "bg-secondary/10" },
  { title: "🥁 리듬 게임", desc: "리듬에 맞춰 클릭!", color: "bg-accent/10" },
  { title: "👂 음감 테스트", desc: "어떤 음일까요?", color: "bg-yellow-50" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">안녕하세요, 길동이! 🎹</h1>
        <p className="text-muted-foreground mt-1">오늘도 즐거운 피아노 시간이에요</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 수업 시간표 */}
        <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">이번 주 수업</h2>
              </div>
              <div className="space-y-3">
                {schedule.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-primary/5 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-primary">{s.day}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{s.time} (KST)</p>
                        <p className="text-sm text-muted-foreground">{s.teacher}</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-0">예정</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 게임 코너 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-md h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Gamepad2 className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold">게임 코너</h2>
              </div>
              <div className="space-y-3">
                {games.map((g) => (
                  <button key={g.title} className={`w-full text-left ${g.color} rounded-xl p-3 hover:scale-[1.02] transition`}>
                    <p className="font-semibold text-sm">{g.title}</p>
                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 수업 일지 */}
        <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">수업 일지</h2>
              </div>
              <div className="space-y-4">
                {notes.map((n) => (
                  <div key={n.date} className="border border-border rounded-xl p-4 hover:shadow-sm transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{n.mood}</span>
                        <h3 className="font-semibold">{n.title}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{n.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 수업 영상 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-md h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Video className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold">수업 영상</h2>
              </div>
              <div className="space-y-3">
                {videos.map((v) => (
                  <div key={v.date} className="flex items-center gap-3 bg-muted rounded-xl p-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.date} · {v.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
