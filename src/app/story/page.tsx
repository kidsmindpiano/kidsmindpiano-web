"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

type Step = "intro" | "q1" | "q2" | "q3" | "result";

const questions = {
  q1: {
    question: "우리 아이 피아노, 어떤가요?",
    subtitle: "가장 가까운 걸 골라주세요",
    options: [
      { emoji: "😢", text: "연습하라고 하면 싫다고 해요", key: "unwilling" },
      { emoji: "😟", text: "실수하면 금방 포기해요", key: "giveup" },
      { emoji: "🤔", text: "피아노는 좋은데 재미없대요", key: "boring" },
      { emoji: "🌏", text: "해외라 한국어 선생님을 못 찾겠어요", key: "overseas" },
    ],
  },
  q2: {
    question: "아이에게 피아노가 어떤 존재였으면 하세요?",
    subtitle: "부모님의 마음을 들려주세요",
    options: [
      { emoji: "😊", text: "스스로 즐기는 취미", key: "hobby" },
      { emoji: "💪", text: "자신감을 키워주는 도구", key: "confidence" },
      { emoji: "💛", text: "마음을 표현하는 방법", key: "expression" },
      { emoji: "🎵", text: "좋아하는 곡을 직접 치는 기쁨", key: "play" },
    ],
  },
  q3: {
    question: "혹시 이런 경험 있으세요?",
    subtitle: "해당하는 것을 골라주세요",
    options: [
      { emoji: "📱", text: "온라인 수업이라 집중 못할까 걱정", key: "online" },
      { emoji: "🗣", text: "한국어와 현지어 사이에서 혼란", key: "language" },
      { emoji: "😰", text: "다른 학원에서 상처받은 적 있어요", key: "hurt" },
      { emoji: "🎹", text: "피아노 앞에 앉히는 것 자체가 전쟁", key: "war" },
    ],
  },
};

const resultCards = [
  { emoji: "🎡", title: "룰렛 교육법", desc: "매 수업 '상상, 노래, 박수, 마음, 규칙' 중 하나가 랜덤으로! 아이가 다음엔 뭐가 나올지 기대하게 돼요." },
  { emoji: "🎵", title: "즉흥 연주", desc: "\"BTS 신곡 치고 싶어요!\" → 바로 가르쳐드려요. 아이가 좋아하는 곡이 곧 교재가 됩니다." },
  { emoji: "💛", title: "음악치료 기반", desc: "\"오늘 기분이 어때?\" 로 시작하는 수업. 피아노가 아이의 안식처가 됩니다." },
  { emoji: "🌏", title: "12개국 아이들과 함께", desc: "미국, 일본, 독일, 인도네시아... 전 세계 한국 아이들이 온라인으로 만나고 있어요." },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function StoryPage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [q3Selected, setQ3Selected] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    setAnswers([...answers, key]);
    if (step === "q1") setStep("q2");
    else if (step === "q2") setStep("q3");
  };

  const handleQ3Toggle = (key: string) => {
    setQ3Selected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const handleQ3Submit = () => {
    setAnswers([...answers, ...q3Selected]);
    setStep("result");
  };

  const reset = () => { setStep("intro"); setAnswers([]); setQ3Selected([]); };

  const progress = step === "intro" ? 0 : step === "q1" ? 25 : step === "q2" ? 50 : step === "q3" ? 75 : 100;

  return (
    <div className="min-h-screen bg-[#FFFAF8]">
      {step !== "intro" && (
        <div className="fixed top-16 left-0 right-0 z-40 h-1.5 bg-gray-200">
          <motion.div className="h-full bg-primary rounded-r-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div key="intro" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="text-center min-h-[70vh] flex flex-col justify-center">
              <div className="mb-8">
                <Image src="/logo/logo-main.jpg" alt="Kids Mind Piano" width={120} height={120} className="mx-auto rounded-3xl shadow-xl" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                우리 아이 피아노,<br /><span className="text-primary">어떻게 하고 계세요?</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                3가지 질문에 답하면<br />아이에게 맞는 피아노 수업을 알려드릴게요.
              </p>
              <div className="relative inline-block mx-auto">
                <motion.div className="absolute -top-6 -left-10 w-8 h-8 bg-[#FFB547] rounded-full" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
                <motion.div className="absolute -bottom-4 -right-8 w-6 h-6 bg-[#FF6B6B] rounded-full" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} />
                <motion.div className="absolute top-1/2 -right-14 w-5 h-5 bg-[#3DBB7D] rounded-full" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4 }} />
                <Button size="lg" onClick={() => setStep("q1")} className="bg-primary hover:bg-primary/90 text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/25">
                  시작하기 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-8">⏱ 30초면 충분해요</p>
            </motion.div>
          )}

          {(step === "q1" || step === "q2" || step === "q3") && (
            <motion.div key={step} variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="min-h-[70vh] flex flex-col justify-center">
              <div className="text-center mb-10">
                <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  {step === "q1" ? "1 / 3" : step === "q2" ? "2 / 3" : "3 / 3"}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{questions[step].question}</h2>
                <p className="text-muted-foreground">{questions[step].subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[step].options.map((opt, i) => (
                  <motion.div key={opt.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <button
                      onClick={() => step === "q3" ? handleQ3Toggle(opt.key) : handleSelect(opt.key)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                        step === "q3" && q3Selected.includes(opt.key) ? "border-primary bg-primary/5 shadow-md" : "border-border bg-white hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{opt.emoji}</span>
                        <span className="text-base font-medium">{opt.text}</span>
                        {step !== "q3" && <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
              {step === "q3" && (
                <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Button size="lg" onClick={handleQ3Submit} className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/25">
                    결과 보기 <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === "result" && (
            <motion.div key="result" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
              <div className="text-center mb-12">
                <motion.div className="text-6xl mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>🎹</motion.div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  우리 아이에게 딱 맞는 수업,<br /><span className="text-primary">키즈마인드피아노</span>에 있어요
                </h2>
                <p className="text-muted-foreground">이런 방법으로 아이의 마음을 열어요</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {resultCards.map((card, i) => (
                  <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                    <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-6">
                        <span className="text-3xl">{card.emoji}</span>
                        <h3 className="text-lg font-bold mt-3 mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 mb-12">
                <h3 className="text-xl font-bold text-center mb-6">실제로 이렇게 변했어요</h3>
                <div className="space-y-4">
                  {[
                    { before: "연습 싫다고 울던 아이", after: "\"엄마, 오늘 연습 30분 다 했어요!\"", who: "6개월차 수강생" },
                    { before: "실수하면 바로 포기하던 아이", after: "\"더 어려운 곡 해보고 싶어요!\"", who: "6세 수강생" },
                    { before: "그저 따라 치기만 하던 아이", after: "\"제가 만든 곡이에요. 들어보실래요?\"", who: "1년차 수강생" },
                  ].map((item, i) => (
                    <motion.div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.2 }}>
                      <span className="text-sm text-muted-foreground shrink-0">{item.before}</span>
                      <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="font-bold text-sm">{item.after}</div>
                        <div className="text-xs text-primary">{item.who}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                <h3 className="text-2xl font-bold mb-3">첫 만남, 퍼스트레슨으로 시작하세요</h3>
                <p className="text-muted-foreground mb-8">40분간 아이의 마음을 들여다보는 시간</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/25">
                      퍼스트레슨 신청하기 🎹
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-full border-2">더 알아보기</Button>
                  </Link>
                </div>
                <button onClick={reset} className="mt-6 text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1 mx-auto">
                  <RotateCcw className="w-4 h-4" /> 다시 해보기
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
