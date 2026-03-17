"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) { setError(error.message); }
    else { router.push("/dashboard"); }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "kakao") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 to-[#4CB9E7]/5 py-16">
      <motion.div className="w-full max-w-md px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎹</div>
              <h1 className="text-2xl font-bold">로그인</h1>
              <p className="text-sm text-muted-foreground mt-1">마이페이지에서 수업을 관리하세요</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button onClick={() => handleSocialLogin("kakao")}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium text-sm transition hover:opacity-90"
                style={{ backgroundColor: "#FEE500", color: "#191919" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3C5.58 3 2 5.78 2 9.24c0 2.2 1.42 4.14 3.58 5.26l-.92 3.37c-.08.28.24.5.48.34l3.96-2.62c.29.04.59.06.9.06 4.42 0 8-2.78 8-6.17S14.42 3 10 3z" fill="#191919"/></svg>
                카카오로 로그인
              </button>
              <button onClick={() => handleSocialLogin("google")}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium text-sm border-2 border-border hover:bg-muted transition bg-white">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                구글로 로그인
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-muted-foreground">또는 이메일로 로그인</span></div>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div><Label htmlFor="email">이메일</Label><Input id="email" type="email" placeholder="email@example.com" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div><Label htmlFor="password">비밀번호</Label><Input id="password" type="password" placeholder="••••••••" className="mt-1.5" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-5 rounded-full" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              계정이 없으신가요? <Link href="/signup" className="text-primary font-medium hover:underline">회원가입</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
