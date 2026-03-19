"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, ArrowRight, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const TOTAL_STEPS = 3;

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [agree4, setAgree4] = useState(false);
  const agreed = agree1 && agree2 && agree3 && agree4;
  const [form, setForm] = useState({
    studentName: "", birthDate: "", pianoExperience: "",
    parentName: "", kakaoId: "", email: "", country: "",
    preferredTime: "", howFound: "", message: "",
  });

  const updateForm = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const handleSubmit = () => setStep(TOTAL_STEPS + 1);
  const canProceedStep1 = agreed && form.studentName.trim() !== "";
  const canProceedStep2 = form.parentName.trim() !== "" && form.email.trim() !== "" && form.country.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F6FF] to-white">
      <section className="bg-gradient-to-br from-[#7C5CFC]/10 to-[#4CB9E7]/10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Image src="/logo/logo-main.jpg" alt="Kids Mind Piano" width={80} height={80} className="mx-auto rounded-2xl shadow-md mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">퍼스트레슨 신청서</h1>
            <p className="text-muted-foreground">새로운 피아노 레슨을 경험해볼까요? 🎹</p>
          </motion.div>
        </div>
      </section>

      {step > 0 && step <= TOTAL_STEPS && (
        <div className="max-w-2xl mx-auto px-4 pt-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 rounded transition-all ${step > s ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>동의 & 학생정보</span><span>보호자 & 연락처</span><span>추가정보</span>
          </div>
        </div>
      )}

      <section className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-primary to-[#4CB9E7]" />
                <CardContent className="p-8 md:p-10">
                  <div className="space-y-6 text-[15px] leading-relaxed">
                    <div>
                      <p className="text-lg font-medium mb-4">안녕하세요! 👋</p>
                      <p>키즈마인드피아노를 통해 어떤 변화를 경험하고 싶나요?</p>
                    </div>
                    <div className="bg-[#FFB547]/10 rounded-xl p-5">
                      <p className="font-bold mb-3">저희 아카데미에서는 아이들에게 특별한 경험을 주고 싶어요!</p>
                      <ol className="space-y-2 ml-1">
                        <li className="flex gap-2"><span>1.</span> 마음을 피아노로 표현해보기 🎵</li>
                        <li className="flex gap-2"><span>2.</span> 악보의 규칙을 스스로 찾아내기 📖</li>
                        <li className="flex gap-2"><span>3.</span> 따뜻한 한국선생님과 한국정서 경험하기 🇰🇷</li>
                      </ol>
                      <p className="mt-3 text-sm text-muted-foreground">이런 경험을 통해 아이들은 마음이 건강한 아이로 자라날 것을 기대하고 있어요!</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-2">퍼스트레슨이 뭘까요? 🤔</h3>
                      <p>퍼스트 레슨은 정규 레슨을 시작하기 전 <strong>아이의 성향 파악 및 레벨 테스트</strong>를 하는 수업이에요!</p>
                      <p className="mt-2">퍼스트 레슨은 <strong>원장선생님과 직접</strong> 진행되어요~<br />그 이후 강사 선생님을 배정해드리고 있어요!</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-2">왜 원장선생님과 꼭 만나야 하냐구요? 😊</h3>
                      <p>저희 아카데미는 아이들의 성장을 위해 건강하고 튼튼한 울타리가 되어주고 싶어요~</p>
                      <p className="mt-2">원장님과 먼저 얼굴을 익히고 관계를 맺으면, 이후 담당 선생님과 수업을 하거나 온라인 연주회에서 다시 만날 때 아이들이 훨씬 큰 안정감을 느낍니다.</p>
                    </div>
                    <div className="bg-[#3DBB7D]/10 rounded-xl p-5">
                      <p className="font-bold mb-2">퍼스트 레슨을 통해 우리아이에 대해 더 잘 알 수 있을 거에요~! 💡</p>
                      <ol className="space-y-1 ml-1">
                        <li>1. 아이의 성향</li><li>2. 아이의 피아노 레벨</li><li>3. 아이에게 딱 맞는 커리큘럼 로드맵</li>
                      </ol>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-5 text-center">
                      <p className="text-lg font-bold">퍼스트레슨 <span className="text-primary">40분</span> | <span className="line-through text-muted-foreground">4만원</span> → <span className="text-[#FF6B6B] text-xl font-black">2만원</span></p>
                      <p className="text-sm text-muted-foreground mt-1">정규 레슨 1회 비용의 50% 할인!</p>
                    </div>
                    <p className="text-center font-medium text-lg">자 그럼, 새로운 피아노 레슨을 경험해볼까요? 🎹</p>
                  </div>
                  <div className="mt-8">
                    <Button onClick={() => setStep(1)} size="lg" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-full">
                      신청하기 <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="border-0 shadow-lg"><CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">Step 1. 동의 & 학생 정보</h2>
                <div className="space-y-4 mb-6">
                  <p className="text-sm font-semibold text-muted-foreground">수업 관련 동의서 작성</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    <div>
                      <p className="text-sm font-bold mb-1">1. 개인정보 수집 및 이용 동의 (GDPR/FERPA 준수)</p>
                      <p className="text-xs text-muted-foreground mb-2">본인은 키즈마인드피아노가 원활한 수업 진행 및 학사 관리를 목적으로 학생 및 학부모의 개인정보(이름, 연락처, 이메일, 거주 국가)를 수집 및 이용하는 데 동의합니다.</p>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm">동의함</span></label>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-bold mb-1">2. 수업 녹화 및 품질 관리(QA) 활용 동의</p>
                      <p className="text-xs text-muted-foreground mb-2">본인은 수업이 ①학생의 복습, ②강사의 반성, ③아카데미의 수업 품질 관리(QA) 목적으로 녹화될 수 있음을 인지하며 이에 동의합니다. 모든 녹화본은 30일 후 자동 파기되며, 학원의 명시적 동의 없이 외부에 공개되지 않습니다.</p>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm">동의함</span></label>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-bold mb-1">3. 아동보호 정책 및 온라인 수업 환경 고지</p>
                      <p className="text-xs text-muted-foreground mb-2">본인은 만 18세 미만 미성년자의 1:1 온라인 수업 시 보호자가 즉시 개입 가능한 환경에서 진행되어야 한다는 아카데미의 아동보호 정책을 인지하였습니다.</p>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm">동의함</span></label>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-bold mb-1">4. 수업 취소 및 환불 규정 동의</p>
                      <p className="text-xs text-muted-foreground mb-2">퍼스트레슨은 2만원이며, 수업료를 납부하시면 레슨이 확정됩니다. 부득이하게 수업을 취소하셔야 될 경우: 거주 지역 기준 11:59pm 이전 취소 시 환불 및 보강 가능, 이후 취소 시 환불 및 보강 불가.</p>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={agree4} onChange={(e) => setAgree4(e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm">동의함</span></label>
                    </div>
                  </div>
                </div>
                <div className="space-y-5">
                  <div><Label htmlFor="studentName" className="text-sm font-semibold">학생 성명 <span className="text-[#FF6B6B]">*</span></Label><Input id="studentName" value={form.studentName} onChange={(e) => updateForm("studentName", e.target.value)} placeholder="홍길동" className="mt-1.5" /></div>
                  <div><Label htmlFor="birthDate" className="text-sm font-semibold">학생 생년월일 <span className="text-xs text-muted-foreground">(2020년생 이전부터 가능)</span></Label><Input id="birthDate" value={form.birthDate} onChange={(e) => updateForm("birthDate", e.target.value)} placeholder="2015.03.15" className="mt-1.5" /></div>
                  <div><Label htmlFor="pianoExperience" className="text-sm font-semibold">피아노 배운 경험 <span className="text-xs text-muted-foreground">(있을 경우 배운 기간)</span></Label><Input id="pianoExperience" value={form.pianoExperience} onChange={(e) => updateForm("pianoExperience", e.target.value)} placeholder="예: 1년 / 없음" className="mt-1.5" /></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button onClick={() => setStep(0)} variant="outline" className="flex-1 py-5 rounded-full"><ArrowLeft className="mr-2 w-4 h-4" /> 이전</Button>
                  <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="flex-1 py-5 rounded-full bg-primary hover:bg-primary/90">다음 <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </CardContent></Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="border-0 shadow-lg"><CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">Step 2. 보호자 & 연락처</h2>
                <div className="space-y-5">
                  <div><Label htmlFor="parentName" className="text-sm font-semibold">보호자 성명 <span className="text-[#FF6B6B]">*</span></Label><Input id="parentName" value={form.parentName} onChange={(e) => updateForm("parentName", e.target.value)} placeholder="홍길동" className="mt-1.5" /></div>
                  <div><Label htmlFor="kakaoId" className="text-sm font-semibold">카카오톡 아이디</Label><Input id="kakaoId" value={form.kakaoId} onChange={(e) => updateForm("kakaoId", e.target.value)} placeholder="kakao_id" className="mt-1.5" /></div>
                  <div><Label htmlFor="email" className="text-sm font-semibold">이메일 <span className="text-[#FF6B6B]">*</span></Label><Input id="email" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="email@example.com" className="mt-1.5" /></div>
                  <div><Label htmlFor="country" className="text-sm font-semibold">거주 국가 <span className="text-[#FF6B6B]">*</span> <span className="text-xs text-muted-foreground font-normal">지역 간 시차가 다른 경우 지역까지</span></Label><Input id="country" value={form.country} onChange={(e) => updateForm("country", e.target.value)} placeholder="예: 미국 서부" className="mt-1.5" /></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1 py-5 rounded-full"><ArrowLeft className="mr-2 w-4 h-4" /> 이전</Button>
                  <Button onClick={() => setStep(3)} disabled={!canProceedStep2} className="flex-1 py-5 rounded-full bg-primary hover:bg-primary/90">다음 <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </CardContent></Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="border-0 shadow-lg"><CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">Step 3. 추가 정보</h2>
                <div className="space-y-5">
                  <div><Label htmlFor="preferredTime" className="text-sm font-semibold">희망 수업 시간대</Label><Input id="preferredTime" value={form.preferredTime} onChange={(e) => updateForm("preferredTime", e.target.value)} placeholder="예: 평일 오후 4시~6시 (현지시간)" className="mt-1.5" /></div>
                  <div>
                    <Label htmlFor="howFound" className="text-sm font-semibold">키즈마인드피아노를 어떻게 알게 되셨나요?</Label>
                    <select id="howFound" value={form.howFound} onChange={(e) => updateForm("howFound", e.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                      <option value="">선택해주세요</option><option>스레드(Threads)</option><option>인스타그램</option><option>카카오톡</option><option>지인 소개</option><option>구글 검색</option><option>기타</option>
                    </select>
                  </div>
                  <div><Label htmlFor="message" className="text-sm font-semibold">하고 싶은 말 <span className="text-xs text-muted-foreground font-normal">(선택)</span></Label><textarea id="message" value={form.message} onChange={(e) => updateForm("message", e.target.value)} rows={3} placeholder="궁금한 점이나 아이에 대해 알려주고 싶은 것이 있으면 자유롭게 적어주세요" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" /></div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1"><Check className="w-4 h-4 text-[#3DBB7D]" /> 입력 내용 확인</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">학생</div><div className="font-medium">{form.studentName}</div>
                    <div className="text-muted-foreground">보호자</div><div className="font-medium">{form.parentName}</div>
                    <div className="text-muted-foreground">이메일</div><div className="font-medium">{form.email}</div>
                    <div className="text-muted-foreground">거주 국가</div><div className="font-medium">{form.country}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1 py-5 rounded-full"><ArrowLeft className="mr-2 w-4 h-4" /> 이전</Button>
                  <Button onClick={handleSubmit} className="flex-1 py-5 rounded-full bg-[#3DBB7D] hover:bg-[#3DBB7D]/90 text-white"><Send className="mr-2 w-4 h-4" /> 신청 완료!</Button>
                </div>
              </CardContent></Card>
            </motion.div>
          )}

          {step > TOTAL_STEPS && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-0 shadow-lg"><CardContent className="p-10 text-center">
                <span className="text-6xl block mb-4">🎉</span>
                <h2 className="text-2xl font-bold mb-3">신청이 완료되었어요!</h2>
                <p className="text-muted-foreground mb-2"><strong>{form.parentName}</strong>님, 퍼스트레슨 신청이 접수되었어요.</p>
                <p className="text-muted-foreground mb-8">1~2일 내에 카카오톡 또는 이메일로 연락드릴게요! 💌</p>
                <div className="bg-[#FFB547]/10 rounded-xl p-5 mb-8 text-left">
                  <h3 className="font-bold mb-2">📋 신청 내역</h3>
                  <div className="grid grid-cols-2 gap-1.5 text-sm">
                    <div className="text-muted-foreground">학생</div><div>{form.studentName}</div>
                    <div className="text-muted-foreground">보호자</div><div>{form.parentName}</div>
                    <div className="text-muted-foreground">이메일</div><div>{form.email}</div>
                    <div className="text-muted-foreground">거주 국가</div><div>{form.country}</div>
                    {form.kakaoId && <><div className="text-muted-foreground">카카오톡</div><div>{form.kakaoId}</div></>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/"><Button variant="outline" className="rounded-full px-6">홈으로 돌아가기</Button></Link>
                  <a href="https://litt.ly/kidsmindpiano" target="_blank"><Button className="rounded-full px-6 bg-[#FFE812] text-black hover:bg-[#FFE812]/90"><MessageCircle className="mr-2 w-4 h-4" /> 카카오톡 채널 추가</Button></a>
                </div>
              </CardContent></Card>
            </motion.div>
          )}
        </AnimatePresence>

        {step <= TOTAL_STEPS && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="text-sm text-muted-foreground mb-2">카카오톡으로도 신청할 수 있어요!</p>
            <a href="https://litt.ly/kidsmindpiano" target="_blank"><Button variant="ghost" size="sm" className="text-primary">카카오톡 채널 바로가기 <ChevronRight className="ml-1 w-4 h-4" /></Button></a>
          </motion.div>
        )}
      </section>
    </div>
  );
}
