# 현장 작업일보 시스템 (로그인 없음)

간단한 Vite + React 앱입니다. Supabase는 인증 없이 데이터 저장용으로만 사용합니다.

설치 및 실행

1. 환경 변수 파일 추가:

```
cp .env.example .env
```

2. `package.json` 의존성 설치:

```
npm install
```

3. 개발 서버 실행:

```
npm run dev
```

테이블(예시): `daily_reports`, `manpower`, `equipment`, `work_items`, `quality_checks`, `safety_checks`, `wind_management`, `photos`

주요 기능

- 대시보드
- 작업일보 작성, 수정, 삭제
- 작업일보 조회
- PDF 출력
- Excel 출력
- 사진 업로드 및 사진대지
- 계획대비 실적, 누계실적
- 품질관리 및 안전관리 체크리스트
- 강풍관리, 익일 작업계획, 주요 이슈사항
