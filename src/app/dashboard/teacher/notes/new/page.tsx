"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const students = [
  "김유나", "곽아린", "김리온", "Grace", "구하라", "하정훈",
  "김시온", "설예나", "클레어",
];

const moods = [
  { emoji: "😊", label: "좋음" },
  { emoji: "🎉", label: "신남" },
  { emoji: "🌸", label: "편안" },
  { emoji: "😐", label: "보통" },
  { emoji: "😢", label: "힘듦" },
  { emoji: "😴", label: "피곤" },
  { emoji: "🔥", label: "집중" },
  { emoji: "🎵", label: "음악적" },
];

const rouletteItems = [
  { id: "imagine", emoji: "🎨", label: "상상", desc: "이미지 떠올리기" },
  { id: "sing", emoji: "🎤", label: "노래", desc: "노래로 불러보기" },
  { id: "clap", emoji: "👏", label: "박수", desc: "리듬 박수치기" },
  { id: "heart", emoji: "💜", label: "마음", desc: "감정 표현하기" },
  { id: "rule", emoji: "📖", label: "규칙", desc: "악보 읽기" },
];

export default function NewNotePage() {
  const [student, setStudent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [roulette, setRoulette] = useState<string[]>([]);
  const [praise, setPraise] = useState("");
  const [goal, setGoal] = useState("");
  const [assignment, setAssignment] = useState("");
  const [teacherMemo, setTeacherMemo] = useState("");
  const [parentVisible, setParentVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleRoulette = (id: string) => {
    setRoulette(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: Supabase 저장
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
  };

  if (saved) {
    return (
      <div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2">수업 일지 저장 완료!</h2>
              <p className="text-muted-foreground mb-6">{student} 학생의 {date} 수업 일지가 저장되었습니다.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/dashboard/teacher/notes">
                  <Button variant="outline" className="rounded-full">목록으로</Button>
                </Link>
                <Button className="bg-primary rounded-full" onClick={() => { setSaved(false); setStudent(""); setContent(""); setPraise(""); setGoal(""); setAssignment(""); setTeacherMemo(""); setMood(""); setRoulette([]); }}>
                  + 새 일지 작성
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/teacher/notes" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> 수업 일지 목록
      </Link>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        📝 새 수업 일지 작성
      </motion.h1>

      <div className="max-w-2xl space-y-6">
        {/* 학생 & 날짜 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>학생</Label>
                <select className="w-full mt-1.5 px-3 py-2 border rounded-xl text-sm bg-white" value={student} onChange={e => setStudent(e.target.value)}>
                  <option value="">학생 선택...</option>
                  {students.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label>수업 날짜</Label>
                <Input type="date" className="mt-1.5" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 아이 기분 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Label className="mb-3 block">아이 기분</Label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m => (
                <button key={m.emoji} type="button" onClick={() => setMood(m.emoji)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm transition ${
                    mood === m.emoji ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}>
                  <span className="text-lg">{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 수업 내용 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Label className="mb-1.5 block">수업 내용</Label>
            <textarea className="w-full px-3 py-2 border rounded-xl text-sm min-h-[100px] resize-none" placeholder="오늘 수업에서 한 내용을 적어주세요..." value={content} onChange={e => setContent(e.target.value)} />
          </CardContent>
        </Card>

        {/* 룰렛 활동 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Label className="mb-3 block">🎡 룰렛 활동</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {rouletteItems.map(r => (
                <button key={r.id} type="button" onClick={() => toggleRoulette(r.id)}
                  className={`p-3 rounded-xl border-2 text-left transition ${
                    roulette.includes(r.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}>
                  <span className="text-xl">{r.emoji}</span>
                  <p className="text-sm font-medium mt-1">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3단 구조: 칭찬 → 목표 → 과제 */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#3DBB7D] via-[#FFB547] to-primary" />
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">학부모 상담 노트</h3>
            <div>
              <Label className="text-[#3DBB7D]">✨ 칭찬 (Praise)</Label>
              <textarea className="w-full mt-1.5 px-3 py-2 border rounded-xl text-sm min-h-[80px] resize-none" placeholder="오늘 잘한 점, 칭찬할 부분..." value={praise} onChange={e => setPraise(e.target.value)} />
            </div>
            <div>
              <Label className="text-[#FFB547]">🎯 보완점 + 목표 (Goal)</Label>
              <textarea className="w-full mt-1.5 px-3 py-2 border rounded-xl text-sm min-h-[80px] resize-none" placeholder="더 연습이 필요한 부분, 다음 목표..." value={goal} onChange={e => setGoal(e.target.value)} />
            </div>
            <div>
              <Label className="text-primary">📌 과제 (Assignment)</Label>
              <textarea className="w-full mt-1.5 px-3 py-2 border rounded-xl text-sm min-h-[80px] resize-none" placeholder="이번 주 과제..." value={assignment} onChange={e => setAssignment(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* 선생님 메모 (내부용) */}
        <Card className="border-0 shadow-md border-l-4 border-l-[#FF6B6B]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-[#FF6B6B]">🔒 선생님 메모 (내부용)</Label>
              <span className="text-xs text-muted-foreground bg-[#FF6B6B]/10 px-2 py-1 rounded-full">학부모 비공개</span>
            </div>
            <textarea className="w-full px-3 py-2 border rounded-xl text-sm min-h-[80px] resize-none" placeholder="내부 참고 메모 (학부모에게 보이지 않음)..." value={teacherMemo} onChange={e => setTeacherMemo(e.target.value)} />
          </CardContent>
        </Card>

        {/* 학부모 공개 & 저장 */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {parentVisible ? <Eye className="w-5 h-5 text-[#3DBB7D]" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                <div>
                  <p className="font-medium text-sm">학부모 공개</p>
                  <p className="text-xs text-muted-foreground">학부모에게 이 일지를 보여줍니다</p>
                </div>
              </div>
              <button type="button" onClick={() => setParentVisible(!parentVisible)}
                className={`w-12 h-7 rounded-full transition ${parentVisible ? "bg-[#3DBB7D]" : "bg-gray-300"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${parentVisible ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <Button onClick={handleSave} disabled={!student || saving}
              className="w-full bg-primary hover:bg-primary/90 rounded-full py-5 text-base">
              <Save className="w-5 h-5 mr-2" />
              {saving ? "저장 중..." : "수업 일지 저장"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
