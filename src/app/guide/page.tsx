import type { Metadata } from "next";
import Link from "next/link";
import { getCategory } from "../../lib/categories";
import { getPublicGuides } from "../../lib/content";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "전문 가이드",
  description: "PC 부품 호환성, 규격과 제품 선택 기준처럼 비교가 필요한 주제를 정리합니다.",
  alternates: { canonical: "/guide/" },
};

export default function GuideIndexPage() {
  const guides = getPublicGuides();
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <header className={styles.archiveIntro}>
          <span className={styles.eyebrow}>DEEP GUIDE</span>
          <h1 className={styles.archiveTitle}>규격과 선택 기준을 깊게</h1>
          <p>제품명만 바꾼 설명이 아니라 사용 조건과 비교 기준을 먼저 답하는 검수 완료 가이드입니다.</p>
        </header>
        <div className={styles.cardGrid}>
          {guides.map((guide) => {
            const category = getCategory(guide.category);
            return (
              <Link href={`/guide/${guide.slug}/`} className={styles.articleCard} key={guide.slug}>
                <div className={styles.cardBody}>
                  <span className={styles.tag}>{category.shortLabel} · 선택 가이드</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <span className={styles.cardCta}>선택 기준 확인하기 →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
