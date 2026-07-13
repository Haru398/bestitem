import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { COUPANG_PARTNERS_DISCLOSURE } from "../../../lib/affiliate";
import { getCategory } from "../../../lib/categories";
import { formatDate, getPost, getPublicPosts } from "../../../lib/content";
import ArticleCard from "../../components/ArticleCard";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getPublicPosts().map((post) => ({ id: post.slug }));
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
    authors: [{ name: "아이템몬스터 운영자" }],
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
    author: { "@type": "Person", name: "아이템몬스터 운영자" },
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
          <span>운영자 메모</span>
        </nav>

        <article>
          <header className={articleStyles.articleHead}>
            <div className={articleStyles.metaRow}>
              <span className={articleStyles.category}>{category.label}</span>
              <span>{formatDate(post.updatedAt)} 다시 확인</span>
              {post.editorial.status === "legacy" ? <span>예전 글 다시 보는 중</span> : <span>판매 자료 확인함</span>}
            </div>
            <h1>{post.title}</h1>
            <p className={articleStyles.description}>{post.description}</p>
          </header>

          <div className={articleStyles.disclosure} role="note" aria-label="쿠팡 파트너스 활동 안내">
            {COUPANG_PARTNERS_DISCLOSURE}
          </div>

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

          {post.verdict ? (
            <section className={articleStyles.verdict} aria-labelledby="quick-verdict">
              <span>한눈에 보면</span>
              <h2 id="quick-verdict">{post.verdict.oneLine}</h2>
              <div className={articleStyles.verdictGrid}>
                <div><strong>이런 분께</strong><ul>{post.verdict.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><strong>이런 경우엔 보류</strong><ul>{post.verdict.notFor.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><strong>결제 전 확인</strong><ul>{post.verdict.checkBeforeBuy.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </section>
          ) : (
            <div className={articleStyles.editorialNote}>
              예전에 올린 글이라 지금 다시 읽고 있어요. 확인이 끝나지 않은 내용은 검색에 나오지 않게 해뒀습니다.
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
                <h2>그래서 이건 누구에게 맞을까?</h2>
                <MarkdownContent content={post.conclusion} />
              </section>
            ) : null}

            {post.faq?.length ? (
              <section className={articleStyles.faq}>
                <h2>사기 전에 궁금했던 것</h2>
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
              <strong>지금 판매 중인 옵션 다시 보기</strong>
              <p>제가 글을 쓴 뒤에도 가격과 구성은 바뀔 수 있어요. 결제 화면에서 수량과 옵션을 한 번 더 봐주세요.</p>
              <a
                href={post.affiliate.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className={articleStyles.ctaButton}
              >
                쿠팡에서 옵션 확인하기
              </a>
            </aside>
          ) : null}

          <div className={articleStyles.sourceBox}>
            <strong>이 글을 쓰면서 확인한 것</strong>
            {post.editorial.basis}
            {post.editorial.caution ? ` ${post.editorial.caution}` : ""}
          </div>
        </article>

        {related.length ? (
          <section className={articleStyles.related}>
            <h2>비슷한 고민으로 찾아본 글</h2>
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
