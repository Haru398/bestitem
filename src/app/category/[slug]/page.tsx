import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategory } from "../../../lib/categories";
import { getPostsByCategory } from "../../../lib/content";
import ArticleCard from "../../components/ArticleCard";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../../site.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);
  if (!category) return { title: "카테고리를 찾을 수 없습니다" };
  return {
    title: `${category.label} 구매 가이드`,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!CATEGORIES.some((item) => item.slug === slug)) notFound();
  const category = getCategory(slug);
  const posts = getPostsByCategory(slug);

  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <nav className={styles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link><span>›</span><Link href="/articles/">구매 가이드</Link><span>›</span><span>{category.label}</span>
        </nav>
        <header className={styles.archiveIntro}>
          <span className={styles.eyebrow}>TOPIC DESK</span>
          <h1 className={styles.archiveTitle}>{category.label}</h1>
          <p>{category.description}</p>
        </header>
        <div className={styles.resultCount}>총 {posts.length}개의 글</div>
        <div className={styles.cardGrid}>
          {posts.map((post) => <ArticleCard post={post} key={post.slug} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
