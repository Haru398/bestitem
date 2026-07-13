import Image from "next/image";
import Link from "next/link";
import { getPublicGuides, getPublicPosts } from "../lib/content";
import ArticleCard from "./components/ArticleCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import styles from "./site.module.css";

const FEATURED_SLUGS = [
  "item-mosquito-swatter-1",
  "item-cesco-fly-stick",
  "item-f-killer-light-trap",
];

export default function Home() {
  const posts = getPublicPosts();
  const guides = getPublicGuides();
  const selected = FEATURED_SLUGS.map((slug) => posts.find((post) => post.slug === slug)).filter(
    Boolean,
  );
  const featured = (selected.length ? selected : posts).slice(0, 3);
  const additional = posts
    .filter((post) => !featured.some((item) => item?.slug === post.slug))
    .slice(0, 3);

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
              상품을 많이 진열하는 대신, 지금 사려는 사람이 실제로 확인해야 할 구성과 사용 조건을 정리합니다.
              장점뿐 아니라 맞지 않는 경우까지 읽고 구매 여부를 판단하세요.
            </p>
            <div className={styles.buttonRow}>
              <Link href="/articles/" className={styles.primaryButton}>
                검수 완료 가이드 보기
              </Link>
              <Link href="/about/" className={styles.secondaryButton}>
                글을 만드는 기준
              </Link>
            </div>
          </div>
          <aside className={styles.proofPanel} aria-label="아이템몬스터 편집 원칙">
            <strong>공개 전에 네 가지를 확인합니다</strong>
            <ul className={styles.proofList}>
              <li><b>01</b><span>제품 사진과 상품이 정확히 일치하는지</span></li>
              <li><b>02</b><span>판매 자료에서 확인된 사실과 추정을 구분했는지</span></li>
              <li><b>03</b><span>잘 맞는 사람과 사지 않는 편이 나은 사람은 누구인지</span></li>
              <li><b>04</b><span>설치·안전·호환성과 추가 비용을 빠뜨리지 않았는지</span></li>
            </ul>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>SEASONAL BUYING CHECK</span>
              <h2>지금 검색이 늘어나는 여름 문제부터</h2>
              <p>모기와 초파리처럼 해결 방식이 다른 제품을 한데 묶지 않고, 작동 방식과 설치 조건별로 나눠 확인합니다.</p>
            </div>
            <Link href="/articles/" className={styles.textLink}>검수 완료 글 전체보기 →</Link>
          </div>
          <div className={styles.cardGrid}>
            {featured.map((post) => (post ? <ArticleCard post={post} key={post.slug} /> : null))}
          </div>
        </section>

        {guides.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.eyebrow}>SEARCH FIRST, PRODUCT SECOND</span>
                <h2>제품보다 먼저, 어떤 방식이 맞는지</h2>
                <p>검색 단계에서는 유형을 비교하고, 결정 단계에서 조건에 맞는 제품 글로 이어집니다.</p>
              </div>
              <Link href="/guide/" className={styles.textLink}>선택 가이드 전체보기 →</Link>
            </div>
            <div className={styles.cardGrid}>
              {guides.slice(0, 3).map((guide) => (
                <Link href={`/guide/${guide.slug}/`} className={styles.articleCard} key={guide.slug}>
                  {guide.heroImage ? <Image src={guide.heroImage} alt={guide.heroImageAlt || ""} className={styles.cardImage} width={640} height={400} /> : null}
                  <div className={styles.cardBody}>
                    <span className={styles.tag}>{guide.category === "digital-pc" ? "공식 사양 전문 가이드" : "유형 비교 가이드"}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span className={styles.cardCta}>먼저 선택 기준 확인하기 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {additional.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.eyebrow}>MORE CHECKED</span>
                <h2>다른 검수 완료 가이드</h2>
              </div>
            </div>
            <div className={styles.cardGrid}>
              {additional.map((post) => <ArticleCard post={post} key={post.slug} />)}
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <div className={styles.standardBanner}>
            <div>
              <h2>글 수보다 구매 판단에 도움 되는가를 먼저 봅니다.</h2>
              <p>검수하지 않은 이전 글은 공개 목록과 검색 노출에서 제외하고, 근거를 확인한 글만 다시 공개합니다.</p>
            </div>
            <Link href="/about/" className={styles.primaryButton}>편집 원칙 읽기</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
