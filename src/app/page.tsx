"use client";

import { motion } from "framer-motion";
import { Music, Video, Sparkles, Globe, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

const features = [
  { icon: Sparkles, title: "즉흥 연주", desc: "\"BTS 신곡 치고 싶어요!\" — 바로 가르쳐드려요. 아이가 좋아하는 곡으로 동기부여 폭발!" },
  { icon: Globe, title: "Third-Culture Kids 전문", desc: "해외 거주 아이들의 이중문화 심리를 이해하는 선생님. 한국어 음악 수업이 아이의 안식처가 됩니다." },
  { icon: Video, title: "Zoom 1:1 맞춤 수업", desc: "집에서 편하게, 선생님과 1:1로. 외장 카메라+마이크로 오프라인 못지않은 수업 퀄리티." },
];

const reviews = [
  { name: "미국 거주 J맘", text: "한국어도 자연스럽게 느는 게 보여서 정말 만족해요. 아이가 수업 날만 기다립니다!" },
  { name: "독일 거주 S맘", text: "즉흥 연주가 아이 자존감에 엄청 도움이 됐어요. 다른 학원이랑 차원이 다릅니다." },
  { name: "호주 거주 K맘", text: "레슨 노트를 매주 보내주시니까 뭘 배우고 있는지 정확히 알 수 있어 좋아요." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🎹 해외 거주 한국 아이들의 피아노 파트너
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            집에서 만나는<br />
            <span className="text-primary">특별한 피아노 선생님</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            음악치료 전문가가 만든 커리큘럼으로,<br className="hidden md:block" />
            우리 아이에게 음악의 즐거움과 자신감을 선물하세요.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                무료 체험수업 신청 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                수업 알아보기
              </Button>
            </Link>
          </motion.div>
        </div>
        {/* Decorative notes */}
        <motion.div className="absolute top-10 left-10 text-primary/10 text-6xl" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>♪</motion.div>
        <motion.div className="absolute bottom-10 right-10 text-secondary/10 text-8xl" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>♫</motion.div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <motion.h2 className="text-3xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          왜 키즈마인드피아노인가요?
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">7년간 해외 거주 아이들만 가르쳐온 노하우</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                    <f.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "7년+", label: "온라인 레슨 경력" },
            { num: "36명", label: "현재 수강생" },
            { num: "1,282", label: "스레드 팔로워" },
            { num: "100%", label: "온라인 수업" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">{s.num}</div>
              <div className="text-white/70 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">학부모님들의 이야기</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-semibold text-sm">{r.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">우리 아이도 시작해볼까요?</h2>
          <p className="text-muted-foreground mb-8">첫 체험수업은 무료입니다. 부담 없이 만나보세요!</p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-10 py-6">
              무료 체험수업 신청하기 🎹
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
