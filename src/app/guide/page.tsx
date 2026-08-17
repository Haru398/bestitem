import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../lib/categories";
import { getPublicGuides } from "../../lib/content";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "제품 고르기 전 확인할 기준",
  description: "생활가전부터 PC·전자제품까지 크기, 호환성, 설치와 관리 조건처럼 구매 전에 확인할 질문을 제조사·공공기관 자료로 정리합니다.",
  alternates: { canonical: "/guide/" },
};

const TOPICS: Record<string, { label: string; description: string }> = {
  "air-quality": {
    label: "공기질 · 습도 관리",
    description: "사용면적, 필터와 제습량처럼 방 크기와 반복 관리에 직접 영향을 주는 조건을 확인합니다.",
  },
  "personal-care": {
    label: "개인 관리 가전",
    description: "피부에 닿는 부품, 세척 방식과 교체 비용을 공식 설명서와 소모품 정보에서 확인합니다.",
  },
  cleaning: {
    label: "청소 가전",
    description: "사용시간, 문턱, 도크와 소모품처럼 집 구조와 관리 동선에 맞춰야 하는 조건을 다룹니다.",
  },
  "cooking-appliances": {
    label: "주방 가전",
    description: "실사용 용량, 열원, 세척 가능한 부품과 안전 주의사항을 제품 설명서에서 찾아봅니다.",
  },
  installation: {
    label: "대형가전 설치",
    description: "제품 크기뿐 아니라 문폭, 반입 통로, 급배수와 방열 공간까지 설치 전에 재는 순서를 정리합니다.",
  },
  "mobile-power": {
    label: "모바일 전원",
    description: "Wh 환산, 포트별 출력과 운송 제한처럼 용량 숫자만으로 판단하기 어려운 항목을 확인합니다.",
  },
  "cpu-motherboard": {
    label: "CPU · 메인보드",
    description: "소켓만 보지 않고 칩셋, BIOS 버전, 메모리 규격과 확장 슬롯을 함께 확인합니다.",
  },
  "gpu-power-case": {
    label: "그래픽카드 · 전원 · 케이스",
    description: "카드 길이와 두께, 보조전원, 파워 정격과 케이스 장착 공간을 순서대로 확인합니다.",
  },
  "memory-storage": {
    label: "메모리 · 저장장치",
    description: "DDR 세대, M.2와 USB 규격, 실제 백업 방식처럼 연결과 보관 조건을 제조사 표에서 확인합니다.",
  },
  "audio-connectivity": {
    label: "오디오 · 연결",
    description: "착용 방식, 지원 코덱과 멀티포인트처럼 휴대폰·PC 조합에 따라 달라지는 기능을 구분합니다.",
  },
  "input-devices": {
    label: "입력장치",
    description: "손 크기와 그립, 무게, 수신기와 전환 방식처럼 매일 체감하는 조건을 먼저 확인합니다.",
  },
  "display-setup": {
    label: "화면 · 투사 환경",
    description: "화면 크기, 입력 단자, 스탠드와 투사거리처럼 책상과 방에 맞춰야 할 조건을 정리합니다.",
  },
  "cooling-build": {
    label: "쿨링 · 조립",
    description: "소켓 브래킷, 쿨러 높이, 메모리 간섭과 팬 헤더처럼 실제 조립 조건을 다룹니다.",
  },
  "camera-storage": {
    label: "카메라 · 저장",
    description: "메모리카드 규격, 방수 조건, 전원과 촬영 전 준비사항을 공식 지원 문서에서 확인합니다.",
  },
  "network-security": {
    label: "홈캠 · 네트워크",
    description: "전원과 Wi-Fi 환경, 저장 위치, 계정 보안과 촬영 범위를 설치 전에 점검합니다.",
  },
  "office-furniture": {
    label: "책상 · 의자",
    description: "좌판과 팔걸이 범위, 틸트, 책상 높이처럼 몸과 공간에 맞춰야 하는 치수를 확인합니다.",
  },
  "living-problem-solving": {
    label: "생활 문제 해결",
    description: "제품보다 사용 환경과 관리 방법을 먼저 점검해 불필요한 구매를 줄이는 기준을 모았습니다.",
  },
};

export default function GuideIndexPage() {
  const guides = getPublicGuides();
  const topicCounts = guides.reduce<Record<string, number>>((counts, guide) => {
    const topic = guide.topicCluster || "cpu-motherboard";
    counts[topic] = (counts[topic] || 0) + 1;
    return counts;
  }, {});
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <header className={styles.archiveIntro}>
          <span className={styles.eyebrow}>제품명보다 먼저 볼 것</span>
          <h1 className={styles.archiveTitle}>뭘 사야 할지부터<br />헷갈린다면</h1>
          <p>방 크기와 설치 공간부터 포트, 소모품, 호환성까지. 제품명만 봐서는 알기 어려운 조건을 제조사와 공공기관 문서까지 열어보고 쉽게 풀어 적습니다.</p>
        </header>

        <section className={styles.guideMethod} aria-label="전문 가이드 검수 방식">
          <div><b>01</b><span>뭐가 헷갈리는지부터 적고</span></div>
          <div><b>02</b><span>제조사 자료를 직접 열어보고</span></div>
          <div><b>03</b><span>사진 출처와 사용 조건도 확인하고</span></div>
          <div><b>04</b><span>애매한 건 애매하다고 남깁니다</span></div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>궁금한 부품부터</span>
              <h2>어떤 걸 찾고 있나요?</h2>
            </div>
          </div>
          <div className={styles.topicGrid}>
            {Object.entries(topicCounts).map(([slug, count]) => {
              const topic = TOPICS[slug] || { label: "선택 가이드", description: "구매 전에 확인할 조건을 공식 자료와 함께 정리합니다." };
              return (
                <a href={`#${slug}`} className={styles.topicCard} key={slug}>
                  <b>지금 읽을 글 {count}개</b>
                  <h3>{topic.label}</h3>
                  <p>{topic.description}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>자료를 다시 확인한 글</span>
              <h2>최근에 정리한 내용</h2>
            </div>
          </div>
          <div className={styles.guideTopicList}>
            {Object.keys(topicCounts).map((topicSlug) => {
              const topic = TOPICS[topicSlug] || { label: "선택 가이드", description: "구매 전에 확인할 조건을 공식 자료와 함께 정리합니다." };
              const topicGuides = guides.filter((guide) => (guide.topicCluster || "cpu-motherboard") === topicSlug);
              return (
                <section className={styles.guideTopicSection} id={topicSlug} key={topicSlug}>
                  <h3>{topic.label}</h3>
                  <p>{topic.description}</p>
                  <div className={styles.cardGrid}>
                    {topicGuides.map((guide) => {
                      const category = getCategory(guide.category);
                      return (
                        <Link href={`/guide/${guide.slug}/`} className={styles.articleCard} key={guide.slug}>
                          {guide.heroImage ? <Image src={guide.heroImage} alt={guide.heroImageAlt || ""} className={styles.cardImage} width={640} height={400} /> : null}
                          <div className={styles.cardBody}>
                            <span className={styles.tag}>{category.shortLabel} · {topic.label}</span>
                            <h3>{guide.title}</h3>
                            <p>{guide.description}</p>
                            <span className={styles.cardCta}>이어서 읽기 →</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
