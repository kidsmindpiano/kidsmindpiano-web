"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, Video, Gamepad2, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const upcomingLessons = [
  { date: "3월 18일 (화)", time: "16:00 KST", teacher: "최지혜 대표", status: "예정" },
  { date: "3월 20일 (목)", time: "16:00 KST", teacher: "최지혜 대표", status: "예정" },
  { date: "3월 25일 (화)", time: "16:00 KST", teacher: "최지혜 대표", status: "예정" },
];

const recentNotes = [
  { date: "3월 13일", title: "바이엘 45번 - 양손 연습", summary: "오른손 멜로디 정확도 ↑. 왼손 반주 리듬 연습 필요. 다음 주 양손 합치기 도전!" },
  { date: "3월 6일", title: "BTS 'Dynamite' 즉흥 반주", summary: "코드 진행 이해도 좋음! 리듬 패턴 3개 연습. 자신감 많이 올라왔어요 🎉" },
];

const recentVideos = [
  { date: "3월 13일", title: "바이엘 45번 수업 영상", duration: "38분" },
  { date: "3월 6일", title: "Dynamite 즉흥연주 수업", duration: "40분" },
];

const games = [
  { title: "음표 퀴즈 🎵", desc: "음표 이름을 맞춰보세요!", color: "bg-primary/10" },
  { title: "리듬 챌린지 🥁", desc: "리듬에 맞춰 클릭!", color: "bg-secondary/10" },
  { title: "피아노 키 찾기 🎹", desc: "건반 위치를 찾아보세요", color: "bg-accent/10" },
  { title: "작곡 놀이터 ✨", desc: "나만의 멜로디를 만들어봐요", color: "bg-yellow-50" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">안녕, 민지! 🎹</h1>
            <p className="text-sm text-muted-foreground">오늘도 즐거운 음악 시간</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 수업 시간표 */}
        <motion.div className="md:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">다가오는 수업</h2>
              </div>
              <div className="space-y-3">
                {upcomingLessons.map((l) => (
                  <div key={l.date} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{l.date}</p>
                        <p className="text-xs text-muted-foreground">{l.time} · {l.teacher}</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-0">{l.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 게임 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-bold">게임 & 활동</h2>
              </div>
              <div className="space-y-2">
                {games.map((g) => (
                  <button key={g.title} className={`w-full text-left p-3 rounded-lg ${g.color} hover:opacity-80 transition`}>
                    <p className="font-medium text-sm">{g.title}</p>
                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 수업 일지 */}
        <motion.div className="md:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">수업 일지</h2>
              </div>
              <div className="space-y-4">
                {recentNotes.map((n) => (
                  <div key={n.date} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{n.date}</Badge>
                      <span className="font-medium text-sm">{n.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{n.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 수업 영상 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold">수업 영상</h2>
              </div>
              <div className="space-y-3">
                {recentVideos.map((v) => (
                  <div key={v.date} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-sm">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.date} · {v.duration}</p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs">재생하기 ▶</Button>
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
