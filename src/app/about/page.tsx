"use client";

import { motion } from "framer-motion";
import { Heart, Users, Palette, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const roulette = [
  { icon: "🎨", name: "상상", desc: "이 노래 들으면 어떤 이미지가 떠올라?" },
  { icon: "🎤", name: "노래", desc: "노래로 불러볼까? 음감을 키워요" },
  { icon: "👏", name: "박수", desc: "오른손/왼손 리듬을 박수로!" },
  { icon: "💛", name: "마음", desc: "오늘 기분을 피아노로 표현해볼까?" },
  { icon: "📖", name: "규칙", desc: "악보에서 아는 것 모두 찾아보자!" },
];

const curriculum = [
  { period: "3개월", items: ["기본 자세와 손 모양", "계이름과 리듬 읽기", "동요 1곡 완주 🎉"], color: "bg-primary/10 text-primary" },
  { period: "6개월", items: ["연주회 목표 설정", "양손 연주 시작", "월별 학부모 상담"], color: "bg-accent/10 text-accent" },
  { period: "1년+", items: ["K-Pop / 영화 OST 도전", "즉흥 연주 심화", "연주회 MC & 리더십"], color: "bg-[#E8915A]/10 text-[#D4856E]" },
];

const compare = [
  { bad: "정답 중심의 지시적 수업", good: "질문으로 이끄는 개방형 대화" },
  { bad: "실수를 두려워하는 수업 환경", good: "실수도 괜찮은 안전한 공간" },
  { bad: "일방적 전달과 통제적 피드백", good: "감정적 지지와 공감의 피드백" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#FDE8D8] to-[#D4EEF1] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p className="text-primary font-medium mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Premium Music Education</motion.p>
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            키즈마인드피아노 수업 방식
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            아이의 마음을 먼저 읽고, 음악으로 대화합니다
          </motion.p>
        </div>
      </section>

      {/* 수업 방식 */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">이렇게 수업해요</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Zoom 1:1 수업", desc: "선생님과 아이, 단둘이 집중! 외장 카메라와 마이크로 오프라인 못지않은 수업 퀄리티." },
            { icon: Palette, title: "디지털 악보 시각화", desc: "색깔 펜으로 A부분은 노랑, B부분은 파랑. 악보가 그림처럼 보여요." },
            { icon: Heart, title: "음악치료 기반", desc: "감정을 음악으로 표현하는 법을 배워요. 수업이 아이의 안식처가 됩니다." },
          ].map((item, i) => (
            <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-5">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 비교 섹션 */}
      <section className="py-16 bg-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">피아노 수업 처음이죠?</h2>
          <p className="text-center text-muted-foreground mb-12">키즈마인드피아노는 다릅니다</p>
          <div className="space-y-4">
            {compare.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="grid md:grid-cols-2 gap-4">
                <Card className="border-0 shadow-sm bg-gray-100/80">
                  <CardContent className="p-6 flex items-center gap-3">
                    <span className="text-xl">❌</span>
                    <span className="text-muted-foreground">{c.bad}</span>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardContent className="p-6 flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <span className="font-medium">{c.good}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 룰렛 교육법 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">🎡 룰렛 교육법</h2>
          <p className="text-center text-muted-foreground mb-12">매 수업 다양한 활동으로 아이의 음악적 감각을 키워요</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {roulette.map((r, i) => (
              <motion.div key={r.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="text-center border-0 shadow-sm hover:shadow-md transition bg-gradient-to-br from-white to-[#FFF8F3]">
                  <CardContent className="p-5">
                    <div className="text-4xl mb-3">{r.icon}</div>
                    <h4 className="font-bold mb-1">{r.name}</h4>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 커리큘럼 */}
      <section className="py-16 bg-gradient-to-br from-[#FFF5ED] to-[#F0F7F8]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">커리큘럼</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {curriculum.map((c, i) => (
              <motion.div key={c.period} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="p-8">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5 ${c.color}`}>{c.period}</span>
                    <ul className="space-y-3">
                      {c.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 연주회 */}
      <section className="py-16 bg-[#2D2A26] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">연 2회 온라인 연주회 🎶</h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            사전 녹화 또는 Live Watch Party 형식으로 진행됩니다.
            학생이 직접 MC를 맡고, 아트워크를 제출하며, 무대 위의 주인공이 됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}
