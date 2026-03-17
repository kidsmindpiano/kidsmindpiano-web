"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = { general: "자유", practice: "연습", show: "자랑", question: "질문" };
const catColors: Record<string, string> = { general: "bg-gray-100", practice: "bg-[#3DBB7D]/10 text-[#3DBB7D]", show: "bg-[#FFB547]/10 text-[#FFB547]", question: "bg-primary/10 text-primary" };

const posts = [
  { id: 1, author: "하정훈", category: "show", title: "태풍매미 작곡 완성했어요!", content: "3주 동안 만든 곡이에요. 들어보세요~", likes: 8, comments: 5, date: "3시간 전" },
  { id: 2, author: "김유나", category: "practice", title: "양손 연습 팁 있나요?", content: "왼손이 자꾸 빨라져요ㅠㅠ 어떻게 하면 좋을까요?", likes: 3, comments: 7, date: "5시간 전" },
  { id: 3, author: "곽아린", category: "show", title: "첫 양손 연주 성공!! 🎉", content: "드디어 해냈어요! 너무 기뻐요ㅎㅎ", likes: 15, comments: 12, date: "어제" },
  { id: 4, author: "김리온", category: "general", title: "다음 연주회 언제에요?", content: "준비 시작해야 할 것 같은데...", likes: 4, comments: 3, date: "2일 전" },
  { id: 5, author: "Grace", category: "question", title: "셈여림 기호 헷갈려요", content: "p랑 pp 차이가 뭐에요??", likes: 2, comments: 6, date: "3일 전" },
];

export default function CommunityPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>💬 커뮤니티</motion.h1>
        <Button className="bg-primary hover:bg-primary/90 rounded-full"><Plus className="w-4 h-4 mr-2" /> 글쓰기</Button>
      </div>
      <div className="flex gap-2 mb-6">
        <Badge className="cursor-pointer bg-primary text-white">전체</Badge>
        {Object.entries(categories).map(([k, v]) => (
          <Badge key={k} variant="secondary" className={`cursor-pointer ${catColors[k]}`}>{v}</Badge>
        ))}
      </div>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className={`text-xs ${catColors[p.category]}`}>{categories[p.category as keyof typeof categories]}</Badge>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                <h3 className="font-bold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{p.author}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {p.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {p.comments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
