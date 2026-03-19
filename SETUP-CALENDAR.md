# Google Calendar API 설정 가이드

## 현재 상태
- Google Cloud 프로젝트: `bangguseokpiano-cf2a4`
- Calendar API: 활성화 됨
- OAuth 클라이언트: 설정 완료 (.env.local에 저장됨)
- 개발 환경에서는 **mock 데이터**로 동작합니다 (인증 없이도 테스트 가능)

## 방법 1: Service Account (권장)

### 1. 서비스 계정 생성
```bash
# Google Cloud Console에서:
# 1. IAM & Admin > Service Accounts
# 2. Create Service Account
# 3. 이름: "calendar-booking"
# 4. Key 생성 (JSON 형식 다운로드)
```

### 2. 캘린더 공유
- Google Calendar에서 `wlgpdi2@gmail.com` 캘린더 설정
- "특정 사용자와 공유" > 서비스 계정 이메일 추가
- 권한: "일정 변경" (Make changes to events)

### 3. 환경변수 설정
```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"bangguseokpiano-cf2a4",...전체 JSON...}
```

## 방법 2: OAuth2 Refresh Token

### 1. Refresh Token 얻기
```bash
# OAuth2 Playground: https://developers.google.com/oauthplayground/
# 1. 설정(⚙️) > "Use your own OAuth credentials" 체크
# 2. Client ID / Secret 입력
# 3. Scope: https://www.googleapis.com/auth/calendar
# 4. Authorize APIs > wlgpdi2@gmail.com 로 로그인
# 5. Exchange authorization code > Refresh token 복사
```

### 2. 환경변수 설정
```env
GOOGLE_REFRESH_TOKEN=1//0e...복사한_리프레시_토큰...
```

## Vercel 배포 시
- Vercel 대시보드 > Settings > Environment Variables에 동일하게 추가
- `GOOGLE_SERVICE_ACCOUNT_KEY` 또는 `GOOGLE_REFRESH_TOKEN` 설정 필요
