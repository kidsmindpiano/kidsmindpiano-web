"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth, UserRole } from "@/lib/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<UserRole>("parent");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("비밀번호가 일치하지 않습니다."); return; }
    if (password.length < 6) { setError("비밀번호는 6자 이상이어야 합니다."); return; }
    setLoading(true);
    const { error } = await signUp(email, password, name, role);
    if (error) { setError(error.message); } else { setSuccess(true); }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16">
        <Card className="border-0 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">가입 완료!</h2>
            <p className="text-muted-foreground mb-6">이메일로 인증 링크를 보내드렸어요.<br />인증 후 로그인해주세요.</p>
            <Link href="/login"><Button className="bg-primary rounded-full px-8">로그인하기</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#FFB547]/5 to-primary/5 py-16">
      <motion.div className="w-full max-w-md px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎵</div>
              <h1 className="text-2xl font-bold">회원가입</h1>
              <p className="text-sm text-muted-foreground mt-1">키즈마인드피아노 가족이 되어주세요</p>
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>가입 유형</Label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {([["parent", "👨‍👩‍👧 학부모"], ["student", "🧒 학생"]] as const).map(([val, label]) => (
                    <button key={val} type="button" onClick={() => setRole(val)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition ${role === val ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div><Label htmlFor="name">이름</Label><Input id="name" placeholder="홍길동" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} required /></div>
              <div><Label htmlFor="email">이메일</Label><Input id="email" type="email" placeholder="email@example.com" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div><Label htmlFor="password">비밀번호</Label><Input id="password" type="password" placeholder="6자 이상" className="mt-1.5" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <div><Label htmlFor="confirm">비밀번호 확인</Label><Input id="confirm" type="password" placeholder="••••••••" className="mt-1.5" value={confirm} onChange={(e) => setConfirm(e.target.value)} required /></div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-5 rounded-full" disabled={loading}>
                {loading ? "가입 중..." : "가입하기"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              이미 계정이 있으신가요? <Link href="/login" className="text-primary font-medium hover:underline">로그인</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
