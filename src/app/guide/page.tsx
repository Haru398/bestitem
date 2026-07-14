import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../lib/categories";
import { getPublicGuides } from "../../lib/content";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "PC·전자제품, 사기 전에 확인할 것",
  description: "CPU·메인보드·그래픽카드의 공식 사양, BIOS 호환성, 전원과 케이스 규격처럼 구매 전에 확인할 질문을 제조사 자료로 정리합니다.",
  alternates: { canonical: "/guide/" },
};

const TOPICS: Record<string, { label: string; description: string }> = {
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
    description: "DDR 세대, 모듈 구성, M.2 규격과 슬롯 공유 조건을 제조사 표에서 확인합니다.",
  },
  "cooling-build": {
    label: "쿨링 · 조립",
    description: "소켓 브래킷, 쿨러 높이, 메모리 간섭과 팬 헤더처럼 실제 조립 조건을 다룹니다.",
  },
};

export default function GuideIndexPage() {
  const guides = getPublicGuides().filter((guide) => guide.category === "digital-pc");
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
          <span className={styles.eyebrow}>PC 부품은 호환성부터</span>
          <h1 className={styles.archiveTitle}>이름은 다 비슷한데,<br />왜 이렇게 헷갈릴까요?</h1>
          <p>CPU 소켓부터 BIOS, 그래픽카드 길이와 파워 용량까지. 제품명만 봐서는 알기 어려운 내용을 제조사 문서까지 열어보고 쉽게 풀어 적습니다.</p>
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
