"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

type Lesson = {
  id: number;
  student: string;
  teacher: string;
  day: number;
  time: string;
  duration: number;
  country: string;
  color: string;
};

const initialLessons: Lesson[] = [
  { id: 1, student: "Grace", teacher: "서희", day: 6, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-[#FFB547]/20" },
  { id: 2, student: "곽아린", teacher: "서희", day: 2, time: "07:45", duration: 40, country: "🇺🇸", color: "bg-[#FF6B6B]/20" },
  { id: 3, student: "구하라", teacher: "서희", day: 2, time: "21:00", duration: 40, country: "🇮🇩", color: "bg-[#4CB9E7]/20" },
  { id: 4, student: "김리온", teacher: "서희", day: 2, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-[#3DBB7D]/20" },
  { id: 5, student: "김유나", teacher: "서희", day: 3, time: "18:30", duration: 40, country: "🇯🇵", color: "bg-primary/20" },
  { id: 6, student: "심준후", teacher: "서희", day: 4, time: "18:00", duration: 40, country: "🇨🇳", color: "bg-pink-200" },
  { id: 7, student: "조우현", teacher: "서희", day: 4, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-[#FFB547]/20" },
  { id: 8, student: "하정훈", teacher: "서희", day: 5, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-primary/20" },
  { id: 9, student: "제인(작곡)", teacher: "서희", day: 0, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-indigo-200" },
  { id: 10, student: "설리나", teacher: "서희", day: 1, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-[#4CB9E7]/20" },
  { id: 11, student: "채지아", teacher: "경서", day: 2, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-emerald-200" },
  { id: 12, student: "채지아", teacher: "경서", day: 4, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-emerald-200" },
  { id: 13, student: "클레어", teacher: "경서", day: 3, time: "13:00", duration: 40, country: "🇺🇸", color: "bg-[#FFB547]/20" },
  { id: 14, student: "김수환", teacher: "경서", day: 3, time: "11:30", duration: 40, country: "🇺🇸", color: "bg-[#3DBB7D]/20" },
  { id: 15, student: "설예나", teacher: "경서", day: 2, time: "09:15", duration: 40, country: "🇺🇸", color: "bg-[#4CB9E7]/20" },
  { id: 16, student: "김시온", teacher: "경서", day: 4, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-pink-200" },
  { id: 17, student: "이리아", teacher: "경서", day: 2, time: "11:20", duration: 40, country: "🇺🇸", color: "bg-primary/20" },
  { id: 18, student: "이리아", teacher: "경서", day: 4, time: "11:20", duration: 40, country: "🇺🇸", color: "bg-primary/20" },
];

export default function AdminSchedulePage() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const [form, setForm] = useState({ student: "", teacher: "서희", day: 1, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-primary/20" });

  const filtered = teacherFilter === "all" ? lessons : lessons.filter(l => l.teacher === teacherFilter);
  const sorted = [...filtered].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

  const handleAdd = () => {
    const newId = Math.max(...lessons.map(l => l.id), 0) + 1;
    setLessons([...lessons, { id: newId, ...form }]);
    setShowAdd(false);
    setForm({ student: "", teacher: "서희", day: 1, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-primary/20" });
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setForm({ student: lesson.student, teacher: lesson.teacher, day: lesson.day, time: lesson.time, duration: lesson.duration, country: lesson.country, color: lesson.color });
  };

  const handleSave = (id: number) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, ...form } : l));
    setEditingId(null);
  };

  const renderFormRow = (onSubmit: () => void, onCancel: () => void, label: string) => (
    <tr className="bg-primary/5">
      <td className="p-3"><input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} placeholder="학생 이름" /></td>
      <td className="p-3">
        <select className="border rounded-lg px-3 py-2 text-sm w-full" value={form.teacher} onChange={e => setForm({ ...form, teacher: e.target.value })}>
          <option value="서희">서희</option>
          <option value="경서">경서</option>
        </select>
      </td>
      <td className="p-3">
        <select className="border rounded-lg px-3 py-2 text-sm w-full" value={form.day} onChange={e => setForm({ ...form, day: Number(e.target.value) })}>
          {dayNames.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </select>
      </td>
      <td className="p-3"><input type="time" className="border rounded-lg px-3 py-2 text-sm w-full" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /></td>
      <td className="p-3"><input type="number" className="border rounded-lg px-3 py-2 text-sm w-20" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })} /></td>
      <td className="p-3"><input className="border rounded-lg px-3 py-2 text-sm w-16" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} /></td>
      <td className="p-3">
        <div className="flex gap-2">
          <Button size="sm" onClick={onSubmit} className="bg-primary text-white"><Save className="w-4 h-4 mr-1" />{label}</Button>
          <Button size="sm" variant="outline" onClick={onCancel}><X className="w-4 h-4" /></Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <motion.div className="flex items-center justify-between mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold">📅 수업 시간 관리</h1>
        <Button onClick={() => setShowAdd(true)} className="bg-primary text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" /> 수업 추가
        </Button>
      </motion.div>

      <div className="flex gap-2 mb-6">
        {[{ key: "all", label: "전체" }, { key: "서희", label: "🔵 서희쌤" }, { key: "경서", label: "🟢 경서쌤" }].map(t => (
          <button key={t.key} onClick={() => setTeacherFilter(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${teacherFilter === t.key ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
            {t.label}
          </button>
        ))}
        <span className="self-center text-sm text-muted-foreground ml-2">총 {filtered.length}건</span>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-3 font-semibold">학생</th>
                <th className="text-left p-3 font-semibold">선생님</th>
                <th className="text-left p-3 font-semibold">요일</th>
                <th className="text-left p-3 font-semibold">시간</th>
                <th className="text-left p-3 font-semibold">수업(분)</th>
                <th className="text-left p-3 font-semibold">국가</th>
                <th className="text-left p-3 font-semibold w-40">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {showAdd && renderFormRow(handleAdd, () => setShowAdd(false), "추가")}
              {sorted.map(l => (
                editingId === l.id ? (
                  renderFormRow(() => handleSave(l.id), () => setEditingId(null), "저장")
                ) : (
                  <tr key={l.id} className="hover:bg-muted/30 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${l.color}`} />
                        <span className="font-medium">{l.student}</span>
                      </div>
                    </td>
                    <td className="p-3">{l.teacher}쌤</td>
                    <td className="p-3"><span className="bg-muted px-2 py-1 rounded-md text-xs font-medium">{dayNames[l.day]}</span></td>
                    <td className="p-3 font-mono">{l.time}</td>
                    <td className="p-3">{l.duration}분</td>
                    <td className="p-3">{l.country}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(l)} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(l.id)} className="text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
