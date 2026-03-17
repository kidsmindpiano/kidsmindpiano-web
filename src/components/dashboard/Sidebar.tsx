"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/lib/AuthContext";
import { LogOut, Home, Users, FileText, Video, Gamepad2, MessageSquare, Settings, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

type MenuItem = { href: string; label: string; icon: React.ElementType };

const menuByRole: Record<UserRole, MenuItem[]> = {
  teacher: [
    { href: "/dashboard/teacher", label: "홈", icon: Home },
    { href: "/dashboard/teacher/students", label: "내 학생", icon: Users },
    { href: "/dashboard/teacher/notes", label: "수업 일지", icon: FileText },
  ],
  parent: [
    { href: "/dashboard/parent", label: "홈", icon: Home },
    { href: "/dashboard/parent/notes", label: "수업 일지", icon: FileText },
    { href: "/dashboard/parent/videos", label: "수업 영상", icon: Video },
  ],
  student: [
    { href: "/dashboard/student", label: "홈", icon: Home },
    { href: "/dashboard/student/videos", label: "연주 영상", icon: Video },
    { href: "/dashboard/student/community", label: "커뮤니티", icon: MessageSquare },
    { href: "/dashboard/student/games", label: "음악 게임", icon: Gamepad2 },
  ],
  admin: [
    { href: "/dashboard/admin", label: "대시보드", icon: BarChart3 },
    { href: "/dashboard/admin/users", label: "사용자 관리", icon: Users },
  ],
};

export default function Sidebar() {
  const { role, user, signOut } = useAuth();
  const pathname = usePathname();
  if (!role) return null;

  const menu = menuByRole[role] || [];
  const userName = user?.user_metadata?.name || "사용자";

  const roleLabel: Record<UserRole, string> = {
    teacher: "👩‍🏫 선생님", parent: "👨‍👩‍👧 학부모", student: "🧒 학생", admin: "👑 관리자",
  };

  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <p className="font-bold text-lg">{userName}</p>
        <span className="text-sm text-primary font-medium">{roleLabel[role]}</span>
      </div>
      <nav className="flex-1 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Button variant="ghost" onClick={() => signOut()} className="mt-4 text-muted-foreground hover:text-red-500 justify-start">
        <LogOut className="w-4 h-4 mr-2" /> 로그아웃
      </Button>
    </aside>
  );
}
