# item.monster

쿠팡 상품을 무조건 추천하는 사이트가 아니라, 사용자가 결제 전에 확인할 조건을 빠르게 판단하도록 돕는 구매 가이드입니다. 공개 사이트는 데이터베이스나 관리자 API 없이 정적 파일로 빌드됩니다.

## 자주 쓰는 명령

```bash
npm run dev
npm run content:validate
npm run build
npm run release:prepare
```

- `content:validate`: 공개 가능한 글의 길이, 근거, 이미지 설명, 과장 표현을 검사합니다.
- `build`: 검사를 통과한 뒤 정적 사이트를 `out/`에 생성합니다.
- `release:prepare`: 빌드 결과를 GitHub Pages가 읽는 저장소 루트에 복사합니다. 삭제는 하지 않습니다.

## 유지보수 구조

```text
content/
  posts/                 상품 구매 판단 글, 글 하나당 JSON 하나
  guides/                주제형 구매 가이드, 글 하나당 JSON 하나
  templates/             새 글 형식
docs/
  CONTENT_STANDARD.md    글 작성·검수 기준
  AUTOMATION_RUNBOOK.md  자동화 상태와 배포 순서
scripts/
  content/               이전·검증 도구
  deploy/                안전한 릴리스 준비 도구
src/
  app/                   화면과 URL
  lib/                   콘텐츠 읽기·카테고리 규칙
public/                  상품 이미지, CNAME, 정적 파일
```

새 글은 `content/posts/<slug>.json` 한 파일만 추가합니다. 데이터베이스 수정, React 컴포넌트 복사, HTML 수동 생성은 필요하지 않습니다.

## 공개 원칙

- `editorial.status`가 `reviewed`인 글만 새 품질 기준을 통과한 글입니다.
- 확인되지 않은 건강 효능, 성능 수치, 최저가 표현은 쓰지 않습니다.
- 직접 써보지 않았다면 후기라고 부르지 않고 판매 자료 분석임을 밝힙니다.
- 링크나 근거가 부족한 이전 글은 `indexable: false`로 검색 노출에서 제외합니다.
- 쿠팡 링크에는 광고 고지와 `sponsored nofollow` 속성을 붙입니다.

상세한 운영 순서는 [docs/AUTOMATION_RUNBOOK.md](docs/AUTOMATION_RUNBOOK.md)를 따릅니다.
