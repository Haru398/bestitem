import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../../lib/categories";
import { formatDate, getGuide, getPublicGuides } from "../../../lib/content";
import MarkdownContent from "../../components/MarkdownContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import articleStyles from "../../article.module.css";
import siteStyles from "../../site.module.css";

type Props = { params: Promise<{ id: string }> };

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
          <Link href="/">홈</Link><span>›</span><Link href="/guide/">PC·전자제품</Link><span>›</span><span>{category.shortLabel}</span>
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
          {supportingMedia.length ? (
            <section className={articleStyles.guideMediaSection} aria-labelledby="guide-product-media">
              <div className={articleStyles.guideMediaHead}>
                <div>
                  <span>사진으로 모델 확인</span>
                  <h2 id="guide-product-media">제품명만 보지 말고 보드 생김새도 같이 보세요</h2>
                </div>
                <p>아래 사진은 설명에 사용한 실제 제품 예시입니다. 비슷한 이름의 Wi-Fi 모델과 구성 차이를 캡션에서 구분했습니다.</p>
              </div>
              <div className={articleStyles.guideMediaGrid}>
                {supportingMedia.map((media) => (
                  <figure className={articleStyles.guideMediaCard} key={media.path}>
                    <a className={articleStyles.guideMediaVisual} href={media.path} target="_blank" rel="noreferrer" aria-label={`${media.caption} 원본 이미지 열기`}>
                      <Image
                        src={media.path}
                        alt={media.alt}
                        width={1200}
                        height={900}
                        className={media.display === "detail-top" ? articleStyles.guideMediaDetailTop : articleStyles.guideMediaContain}
                      />
                    </a>
                    <figcaption>
                      <strong>{media.caption}</strong>
                      <span>{media.creator}</span>
                      {media.sourceUrl ? <a href={media.sourceUrl} target="_blank" rel="noreferrer">출처 페이지</a> : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {hasAffiliateMedia ? (
                <p className={articleStyles.guideMediaDisclosure}>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
              ) : null}
            </section>
          ) : null}
          {guide.editorial.status === "legacy" ? (
            <div className={articleStyles.editorialNote}>예전에 만든 글이라 자료부터 다시 보고 있어요. 확인이 끝난 글만 검색에 나오게 해뒀습니다.</div>
          ) : null}
          <div className={articleStyles.articleBody}>
            <MarkdownContent content={guide.content.replace(/^# /gm, "## ")} />
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
