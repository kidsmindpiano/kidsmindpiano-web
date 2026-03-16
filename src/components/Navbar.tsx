"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "홈" },
  { href: "/about", label: "수업 안내" },
  { href: "/pricing", label: "수업료" },
  { href: "/teachers", label: "선생님" },
  { href: "/contact", label: "문의" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Music className="w-6 h-6" />
          키즈마인드피아노
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/login">
            <Button variant="outline" size="sm">로그인</Button>
          </Link>
          <Link href="/contact">
            <Button size="sm" className="bg-primary hover:bg-primary/90">체험수업 신청</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2">
                  {l.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">로그인</Button>
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full bg-primary">체험수업 신청</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
