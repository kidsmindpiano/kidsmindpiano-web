"use client";

import { motion } from "framer-motion";
import { Clock, Award, BookOpen, GraduationCap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const teachers = [
  {
    name: "최지혜",
    role: "대표 · 음악치료사",
    image: "/teachers/jihye.jpg",
    quote: "아이의 마음을 먼저 읽고, 음악으로 대화합니다.",
    education: ["강원예술고등학교 피아노 전공", "총신대학교 교회음악과 피아노 전공", "평택대학원 음악치료 전공"],
    experience: ["온라인 피아노 레슨 5년+", "오프라인 피아노 레슨 8년+", "음악치료 임상 경험 1년", "12개국 학생 지도"],
    certifications: ["발달 재활 제공 인력 자격증", "음악심리사 2급 자격증"],
    schedule: [
      { day: "월", slots: ["16:00", "17:00", "20:00"] },
      { day: "화", slots: ["16:00", "17:00"] },
      { day: "수", slots: ["16:00", "17:00", "20:00"] },
      { day: "목", slots: ["16:00", "17:00"] },
      { day: "금", slots: ["16:00"] },
    ],
  },
  {
    image: "/teachers/kyungseo.jpg",
    imgScale: 1,
    name: "김경서",
    role: "피아노 강사",
    quote: "탄탄한 기본기 위에 아이만의 음악을 만들어갑니다.",
    education: ["계원예술고등학교 피아노 전공", "이화여자대학교 피아노 전공", "이화여자대학교 대학원 피아노 전공"],
    experience: ["피아노 학원 강사 경력 6년+", "클래식 연주 활동 다수", "성가대 반주자"],
    certifications: ["한독클래식음악협회 콩쿨 3위", "유니버설 콩쿨 3위", "연예술기획 콩쿨 전체대상"],
    schedule: [
      { day: "월", slots: ["15:00", "16:00", "19:00"] },
      { day: "화", slots: ["15:00", "16:00", "19:00"] },
      { day: "수", slots: ["15:00"] },
      { day: "목", slots: ["15:00", "16:00", "19:00"] },
      { day: "금", slots: ["15:00", "16:00"] },
    ],
  },
  {
    image: "/teachers/seohee.jpg",
    imgScale: 1,
    name: "안서희",
    role: "피아노 강사",
    quote: "음악을 통해 아이의 가능성을 발견합니다.",
    education: ["인천예술고등학교 피아노 전공", "수원대학교 피아노 전공"],
    experience: ["피아노 학원 강사 경력 4년+", "유아/성인 대상 개인레슨", "악보 제작 및 편곡 활동"],
    certifications: ["음악심리상담사 1급"],
    schedule: [
      { day: "화", slots: ["17:00", "18:00", "20:00"] },
      { day: "수", slots: ["17:00", "18:00"] },
      { day: "목", slots: ["17:00", "18:00", "20:00"] },
      { day: "금", slots: ["17:00", "18:00"] },
      { day: "토", slots: ["10:00", "11:00"] },
    ],
  },
];

export default function TeachersPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#FDE8D8] to-[#D4EEF1] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p className="text-primary font-medium mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>함께하는 선생님들</motion.p>
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            아이의 마음을 이해하는<br />전문 교육진
          </motion.h1>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 space-y-10">
        {teachers.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 bg-gradient-to-br from-[#FDE8D8] to-[#F5E6D8] p-8 flex flex-col justify-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                      {t.image ? (
                        <Image src={t.image} alt={t.name} width={300} height={300} quality={100} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full bg-white/60 flex items-center justify-center text-5xl">🎹</div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-center">{t.name}</h3>
                    <p className="text-sm text-primary text-center mb-3">{t.role}</p>
                    <p className="text-sm text-center text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>

                    <div className="mt-6 space-y-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold mb-2"><GraduationCap className="w-4 h-4 text-primary" /> Education</div>
                        <ul className="space-y-1 text-muted-foreground">
                          {t.education.map(e => <li key={e}>· {e}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold mb-2"><BookOpen className="w-4 h-4 text-primary" /> Experience</div>
                        <ul className="space-y-1 text-muted-foreground">
                          {t.experience.map(e => <li key={e}>· {e}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold mb-2"><Award className="w-4 h-4 text-primary" /> Certification / Awards</div>
                        <ul className="space-y-1 text-muted-foreground">
                          {t.certifications.map(e => <li key={e}>· {e}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-lg">수업 가능 시간 (KST)</h4>
                    </div>
                    <div className="space-y-3">
                      {t.schedule.map((s) => (
                        <div key={s.day} className="flex items-center gap-4">
                          <span className="w-8 font-bold text-primary">{s.day}</span>
                          <div className="flex flex-wrap gap-2">
                            {s.slots.map((slot) => (
                              <span key={slot} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {t.role.includes("대표") && (
                      <Link href="/contact" className="block mt-8">
                        <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">퍼스트레슨 신청하기</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
