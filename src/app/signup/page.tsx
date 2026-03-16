"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-secondary/5 to-primary/5 py-16">
      <motion.div className="w-full max-w-md px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-2xl font-bold">회원가입</h1>
              <p className="text-sm text-muted-foreground mt-1">키즈마인드피아노 가족이 되어주세요</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="email@example.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" placeholder="8자 이상" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirm">비밀번호 확인</Label>
                <Input id="confirm" type="password" placeholder="••••••••" className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 py-5">가입하기</Button>
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
