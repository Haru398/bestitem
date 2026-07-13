import Link from "next/link";
import { CATEGORIES } from "../lib/categories";
import { getAllGuides, getAllPosts } from "../lib/content";
import ArticleCard from "./components/ArticleCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import styles from "./site.module.css";

const FEATURED_SLUGS = [
  "item-mosquito-swatter-1",
  "item-lg-ac-1",
  "item-lg-ultragear-monitor",
];

export default function Home() {
  const posts = getAllPosts();
  const guides = getAllGuides();
  const picked = FEATURED_SLUGS.map((slug) => posts.find((post) => post.slug === slug)).filter(
    Boolean,
  );
  const featured = (picked.length >= 3 ? picked : posts.slice(0, 3)).slice(0, 3);
  const recent = posts.filter((post) => !featured.some((item) => item?.slug === post.slug)).slice(0, 3);
  const visibleGuides = guides.filter((guide) => guide.indexable).slice(0, 3);

  const categoryCounts = new Map<string, number>();
  for (const post of posts) {
    categoryCounts.set(post.category, (categoryCounts.get(post.category) ?? 0) + 1);
  }

  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>BUYING CHECK JOURNAL</span>
            <h1>
              사기 전에,
              <br />딱 <em>3분만.</em>
            </h1>
            <p className={styles.heroLead}>
              광고 문장을 걷어내고 구성, 사용 환경, 주의사항과 비추천 조건을 먼저 확인합니다.
              읽고 나면 “나한테 필요한 제품인지” 판단할 수 있는 글을 만듭니다.
            </p>
            <div className={styles.buttonRow}>
              <Link href="/articles/" className={styles.primaryButton}>
                구매 가이드 보기
              </Link>
              <Link href="/about/" className={styles.secondaryButton}>
                글을 만드는 기준
              </Link>
            </div>
          </div>
          <aside className={styles.proofPanel} aria-label="아이템몬스터 편집 원칙">
            <strong>글마다 이것부터 확인합니다</strong>
            <ul className={styles.proofList}>
              <li><b>01</b><span>누구에게 맞고 누구에게 맞지 않는지</span></li>
              <li><b>02</b><span>사진과 표시 정보에서 확인되는 사실인지</span></li>
              <li><b>03</b><span>구매 전에 놓치기 쉬운 크기·구성·호환 조건</span></li>
              <li><b>04</b><span>제휴 링크와 편집 판단을 명확하게 분리했는지</span></li>
            </ul>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>EDITOR&apos;S CHECK</span>
              <h2>지금 먼저 볼 구매 체크</h2>
              <p>계절가전과 디지털 제품부터 기존 글을 새 기준으로 다시 검수하고 있습니다.</p>
            </div>
            <Link href="/category/home-appliances/" className={styles.textLink}>생활가전 모아보기 →</Link>
          </div>
          <div className={styles.cardGrid}>
            {featured.map((post) => (post ? <ArticleCard post={post} key={post.slug} /> : null))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>TOPIC DESK</span>
              <h2>제품군별로 찾아보기</h2>
              <p>이름이 제각각이던 기존 분류를 구매 판단 기준에 맞춰 정리했습니다.</p>
            </div>
          </div>
          <div className={styles.topicGrid}>
            {CATEGORIES.filter((category) => (categoryCounts.get(category.slug) ?? 0) > 0).map((category) => (
              <Link href={`/category/${category.slug}/`} className={styles.topicCard} key={category.slug}>
                <b>{categoryCounts.get(category.slug)} ARTICLES</b>
                <h3>{category.label}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {visibleGuides.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.eyebrow}>DEEP GUIDE</span>
                <h2>규격과 호환성을 깊게</h2>
                <p>단순 제품 소개보다 선택 기준 자체를 이해해야 하는 주제를 다룹니다.</p>
              </div>
              <Link href="/guide/" className={styles.textLink}>전문 가이드 전체보기 →</Link>
            </div>
            <div className={styles.cardGrid}>
              {visibleGuides.map((guide) => (
                <Link href={`/guide/${guide.slug}/`} className={styles.articleCard} key={guide.slug}>
                  <div className={styles.cardBody}>
                    <span className={styles.statusTag}>전문가이드 · 재검수 중</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span className={styles.cardCta}>선택 기준 확인하기 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>NEWLY ORGANIZED</span>
              <h2>최근 정리한 제품 정보</h2>
            </div>
            <Link href="/articles/" className={styles.textLink}>전체 글 검색 →</Link>
          </div>
          <div className={styles.cardGrid}>
            {recent.map((post) => <ArticleCard post={post} key={post.slug} />)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.standardBanner}>
            <div>
              <h2>좋다고만 말하면 구매 가이드가 아닙니다.</h2>
              <p>확인한 사실, 추정하지 않은 부분, 제휴 관계를 한 페이지 안에서 분명하게 표시합니다.</p>
            </div>
            <Link href="/about/" className={styles.primaryButton}>편집 원칙 읽기</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
