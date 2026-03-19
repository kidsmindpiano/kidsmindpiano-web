"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles, Star, ArrowRight, Music2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const stats = [
  { num: "7년차", label: "운영", emoji: "🎹", color: "#7C5CFC" },
  { num: "8개국", label: "학생", emoji: "🌏", color: "#4CB9E7" },
  { num: "8회", label: "연주회 개최", emoji: "🎵", color: "#FFB547" },
  { num: "음악치료", label: "전공 대표", emoji: "💜", color: "#FF6B6B" },
];

const features = [
  { icon: Heart, title: "정서적 안정", desc: "편안한 분위기에서 공감과 지지를 받으며, 실수도 두려워하지 않아요.", color: "bg-[#FF6B6B]/10 text-[#FF6B6B]", iconBg: "bg-[#FF6B6B]/10" },
  { icon: Sparkles, title: "자기주도성", desc: "아이 스스로 배우고 선택하며, 주체적으로 즐기는 학습 환경을 경험해요.", color: "bg-[#FFB547]/10 text-[#FFB547]", iconBg: "bg-[#FFB547]/10" },
  { icon: Music2, title: "창의성", desc: "감정과 생각을 음악으로 표현하고, 자신만의 해석으로 다양한 곡을 완성해요.", color: "bg-[#3DBB7D]/10 text-[#3DBB7D]", iconBg: "bg-[#3DBB7D]/10" },
];

const changes = [
  { stage: "01", title: "불안했던 아이가\n자신감 있게", quote: "실수해도 괜찮아요. 선생님이 그렇게 말씀하셨어요.", who: "7세 수강생", color: "#FF6B6B" },
  { stage: "02", title: "실수를 두려워하던 아이가\n도전을 즐기는 아이로", quote: "이번엔 더 어려운 곡 해보고 싶어요.", who: "6세 수강생", color: "#FFB547" },
  { stage: "03", title: "억지로 연습하던 아이가\n스스로 피아노 앞에", quote: "엄마, 오늘 연습 30분 다 했어요!", who: "6개월차 수강생", color: "#3DBB7D" },
  { stage: "04", title: "그저 따라하던 아이가\n자신만의 음악을 만드는 아이로", quote: "제가 만든 곡이에요. 들어보실래요?", who: "1년차 수강생", color: "#4CB9E7" },
];

const comparisons = [
  { bad: "\"진도부터 나가자\"", good: "\"그 곡 좋지! 멜로디가 이렇게 되네?\"", tag: "즉흥연주", color: "#7C5CFC" },
  { bad: "\"한국어 틀렸어\"", good: "\"Legato가 뭔지 같이 알아볼까?\"", tag: "안식처", color: "#3DBB7D" },
  { bad: "\"교재 순서대로만\"", good: "\"BTS 신곡 치고 싶어? 해보자!\"", tag: "개인화", color: "#FF6B6B" },
  { bad: "\"이건 A-B-A 형식이야\"", good: "색깔 펜으로 시각화", tag: "Show Don't Tell", color: "#4CB9E7" },
];

const firstLessonSteps = [
  { time: "0-5분", title: "환영", desc: "편안한 인사와 아이와의 첫 대화. 긴장을 풀어주는 시간.", emoji: "👋", color: "#7C5CFC" },
  { time: "5-15분", title: "Interest Mapping", desc: "좋아하는 노래, 관심사, 음악 경험을 파악해요.", emoji: "🗺️", color: "#4CB9E7" },
  { time: "15-25분", title: "Wow Moment", desc: "아이가 \"와!\" 하는 순간을 만들어요. 첫 소리의 감동.", emoji: "✨", color: "#FFB547" },
  { time: "25-35분", title: "룰렛 타임", desc: "다양한 음악 활동으로 흥미를 폭발시키는 시간!", emoji: "🎡", color: "#3DBB7D" },
  { time: "35-40분", title: "학부모 브리핑", desc: "수업 내용과 아이의 반응을 학부모님께 공유해요.", emoji: "📋", color: "#FF6B6B" },
];

const equipmentItems = [
  { emoji: "📷", title: "1080p 웹캠", desc: "손가락 움직임까지 선명하게" },
  { emoji: "🎙️", title: "USB 콘덴서 마이크", desc: "피아노 소리를 정확하게 전달" },
  { emoji: "💡", title: "링라이트", desc: "어두운 환경에서도 선명한 화면" },
  { emoji: "🔌", title: "유선 LAN", desc: "끊김 없는 안정적인 연결" },
  { emoji: "🔊", title: "Zoom 원본사운드", desc: "피아노 음색 그대로 전달" },
];

const teacherList = [
  { name: "최지혜", role: "대표 · 음악치료사", desc: "음악치료 전공 7년차. 아이의 마음을 먼저 읽는 수업을 만듭니다.", photo: "/teachers/teacher1.jpg", color: "#7C5CFC" },
  { name: "김경서", role: "피아노 선생님", desc: "따뜻한 소통으로 아이들이 편안하게 음악을 즐길 수 있도록 도와요.", photo: "/teachers/teacher2.jpg", color: "#4CB9E7" },
  { name: "안서희", role: "피아노 선생님", desc: "체계적이고 맞춤화된 수업으로 아이 한 명 한 명에게 집중합니다.", photo: "/teachers/teacher3.jpg", color: "#3DBB7D" },
];

const faqs = [
  { q: "어떤 장비가 필요한가요?", a: "피아노(또는 전자 키보드), 인터넷이 되는 기기(태블릿, 노트북 등)만 있으면 돼요. 웹캠과 마이크는 기기 내장으로도 충분하지만, 외장 장비를 사용하시면 더 좋은 수업 환경이 됩니다." },
  { q: "시차가 달라도 수업이 가능한가요?", a: "네, 전 세계 8개국 학생들이 수업 중이에요! 선생님들이 다양한 시간대에 맞춰 유연하게 스케줄을 조정합니다. 한국 시간 기준 오전~저녁까지 수업이 가능해요." },
  { q: "아이가 한국어를 잘 못하는데 괜찮을까요?", a: "물론이에요! 이중언어 환경의 아이들을 많이 가르쳐왔어요. 한국어와 영어를 섞어가며 수업하고, 음악이라는 공통 언어로 소통하니까 걱정하지 마세요." },
  { q: "퍼스트레슨은 어떻게 진행되나요?", a: "40분간 진행되는 무료 체험 수업이에요. 아이의 관심사를 파악하고, 피아노와 친해지는 시간을 가져요. 수업 후에는 학부모님께 아이의 반응과 수업 방향을 안내드립니다." },
  { q: "수업을 녹화할 수 있나요?", a: "네, Zoom 수업은 녹화가 가능해요. 녹화본을 통해 복습하거나 연습할 때 참고할 수 있어서 많은 학부모님들이 활용하고 계세요." },
  { q: "교재는 어떤 걸 사용하나요?", a: "아이의 수준과 관심사에 맞춰 다양한 교재를 활용해요. 기본 교재 외에도 K-Pop, 영화 OST, 동요 등 아이가 좋아하는 곡을 직접 편곡해서 사용합니다." },
];

const worries = [
  { emoji: "🌏", title: "해외에 거주하는 한국 아이", desc: "이중언어를 쓰는 아이에게 어떤 어려움이 있을까요? 아이의 마음을 들어보는 시간이 될 거예요!", dot: "#FF6B6B" },
  { emoji: "🎹", title: "말보다 음악으로 표현할 때", desc: "말로는 못했던 마음속 이야기를 피아노 건반으로 들려주며 환하게 웃는 아이를 만나보세요.", dot: "#FFB547" },
  { emoji: "💛", title: "마음이 예민한 우리 아이", desc: "\"선생님이랑 피아노 칠 때가 제일 편해요\" 따뜻한 대화와 음악으로 아이의 마음이 안정을 찾아요.", dot: "#3DBB7D" },
  { emoji: "🏠", title: "새로운 환경이 어려운 아이", desc: "집이라는 안전한 보금자리에서 시작하는 음악 여행! 어느새 자신감 넘치는 모습에 깜짝 놀라실 거예요.", dot: "#4CB9E7" },
];

const reviews = [
  { name: "곽○○ 어머니 · 🇺🇸 미국 서부", text: "아이가 처음에 피아노 어렵다고 하기 싫다 했는데 선생님도 한국선생님이라 너무 좋다고 하고 몇번해보더니 피아노 재밌다고 하네요. 연습도 매일 하라고 하면 곧잘 하구요 ❤️" },
  { name: "김○○ 어머니 · 🇺🇸 미국 동부", text: "아이가 이번 레슨이 너무 재미있었나봐요 ㅋㅋ 자기가 만든 곡 동생한테 자랑하고 미소가 끊이질 않네요" },
  { name: "김○○ 어머니 · 🇯🇵 일본", text: "아이가 키즈마인드 하면서 피아노를 즐기면서 의욕적으로 하더니 곡도 만들고 멋지네요 🫶🏻 아이가 만든 곡을 선물로 받다니 ❤️ 정말 의미있는 선물이네요~~" },
  { name: "김○○ 어머니 · 🇺🇸 미국 텍사스", text: "오늘 너무 재밌었대요 ㅎ" },
  { name: "구○○ 어머니 · 🇮🇩 인도네시아", text: "단기간에 뭔가 눈에띄는 성과보다는 최대한 흥미있게 배웠으면 좋겠네요!" },
  { name: "클레어 어머니 · 🇺🇸 미국 서부", text: "아이가 수업을 재밌어 하네요. 감사합니다 😊 아이가 너무 부끄러웠다고 하네요 ☺️" },
  { name: "하○○ 어머니 · 🇺🇸 미국 서부", text: "오 멋지네요!! 🎵" },
];

export default function Home() {
  const reviewRef = useRef<HTMLDivElement>(null);
  const scrollReviews = (dir: "left" | "right") => {
    if (reviewRef.current) {
      reviewRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Hero - 영상 배경 */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/logo/logo-main.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div className="mb-8" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Image src="/logo/logo-main.jpg" alt="Kids Mind Piano" width={120} height={120} className="mx-auto rounded-3xl shadow-xl border-2 border-white/20" />
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            음악이 <span className="text-[#FFB547]">힐링</span>이 되는 순간
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
            피아노를 통해 아이들의 마음이 성장합니다.<br />
            스스로 음악의 즐거움을 발견하도록 도와드려요.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25">
                퍼스트레슨 신청 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 border-white/30 text-white hover:bg-white/10">
                수업 알아보기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 숫자로 보는 키즈마인드 */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-[#4CB9E7]/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">Kids Mind in Numbers</span>
            <h2 className="text-3xl md:text-4xl font-bold">숫자로 보는 키즈마인드</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <span className="text-4xl mb-3 block">{s.emoji}</span>
                    <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: s.color }}>{s.num}</div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 변화 스토리 */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">Every Child&apos;s Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold">아이들이 경험하는<br />놀라운 변화의 여정</h2>
        </motion.div>
        <p className="text-center text-muted-foreground mb-14">&ldquo;우리 아이가 달라졌어요!&rdquo;</p>
        <div className="grid md:grid-cols-2 gap-6">
          {changes.map((c, i) => (
            <motion.div key={c.stage} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: c.color }} />
                <CardContent className="p-8">
                  <span className="text-4xl font-bold" style={{ color: c.color, opacity: 0.3 }}>{c.stage}</span>
                  <h3 className="text-lg font-bold mt-2 mb-4 whitespace-pre-line leading-snug">{c.title}</h3>
                  <blockquote className="border-l-4 pl-4 mb-3" style={{ borderColor: c.color }}>
                    <span className="text-lg font-bold text-foreground">&ldquo;{c.quote}&rdquo;</span>
                  </blockquote>
                  <p className="text-sm font-medium" style={{ color: c.color }}>{c.who}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 다른 피아노 학원과 뭐가 다른데? */}
      <section className="py-20 bg-gradient-to-br from-[#7C5CFC]/5 via-white to-[#3DBB7D]/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block bg-[#FF6B6B]/10 text-[#FF6B6B] text-sm font-bold px-4 py-1.5 rounded-full mb-4">What Makes Us Different</span>
            <h2 className="text-3xl md:text-4xl font-bold">다른 피아노 학원과<br />뭐가 다른데?</h2>
          </motion.div>
          <div className="space-y-4">
            {comparisons.map((c, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="grid md:grid-cols-2 gap-3 items-stretch">
                <Card className="border-0 shadow-sm bg-gray-100/80">
                  <CardContent className="p-5 flex items-center gap-3">
                    <span className="text-xl shrink-0">❌</span>
                    <span className="text-muted-foreground">{c.bad}</span>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-1" style={{ backgroundColor: c.color }} />
                  <CardContent className="p-5 flex items-center gap-3">
                    <span className="text-xl shrink-0">✅</span>
                    <div className="flex-1">
                      <span className="font-medium">{c.good}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full shrink-0" style={{ backgroundColor: `${c.color}15`, color: c.color }}>{c.tag}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 피아노가 선물하는 특별한 순간들 */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-[#3DBB7D]/5" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            피아노가 선물하는<br />특별한 순간들
          </motion.h2>
          <p className="text-center text-muted-foreground mb-14">단순한 기술이 아닌, 아이의 마음이 자라는 시간</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${f.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                      <f.icon className={`w-8 h-8 ${f.color.split(" ")[1]}`} />
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

      {/* 퍼스트레슨 40분의 마법 */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-[#FFB547]/5">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div className="text-center mb-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block bg-[#FFB547]/10 text-[#FFB547] text-sm font-bold px-4 py-1.5 rounded-full mb-4">First Lesson</span>
            <h2 className="text-3xl md:text-4xl font-bold">퍼스트레슨<br />40분의 마법</h2>
            <p className="text-muted-foreground mt-4">무료 체험 수업 40분, 이렇게 진행돼요</p>
          </motion.div>
          <div className="space-y-0">
            {firstLessonSteps.map((step, i) => (
              <motion.div key={step.time} className="relative pl-20 pb-12 last:pb-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                {i < firstLessonSteps.length - 1 && (
                  <div className="absolute left-[23px] top-14 bottom-0 w-0.5 bg-primary/20" />
                )}
                <div className="absolute left-0 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl border-2" style={{ borderColor: step.color }}>
                  {step.emoji}
                </div>
                <div>
                  <span className="text-sm font-bold" style={{ color: step.color }}>{step.time}</span>
                  <h3 className="text-lg font-bold mt-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25">
                퍼스트레슨 신청하기 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
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
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all overflow-hidden">
                <div className="h-1" style={{ backgroundColor: w.dot }} />
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

      {/* 전문가가 만드는 수업 환경 */}
      <section className="py-20 bg-gradient-to-br from-[#4CB9E7]/5 to-primary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block bg-[#4CB9E7]/10 text-[#4CB9E7] text-sm font-bold px-4 py-1.5 rounded-full mb-4">Professional Setup</span>
            <h2 className="text-3xl md:text-4xl font-bold">전문가가 만드는<br />수업 환경</h2>
            <p className="text-muted-foreground mt-4">온라인이지만, 오프라인 못지않은 퀄리티</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {equipmentItems.map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all text-center h-full">
                  <CardContent className="p-5">
                    <span className="text-4xl mb-3 block">{item.emoji}</span>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 선생님 미리보기 */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="inline-block bg-[#3DBB7D]/10 text-[#3DBB7D] text-sm font-bold px-4 py-1.5 rounded-full mb-4">Meet Our Teachers</span>
          <h2 className="text-3xl md:text-4xl font-bold">선생님 미리보기</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {teacherList.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: t.color }} />
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-3 shadow-lg" style={{ borderColor: t.color }}>
                    <Image src={t.photo} alt={t.name} width={96} height={96} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: t.color }}>{t.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link href="/teachers">
            <Button variant="outline" size="lg" className="rounded-full border-2 border-primary/30 hover:bg-primary/5">
              선생님 더 알아보기 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 후기 */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <motion.div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB547]/10 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 5 }} />
        <motion.div className="absolute bottom-10 -left-10 w-32 h-32 bg-[#FF6B6B]/10 rounded-full" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">학부모님들의 이야기</h2>
          <div ref={reviewRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {reviews.map((r, i) => (
              <motion.div key={i} className="flex-shrink-0 w-[300px] snap-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#FFB547] text-[#FFB547]" />)}
                    </div>
                    <p className="text-foreground mb-4 leading-relaxed text-sm">&ldquo;{r.text}&rdquo;</p>
                    <p className="font-semibold text-sm text-primary">{r.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => scrollReviews("left")} className="bg-white shadow-md rounded-full p-3 hover:bg-gray-50 transition">
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button onClick={() => scrollReviews("right")} className="bg-white shadow-md rounded-full p-3 hover:bg-gray-50 transition">
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold">자주 묻는 질문</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 md:p-8">
              <Accordion>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i}>
                    <AccordionTrigger className="text-base font-semibold py-4">{faq.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed pb-2">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* 선생님보다 아이가 더 많이 말하는 수업 */}
      <section className="py-20 bg-gradient-to-r from-primary to-[#4CB9E7] text-white relative overflow-hidden">
        <motion.div className="absolute top-5 left-10 w-20 h-20 bg-white/10 rounded-full" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.div className="absolute bottom-5 right-20 w-16 h-16 bg-white/10 rounded-full" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">선생님보다 아이가<br />더 많이 말하는 수업</h2>
          <p className="text-white/70 text-lg mb-4">40분 중 30분간 아이의 목소리로 가득 채워집니다.</p>
        </div>
      </section>
    </div>
  );
}
