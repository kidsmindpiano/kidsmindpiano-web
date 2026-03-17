"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

type Role = "student" | "parent" | "teacher" | "admin";

const roles: { value: Role; label: string; emoji: string }[] = [
  { value: "teacher", label: "선생님", emoji: "👩‍🏫" },
  { value: "parent", label: "학부모", emoji: "👨‍👩‍👧" },
  { value: "student", label: "학생", emoji: "🧒" },
  { value: "admin", label: "관리자", emoji: "👑" },
];

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("teacher");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ email: string; password: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("비밀번호는 6자 이상이어야 합니다."); return; }
    setLoading(true);
    const res = await fetch("/api/admin/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "계정 생성 실패"); }
    else { setSuccess({ email, password }); setName(""); setEmail(""); setPassword(""); }
    setLoading(false);
  };

  if (success) {
    return (
      <div>
        <Link href="/dashboard/admin/users" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> 돌아가기
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-0 shadow-xl max-w-md">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2">계정 생성 완료!</h2>
              <p className="text-muted-foreground mb-6">아래 정보를 전달해주세요.</p>
              <div className="bg-muted rounded-xl p-5 text-left space-y-2 mb-6">
                <p className="text-sm"><span className="font-medium">이메일:</span> {success.email}</p>
                <p className="text-sm"><span className="font-medium">비밀번호:</span> {success.password}</p>
                <p className="text-sm"><span className="font-medium">로그인:</span> kidsmind.art/login</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => {
                  navigator.clipboard.writeText(`이메일: ${success.email}\n비밀번호: ${success.password}\n로그인: kidsmind.art/login`);
                }}>📋 복사</Button>
                <Button className="flex-1 bg-primary rounded-full" onClick={() => setSuccess(null)}>+ 추가 생성</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/admin/users" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> 돌아가기
      </Link>
      <motion.h1 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <UserPlus className="w-6 h-6 inline mr-2" /> 새 계정 만들기
      </motion.h1>
      <Card className="border-0 shadow-md max-w-md">
        <CardContent className="p-6">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>역할</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {roles.map((r) => (
                  <button key={r.value} type="button" onClick={() => setRole(r.value)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition ${role === r.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
                    {r.emoji} {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div><Label>이름</Label><Input className="mt-1.5" placeholder="홍길동" value={name} onChange={e => setName(e.target.value)} required /></div>
            <div><Label>이메일</Label><Input className="mt-1.5" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div><Label>비밀번호</Label><Input className="mt-1.5" type="text" placeholder="6자 이상" value={password} onChange={e => setPassword(e.target.value)} required /></div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-full py-5" disabled={loading}>
              {loading ? "생성 중..." : "계정 만들기"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
