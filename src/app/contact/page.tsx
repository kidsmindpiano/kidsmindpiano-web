"use client";

import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-secondary/5 to-accent/5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            체험수업 신청
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            30분 무료 체험수업으로 우리 아이에게 맞는지 확인해보세요!
          </motion.p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div className="md:col-span-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">신청서 작성</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parent">학부모 이름</Label>
                      <Input id="parent" placeholder="홍길동" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="child">자녀 이름</Label>
                      <Input id="child" placeholder="홍길동" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">자녀 나이</Label>
                      <Input id="age" placeholder="8세" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="country">거주 국가</Label>
                      <Input id="country" placeholder="미국" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="email@example.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="kakao">카카오톡 ID (선택)</Label>
                    <Input id="kakao" placeholder="kakao_id" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="experience">피아노 경험</Label>
                    <select id="experience" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                      <option>처음이에요</option>
                      <option>6개월 미만</option>
                      <option>6개월 ~ 1년</option>
                      <option>1년 ~ 3년</option>
                      <option>3년 이상</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">하고 싶은 말 (선택)</Label>
                    <textarea id="message" rows={3} placeholder="궁금한 점이나 원하시는 수업 시간 등을 알려주세요" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                    <Send className="w-5 h-5 mr-2" /> 체험수업 신청하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div className="md:col-span-2 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-md bg-primary text-white">
              <CardContent className="p-8">
                <MessageCircle className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">카카오톡 문의</h3>
                <p className="text-white/70 text-sm mb-4">카카오톡으로도 편하게 문의하세요!</p>
                <a href="https://litt.ly/kidsmindpiano" target="_blank">
                  <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                    카카오톡 채널 바로가기
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <h3 className="font-bold mb-4">체험수업 안내</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>⏰</span> 30분 무료 진행</li>
                  <li className="flex gap-2"><span>📱</span> Zoom으로 진행</li>
                  <li className="flex gap-2"><span>🎹</span> 피아노/키보드 필요</li>
                  <li className="flex gap-2"><span>👨‍👩‍👧</span> 보호자 동석 권장</li>
                  <li className="flex gap-2"><span>📝</span> 신청 후 1~2일 내 연락</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
