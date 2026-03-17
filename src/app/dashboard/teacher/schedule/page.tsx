"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ViewMode = "day" | "week" | "month";

const lessons = [
  { student: "김유나", day: 1, time: "15:00", duration: 40, color: "bg-primary/20 border-primary text-primary" },
  { student: "김유나", day: 4, time: "15:00", duration: 40, color: "bg-primary/20 border-primary text-primary" },
  { student: "곽아린", day: 1, time: "16:00", duration: 40, color: "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]" },
  { student: "곽아린", day: 4, time: "16:00", duration: 40, color: "bg-[#FF6B6B]/20 border-[#FF6B6B] text-[#FF6B6B]" },
  { student: "김리온", day: 2, time: "09:00", duration: 40, color: "bg-[#3DBB7D]/20 border-[#3DBB7D] text-[#3DBB7D]" },
  { student: "김리온", day: 5, time: "09:00", duration: 40, color: "bg-[#3DBB7D]/20 border-[#3DBB7D] text-[#3DBB7D]" },
  { student: "Grace", day: 2, time: "10:00", duration: 40, color: "bg-[#FFB547]/20 border-[#FFB547] text-[#FFB547]" },
  { student: "Grace", day: 5, time: "10:00", duration: 40, color: "bg-[#FFB547]/20 border-[#FFB547] text-[#FFB547]" },
  { student: "구하라", day: 3, time: "15:00", duration: 40, color: "bg-[#4CB9E7]/20 border-[#4CB9E7] text-[#4CB9E7]" },
  { student: "구하라", day: 6, time: "15:00", duration: 40, color: "bg-[#4CB9E7]/20 border-[#4CB9E7] text-[#4CB9E7]" },
  { student: "하정훈", day: 3, time: "17:00", duration: 40, color: "bg-purple-200 border-purple-400 text-purple-600" },
  { student: "하정훈", day: 6, time: "17:00", duration: 40, color: "bg-purple-200 border-purple-400 text-purple-600" },
  { student: "김시온", day: 2, time: "16:00", duration: 40, color: "bg-pink-200 border-pink-400 text-pink-600" },
  { student: "김시온", day: 5, time: "16:00", duration: 40, color: "bg-pink-200 border-pink-400 text-pink-600" },
  { student: "설예나", day: 1, time: "17:00", duration: 40, color: "bg-teal-200 border-teal-400 text-teal-600" },
  { student: "설예나", day: 4, time: "17:00", duration: 40, color: "bg-teal-200 border-teal-400 text-teal-600" },
  { student: "클레어", day: 3, time: "10:00", duration: 40, color: "bg-amber-200 border-amber-400 text-amber-600" },
  { student: "클레어", day: 6, time: "10:00", duration: 40, color: "bg-amber-200 border-amber-400 text-amber-600" },
];

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const hours = Array.from({ length: 13 }, (_, i) => i + 8);

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

  const getLessonsForDay = (dow: number) => lessons.filter(l => l.day === dow);

  return (
    <div>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>📅 수업 스케줄</motion.h1>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
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

      {/* Day View */}
      {view === "day" && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-0 divide-y">
            {hours.map(hour => {
              const h = String(hour).padStart(2, "0");
              const dl = getLessonsForDay(currentDate.getDay()).filter(l => l.time.startsWith(h));
              return (
                <div key={hour} className="flex min-h-[60px]">
                  <div className="w-20 py-3 px-4 text-sm text-muted-foreground font-medium border-r shrink-0">{h}:00</div>
                  <div className="flex-1 py-2 px-3 flex flex-wrap gap-2">
                    {dl.map(l => (
                      <div key={l.student} className={`${l.color} border-l-4 rounded-lg px-4 py-2 text-sm font-medium`}>
                        {l.student} <span className="opacity-60">({l.duration}분)</span>
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
          <CardContent className="p-0 min-w-[700px]">
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
                  const dl = getLessonsForDay(di).filter(l => l.time.startsWith(String(hour).padStart(2, "0")));
                  const isToday = weekDates[di].toDateString() === today.toDateString();
                  return (
                    <div key={di} className={`p-1 min-h-[50px] ${isToday ? "bg-primary/5" : ""} ${di < 6 ? "border-r" : ""}`}>
                      {dl.map(l => (
                        <div key={l.student} className={`${l.color} border-l-2 rounded-md px-2 py-1.5 text-xs font-medium mb-1`}>
                          <p className="font-bold">{l.student}</p>
                          <p className="opacity-70">{l.time}</p>
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
                        {dl.slice(0, 3).map(l => (
                          <div key={l.student} className={`${l.color} rounded px-1.5 py-0.5 text-[10px] font-medium truncate`}>{l.time} {l.student}</div>
                        ))}
                        {dl.length > 3 && <p className="text-[10px] text-muted-foreground">+{dl.length - 3}건</p>}
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
          <p className="text-xs font-medium text-muted-foreground mb-2">학생 색상</p>
          <div className="flex flex-wrap gap-3">
            {lessons.filter((l, i, a) => a.findIndex(x => x.student === l.student) === i).map(l => (
              <div key={l.student} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${l.color.split(" ")[0]}`} />
                <span className="text-xs">{l.student}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
