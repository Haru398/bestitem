import Image from "next/image";
import Link from "next/link";
import { getPublicGuides, getPublicPosts } from "../lib/content";
import ArticleCard from "./components/ArticleCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import styles from "./site.module.css";

export default function Home() {
  const posts = getPublicPosts();
  const guides = getPublicGuides();
  const featured = posts.slice(0, 3);
  const additional = posts
    .filter((post) => !featured.some((item) => item?.slug === post.slug))
    .slice(0, 3);

  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.wideMain}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>아이템몬스터의 구매 메모</span>
            <h1>
              대충 보고 샀다가
              <br /><em>후회하기 싫어서.</em>
            </h1>
            <p className={styles.heroLead}>
              광고 문구만 보면 다 좋아 보이잖아요. 그래서 사진 속 구성품, 크기, 쓰는 조건과 추가로 드는 돈부터 찾아봅니다.
              직접 써보지 않은 건 후기인 척 쓰지 않고요.
            </p>
            <form className={styles.heroSearch} action="/articles/" method="get" role="search">
              <input
                className={styles.heroSearchInput}
                type="search"
                name="q"
                placeholder="모델명·제품 종류·구매 조건으로 찾아보세요"
                aria-label="글 검색"
              />
              <button className={styles.heroSearchButton} type="submit">
                검색
              </button>
            </form>
            <div className={styles.buttonRow}>
              <Link href="/articles/" className={styles.primaryButton}>
                지금 읽을 만한 글
              </Link>
              <Link href="/about/" className={styles.secondaryButton}>
                누가, 어떻게 쓰나요?
              </Link>
            </div>
          </div>
          <aside className={styles.proofPanel} aria-label="아이템몬스터 운영자 메모">
            <strong>저라면 이건 꼭 보고 사요</strong>
            <ul className={styles.proofList}>
              <li><b>✓</b><span>사진이 정말 같은 상품인지</span></li>
              <li><b>✓</b><span>옵션을 바꾸면 뭐가 빠지는지</span></li>
              <li><b>✓</b><span>내가 쓰려는 공간과 상황에 맞는지</span></li>
              <li><b>✓</b><span>사고 나서 돈이 더 들지는 않는지</span></li>
            </ul>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>최근 다시 확인한 구매 메모</span>
              <h2>공식 자료로 다시 확인한 제품</h2>
              <p>계절성 문구로 묶지 않고, 모델·구성·설치 조건을 다시 확인한 제품만 모았습니다.</p>
            </div>
            <Link href="/articles/" className={styles.textLink}>쓴 글 전부 보기 →</Link>
          </div>
          <div className={styles.cardGrid}>
            {featured.map((post) => (post ? <ArticleCard post={post} key={post.slug} /> : null))}
          </div>
        </section>

        {guides.length > 0 ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.eyebrow}>제품명보다 먼저 볼 것</span>
                <h2>뭘 사야 할지부터 헷갈린다면</h2>
                <p>바로 상품부터 고르지 말고, 어떤 방식이 내 상황에 맞는지 먼저 비교해 봅니다.</p>
              </div>
              <Link href="/guide/" className={styles.textLink}>정리한 내용 더 보기 →</Link>
            </div>
            <div className={styles.cardGrid}>
              {guides.slice(0, 3).map((guide) => (
                <Link href={`/guide/${guide.slug}/`} className={styles.articleCard} key={guide.slug}>
                  {guide.heroImage ? <Image src={guide.heroImage} alt={guide.heroImageAlt || ""} className={styles.cardImage} width={640} height={400} /> : null}
                  <div className={styles.cardBody}>
                    <span className={styles.tag}>{guide.category === "digital-pc" ? "제조사 자료 찾아봄" : "종류부터 비교해 봄"}</span>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <span className={styles.cardCta}>이어서 읽기 →</span>
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
                <span className={styles.eyebrow}>이것도 같이 봤어요</span>
                <h2>다른 구매 메모</h2>
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
              <h2>제품을 고르기 전, 확인할 기준부터 정리합니다.</h2>
              <p>모델·구성·설치·관리처럼 결제 전에 놓치기 쉬운 내용을 공식 자료를 바탕으로 정리합니다.</p>
            </div>
            <Link href="/about/" className={styles.primaryButton}>운영 기준 보기</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
