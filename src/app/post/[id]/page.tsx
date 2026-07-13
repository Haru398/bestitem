import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../../lib/categories";
import { formatDate, getAllPosts, getPost, getPublicPosts } from "../../../lib/content";
import ArticleCard from "../../components/ArticleCard";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(id);
  if (!post) return { title: "글을 찾을 수 없습니다" };

  const image = post.heroImage
    ? new URL(post.heroImage, "https://item.monster").toString()
    : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/post/${post.slug}/` },
    authors: [{ name: "아이템몬스터 편집팀" }],
    robots:
      post.indexable && post.editorial.status === "reviewed"
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/post/${post.slug}/`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = getPublicPosts()
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.heroImage ? new URL(post.heroImage, "https://item.monster").toString() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://item.monster/post/${post.slug}/`,
    author: { "@type": "Organization", name: "아이템몬스터 편집팀" },
    publisher: {
      "@type": "Organization",
      name: "아이템몬스터",
      logo: { "@type": "ImageObject", url: "https://item.monster/icon.png" },
    },
  };

  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <nav className={siteStyles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link><span>›</span>
          <Link href={`/category/${category.slug}/`}>{category.label}</Link><span>›</span>
          <span>구매 체크</span>
        </nav>

        <article>
          <header className={articleStyles.articleHead}>
            <div className={articleStyles.metaRow}>
              <span className={articleStyles.category}>{category.label}</span>
              <span>업데이트 {formatDate(post.updatedAt)}</span>
              {post.editorial.status === "legacy" ? <span>기존 글 재검수 중</span> : <span>편집 검수 완료</span>}
            </div>
            <h1>{post.title}</h1>
            <p className={articleStyles.description}>{post.description}</p>
          </header>

          {post.heroImage ? (
            <Image
              src={post.heroImage}
              alt={`${post.productName || post.title} 대표 이미지`}
              className={articleStyles.heroImage}
              width={1200}
              height={800}
              priority
            />
          ) : null}

          <div className={articleStyles.disclosure}>
            이 글에는 쿠팡 파트너스 제휴 링크가 포함될 수 있으며, 구매가 발생하면 일정액의 수수료를 제공받습니다.
          </div>

          {post.verdict ? (
            <section className={articleStyles.verdict} aria-labelledby="quick-verdict">
              <span>QUICK VERDICT</span>
              <h2 id="quick-verdict">{post.verdict.oneLine}</h2>
              <div className={articleStyles.verdictGrid}>
                <div><strong>이런 분께</strong><ul>{post.verdict.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><strong>이런 경우엔 보류</strong><ul>{post.verdict.notFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><strong>결제 전 확인</strong><ul>{post.verdict.checkBeforeBuy.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </section>
          ) : (
            <div className={articleStyles.editorialNote}>
              이 글은 기존 자료를 새 편집 기준으로 옮긴 버전입니다. 과장 표현과 제품별 사실을 순차적으로 다시 확인하고 있습니다.
            </div>
          )}

          <div className={articleStyles.articleBody}>
            <MarkdownContent content={post.intro} />
            {post.sections.map((section, index) => (
              <section className={articleStyles.articleSection} key={`${section.heading}-${index}`}>
                <h2>{section.heading}</h2>
                {section.image ? (
                  <figure className={articleStyles.figure}>
                    <Image
                      src={section.image}
                      alt={section.imageAlt || `${post.title} 상세 이미지`}
                      width={1200}
                      height={1200}
                      loading="lazy"
                    />
                    {section.imageAlt ? <figcaption>{section.imageAlt}</figcaption> : null}
                  </figure>
                ) : null}
                <MarkdownContent content={section.body} />
              </section>
            ))}

            {post.conclusion ? (
              <section className={articleStyles.conclusion}>
                <h2>그래서, 어떤 경우에 맞을까?</h2>
                <MarkdownContent content={post.conclusion} />
              </section>
            ) : null}

            {post.faq?.length ? (
              <section className={articleStyles.faq}>
                <h2>구매 전에 많이 묻는 질문</h2>
                {post.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </section>
            ) : null}
          </div>

          {post.affiliate.url ? (
            <aside className={articleStyles.ctaBox}>
              <strong>현재 판매 구성과 옵션을 확인하세요</strong>
              <p>가격과 구성은 수시로 바뀔 수 있으므로 결제 화면에서 마지막으로 확인하는 것이 안전합니다.</p>
              <a
                href={post.affiliate.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className={articleStyles.ctaButton}
              >
                쿠팡에서 현재 구성 확인
              </a>
            </aside>
          ) : null}

          <div className={articleStyles.sourceBox}>
            <strong>자료 확인 기준</strong>
            {post.editorial.basis}
            {post.editorial.caution ? ` ${post.editorial.caution}` : ""}
          </div>
        </article>

        {related.length ? (
          <section className={articleStyles.related}>
            <h2>같은 기준으로 더 보기</h2>
            <div className={siteStyles.cardGrid}>
              {related.map((item) => <ArticleCard post={item} key={item.slug} />)}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
