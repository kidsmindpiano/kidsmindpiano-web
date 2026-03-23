"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const concerts = [
  { src: "/concerts/concert-7.jpg", title: "제8회 Dreaming Kids' Piano Concert", date: "2025.12" },
  { src: "/concerts/concert-6.jpg", title: "제8회 Picnic with Piano", date: "2025.05" },
  { src: "/concerts/concert-5.jpg", title: "엉터리 연주회", date: "2024" },
  { src: "/concerts/concert-4.jpg", title: "제5회 온라인 피아노 연주회", date: "2023.12" },
  { src: "/concerts/concert-2.jpg", title: "제4회 온라인피아노연주회", date: "2023.04" },
  { src: "/concerts/concert-3.jpg", title: "제3회 온라인 기부연주회", date: "2022.09" },
  { src: "/concerts/concert-1.jpg", title: "Global Music Festival", date: "2021.12" },
];

export default function ConcertCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white transition hidden md:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white transition hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-2 py-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {concerts.map((c, i) => (
          <motion.div
            key={c.src}
            className="flex-shrink-0 w-[280px] snap-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
              <div className="relative w-[280px] h-[280px]">
                <Image src={c.src} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
