import { NextRequest, NextResponse } from "next/server";
import { bookSlot } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startTime, endTime, studentName, parentEmail, parentName } = body;

    if (!startTime || !endTime || !studentName || !parentEmail || !parentName) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요" },
        { status: 400 }
      );
    }

    // Validate that the time is in the future
    if (new Date(startTime).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "과거 시간은 예약할 수 없습니다" },
        { status: 400 }
      );
    }

    const event = await bookSlot(
      startTime,
      endTime,
      studentName,
      parentEmail,
      parentName
    );

    return NextResponse.json({
      success: true,
      eventId: event.id,
      htmlLink: event.htmlLink,
    });
  } catch (error) {
    console.error("Booking error:", error);

    // In development without credentials, return mock success
    if (
      process.env.NODE_ENV === "development" &&
      (error as Error).message?.includes("auth not configured")
    ) {
      return NextResponse.json({
        success: true,
        eventId: "mock-" + Date.now(),
        mock: true,
      });
    }

    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Booking error detail:", errMsg);
    return NextResponse.json(
      { error: "예약에 실패했습니다: " + errMsg },
      { status: 500 }
    );
  }
}
