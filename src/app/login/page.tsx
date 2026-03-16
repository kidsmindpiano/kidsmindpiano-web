"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#FDE8D8] to-[#D4EEF1] py-16">
      <motion.div className="w-full max-w-md px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎹</div>
              <h1 className="text-2xl font-bold">로그인</h1>
              <p className="text-sm text-muted-foreground mt-1">마이페이지에서 수업을 관리하세요</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div><Label htmlFor="email">이메일</Label><Input id="email" type="email" placeholder="email@example.com" className="mt-1.5" /></div>
              <div><Label htmlFor="password">비밀번호</Label><Input id="password" type="password" placeholder="••••••••" className="mt-1.5" /></div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-5 rounded-full">로그인</Button>
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
