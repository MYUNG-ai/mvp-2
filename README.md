# myung.ai — Mobile Web

사주(四柱) 기반 **AI 클론 / 하이퍼 개인화 OS** 서비스의 모바일 웹 프리프로토타입.
온보딩에서 수집한 이름·생년월일·성별·지역 데이터로 개인화된 사주 화면을 제공합니다.

> 디자인 프로토타입(`/project`, HTML+Babel)을 프로덕션 지향 구조(Next.js + TypeScript)로 재구현한 결과물입니다. 추후 백엔드/AI 엔진 연동을 전제로 설계되어 있습니다.

## 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + CSS 변수 디자인 토큰
- **Zustand** (영속 상태, localStorage)
- **TanStack Query** (데이터 페칭 레이어 — API 교체 대비)
- **Resend** (온보딩 진입 이메일 알림)

## 시작하기

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY 입력 (선택)
npm run dev                  # http://localhost:3000
```

`RESEND_API_KEY`가 없으면 이메일 전송은 조용히 실패하고 온보딩 플로우는 그대로 진행됩니다.

## 정보 구조

하단 탭 3개: **OS · map · my**

### 온보딩 (대화형)
- **1~5단계 (초기 온보딩)**: 스플래시 → 이름 → 생년월일시 → 성별 → 출생지역
- **6단계 (로딩)**: 명(命) 받아오기 → 진입 이메일 알림 발송 → `/os` 진입
- **7~8단계 (map 첫 진입 온보딩)**: 상태 입력(MBTI·진로·관계, skip 가능) → 클론 생성 로딩(% 증가)

### OS 탭 — 오늘의 나 대시보드
인사 + 원형 프로필(스토리 링), 일력(연운/월운 네비게이션), 오행 펜타곤, GOOD/BAD, 오늘의 상세 운세(요약·성공운·연애운·재물운).

### map 탭 — 고민 노드 맵 & 시뮬레이션
노드 트리(우주 배경) + 분야 태그 입력. 태그별 분기:
- **진로** → 시나리오 시뮬레이션 → 결과 리포트
- **관계** → 궁합 리포트 → 클론 채팅 시뮬레이션
- **상담** → 상담 리포트 (카테고리 미선택 시 기본값)

### my 탭 — 프로필 · 데이터
서브탭 `명식`(만세력 + 성향맵) / `저장` / `관계`(친구 클론).

## 폴더 구조

```
src/
├── app/
│   ├── onboarding/page.tsx        # 온보딩 1~6단계
│   ├── (main)/                    # 탭바 레이아웃 그룹
│   │   ├── os/                     # OS 탭 + year-luck/month-luck
│   │   ├── map/                    # map 탭 (7~8단계 첫 진입 포함)
│   │   └── my/                     # my 탭
│   └── api/notify/route.ts        # 진입 이메일 알림 (Resend)
├── components/                     # 기능별 컴포넌트 (ui/layout/onboarding/os/map/my)
├── store/                          # Zustand (useUserStore, useMapStore)
├── hooks/useSaju.ts                # React Query 사주 훅
├── services/sajuService.ts        # 데이터 페칭 (현재 mock → 추후 API)
├── lib/                            # saju 계산기, email, utils
├── constants/saju.ts              # 천간·지지·오행 매핑
└── types/                          # 공유 타입
```

## 배포

### GitHub Pages (정적 — 현재 설정)
`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`가 정적 빌드(`GITHUB_PAGES=true npm run build`) 후 자동 배포합니다.
- 최초 1회: 레포 **Settings → Pages → Build and deployment → Source: GitHub Actions** 선택.
- 배포 URL: `https://jisooohh.github.io/myung_mvp/`
- base path는 `next.config.ts`의 `repo` 값(`myung_mvp`)에 맞춰 자동 설정됩니다.

> ⚠️ GitHub Pages는 정적 호스팅이라 **서버 코드가 실행되지 않습니다.** 따라서 온보딩 진입 **이메일 알림은 Pages에서는 동작하지 않습니다.** 활성화하려면 `NEXT_PUBLIC_NOTIFY_ENDPOINT`에 외부 함수 URL(아래)을 지정하세요.

### Vercel (서버 — 이메일 알림 포함)
1. 레포를 Vercel에 import (기본 설정 그대로, `GITHUB_PAGES` 미설정).
2. `docs/vercel-notify-route.ts.example`를 `src/app/api/notify/route.ts`로 복원.
3. 환경변수 `RESEND_API_KEY` 추가 → 진입 이메일이 `voidmule.xx@gmail.com`로 발송됩니다.

## 백엔드/AI 연동 가이드

- **사주 계산**: `src/services/sajuService.ts`의 `fetchSaju`만 실제 API 호출로 교체하면 됩니다. 훅·컴포넌트 계약은 동일.
- **이메일/알림**: 클라이언트는 `src/lib/email.ts` → `NEXT_PUBLIC_NOTIFY_ENDPOINT`(미설정 시 `/api/notify`). 서버 구현 예시는 `docs/vercel-notify-route.ts.example`.
- **사용자 상태**: `src/store/useUserStore.ts` — 추후 인증/서버 동기화 지점.
