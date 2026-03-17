"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Play } from "lucide-react";

const videos = [
  { date: "2026-03-16", title: "바이엘 42번 레슨", duration: "38분" },
  { date: "2026-03-13", title: "즉흥연주 수업", duration: "40분" },
  { date: "2026-03-09", title: "바이엘 41번 완주 🎉", duration: "42분" },
];

export default function ParentVideosPage() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🎬 수업 영상</motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v, i) => (
          <motion.div key={v.date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-0 shadow-md hover:shadow-lg transition cursor-pointer">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-[#4CB9E7]/20 h-40 flex items-center justify-center rounded-t-xl">
                  <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center"><Play className="w-6 h-6 text-primary ml-1" /></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.date} · {v.duration}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
