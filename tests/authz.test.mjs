import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canAccessDashboardPath,
  csvToRecords,
  getDefaultDashboardPath,
  resolveTrustedRole,
} from "../src/lib/authz.ts";

const permissionRows = [
  { 강사고유번호: "최지혜권한", 구분: "원장", 강사명: "최지혜", 이메일: "wlgpdi2@gmail.com" },
  { 강사고유번호: "안서희권한", 구분: "강사", 강사명: "안서희", 이메일: "teacher@example.com" },
];

const studentRows = [
  { 학생고유번호: "S1", 학생명: "학생1", 메일: "parent@example.com" },
  { 학생고유번호: "S2", 학생명: "학생2", 메일: "student@example.com" },
];

describe("csvToRecords", () => {
  it("finds the real header row after dashboard rows in 학생정보", () => {
    const records = csvToRecords(
      '오프라인,,,,\n,,,,\n학생고유번호,상태,학생명,메일\nS1,수업중,김학생,parent@example.com\n',
      "학생고유번호",
    );

    assert.deepEqual(records, [
      { 학생고유번호: "S1", 상태: "수업중", 학생명: "김학생", 메일: "parent@example.com" },
    ]);
  });

  it("parses quoted Google Sheets CSV cells", () => {
    const records = csvToRecords(
      '강사고유번호,구분,강사명,이메일\nA1,원장,"최,지혜",wlgpdi2@gmail.com\n',
      "강사고유번호",
    );

    assert.equal(records[0].강사명, "최,지혜");
  });
});

describe("resolveTrustedRole", () => {
  it("does not trust self-selected admin metadata", () => {
    assert.equal(
      resolveTrustedRole({
        email: "external@example.com",
        metadataRole: "admin",
        permissionRows,
        studentRows,
      }),
      null,
    );
  });

  it("grants admin from the 권한 sheet 원장/관리자 emails", () => {
    assert.equal(
      resolveTrustedRole({
        email: " WLGPDI2@gmail.com ",
        metadataRole: "parent",
        permissionRows,
        studentRows,
      }),
      "admin",
    );
  });

  it("grants teacher from the 권한 sheet 강사 emails", () => {
    assert.equal(
      resolveTrustedRole({
        email: "teacher@example.com",
        metadataRole: "student",
        permissionRows,
        studentRows,
      }),
      "teacher",
    );
  });

  it("allows parent and student only when the email exists in 학생정보 메일", () => {
    assert.equal(
      resolveTrustedRole({
        email: "parent@example.com",
        metadataRole: "parent",
        permissionRows,
        studentRows,
      }),
      "parent",
    );
    assert.equal(
      resolveTrustedRole({
        email: "student@example.com",
        metadataRole: "student",
        permissionRows,
        studentRows,
      }),
      "student",
    );
  });

  it("blocks unknown parent/student emails", () => {
    assert.equal(
      resolveTrustedRole({
        email: "unknown@example.com",
        metadataRole: "parent",
        permissionRows,
        studentRows,
      }),
      null,
    );
  });
});

describe("canAccessDashboardPath", () => {
  it("lets admins access every dashboard page", () => {
    assert.equal(canAccessDashboardPath("admin", "/dashboard/admin/users"), true);
    assert.equal(canAccessDashboardPath("admin", "/dashboard/teacher/schedule"), true);
    assert.equal(canAccessDashboardPath("admin", "/dashboard/parent/notes"), true);
  });

  it("blocks non-admins from admin pages", () => {
    assert.equal(canAccessDashboardPath("teacher", "/dashboard/admin"), false);
    assert.equal(canAccessDashboardPath("parent", "/dashboard/admin/users"), false);
    assert.equal(canAccessDashboardPath("student", "/dashboard/admin/schedule"), false);
    assert.equal(canAccessDashboardPath(null, "/dashboard/admin"), false);
  });

  it("limits teachers to teacher dashboard pages", () => {
    assert.equal(canAccessDashboardPath("teacher", "/dashboard/teacher/schedule"), true);
    assert.equal(canAccessDashboardPath("teacher", "/dashboard/parent/notes"), false);
  });

  it("limits parent and student users to their own dashboard pages", () => {
    assert.equal(canAccessDashboardPath("parent", "/dashboard/parent/notes"), true);
    assert.equal(canAccessDashboardPath("parent", "/dashboard/student/videos"), false);
    assert.equal(canAccessDashboardPath("student", "/dashboard/student/videos"), true);
    assert.equal(canAccessDashboardPath("student", "/dashboard/parent/notes"), false);
  });
});

describe("getDefaultDashboardPath", () => {
  it("sends unknown users to login instead of admin", () => {
    assert.equal(getDefaultDashboardPath(null), "/login");
  });

  it("sends known roles to their own dashboard", () => {
    assert.equal(getDefaultDashboardPath("admin"), "/dashboard/admin");
    assert.equal(getDefaultDashboardPath("teacher"), "/dashboard/teacher");
    assert.equal(getDefaultDashboardPath("parent"), "/dashboard/parent");
    assert.equal(getDefaultDashboardPath("student"), "/dashboard/student");
  });
});
