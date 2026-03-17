"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const roleBadge: Record<string, string> = { admin: "bg-[#FF6B6B]/10 text-[#FF6B6B]", teacher: "bg-primary/10 text-primary", parent: "bg-[#FFB547]/10 text-[#FFB547]", student: "bg-[#3DBB7D]/10 text-[#3DBB7D]" };
const roleLabel: Record<string, string> = { admin: "관리자", teacher: "선생님", parent: "학부모", student: "학생" };

const users = [
  { name: "최지혜", role: "admin", email: "jihye@kidsmind.art", country: "🇰🇷" },
  { name: "안서희", role: "teacher", email: "seohee@kidsmind.art", country: "🇰🇷" },
  { name: "김경서", role: "teacher", email: "kyungseo@kidsmind.art", country: "🇰🇷" },
  { name: "김유나 학부모", role: "parent", email: "yuna.parent@gmail.com", country: "🇯🇵" },
  { name: "하정훈 학부모", role: "parent", email: "junghoon.parent@gmail.com", country: "🇺🇸" },
  { name: "김유나", role: "student", email: "-", country: "🇯🇵" },
  { name: "하정훈", role: "student", email: "-", country: "🇺🇸" },
  { name: "곽아린", role: "student", email: "-", country: "🇺🇸" },
  { name: "김리온", role: "student", email: "-", country: "🇺🇸" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.includes(search) || u.email.includes(search));
  return (
    <div>
      <div className="flex items-center justify-between mb-6"><motion.h1 className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>👥 사용자 관리</motion.h1><Link href="/dashboard/admin/users/create"><Button className="bg-primary hover:bg-primary/90 rounded-full"><Plus className="w-4 h-4 mr-2" /> 새 계정 만들기</Button></Link></div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="이름 또는 이메일 검색..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50"><tr>
                <th className="text-left p-4 font-medium">이름</th><th className="text-left p-4 font-medium">역할</th>
                <th className="text-left p-4 font-medium">이메일</th><th className="text-left p-4 font-medium">국가</th>
              </tr></thead>
              <tbody>{filtered.map((u, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/30 transition">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4"><Badge variant="secondary" className={`${roleBadge[u.role]} border-0`}>{roleLabel[u.role]}</Badge></td>
                  <td className="p-4 text-muted-foreground">{u.email}</td>
                  <td className="p-4">{u.country}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
