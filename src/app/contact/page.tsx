"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, LogIn, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function ContactPage() {
  const { user, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase DB에 저장
    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#FDE8D8] to-[#D4EEF1] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            퍼스트레슨 신청
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            40분 퍼스트레슨으로 우리 아이에게 맞는지 확인해보세요!
          </motion.p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !user ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-primary to-[#4CB9E7]" />
                  <CardContent className="p-8 md:p-10">
                    <div className="text-center mb-8">
                      <span className="text-5xl mb-4 block">🎹</span>
                      <h2 className="text-2xl font-bold mb-3">퍼스트레슨 신청을 위해<br />로그인이 필요해요</h2>
                      <p className="text-muted-foreground">
                        계정이 있으면 로그인, 처음이시면 가입해주세요!<br />
                        <span className="text-sm">가입은 1분이면 끝나요 😊</span>
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Link href="/login?redirect=/contact" className="block">
                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-full">
                          <LogIn className="w-5 h-5 mr-2" /> 로그인하기
                        </Button>
                      </Link>
                      <Link href="/signup?redirect=/contact" className="block">
                        <Button size="lg" variant="outline" className="w-full py-6 text-lg rounded-full border-2 border-primary/30 hover:bg-primary/5">
                          <UserPlus className="w-5 h-5 mr-2" /> 회원가입하기
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-8 p-4 bg-[#FFB547]/10 rounded-xl">
                      <p className="text-sm text-center font-medium">
                        💡 가입하시면 퍼스트레슨 신청은 물론,<br />
                        수업 일지 확인, 연주 영상, 음악 게임까지 이용할 수 있어요!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2 space-y-6">
                <Card className="border-0 shadow-md bg-primary text-white">
                  <CardContent className="p-8">
                    <MessageCircle className="w-10 h-10 mb-4" />
                    <h3 className="text-xl font-bold mb-2">카카오톡 문의</h3>
                    <p className="text-white/70 text-sm mb-4">가입 없이 카톡으로도 신청할 수 있어요!</p>
                    <a href="https://litt.ly/kidsmindpiano" target="_blank">
                      <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 rounded-full">카카오톡 채널 바로가기</Button>
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-gradient-to-br from-[#FFF8F3] to-white">
                  <CardContent className="p-8">
                    <h3 className="font-bold mb-4">퍼스트레슨 안내</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2"><span>⏰</span> 40분 진행</li>
                      <li className="flex gap-2"><span>📱</span> Zoom으로 진행</li>
                      <li className="flex gap-2"><span>🎹</span> 피아노/키보드 필요</li>
                      <li className="flex gap-2"><span>👨‍👩‍👧</span> 보호자 동석 권장</li>
                      <li className="flex gap-2"><span>💰</span> ₩20,000 / $20 (50% 할인)</li>
                      <li className="flex gap-2"><span>📝</span> 신청 후 1~2일 내 연락</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : submitted ? (
          <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-0 shadow-lg max-w-lg mx-auto">
              <CardContent className="p-10">
                <span className="text-6xl mb-4 block">🎉</span>
                <h2 className="text-2xl font-bold mb-3">신청 완료!</h2>
                <p className="text-muted-foreground mb-6">
                  퍼스트레슨 신청이 접수되었어요.<br />
                  1~2일 내에 카카오톡 또는 이메일로 연락드릴게요!
                </p>
                <Link href="/">
                  <Button variant="outline" className="rounded-full">
                    홈으로 돌아가기 <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-5 gap-12">
            <motion.div className="md:col-span-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#3DBB7D]/10 flex items-center justify-center">
                      <span className="text-[#3DBB7D] text-sm">✓</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{user.email}로 로그인됨</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-6">퍼스트레슨 신청서</h2>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label htmlFor="parent">학부모 이름</Label><Input id="parent" placeholder="홍길동" className="mt-1.5" required /></div>
                      <div><Label htmlFor="child">자녀 이름</Label><Input id="child" placeholder="홍길동" className="mt-1.5" required /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label htmlFor="age">자녀 나이</Label><Input id="age" placeholder="8세" className="mt-1.5" required /></div>
                      <div><Label htmlFor="country">거주 국가</Label><Input id="country" placeholder="미국" className="mt-1.5" required /></div>
                    </div>
                    <div><Label htmlFor="email">이메일</Label><Input id="email" type="email" defaultValue={user.email || ""} className="mt-1.5" required /></div>
                    <div><Label htmlFor="kakao">카카오톡 ID (선택)</Label><Input id="kakao" placeholder="kakao_id" className="mt-1.5" /></div>
                    <div>
                      <Label htmlFor="experience">피아노 경험</Label>
                      <select id="experience" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                        <option>처음이에요</option><option>6개월 미만</option><option>6개월 ~ 1년</option><option>1년 ~ 3년</option><option>3년 이상</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">시간대</Label>
                      <select id="timezone" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                        <option>미국 서부 (PST/PDT)</option>
                        <option>미국 동부 (EST/EDT)</option>
                        <option>미국 중부 (CST/CDT)</option>
                        <option>일본 (JST)</option>
                        <option>호주 동부 (AEST)</option>
                        <option>인도네시아 (WIB)</option>
                        <option>중국 (CST)</option>
                        <option>인도 (IST)</option>
                        <option>기타</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="message">하고 싶은 말 (선택)</Label>
                      <textarea id="message" rows={3} placeholder="궁금한 점이나 원하시는 수업 시간 등을 알려주세요" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-full">
                      <Send className="w-5 h-5 mr-2" /> 퍼스트레슨 신청하기
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div className="md:col-span-2 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-md bg-primary text-white">
                <CardContent className="p-8">
                  <MessageCircle className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">카카오톡 문의</h3>
                  <p className="text-white/70 text-sm mb-4">카카오톡으로도 편하게 문의하세요!</p>
                  <a href="https://litt.ly/kidsmindpiano" target="_blank">
                    <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 rounded-full">카카오톡 채널 바로가기</Button>
                  </a>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-gradient-to-br from-[#FFF8F3] to-white">
                <CardContent className="p-8">
                  <h3 className="font-bold mb-4">퍼스트레슨 안내</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span>⏰</span> 40분 진행</li>
                    <li className="flex gap-2"><span>📱</span> Zoom으로 진행</li>
                    <li className="flex gap-2"><span>🎹</span> 피아노/키보드 필요</li>
                    <li className="flex gap-2"><span>👨‍👩‍👧</span> 보호자 동석 권장</li>
                    <li className="flex gap-2"><span>💰</span> ₩20,000 / $20 (50% 할인)</li>
                    <li className="flex gap-2"><span>📝</span> 신청 후 1~2일 내 연락</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}
