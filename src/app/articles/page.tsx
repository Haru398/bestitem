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
          <span className={styles.eyebrow}>뭐 살지 찾는 중이라면</span>
          <h1 className={styles.archiveTitle}>살까 말까 고민한 글 모아보기</h1>
          <p>제품명도 좋고, 지금 겪고 있는 불편을 검색해도 됩니다. 자료를 다시 읽고 제 말로 고친 글만 모아뒀어요.</p>
        </header>
        <ArticleArchive posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}
