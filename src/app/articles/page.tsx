import type { Metadata } from "next";
import { getPublicPosts } from "../../lib/content";
import ArticleArchive from "../components/ArticleArchive";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "구매 가이드 전체보기",
  description: "생활가전, 디지털, 생활용품 등 제품 구매 전에 확인할 가이드를 검색하고 분류별로 찾아보세요.",
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  const posts = getPublicPosts();
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <header className={styles.archiveIntro}>
          <span className={styles.eyebrow}>ALL BUYING CHECKS</span>
          <h1 className={styles.archiveTitle}>구매 가이드 찾기</h1>
          <p>제품명뿐 아니라 용도와 고민을 검색해 보세요. 근거와 구매 전 확인사항을 검수한 글만 공개합니다.</p>
        </header>
        <ArticleArchive posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}
