"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const games = [
  { emoji: "🎵", title: "음표 퀴즈", desc: "음표와 쉼표를 맞춰보세요!", color: "from-primary/20 to-[#4CB9E7]/20", level: "Lv.1~5" },
  { emoji: "🎹", title: "건반 찾기", desc: "도레미파솔라시도를 찾아요!", color: "from-[#FFB547]/20 to-[#FF6B6B]/20", level: "Lv.1~3" },
  { emoji: "🥁", title: "리듬 게임", desc: "리듬에 맞춰 클릭!", color: "from-[#3DBB7D]/20 to-[#FFB547]/20", level: "Lv.1~7" },
  { emoji: "👂", title: "음감 테스트", desc: "어떤 음일까요?", color: "from-[#FF6B6B]/20 to-primary/20", level: "Lv.1~4" },
  { emoji: "📖", title: "악보 읽기", desc: "악보를 보고 음을 맞춰요!", color: "from-[#4CB9E7]/20 to-[#3DBB7D]/20", level: "Lv.1~6" },
  { emoji: "🎼", title: "작곡 놀이", desc: "나만의 멜로디를 만들어보세요!", color: "from-primary/20 to-[#FFB547]/20", level: "Coming Soon" },
];

export default function GamesPage() {
  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>🎮 음악 게임</motion.h1>
      <p className="text-muted-foreground mb-8">놀면서 음악을 배워요!</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((g, i) => (
          <motion.div key={g.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
            <Card className="border-0 shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden hover:-translate-y-1">
              <div className={`bg-gradient-to-br ${g.color} h-32 flex items-center justify-center`}>
                <span className="text-5xl">{g.emoji}</span>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
                <p className="text-xs text-primary font-medium mt-2">{g.level}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
