"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Video, Star, ArrowRight, Sparkles, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const features = [
  { icon: Heart, title: "정서적 안정", desc: "편안한 분위기에서 공감과 지지를 받으며, 실수도 두려워하지 않아요." },
  { icon: Sparkles, title: "자기주도성", desc: "아이 스스로 배우고 선택하며, 주체적으로 즐기는 학습 환경을 경험해요." },
  { icon: Music2, title: "창의성", desc: "감정과 생각을 음악으로 표현하고, 자신만의 해석으로 다양한 곡을 완성해요." },
];

const changes = [
  { stage: "01", title: "불안했던 아이가\n자신감 있게", quote: "실수해도 괜찮아요. 선생님이 그렇게 말씀하셨어요.", who: "7세 수강생" },
  { stage: "02", title: "실수를 두려워하던 아이가\n도전을 즐기는 아이로", quote: "이번엔 더 어려운 곡 해보고 싶어요.", who: "6세 수강생" },
  { stage: "03", title: "억지로 연습하던 아이가\n스스로 피아노 앞에", quote: "엄마, 오늘 연습 30분 다 했어요!", who: "6개월차 수강생" },
  { stage: "04", title: "그저 따라하던 아이가\n자신만의 음악을 만드는 아이로", quote: "제가 만든 곡이에요. 들어보실래요?", who: "1년차 수강생" },
];

const worries = [
  { emoji: "🌏", title: "해외에 거주하는 한국 아이", desc: "이중언어를 쓰는 아이에게 어떤 어려움이 있을까요? 아이의 마음을 들어보는 시간이 될 거예요!" },
  { emoji: "🎹", title: "말보다 음악으로 표현할 때", desc: "말로는 못했던 마음속 이야기를 피아노 건반으로 들려주며 환하게 웃는 아이를 만나보세요." },
  { emoji: "💛", title: "마음이 예민한 우리 아이", desc: "\"선생님이랑 피아노 칠 때가 제일 편해요\" 따뜻한 대화와 음악으로 아이의 마음이 안정을 찾아요." },
  { emoji: "🏠", title: "새로운 환경이 어려운 아이", desc: "집이라는 안전한 보금자리에서 시작하는 음악 여행! 어느새 자신감 넘치는 모습에 깜짝 놀라실 거예요." },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDE8D8] via-[#FFF5ED] to-[#D4EEF1] py-24 md:py-36">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.p className="text-primary font-medium mb-4 tracking-wide" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            Kids Mind Piano
          </motion.p>
          <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            음악이 힐링이 되는 순간
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
            피아노를 통해 아이들의 마음이 성장합니다.<br />
            스스로 음악의 즐거움을 발견하도록 도와드려요.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20">
                퍼스트레슨 신청 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-primary/30 hover:bg-primary/5">
                수업 알아보기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 변화 스토리 */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-primary font-medium mb-2">Every Child&apos;s Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold">아이들이 경험하는<br />놀라운 변화의 여정</h2>
        </motion.div>
        <p className="text-center text-muted-foreground mb-14">&ldquo;우리 아이가 달라졌어요!&rdquo;</p>
        <div className="grid md:grid-cols-2 gap-6">
          {changes.map((c, i) => (
            <motion.div key={c.stage} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition bg-gradient-to-br from-white to-[#FFF8F3]">
                <CardContent className="p-8">
                  <span className="text-4xl font-bold text-primary/20">{c.stage}</span>
                  <h3 className="text-lg font-bold mt-2 mb-4 whitespace-pre-line leading-snug">{c.title}</h3>
                  <blockquote className="border-l-3 border-primary/30 pl-4 text-muted-foreground italic mb-3">
                    &ldquo;{c.quote}&rdquo;
                  </blockquote>
                  <p className="text-sm text-primary font-medium">{c.who}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 피아노가 선물하는 특별한 순간들 */}
      <section className="py-20 bg-gradient-to-br from-[#FFF5ED] to-[#F0F7F8]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            피아노가 선물하는<br />특별한 순간들
          </motion.h2>
          <p className="text-center text-muted-foreground mb-14">단순한 기술이 아닌, 아이의 마음이 자라는 시간</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <f.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 학부모님들의 걱정을 덜어줄 수업 */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          학부모님들의 걱정을<br />덜어줄 피아노 수업
        </motion.h2>
        <p className="text-center text-muted-foreground mb-14">새로운 환경에 적응하고, 마음을 표현하는 것이 어려운 아이를 위해</p>
        <div className="grid md:grid-cols-2 gap-6">
          {worries.map((w, i) => (
            <motion.div key={w.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-8 flex gap-5">
                  <span className="text-4xl shrink-0">{w.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{w.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 후기 */}
      <section className="py-20 bg-[#FFF5ED]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">학부모님들의 이야기</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <motion.div key={r.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                    <p className="font-semibold text-sm text-primary">{r.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 선생님보다 아이가 더 많이 말하는 수업 */}
      <section className="py-20 bg-gradient-to-r from-primary to-[#D4856E] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">선생님보다 아이가<br />더 많이 말하는 수업</h2>
          <p className="text-white/70 text-lg mb-4">40분 중 30분간 아이의 목소리로 가득 채워집니다.</p>
        </div>
      </section>


    </div>
  );
}
