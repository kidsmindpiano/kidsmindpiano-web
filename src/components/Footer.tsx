import { Music } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Music className="w-5 h-5 text-accent" />
            키즈마인드피아노
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            해외 거주 한국 아이들을 위한<br />온라인 피아노 레슨 전문
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">바로가기</h4>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <Link href="/about" className="hover:text-white transition">수업 안내</Link>
            <Link href="/pricing" className="hover:text-white transition">수업료</Link>
            <Link href="/teachers" className="hover:text-white transition">선생님</Link>
            <Link href="/contact" className="hover:text-white transition">체험수업 신청</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">연락처</h4>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <span>📧 wlgpdi2@gmail.com</span>
            <a href="https://litt.ly/kidsmindpiano" target="_blank" className="hover:text-white transition">🔗 litt.ly/kidsmindpiano</a>
            <a href="https://www.threads.net/@kids_mind_piano" target="_blank" className="hover:text-white transition">💬 @kids_mind_piano</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/40">
        © 2026 키즈마인드피아노. All rights reserved.
      </div>
    </footer>
  );
}
