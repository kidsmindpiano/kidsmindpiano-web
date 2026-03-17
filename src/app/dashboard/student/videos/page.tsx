"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Heart, MessageCircle, Play } from "lucide-react";

const videos = [
  { id: 1, author: "김유나", title: "바이엘 42번 연주 🎹", date: "2026-03-15", likes: 5, comments: 3 },
  { id: 2, author: "하정훈", title: "태풍매미 (자작곡) 🌪️", date: "2026-03-14", likes: 12, comments: 7 },
  { id: 3, author: "김리온", title: "Let It Go 연주 ❄️", date: "2026-03-13", likes: 8, comments: 4 },
  { id: 4, author: "곽아린", title: "첫 양손 연주! 👏", date: "2026-03-12", likes: 15, comments: 9 },
  { id: 5, author: "Grace", title: "바둑이방울 🎵", date: "2026-03-11", likes: 6, comments: 2 },
];

export default function StudentVideosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🎬 연주 영상</motion.h1>
        <Button className="bg-primary hover:bg-primary/90 rounded-full"><Upload className="w-4 h-4 mr-2" /> 영상 올리기</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="border-0 shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden">
              <div className="bg-gradient-to-br from-[#FFB547]/20 via-primary/10 to-[#3DBB7D]/20 h-44 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center shadow"><Play className="w-6 h-6 text-primary ml-1" /></div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.author} · {v.date}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {v.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {v.comments}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
