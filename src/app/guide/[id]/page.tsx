import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../../lib/categories";
import { formatDate, getGuide, getPublicGuides } from "../../../lib/content";
import type { GuideMedia } from "../../../lib/content-types";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

function splitGuideSections(content: string) {
  return content
    .replace(/^# /gm, "## ")
    .split(/\n(?=## )/)
    .map((section) => ({
      heading: section.match(/^## (.+)$/m)?.[1]?.trim(),
      content: section.trim(),
    }))
    .filter((section) => section.content);
}

function guideMediaClass(display: GuideMedia["display"]) {
  if (display === "detail-top") return articleStyles.guideMediaDetailTop;
  if (display === "detail-upper") return articleStyles.guideMediaDetailUpper;
  if (display === "detail-middle") return articleStyles.guideMediaDetailMiddle;
  if (display === "detail-lower") return articleStyles.guideMediaDetailLower;
  if (display === "detail-bottom") return articleStyles.guideMediaDetailBottom;
  return articleStyles.guideMediaContain;
}

export function generateStaticParams() {
  return getPublicGuides().map((guide) => ({ id: guide.slug }));
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
      images: guide.heroImage ? [{ url: guide.heroImage, alt: guide.heroImageAlt || guide.title }] : undefined,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { id } = await params;
  const guide = getGuide(id);
  if (!guide) notFound();
  const category = getCategory(guide.category);
  const related = getPublicGuides().filter((item) => guide.related.includes(item.slug)).slice(0, 4);
  const heroMedia = guide.media?.find((item) => item.path === guide.heroImage);
  const supportingMedia = guide.media?.filter((item) => item.path !== guide.heroImage) || [];
  const hasAffiliateMedia = supportingMedia.some((item) => item.usageBasis === "authorized-affiliate");
  const contentSections = splitGuideSections(guide.content);
  const isPcGuide = guide.category === "digital-pc";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: `https://item.monster/guide/${guide.slug}/`,
    author: { "@type": "Person", name: "아이템몬스터 운영자" },
    publisher: { "@type": "Organization", name: "아이템몬스터" },
    image: guide.heroImage ? `https://item.monster${guide.heroImage}` : undefined,
    citation: guide.sources?.map((source) => source.url),
  };

  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <nav className={siteStyles.breadcrumb} aria-label="현재 위치">
          <Link href="/">홈</Link><span>›</span>
          {isPcGuide ? <Link href="/guide/">PC·전자제품</Link> : <Link href="/articles/">생활용품 구매 메모</Link>}
          <span>›</span><span>{category.shortLabel}</span>
        </nav>
        <article>
          <header className={articleStyles.articleHead}>
            <div className={articleStyles.metaRow}>
              <span className={articleStyles.category}>{category.label}</span>
              <span>{formatDate(guide.updatedAt)} 다시 확인</span>
              {guide.editorial.status === "legacy" ? <span>예전 글 다시 보는 중</span> : <span>공식 자료 확인함</span>}
            </div>
            <h1>{guide.title}</h1>
            <p className={articleStyles.description}>{guide.description}</p>
          </header>
          {guide.heroImage ? (
            <figure className={articleStyles.guideHero}>
              <Image src={guide.heroImage} alt={guide.heroImageAlt || guide.title} width={1600} height={900} priority />
              {heroMedia ? (
                <figcaption>
                  {heroMedia.caption} · 만든 사람: {heroMedia.creator}
                  {heroMedia.sourceUrl ? <> · <a href={heroMedia.sourceUrl} target="_blank" rel="noreferrer">사진 출처와 이용 조건</a></> : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
          {guide.editorial.status === "legacy" ? (
            <div className={articleStyles.editorialNote}>예전에 만든 글이라 자료부터 다시 보고 있어요. 확인이 끝난 글만 검색에 나오게 해뒀습니다.</div>
          ) : null}
          {hasAffiliateMedia ? (
            <p className={articleStyles.guideMediaDisclosure}>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
          ) : null}
          <div className={articleStyles.articleBody}>
            {contentSections.map((section, sectionIndex) => {
              const sectionMedia = supportingMedia.filter((media) =>
                media.placement ? media.placement === section.heading : sectionIndex === 0,
              );
              return (
                <section className={articleStyles.guideReadingSection} key={section.heading || `intro-${sectionIndex}`}>
                  <MarkdownContent content={section.content} />
                  {sectionMedia.map((media, mediaIndex) => (
                    <figure className={articleStyles.guideInlineFigure} key={`${media.path}-${media.placement || mediaIndex}-${media.caption}`}>
                      <a className={articleStyles.guideInlineVisual} href={media.path} target="_blank" rel="noreferrer" aria-label={`${media.caption} 원본 이미지 열기`}>
                        <Image
                          src={media.path}
                          alt={media.alt}
                          width={1400}
                          height={900}
                          className={guideMediaClass(media.display)}
                        />
                      </a>
                      <figcaption>
                        <div>
                          <span>사진에서 볼 것</span>
                          <strong>{media.caption}</strong>
                        </div>
                        <div className={articleStyles.guideMediaCredit}>
                          <small>{media.creator}</small>
                          {media.sourceUrl ? <a href={media.sourceUrl} target="_blank" rel="noreferrer">사진 출처</a> : null}
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </section>
              );
            })}
          </div>
          <div className={articleStyles.sourceBox}>
            <strong>이 글을 쓰면서 펼쳐본 자료</strong>
            {guide.editorial.basis} {guide.editorial.caution || ""}
            {guide.sources?.length ? (
              <ul className={articleStyles.sourceList}>
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">{source.publisher} — {source.title}</a>
                    <span>확인 {formatDate(source.checkedAt)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
        {related.length ? (
          <section className={articleStyles.related}>
            <h2>이어서 보면 좋은 글</h2>
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
