import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "키즈마인드피아노 | 해외 한국 아이들의 온라인 피아노 레슨",
  description: "해외 거주 한국 초등학생을 위한 전문 온라인 피아노 레슨. 음악치료 기반, 즉흥연주, 1:1 Zoom 수업.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
