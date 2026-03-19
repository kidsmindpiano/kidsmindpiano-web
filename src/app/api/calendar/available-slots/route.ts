import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "date 파라미터가 필요합니다 (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error("Calendar API error:", error);

    // In development without credentials, return mock slots
    if (
      process.env.NODE_ENV === "development" &&
      (error as Error).message?.includes("auth not configured")
    ) {
      const mockSlots = generateMockSlots(date);
      return NextResponse.json({ date, slots: mockSlots, mock: true });
    }

    return NextResponse.json(
      { error: "캘린더 정보를 불러올 수 없습니다" },
      { status: 500 }
    );
  }
}

function generateMockSlots(dateStr: string) {
  const windows = [
    { startHour: 9, endHour: 12 },
    { startHour: 14, endHour: 18 },
    { startHour: 20, endHour: 23 },
  ];

  const slots: { start: string; end: string; startKST: string }[] = [];
  const now = Date.now();

  for (const w of windows) {
    for (let h = w.startHour; h < w.endHour; h++) {
      for (const m of [0, 30]) {
        const start = new Date(`${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+09:00`);
        const end = new Date(start.getTime() + 40 * 60000);
        if (start.getTime() > now + 60 * 60000) {
          slots.push({
            start: start.toISOString(),
            end: end.toISOString(),
            startKST: `${h}:${String(m).padStart(2, "0")}`,
          });
        }
      }
    }
  }

  // Randomly remove some slots to simulate busy times
  return slots.filter(() => Math.random() > 0.3);
}
