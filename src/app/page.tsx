"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles, Star, ArrowRight, Music2, ChevronLeft, ChevronRight, Piano, Globe, Theater, Users, Compass } from "lucide-react";
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
  { num: "7년차", label: "운영", icon: "piano", color: "#7C5CFC", gradient: "from-[#7C5CFC] to-[#9B7DFC]" },
  { num: "14개국", label: "학생", icon: "globe", color: "#4CB9E7", gradient: "from-[#4CB9E7] to-[#6DCDF0]" },
  { num: "10회", label: "연주회 개최", icon: "theater", color: "#FFB547", gradient: "from-[#FFB547] to-[#FFCA70]" },
  { num: "100명+", label: "누적학생", icon: "users", color: "#FF6B6B", gradient: "from-[#FF6B6B] to-[#FF8E8E]" },
];

const features = [
  { icon: Heart, title: "정서적 안정", desc: "편안한 분위기에서 공감과 지지를 받으며, 실수도 두려워하지 않아요.", color: "bg-[#FF6B6B]/10 text-[#FF6B6B]", iconBg: "bg-[#FF6B6B]/10" },
  { icon: Compass, title: "자기주도성", desc: "아이 스스로 배우고 선택하며, 주체적으로 즐기는 학습 환경을 경험해요.", color: "bg-[#FFB547]/10 text-[#FFB547]", iconBg: "bg-[#FFB547]/10" },
  { icon: Sparkles, title: "창의성", desc: "감정과 생각을 음악으로 표현하고, 자신만의 해석으로 다양한 곡을 완성해요.", color: "bg-[#3DBB7D]/10 text-[#3DBB7D]", iconBg: "bg-[#3DBB7D]/10" },
];

const changes = [
  { image: "/images/change-confidence-v2.jpg", title: "불안했던 아이가\n자신감 있게", desc: "실수해도 괜찮아요. 선생님이 그렇게 말씀하셨어요.", who: "7세 수강생", color: "#FF6B6B", bg: "#FFF0F0" },
  { image: "/images/change-challenge.jpg", title: "실수를 두려워하던 아이가\n도전을 즐기는 아이로", desc: "이번엔 더 어려운 곡 해보고 싶어요.", who: "6세 수강생", color: "#FFB547", bg: "#FFF8EC" },
  { image: "/images/change-practice.jpg", title: "억지로 연습하던 아이가\n스스로 피아노 앞에", desc: "엄마, 오늘 연습 30분 다 했어요!", who: "6개월차 수강생", color: "#3DBB7D", bg: "#EDFFF4" },
  { image: "/images/change-create.jpg", title: "그저 따라하던 아이가\n자신만의 음악을 만드는 아이로", desc: "제가 만든 곡이에요. 들어보실래요?", who: "1년차 수강생", color: "#4CB9E7", bg: "#ECF7FF" },
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
  { name: "최지혜", role: "대표 · 음악치료사", desc: "음악치료 전공 2년차. 아이의 마음을 먼저 읽는 수업을 만듭니다.", photo: "/teachers/jihye-v3.jpg", color: "#7C5CFC" },
  { name: "김경서", role: "피아노 선생님", desc: "체계적이고 맞춤화된 수업으로 아이 한 명 한 명에게 집중합니다.", photo: "/teachers/kyungseo-v2.jpg", color: "#4CB9E7" },
  { name: "안서희", role: "피아노 선생님", desc: "따뜻한 소통으로 아이들이 편안하게 음악을 즐길 수 있도록 도와요.", photo: "/teachers/seohee-v2.jpg", color: "#3DBB7D" },
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
  { name: "클○○ 어머니 · 🇺🇸 미국 서부", text: "아이가 수업을 재밌어 하네요. 감사합니다 😊 아이가 너무 부끄러웠다고 하네요 ☺️" },
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

          <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            음악이 <span className="text-[#FFB547]">힐링</span>이 되는 순간
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
            피아노를 통해 아이들의 마음이 성장합니다.<br />
            스스로 음악의 즐거움을 발견하도록 도와드려요.
          </motion.p>
          <motion.div className="flex justify-center" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25">
                퍼스트레슨 신청 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 숫자로 보는 키즈마인드 */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-[#4CB9E7]/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>

          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="text-center group" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="relative">
                  <div className="relative mx-auto mb-5 w-24 h-24">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-30 blur-xl scale-90 group-hover:scale-100 transition-all duration-500`} />
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-60 translate-y-1.5 translate-x-0.5`} />
                    <motion.div
                      className={`relative w-full h-full rounded-3xl bg-gradient-to-br ${s.gradient} flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300`}
                      style={{ boxShadow: `0 12px 32px ${s.color}35` }}
                      initial={{ scale: 0, rotate: -15 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.08 }}
                    >
                      {s.icon === "piano" && <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}><Piano className="w-10 h-10 text-white" strokeWidth={1.5} /></motion.div>}
                      {s.icon === "globe" && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}><Globe className="w-10 h-10 text-white" strokeWidth={1.5} /></motion.div>}
                      {s.icon === "theater" && <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Theater className="w-10 h-10 text-white" strokeWidth={1.5} /></motion.div>}
                      {s.icon === "users" && <motion.div animate={{ x: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 3 }}><Users className="w-10 h-10 text-white" strokeWidth={1.5} /></motion.div>}
                      <div className="absolute top-2 left-3 w-6 h-6 bg-white/25 rounded-full blur-md" />
                    </motion.div>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight" style={{ color: s.color }}>{s.num}</div>
                  <p className="text-base font-medium text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 - 우리 아이가 달라졌어요 */}
      <section className="py-32 bg-[#FFF9F0]">
        <div className="max-w-5xl mx-auto px-4">
          {/* Section 1: 텍스트 후기 */}
          <motion.div className="text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold">&ldquo;우리 아이가 달라졌어요!&rdquo;</h2>
          </motion.div>
          <p className="text-center text-muted-foreground mb-12">키즈마인드피아노를 만난 후 아이들의 놀라운 변화 이야기</p>
          <div className="relative overflow-hidden mb-20">
            <motion.div
              className="flex gap-5"
              animate={{ x: [0, -(320 + 20) * reviews.length] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: reviews.length * 5, ease: "linear" } }}
            >
              {[...reviews, ...reviews].map((r, i) => (
                <div key={i} className="flex-shrink-0 w-[320px]">
                  <Card className="h-full border border-gray-200 shadow-md bg-[#FFFBF0] rounded-2xl hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#FFB547]/20 flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <p className="font-bold text-sm">{r.name}</p>
                      </div>
                      <p className="text-foreground leading-relaxed text-sm">{r.text}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
            {/* Fade edges */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#FFF9F0] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#FFF9F0] to-transparent z-10 pointer-events-none" />
          </div>

          {/* Section 2: 카톡 캡처 후기 */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-bold">진짜 학부모님들의 진짜 이야기</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { location: "호주 거주 학부모", text: "제가 가르쳤을 때보다 5배는 빠르게 진도가 나가고 있어요. 가장 크게 달라진 점은 피아노에 대한 흥미가 눈에 띄게 늘었고, 연주..." },
                { location: "서울 거주 학부모", text: "처음에는 피아노를 치기 싫어하던 아이가 이제는 스스로 피아노 앞에 앉아 연습하는 모습을 보니 정말 놀랍습니다. 선생님의..." },
                { location: "시애틀 거주 학부모", text: "아이가 아빠와 단둘이 파리여행중인데, 사진과 영상을 보내왔서, 공유합니다. 아이가 피아노가 있는 곳이면, 서슴없이 피아노연주하고 싶어한다고 하네요." },
                { location: "한국 분당 거주 학부모", text: "그제 밤에 잠자기 전에 아이가 <우리가족> 노래를 만들었다고 불러줘서 찍었어요 😍😍❤️ 음악을 재밌어하고 즐기는 아이가 너무 이쁘고 셋째 감사드려용!!!" },
              ].map((review, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Card className="border border-gray-200 shadow-md bg-[#FFFBF0] rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#FFB547]/20 flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <p className="font-bold text-sm">{review.location}</p>
                      </div>
                      <p className="text-foreground leading-relaxed text-sm">{review.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 변화 스토리 */}
      <section className="py-32 max-w-5xl mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold">아이들이 경험하는<br />놀라운 변화의 여정</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {changes.map((c, i) => (
            <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: c.bg }}>
                  <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <Image src={c.image} alt={c.title} fill className="object-cover" style={{ filter: "contrast(1.05) saturate(1.1)" }} />
                  </motion.div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: c.color }}>{c.who}</div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="text-base font-bold leading-snug whitespace-pre-line mb-1.5">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">&ldquo;{c.desc}&rdquo;</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 학부모님들의 걱정을 덜어줄 수업 */}
      <section className="py-32 mb-16 max-w-5xl mx-auto px-4">
        <motion.h2 className="text-4xl md:text-6xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          기존 수업 방식과 다른<br />새로운 방식으로 가르칩니다
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
                    <p className="text-muted-foreground text-base leading-relaxed">{w.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 선생님 미리보기 */}
      <section className="py-0 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
          {/* Left panel */}
          <motion.div
            className="md:w-[320px] shrink-0 bg-gradient-to-br from-[#7C5CFC] to-[#6B4CE0] p-10 md:p-12 flex flex-col justify-center text-white relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">선생님<br />소개</h2>
              <p className="text-white/80 text-base leading-relaxed mb-8">아이의 마음을 먼저 읽는<br />전문 온라인 피아노 선생님을<br />소개합니다.</p>
              <Link href="/teachers">
                <Button className="bg-white text-[#7C5CFC] hover:bg-white/90 rounded-full font-bold shadow-lg">
                  선생님 더 알아보기 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          {/* Right - Teacher cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3">
            {teacherList.map((t, i) => (
              <motion.div
                key={t.name}
                className="relative group overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                {/* Photo */}
                <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: t.color + "15" }}>
                  <Image src={t.photo} alt={t.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                {/* Info below image */}
                <div className="p-5 bg-white">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block text-white" style={{ backgroundColor: t.color }}>{t.role}</span>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 피아노가 선물하는 특별한 순간들 */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-[#3DBB7D]/5" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.h2 className="text-4xl md:text-6xl font-bold text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            피아노가 선물하는<br />특별한 순간들
          </motion.h2>
          <p className="text-center text-muted-foreground mb-14">단순한 기술이 아닌, 아이의 마음이 자라는 시간</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${f.iconBg.includes("FF6B6B") ? "#FF6B6B50" : f.iconBg.includes("FFB547") ? "#FFB54750" : "#3DBB7D50"}, ${f.iconBg.includes("FF6B6B") ? "#FF6B6B90" : f.iconBg.includes("FFB547") ? "#FFB54790" : "#3DBB7D90"})` }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.5 }}
                    >
                      <f.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Horizontal roadmap */}
      {/* 끝인 줄 알았죠? 다 있어요! */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div className="text-center mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold">온라인이여서 더 꼼꼼하게!</h2>
          </motion.div>
          <p className="text-center text-muted-foreground mb-12">온라인이라서 놓칠 수 있는 부분까지, 하나하나 챙겨요</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { title: "음악이론", desc: "악보 읽기부터 화성학 기초까지", color: "#7C5CFC", span: "md:col-span-2", emoji: "📖", float: "y" },
              { title: "청음 연습", desc: "귀로 듣고 음을 맞춰요", color: "#4CB9E7", span: "", emoji: "👂", float: "rotate" },
              { title: "초견 연습", desc: "처음 보는 악보도 바로 연주!", color: "#3DBB7D", span: "", emoji: "👀", float: "y" },
              { title: "수업 영상 제공", desc: "수업 내용을 언제든 복습 가능!", color: "#FF6B6B", span: "md:col-span-1", emoji: "🎬", float: "rotate" },
              { title: "손모양 잡기", desc: "올바른 자세로 탄탄한 기본기", color: "#FFB547", span: "", emoji: "🤲", float: "y" },
              { title: "목표 설정", desc: "나에게 맞는 학습 목표부터 정해요", color: "#7C5CFC", span: "md:col-span-1", emoji: "🎯", float: "rotate" },
            ].map((item, i) => (
              <motion.div key={item.title} className={`${item.span}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="relative rounded-2xl p-8 md:p-10 h-full min-h-[220px] flex flex-col justify-end overflow-hidden group hover:scale-[1.02] transition-transform" style={{ backgroundColor: `${item.color}12` }}>
                  {/* 3D gradient icon */}
                  <motion.div
                    className="absolute top-5 right-5 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}90)` }}
                    animate={item.float === "y" ? { y: [0, -8, 0] } : { rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: item.float === "y" ? 3 : 4, ease: "easeInOut", delay: i * 0.3 }}
                  >
                    <span className="text-3xl md:text-4xl drop-shadow-lg">{item.emoji}</span>
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 max-w-3xl mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="inline-block bg-primary/10 text-primary text-base font-bold px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="text-4xl md:text-6xl font-bold">자주 묻는 질문</h2>
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
      <section className="py-32 bg-gradient-to-r from-primary to-[#4CB9E7] text-white relative overflow-hidden">
        <motion.div className="absolute top-5 left-10 w-20 h-20 bg-white/10 rounded-full" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.div className="absolute bottom-5 right-20 w-16 h-16 bg-white/10 rounded-full" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">선생님보다 아이가<br />더 많이 말하는 수업</h2>
          <p className="text-white/70 text-lg mb-4">40분 중 30분간 아이의 목소리로 가득 채워집니다.</p>
        </div>
      </section>
    </div>
  );
}
