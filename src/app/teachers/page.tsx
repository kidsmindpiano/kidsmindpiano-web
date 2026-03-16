"use client";

import { motion } from "framer-motion";
import { Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const teachers = [
  {
    name: "최지혜 대표",
    role: "대표 / 수석 강사",
    bio: "음악치료 전공, 온라인 피아노 레슨 7년. 즉흥연주와 음악치료를 결합한 독자적 교육법 개발.",
    specialties: ["즉흥연주", "음악치료", "커리큘럼 설계"],
    schedule: [
      { day: "월", slots: ["16:00", "17:00", "20:00"] },
      { day: "화", slots: ["16:00", "17:00"] },
      { day: "수", slots: ["16:00", "17:00", "20:00"] },
      { day: "목", slots: ["16:00", "17:00"] },
      { day: "금", slots: ["16:00"] },
    ],
  },
  {
    name: "김선영 강사",
    role: "강사",
    bio: "피아노 전공, 아이들 눈높이에 맞춘 재미있는 수업. 클래식부터 K-Pop까지 폭넓은 레퍼토리.",
    specialties: ["클래식", "K-Pop", "초급 전문"],
    schedule: [
      { day: "월", slots: ["15:00", "16:00", "19:00"] },
      { day: "화", slots: ["15:00", "16:00", "19:00"] },
      { day: "수", slots: ["15:00"] },
      { day: "목", slots: ["15:00", "16:00", "19:00"] },
      { day: "금", slots: ["15:00", "16:00"] },
    ],
  },
  {
    name: "박하은 강사",
    role: "강사",
    bio: "실용음악 전공, 밝고 에너지 넘치는 수업 스타일. 아이들의 창의력을 끌어내는 전문가.",
    specialties: ["실용음악", "작곡", "즉흥연주"],
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
      <section className="bg-gradient-to-br from-accent/5 to-primary/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            선생님 소개
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            아이를 진심으로 사랑하는 선생님들이 기다리고 있어요
          </motion.p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 space-y-12">
        {teachers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  {/* Profile */}
                  <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex flex-col justify-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Music className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-center">{t.name}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">{t.role}</p>
                    <p className="text-sm text-center leading-relaxed mb-4">{t.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {t.specialties.map((s) => (
                        <Badge key={s} variant="secondary" className="bg-primary/10 text-primary border-0">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  {/* Schedule */}
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
                              <span key={slot} className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full font-medium">
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="block mt-6">
                      <Button className="bg-primary hover:bg-primary/90">체험수업 예약하기</Button>
                    </Link>
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
