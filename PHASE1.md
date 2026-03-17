# Phase 1: 학원 플랫폼 기반 구축

## 기존 코드 유지하면서 dashboard 하위에 역할별 페이지 추가

## Supabase DB 스키마

### profiles
- id UUID PK → auth.users(id)
- name TEXT, email TEXT, role TEXT (student/parent/teacher/admin)
- avatar_url TEXT, student_name TEXT, teacher_id UUID, country TEXT, timezone TEXT

### lessons  
- id UUID PK, student_id, teacher_id UUID
- scheduled_at TIMESTAMPTZ, duration_min INT DEFAULT 40
- status (scheduled/completed/cancelled), zoom_link TEXT

### lesson_notes (수업 일지)
- id UUID PK, lesson_id, teacher_id, student_id UUID
- content TEXT, mood TEXT, homework TEXT, teacher_comment TEXT
- parent_visible BOOLEAN DEFAULT true

### student_videos (학생 연주 영상)
- id UUID PK, student_id UUID, title TEXT, description TEXT
- video_url TEXT, thumbnail_url TEXT, likes_count INT DEFAULT 0

### video_comments
- id UUID PK, video_id → student_videos(id), user_id → profiles(id), content TEXT

### community_posts (게시판)
- id UUID PK, author_id UUID, title TEXT, content TEXT
- category (general/practice/show/question), likes_count INT DEFAULT 0

### post_comments
- id UUID PK, post_id → community_posts(id), author_id → profiles(id), content TEXT

## 구현 범위

### 1. Auth + Role 기반 라우팅
- 회원가입에 role 선택 (학부모/학생) 추가
- 선생님/관리자는 관리자가 지정
- 로그인 후 역할별 대시보드 리다이렉트

### 2. 선생님 대시보드 (/dashboard/teacher)
- 내 학생 목록, 수업 캘린더, 수업 일지 작성/수정

### 3. 학부모 대시보드 (/dashboard/parent)
- 자녀 수업 일정, 수업 일지 확인, 수업 영상 시청

### 4. 학생 대시보드 (/dashboard/student)
- 수업 시간표, 수업 일지, 연주 영상 올리기, 친구 영상 보기+좋아요+댓글, 커뮤니티

### 5. 관리자 대시보드 (/dashboard/admin)
- 전체 수업 현황, 선생님/학생 관리, 수업 일지 전체 열람

## 파일 구조
src/app/dashboard/
  layout.tsx (사이드바), page.tsx (역할 리다이렉트)
  teacher/ (page, students, notes, notes/[id])
  parent/ (page, notes, videos)
  student/ (page, videos, community, games)
  admin/ (page, users)

## 지시사항
1. 기존 src/app 코드 유지 (메인, about, pricing 등)
2. src/lib/supabase.ts, src/lib/AuthContext.tsx 사용
3. AuthContext에 role 필드 추가
4. 회원가입에 role 선택 드롭다운 추가 (학부모/학생)
5. 각 대시보드에 사이드바 + 역할별 메뉴
6. 수업 일지 CRUD UI (더미 데이터 OK)
7. 학생 연주 영상 갤러리 (업로드 UI + 카드 그리드)
8. 커뮤니티 게시판 UI (글쓰기 + 목록 + 댓글)
9. 디자인: 보라(#7C5CFC) primary + 코랄/노랑/민트 포인트, shadcn/ui, framer-motion
10. 완료 후: openclaw system event --text "Done: Phase 1 완성" --mode now
