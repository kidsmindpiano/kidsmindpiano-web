export type UserRole = "student" | "parent" | "teacher" | "admin";

type SheetRow = Record<string, string>;

type RoleResolutionInput = {
  email?: string | null;
  metadataRole?: unknown;
  permissionRows?: SheetRow[];
  studentRows?: SheetRow[];
};

export const ROLE_PATHS: Record<UserRole, string> = {
  admin: "/dashboard/admin",
  teacher: "/dashboard/teacher",
  parent: "/dashboard/parent",
  student: "/dashboard/student",
};

const PUBLIC_DASHBOARD_PATH = "/dashboard";
const DEFAULT_SPREADSHEET_ID = "1m86nWnanHVgW4iRu1N3rCymQBIvahTPdm478ODMYbAc";
const PERMISSIONS_SHEET_NAME = "권한";
const STUDENTS_SHEET_NAME = "학생정보";

function normalizeEmail(email?: string | null): string {
  return (email || "").trim().toLowerCase();
}

function getSpreadsheetId(): string {
  return process.env.NEXT_PUBLIC_AUTH_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;
}

function getCsvUrl(sheetName: string): string {
  const spreadsheetId = getSpreadsheetId();
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

export function isUserRole(value: unknown): value is UserRole {
  return value === "student" || value === "parent" || value === "teacher" || value === "admin";
}

export function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

export function csvToRecords(csv: string, headerMarker: string): SheetRow[] {
  const rows = parseCsv(csv);
  const headerIndex = rows.findIndex((row) => row.some((cell) => cell.trim() === headerMarker));
  if (headerIndex === -1) return [];

  const headers = rows[headerIndex].map((header) => header.trim());
  return rows.slice(headerIndex + 1).map((row) => {
    const record: SheetRow = {};
    headers.forEach((header, index) => {
      if (header) record[header] = (row[index] || "").trim();
    });
    return record;
  }).filter((record) => Object.values(record).some(Boolean));
}

function roleFromPermissionType(type: string): UserRole | null {
  const normalized = type.trim().toLowerCase();
  if (["원장", "관리자", "매니저", "manager", "admin"].includes(normalized)) return "admin";
  if (["강사", "선생님", "teacher"].includes(normalized)) return "teacher";
  return null;
}

function metadataParentOrStudent(metadataRole: unknown): UserRole {
  return metadataRole === "parent" ? "parent" : "student";
}

export function resolveTrustedRole({
  email,
  metadataRole,
  permissionRows = [],
  studentRows = [],
}: RoleResolutionInput): UserRole | null {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const permission = permissionRows.find((row) => normalizeEmail(row["이메일"]) === normalizedEmail);
  if (permission) {
    const privilegedRole = roleFromPermissionType(permission["구분"] || "");
    if (privilegedRole) return privilegedRole;
  }

  const isRegisteredStudentOrParent = studentRows.some((row) => normalizeEmail(row["메일"]) === normalizedEmail);
  if (isRegisteredStudentOrParent) return metadataParentOrStudent(metadataRole);

  return null;
}

async function fetchCsvRecords(sheetName: string, headerMarker: string): Promise<SheetRow[]> {
  const response = await fetch(getCsvUrl(sheetName));
  if (!response.ok) throw new Error(`Failed to fetch ${sheetName}: ${response.status}`);
  return csvToRecords(await response.text(), headerMarker);
}

export async function fetchTrustedRole(email?: string | null, metadataRole?: unknown): Promise<UserRole | null> {
  if (!email) return null;

  const [permissionRows, studentRows] = await Promise.all([
    fetchCsvRecords(PERMISSIONS_SHEET_NAME, "강사고유번호"),
    fetchCsvRecords(STUDENTS_SHEET_NAME, "학생고유번호"),
  ]);

  return resolveTrustedRole({ email, metadataRole, permissionRows, studentRows });
}

export function getDefaultDashboardPath(role: UserRole | null): string {
  if (!role) return "/login";
  return ROLE_PATHS[role];
}

export function canAccessDashboardPath(role: UserRole | null, pathname: string): boolean {
  if (!role) return false;
  if (role === "admin") return pathname === PUBLIC_DASHBOARD_PATH || pathname.startsWith("/dashboard/");

  const allowedRoot = ROLE_PATHS[role];
  return pathname === PUBLIC_DASHBOARD_PATH || pathname === allowedRoot || pathname.startsWith(`${allowedRoot}/`);
}
