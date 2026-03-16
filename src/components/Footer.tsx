import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2D2A26] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Image src="/logo/logo-color.jpg" alt="키즈마인드피아노" width={32} height={32} className="rounded" />
            키즈마인드피아노
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            아이의 마음을 먼저 읽고,<br />음악으로 대화합니다.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white/80">바로가기</h4>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <Link href="/about" className="hover:text-white transition">수업 안내</Link>
            <Link href="/pricing" className="hover:text-white transition">수업료</Link>
            <Link href="/teachers" className="hover:text-white transition">선생님</Link>
            <Link href="/contact" className="hover:text-white transition">체험수업 신청</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white/80">연락처</h4>
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <a href="https://www.kidsmind.art" target="_blank" className="hover:text-white transition">🌐 kidsmind.art</a>
            <a href="https://www.threads.net/@kids_mind_piano" target="_blank" className="hover:text-white transition">💬 @kids_mind_piano</a>
            <a href="https://litt.ly/kidsmindpiano" target="_blank" className="hover:text-white transition">🔗 litt.ly/kidsmindpiano</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/30">
        © 2026 키즈마인드피아노. All rights reserved.
      </div>
    </footer>
  );
}
