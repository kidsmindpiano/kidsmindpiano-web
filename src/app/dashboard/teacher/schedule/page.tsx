"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ViewMode = "day" | "week" | "month";

// 실제 수업 시간표 (한국시간 기준, 써머타임 적용)
const lessons = [
  // 🔵 서희쌤
  { student: "Grace", teacher: "서희", day: 6, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-[#FFB547]/20 border-[#FFB547] text-[#FFB547]" },
  { student: "곽아린", teacher: "서희", day: 2, time: "07:45", duration: 40, country: "🇺🇸", color: "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]" },
  { student: "구하라", teacher: "서희", day: 2, time: "21:00", duration: 40, country: "🇮🇩", color: "bg-[#4CB9E7]/20 border-[#4CB9E7] text-[#4CB9E7]" },
  { student: "김리온", teacher: "서희", day: 2, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-[#3DBB7D]/20 border-[#3DBB7D] text-[#3DBB7D]" },
  { student: "김유나", teacher: "서희", day: 3, time: "18:30", duration: 40, country: "🇯🇵", color: "bg-primary/20 border-primary text-primary" },
  { student: "심준후", teacher: "서희", day: 4, time: "18:00", duration: 40, country: "🇨🇳", color: "bg-rose-200 border-rose-400 text-rose-600" },
  { student: "조우현", teacher: "서희", day: 4, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-orange-200 border-orange-400 text-orange-600" },
  { student: "하정훈", teacher: "서희", day: 5, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-purple-200 border-purple-400 text-purple-600" },
  { student: "제인(작곡)", teacher: "서희", day: 0, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-indigo-200 border-indigo-400 text-indigo-600" },
  { student: "설리나", teacher: "서희", day: 1, time: "09:00", duration: 40, country: "🇺🇸", color: "bg-sky-200 border-sky-400 text-sky-600" },
  // 🟢 경서쌤
  { student: "채지아", teacher: "경서", day: 2, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-emerald-200 border-emerald-400 text-emerald-600" },
  { student: "채지아", teacher: "경서", day: 4, time: "10:00", duration: 40, country: "🇺🇸", color: "bg-emerald-200 border-emerald-400 text-emerald-600" },
  { student: "클레어", teacher: "경서", day: 3, time: "13:00", duration: 40, country: "🇺🇸", color: "bg-amber-200 border-amber-400 text-amber-600" },
  { student: "김수환", teacher: "경서", day: 3, time: "11:30", duration: 40, country: "🇺🇸", color: "bg-lime-200 border-lime-400 text-lime-600" },
  { student: "설예나", teacher: "경서", day: 2, time: "09:15", duration: 40, country: "🇺🇸", color: "bg-teal-200 border-teal-400 text-teal-600" },
  { student: "김시온", teacher: "경서", day: 4, time: "08:00", duration: 40, country: "🇺🇸", color: "bg-pink-200 border-pink-400 text-pink-600" },
  { student: "이리아", teacher: "경서", day: 2, time: "11:20", duration: 40, country: "🇺🇸", color: "bg-violet-200 border-violet-400 text-violet-600" },
  { student: "이리아", teacher: "경서", day: 4, time: "11:20", duration: 40, country: "🇺🇸", color: "bg-violet-200 border-violet-400 text-violet-600" },
];

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7시~22시

function getWeekDates(baseDate: Date) {
  const d = new Date(baseDate);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });
}

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

export default function SchedulePage() {
  const [view, setView] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [teacherFilter, setTeacherFilter] = useState<string>("all");
  const today = new Date();
  const weekDates = getWeekDates(currentDate);

  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    if (view === "day") d.setDate(d.getDate() + dir);
    else if (view === "week") d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const getTitle = () => {
    if (view === "day") return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 (${dayNames[currentDate.getDay()]})`;
    if (view === "week") return `${weekDates[0].getMonth() + 1}월 ${weekDates[0].getDate()}일 — ${weekDates[6].getMonth() + 1}월 ${weekDates[6].getDate()}일`;
    return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
  };

  const filtered = teacherFilter === "all" ? lessons : lessons.filter(l => l.teacher === teacherFilter);
  const getLessonsForDay = (dow: number) => filtered.filter(l => l.day === dow).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📅 수업 스케줄 <span className="text-sm font-normal text-muted-foreground">(한국시간 KST)</span></motion.h1>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate(-1)}><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => setCurrentDate(new Date())}>오늘</Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate(1)}><ChevronRight className="w-4 h-4" /></Button>
          <h2 className="text-lg font-bold ml-2">{getTitle()}</h2>
        </div>
        <div className="flex bg-muted rounded-full p-1">
          {(["day", "week", "month"] as ViewMode[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${view === v ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>
              {v === "day" ? "하루" : v === "week" ? "일주일" : "한 달"}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Filter */}
      <div className="flex gap-2 mb-6">
        {[{ key: "all", label: "전체" }, { key: "서희", label: "🔵 서희쌤" }, { key: "경서", label: "🟢 경서쌤" }].map(t => (
          <button key={t.key} onClick={() => setTeacherFilter(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${teacherFilter === t.key ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Day View */}
      {view === "day" && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-0 divide-y">
            {hours.map(hour => {
              const h = String(hour).padStart(2, "0");
              const dl = getLessonsForDay(currentDate.getDay()).filter(l => l.time.startsWith(h));
              return (
                <div key={hour} className="flex min-h-[56px]">
                  <div className="w-20 py-3 px-4 text-sm text-muted-foreground font-medium border-r shrink-0">{h}:00</div>
                  <div className="flex-1 py-2 px-3 flex flex-wrap gap-2">
                    {dl.map(l => (
                      <div key={l.student + l.time} className={`${l.color} border-l-4 rounded-lg px-4 py-2 text-sm font-medium`}>
                        {l.country} {l.student} <span className="opacity-70">· {l.time} · {l.teacher}쌤</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Week View */}
      {view === "week" && (
        <Card className="border-0 shadow-md overflow-x-auto">
          <CardContent className="p-0 min-w-[750px]">
            <div className="grid grid-cols-8 border-b bg-muted/30">
              <div className="p-3 text-sm font-medium text-muted-foreground border-r">시간</div>
              {weekDates.map((d, i) => {
                const isToday = d.toDateString() === today.toDateString();
                return (
                  <div key={i} className={`p-3 text-center ${isToday ? "bg-primary/5" : ""}`}>
                    <p className="text-xs text-muted-foreground">{dayNames[i]}</p>
                    <p className={`text-sm font-bold ${isToday ? "text-primary" : ""}`}>{d.getDate()}</p>
                  </div>
                );
              })}
            </div>
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b last:border-0">
                <div className="p-2 text-xs text-muted-foreground font-medium border-r pt-3">{String(hour).padStart(2, "0")}:00</div>
                {Array.from({ length: 7 }, (_, di) => {
                  const dl = getLessonsForDay(di).filter(l => {
                    const lh = parseInt(l.time.split(":")[0]);
                    return lh === hour;
                  });
                  const isToday = weekDates[di].toDateString() === today.toDateString();
                  return (
                    <div key={di} className={`p-1 min-h-[50px] ${isToday ? "bg-primary/5" : ""} ${di < 6 ? "border-r" : ""}`}>
                      {dl.map(l => (
                        <div key={l.student + l.time} className={`${l.color} border-l-2 rounded-md px-2 py-1.5 text-xs font-medium mb-1`}>
                          <p className="font-bold">{l.country} {l.student}</p>
                          <p className="opacity-70">{l.time} · {l.teacher}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Month View */}
      {view === "month" && (() => {
        const year = currentDate.getFullYear(), month = currentDate.getMonth();
        const dim = getDaysInMonth(year, month), fd = getFirstDayOfMonth(year, month);
        const cells = Array.from({ length: 42 }, (_, i) => { const d = i - fd + 1; return d >= 1 && d <= dim ? d : null; });
        return (
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-1">
                {dayNames.map(d => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>)}
                {cells.map((dn, i) => {
                  if (!dn) return <div key={i} />;
                  const date = new Date(year, month, dn);
                  const dow = date.getDay();
                  const dl = getLessonsForDay(dow);
                  const isToday = date.toDateString() === today.toDateString();
                  return (
                    <div key={i} className={`min-h-[90px] border rounded-xl p-2 ${isToday ? "border-primary bg-primary/5" : "border-border"}`}>
                      <p className={`text-sm font-medium mb-1 ${isToday ? "text-primary font-bold" : dow === 0 ? "text-[#FF6B6B]" : dow === 6 ? "text-[#4CB9E7]" : ""}`}>{dn}</p>
                      <div className="space-y-0.5">
                        {dl.slice(0, 4).map(l => (
                          <div key={l.student + l.time} className={`${l.color} rounded px-1 py-0.5 text-[10px] font-medium truncate`}>{l.time} {l.student}</div>
                        ))}
                        {dl.length > 4 && <p className="text-[10px] text-muted-foreground">+{dl.length - 4}건</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Legend */}
      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-2">🔵 서희쌤</p>
              <div className="flex flex-wrap gap-2">
                {filtered.filter(l => l.teacher === "서희").filter((l, i, a) => a.findIndex(x => x.student === l.student) === i).map(l => (
                  <div key={l.student} className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${l.color.split(" ")[0]}`} />
                    <span className="text-xs">{l.country} {l.student}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-2">🟢 경서쌤</p>
              <div className="flex flex-wrap gap-2">
                {filtered.filter(l => l.teacher === "경서").filter((l, i, a) => a.findIndex(x => x.student === l.student) === i).map(l => (
                  <div key={l.student} className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${l.color.split(" ")[0]}`} />
                    <span className="text-xs">{l.country} {l.student}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
