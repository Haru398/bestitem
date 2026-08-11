import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  COUPANG_PARTNERS_DISCLOSURE,
  getSafeCoupangAffiliateHtml,
  getSafeCoupangAffiliateUrl,
} from "../../../lib/affiliate";
import { getCategory } from "../../../lib/categories";
import { formatDate, getAllPosts, getPost, getPublicPosts } from "../../../lib/content";
import { SITE_OPERATOR } from "../../../lib/site-info";
import ArticleCard from "../../components/ArticleCard";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  const posts = process.env.ITEM_MONSTER_LOCAL_PREVIEW === "true"
    ? getAllPosts()
    : getPublicPosts();

  return posts.map((post) => ({ id: post.slug }));
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
    authors: [{ name: SITE_OPERATOR.name, url: "https://item.monster/about/" }],
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
  const officialSources = (post.sources || []).filter(
    (source) => source.sourceType !== "authorized-affiliate" && source.sourceType !== "retailer",
  );
  const showSourceBox = post.editorial.status !== "draft" && Boolean(
    post.editorial.basis || post.editorial.caution || officialSources.length,
  );
  const affiliateUrl = getSafeCoupangAffiliateUrl(post.affiliate.url);
  const affiliateHtml = getSafeCoupangAffiliateHtml(post.affiliate.html);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.heroImage ? new URL(post.heroImage, "https://item.monster").toString() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://item.monster/post/${post.slug}/`,
    author: { "@type": "Person", name: SITE_OPERATOR.name, url: "https://item.monster/about/" },
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
              <span>작성·검수 {SITE_OPERATOR.name}</span>
              {post.editorial.status === "draft" ? (
                <span>검수용 미리보기 · 공개 전</span>
              ) : post.editorial.status === "legacy" ? (
                <span>예전 글 다시 보는 중</span>
              ) : (
                <span>판매 자료 확인함</span>
              )}
            </div>
            <h1>{post.title}</h1>
            <p className={articleStyles.description}>{post.description}</p>
            <div className={articleStyles.authorNote}>
              <strong>작성·검수: {SITE_OPERATOR.name}</strong>
              <span>판매 옵션·제공 이미지·공개된 공식 자료를 대조해 구매 전 확인 항목을 정리합니다.</span>
              <Link href="/about/">운영 기준 보기</Link>
            </div>
          </header>

          {affiliateUrl || affiliateHtml ? (
            <div className={articleStyles.disclosure} role="note" aria-label="쿠팡 파트너스 활동 안내">
              {COUPANG_PARTNERS_DISCLOSURE}
            </div>
          ) : null}

          {post.heroImage ? (
            <figure className={articleStyles.heroFigure}>
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt || `${post.productName || post.title} 대표 이미지`}
                className={articleStyles.heroImage}
                width={1200}
                height={800}
                priority
              />
              {post.heroImageCaption || post.heroImageCredit ? (
                <figcaption>
                  {post.heroImageCaption ? <span>{post.heroImageCaption}</span> : null}
                  {post.heroImageCredit ? (
                    post.heroImageSourceUrl ? <a href={post.heroImageSourceUrl} target="_blank" rel="noreferrer">출처: {post.heroImageCredit}</a> : <small>출처: {post.heroImageCredit}</small>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
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
                    {section.imageCaption || section.imageAlt || section.imageCredit ? (
                      <figcaption>
                        <span>{section.imageCaption || section.imageAlt}</span>
                        {section.imageCredit ? (
                          section.imageSourceUrl ? <a href={section.imageSourceUrl} target="_blank" rel="noreferrer">출처: {section.imageCredit}</a> : <small>출처: {section.imageCredit}</small>
                        ) : null}
                      </figcaption>
                    ) : null}
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

          {showSourceBox ? (
            <div className={articleStyles.sourceBox}>
              <strong>작성 및 확인 기준</strong>
              이 글은 판매 옵션의 모델·구성, 제공 이미지의 표기, 공개된 공식 제품·지원·인증 자료를 대조해 작성했습니다.
              {post.editorial.caution ? ` ${post.editorial.caution}` : ""}
              {officialSources.length ? (
                <ul className={articleStyles.sourceList}>
                  {officialSources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.publisher} — {source.title}</a>
                      <span>확인 {formatDate(source.checkedAt)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {affiliateUrl || affiliateHtml ? (
            <aside className={articleStyles.ctaBox}>
              <strong>판매 옵션과 구성을 마지막으로 확인하세요</strong>
              <p>가격, 재고, 배송 조건과 구성품은 달라질 수 있습니다. 결제 전 모델명·색상·수량을 다시 확인하세요.</p>
              {affiliateUrl ? (
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className={articleStyles.ctaButton}
                >
                  쿠팡에서 현재 옵션 확인하기
                </a>
              ) : null}
              {affiliateHtml ? (
                <div
                  className={articleStyles.affiliateEmbed}
                  aria-label="쿠팡 파트너스 상품 카드"
                  dangerouslySetInnerHTML={{ __html: affiliateHtml }}
                />
              ) : null}
            </aside>
          ) : null}
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
