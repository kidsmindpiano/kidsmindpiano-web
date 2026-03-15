# 키즈마인드피아노 홈페이지

## 기술 스택
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (인증, DB, 스토리지)

## 브랜드
- 이름: 키즈마인드피아노 (Kids Mind Piano)
- 대상: 해외 거주 한국 초등학생 온라인 피아노 레슨
- 톤: 따뜻하고 신뢰감 있는, 밝은 컬러
- 인스타/스레드: @kids_mind_piano

## 컬러
- Primary: #6C63FF (보라)
- Secondary: #FF6B9D (핑크)
- Accent: #4ECDC4 (민트)
- Background: #FAFAFA

## 페이지 구조

### 공개 페이지
1. **/ (메인)** - 히어로("해외에서도 우리 아이 피아노 레슨, 집에서 편하게") + 특징 3개 + 후기 + CTA
2. **/about (수업 안내)** - Zoom 1:1, 커리큘럼(3개월/6개월/1년+), 룰렛 교육법, 차별점(즉흥연주/음악치료/TCK전문), 온라인 연주회
3. **/pricing (수업료)** - 패키지별 카드 + 체험수업 무료 + FAQ
4. **/teachers (선생님)** - 프로필 카드 + 스케줄(빈 시간) + 예약 버튼
5. **/contact (문의)** - 체험수업 신청 폼 + 카카오톡

### 로그인 후 마이페이지
6. **/login, /signup** - Supabase Auth
7. **/dashboard** - 수업 시간표(캘린더) + 수업 일지 + 수업 영상 + 게임 코너

## DB 스키마
- profiles: id, name, email, role(student/parent/teacher/admin), avatar_url
- lessons: id, student_id, teacher_id, scheduled_at, status, zoom_link
- lesson_notes: id, lesson_id, content, created_at
- lesson_videos: id, lesson_id, video_url, title
- teacher_schedules: id, teacher_id, day_of_week, start_time, end_time, is_available
- games: id, title, description, url, thumbnail_url

## 디자인
- shadcn/ui 컴포넌트, 둥근 모서리, 부드러운 그림자
- 음표/피아노 아이콘, framer-motion 애니메이션
- 모바일 퍼스트 반응형
- 모든 텍스트 한국어

## 지시사항
1. BRIEF.md 읽고 이해
2. Next.js 프로젝트 생성 (npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*")
3. shadcn/ui 설치 및 설정
4. 공개 페이지 5개 + 레이아웃(네비게이션/푸터) 만들기
5. Supabase 연동은 나중에 - 우선 UI만 더미 데이터로
6. 각 페이지 예쁘게 디자인, 실제 서비스처럼 완성도 높게
7. framer-motion으로 부드러운 애니메이션
8. 완료 후: openclaw system event --text "Done: 키즈마인드피아노 홈페이지 MVP 완성" --mode now
