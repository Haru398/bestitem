import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "../../../lib/categories";
import { formatDate, getAllGuides, getGuide, getPublicGuides } from "../../../lib/content";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ id: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) return { title: "가이드를 찾을 수 없습니다" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guide/${guide.slug}/` },
    robots:
      guide.indexable && guide.editorial.status === "reviewed"
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `/guide/${guide.slug}/`,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) notFound();
  const category = getCategory(guide.category);
  const related = getPublicGuides().filter((item) => guide.related.includes(item.slug)).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: `https://item.monster/guide/${guide.slug}/`,
    author: { "@type": "Organization", name: "아이템몬스터 편집팀" },
    publisher: { "@type": "Organization", name: "아이템몬스터" },
  };

  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <nav className={siteStyles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link><span>›</span><Link href="/guide/">전문 가이드</Link><span>›</span><span>{category.shortLabel}</span>
        </nav>
        <article>
          <header className={articleStyles.articleHead}>
            <div className={articleStyles.metaRow}>
              <span className={articleStyles.category}>{category.label}</span>
              <span>업데이트 {formatDate(guide.updatedAt)}</span>
              {guide.editorial.status === "legacy" ? <span>기존 글 재검수 중</span> : <span>편집 검수 완료</span>}
            </div>
            <h1>{guide.title}</h1>
            <p className={articleStyles.description}>{guide.description}</p>
          </header>
          {guide.editorial.status === "legacy" ? (
            <div className={articleStyles.editorialNote}>제품별 공식 사양과 비교 근거를 새 품질 기준에 맞춰 순차 보강하고 있습니다.</div>
          ) : null}
          <div className={articleStyles.articleBody}>
            <MarkdownContent content={guide.content.replace(/^# /gm, "## ")} />
          </div>
          <div className={articleStyles.sourceBox}>
            <strong>자료 확인 기준</strong>
            {guide.editorial.basis} {guide.editorial.caution || ""}
          </div>
        </article>
        {related.length ? (
          <section className={articleStyles.related}>
            <h2>함께 보면 좋은 가이드</h2>
            <div className={articleStyles.relatedGrid}>
              {related.map((item) => <Link href={`/guide/${item.slug}/`} className={articleStyles.relatedLink} key={item.slug}>{item.title}</Link>)}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
