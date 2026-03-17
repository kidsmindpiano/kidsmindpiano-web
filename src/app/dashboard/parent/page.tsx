"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Video } from "lucide-react";
import Link from "next/link";

const nextLesson = { date: "2026-03-18 (수)", time: "16:00", teacher: "안서희" };
const recentNote = { date: "2026-03-16", mood: "😊", title: "바이엘 42번 양손 연습", homework: "매일 10번씩 연습" };

export default function ParentDashboard() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        👨‍👩‍👧 학부모 대시보드
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-md h-full">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold mb-2">다음 수업</h3>
              <p className="text-lg font-bold text-primary">{nextLesson.date}</p>
              <p className="text-sm text-muted-foreground">{nextLesson.time} · {nextLesson.teacher} 선생님</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link href="/dashboard/parent/notes">
            <Card className="border-0 shadow-md h-full hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-[#FFB547] mb-3" />
                <h3 className="font-bold mb-2">최근 수업 일지</h3>
                <p className="text-sm">{recentNote.mood} {recentNote.title}</p>
                <p className="text-xs text-muted-foreground mt-1">📌 {recentNote.homework}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link href="/dashboard/parent/videos">
            <Card className="border-0 shadow-md h-full hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-6">
                <Video className="w-8 h-8 text-[#3DBB7D] mb-3" />
                <h3 className="font-bold mb-2">수업 영상</h3>
                <p className="text-sm text-muted-foreground">최근 3개의 수업 영상</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
      {/* parent-app embed */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-primary/5 px-6 py-4">
          <h2 className="text-lg font-bold">🎹 학생 포털</h2>
        </div>
        <iframe src="https://kidsmindpiano.github.io/parent-app/" className="w-full border-0" style={{ height: "70vh" }} />
      </Card>
    </div>
  );
}
