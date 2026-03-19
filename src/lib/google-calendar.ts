import { google } from "googleapis";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "wlgpdi2@gmail.com";
const SLOT_DURATION_MINUTES = 40;

function getAuth() {
  // Option 1: Service Account (preferred for server-to-server)
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountKey) {
    const credentials = JSON.parse(serviceAccountKey);
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
  }

  // Option 2: OAuth2 with refresh token
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (clientId && clientSecret && refreshToken) {
    const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
  }

  throw new Error(
    "Google Calendar auth not configured. Set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET + GOOGLE_REFRESH_TOKEN"
  );
}

// Teaching hours per timezone region (in KST / UTC+9)
// The teacher is in Korea, so we define available windows in KST
const AVAILABLE_WINDOWS_KST = [
  // Morning slots (good for Australia/Japan - their afternoon/evening)
  { startHour: 9, endHour: 12 },
  // Afternoon slots (good for Indonesia/Southeast Asia)
  { startHour: 14, endHour: 18 },
  // Evening slots (good for US West Coast morning / US East Coast morning-afternoon)
  { startHour: 20, endHour: 23 },
];

export async function getAvailableSlots(dateStr: string) {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  // Parse the requested date in KST
  const dayStart = new Date(`${dateStr}T00:00:00+09:00`);
  const dayEnd = new Date(`${dateStr}T23:59:59+09:00`);

  // Get existing events for the day
  const eventsRes = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const busySlots = (eventsRes.data.items || [])
    .filter((e) => e.start?.dateTime && e.end?.dateTime)
    .map((e) => ({
      start: new Date(e.start!.dateTime!).getTime(),
      end: new Date(e.end!.dateTime!).getTime(),
    }));

  // Generate available slots
  const slots: { start: string; end: string; startKST: string }[] = [];

  for (const window of AVAILABLE_WINDOWS_KST) {
    let current = new Date(`${dateStr}T${String(window.startHour).padStart(2, "0")}:00:00+09:00`);
    const windowEnd = new Date(`${dateStr}T${String(window.endHour).padStart(2, "0")}:00:00+09:00`);

    while (current.getTime() + SLOT_DURATION_MINUTES * 60000 <= windowEnd.getTime()) {
      const slotEnd = new Date(current.getTime() + SLOT_DURATION_MINUTES * 60000);

      // Check if slot overlaps with any busy period
      const isOverlapping = busySlots.some(
        (busy) => current.getTime() < busy.end && slotEnd.getTime() > busy.start
      );

      // Skip past slots
      const now = Date.now();
      if (!isOverlapping && current.getTime() > now + 60 * 60000) {
        // Format KST time for display
        const kstHour = current.getUTCHours() + 9 >= 24
          ? current.getUTCHours() + 9 - 24
          : current.getUTCHours() + 9;
        const kstMin = String(current.getUTCMinutes()).padStart(2, "0");

        slots.push({
          start: current.toISOString(),
          end: slotEnd.toISOString(),
          startKST: `${kstHour}:${kstMin}`,
        });
      }

      // Move to next slot (every 30 min for more options)
      current = new Date(current.getTime() + 30 * 60000);
    }
  }

  return slots;
}

export async function bookSlot(
  startTime: string,
  endTime: string,
  studentName: string,
  parentEmail: string,
  parentName: string
) {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary: `[퍼스트레슨] ${studentName}`,
      description: `학생: ${studentName}\n보호자: ${parentName}\n이메일: ${parentEmail}\n\n퍼스트레슨 (40분) - 키즈마인드피아노`,
      start: { dateTime: startTime },
      end: { dateTime: endTime },
      attendees: [{ email: parentEmail }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "email", minutes: 60 },
        ],
      },
    },
    sendUpdates: "all",
  });

  return event.data;
}
