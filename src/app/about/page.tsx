"use client";

import { motion } from "framer-motion";
import { Heart, Users, Palette, Trophy, Music, BookOpen, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ConcertCarousel from "@/components/ConcertCarousel";

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

      {/* 연주회 - 핵심 성과 */}
      <section className="py-20 bg-gradient-to-br from-[#FDE8D8] via-[#FFECD2] to-[#D4EEF1]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-6">
            <motion.span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              🏆 키즈마인드피아노의 자랑
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              온라인 연주회 8회 개최
            </motion.h2>
            <motion.p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              전 세계 12개국 아이들이 함께 만드는 특별한 무대.<br />
              학생이 직접 MC를 맡고, 아트워크를 제출하며, 무대 위의 주인공이 됩니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12">
            {[
              { num: "8회", label: "연주회 개최" },
              { num: "12개국", label: "참여 국가" },
              { num: "Zoom", label: "실시간 라이브" },
            ].map((s, i) => (
              <motion.div key={s.label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <ConcertCarousel />
        </div>
      </section>

      {/* 룰렛 교육법 */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">룰렛 교육법</h2>
          <p className="text-center text-muted-foreground text-lg mb-10">매 수업 다양한 활동으로 아이의 음악적 감각을 키워요</p>
          <div className="flex justify-center mb-12">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Static pointer at bottom */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-[#7C5CFC] drop-shadow-md" />
              </div>
              <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl animate-spin" style={{ animationDuration: "15s" }}>
                {/* Outer ring */}
                <circle cx="150" cy="150" r="145" fill="none" stroke="#7C5CFC" strokeWidth="3" opacity="0.3"/>
                {/* 5 segments */}
                {[
                  { angle: -90, color: "#7C5CFC", emoji: "🎨", label: "상상" },
                  { angle: -18, color: "#FF6B6B", emoji: "🎤", label: "노래" },
                  { angle: 54, color: "#FFB547", emoji: "👏", label: "박수" },
                  { angle: 126, color: "#3DBB7D", emoji: "💛", label: "마음" },
                  { angle: 198, color: "#4CB9E7", emoji: "📖", label: "규칙" },
                ].map((seg, i) => {
                  const r = 130;
                  const a1 = ((seg.angle - 36) * Math.PI) / 180;
                  const a2 = ((seg.angle + 36) * Math.PI) / 180;
                  const x1 = 150 + r * Math.cos(a1);
                  const y1 = 150 + r * Math.sin(a1);
                  const x2 = 150 + r * Math.cos(a2);
                  const y2 = 150 + r * Math.sin(a2);
                  const tx = 150 + 85 * Math.cos((seg.angle * Math.PI) / 180);
                  const ty = 150 + 85 * Math.sin((seg.angle * Math.PI) / 180);
                  return (
                    <g key={i}>
                      <path d={`M150,150 L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`} fill={seg.color} opacity={0.85} className="hover:opacity-100 transition-opacity cursor-pointer"/>
                      <text x={tx} y={ty - 4} textAnchor="middle" fontSize="28">{seg.emoji}</text>
                      <text x={tx} y={ty + 18} textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">{seg.label}</text>
                    </g>
                  );
                })}
                {/* Center */}
                <circle cx="150" cy="150" r="35" fill="white" stroke="#7C5CFC" strokeWidth="3"/>
                <clipPath id="centerClip"><circle cx="150" cy="150" r="32"/></clipPath><image href="/logo/logo-main.jpg" x="118" y="118" width="64" height="64" clipPath="url(#centerClip)" />
                {/* Pointer */}
              </svg>
            </div>
          </div>
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

      {/* 비교 섹션 */}
      <section className="py-32 bg-[#FFF9F0]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold">키즈마인드피아노<br />수업은 다릅니다!</h2>
          </motion.div>
          <div className="space-y-6">
            {compare.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* 일반 수업 */}
                    <div className="p-6 md:p-8 bg-gray-50 relative">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">일반 피아노 학원</span>
                      <p className="text-gray-400 text-lg line-through decoration-gray-300">{c.bad}</p>
                    </div>
                    {/* 키즈마인드 */}
                    <div className="p-6 md:p-8 relative border-l-4 border-primary">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3 block">키즈마인드피아노</span>
                      <p className="text-lg font-bold text-foreground">{c.good}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 수업 방식 */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">FAQ for Parents</span>
            <h2 className="text-4xl md:text-6xl font-bold">"온라인에서 이게 가능할까요?"</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Users, worry: "시차가 걱정돼요", answer: "14개국 학생들이 수업 중이에요. 각 나라 시간대에 맞춰 스케줄을 조율해 드려요.", color: "#7C5CFC", tag: "맞춤 스케줄" },
              { icon: Heart, worry: "아이가 한국어를 잘 못해요", answer: "한국어 실력을 평가하지 않아요. 음악 용어를 함께 배우며 자연스럽게 한국어에 노출돼요.", color: "#FF6B6B", tag: "이중언어 전문" },
              { icon: Music, worry: "연습을 안 하려고 해요", answer: "'BTS 치고 싶어요!' 하면 즉석에서 같이 쳐봐요. 좋아하는 곡으로 시작하면 연습은 자연스럽게 따라와요.", color: "#3DBB7D", tag: "즉흥 연주" },
              { icon: Palette, worry: "온라인으로 제대로 배울 수 있나요?", answer: "1080p 웹캠, 콘덴서 마이크, 유선 LAN까지 — 오프라인 학원급 환경을 갖추고, 색깔 펜으로 악보를 시각화하며 가르쳐요.", color: "#FFB547", tag: "전문 장비" },
            ].map((item, i) => (
              <motion.div key={item.worry} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                  <div className="p-7">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: `${item.color}15` }}>
                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold">&ldquo;{item.worry}&rdquo;</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-3">{item.answer}</p>
                        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>✓ {item.tag}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
