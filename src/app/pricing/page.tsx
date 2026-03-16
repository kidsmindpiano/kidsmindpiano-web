"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const plans = [
  {
    name: "체험수업",
    price: "무료",
    period: "30분 × 1회",
    features: ["1:1 Zoom 수업", "아이 성향 파악", "커리큘럼 상담", "부담 없이 체험"],
    cta: "체험수업 신청",
    popular: false,
  },
  {
    name: "정규반",
    price: "₩200,000",
    period: "월 4회 (주 1회 40분)",
    features: ["1:1 맞춤 레슨", "매주 레슨 노트", "수업 영상 제공", "월별 학부모 상담", "온라인 연주회 참가"],
    cta: "등록 문의",
    popular: true,
  },
  {
    name: "집중반",
    price: "₩380,000",
    period: "월 8회 (주 2회 40분)",
    features: ["주 2회 집중 레슨", "빠른 실력 향상", "매주 레슨 노트", "수업 영상 제공", "월별 학부모 상담", "연주회 우선 배정"],
    cta: "등록 문의",
    popular: false,
  },
];

const faqs = [
  { q: "수업에 필요한 준비물이 있나요?", a: "피아노(또는 전자 키보드), 안정적인 인터넷, 노트북/태블릿이 필요합니다. 외장 웹캠과 마이크가 있으면 더 좋아요!" },
  { q: "체험수업 후 바로 등록해야 하나요?", a: "아니요! 체험 후 충분히 생각하신 뒤 결정하시면 됩니다. 부담 없이 신청해주세요." },
  { q: "수업 시간은 어떻게 정하나요?", a: "선생님 스케줄에서 원하시는 시간을 선택하시면 됩니다. 시차를 고려해 유연하게 조율해드려요." },
  { q: "형제 할인이 있나요?", a: "네! 형제/자매가 함께 등록하시면 할인이 적용됩니다. 문의 시 말씀해주세요." },
  { q: "수업료 결제는 어떻게 하나요?", a: "매월 초 결제이며, 계좌이체 또는 페이팔로 가능합니다." },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#FDE8D8] to-[#D4EEF1] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            수업료 안내
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            첫 체험수업은 무료! 부담 없이 시작하세요.
          </motion.p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Card className={`h-full border-2 ${plan.popular ? "border-primary shadow-xl scale-105" : "border-transparent shadow-md"} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 인기
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-1"><span className="text-4xl font-bold text-primary">{plan.price}</span></div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.period}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className={`w-full rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`} variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#FFF5ED]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">궁금한 점이 있으신가요?</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Q. {faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
