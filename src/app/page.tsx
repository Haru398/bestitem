import ProductGrid from "./ProductGrid";
import LoginButton from "./components/LoginButton";
import styles from "./page.module.css";
import db from "../lib/db";
import Link from "next/link";
import { Suspense } from "react";
import GuidePreviewWidget from "./guide/components/GuidePreviewWidget";

export default function Home() {
  const rawPosts = db.prepare('SELECT * FROM posts_v2 ORDER BY createdAt DESC').all() as any[];
  const posts = rawPosts.map(p => ({
    id: p.postId,
    category: p.category || '생활용품',
    title: p.title,
    content: p.summary || '',
    imageUrl: p.thumbnail || '',
    views: 0
  }));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><img src="/icon.png" alt="아이템몬스터 로고" width={32} height={32} style={{ borderRadius: '50%' }} /> 아이템몬스터</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">홈</Link>
          <Link href="/?category=가전%2F디지털">가전/디지털</Link>
          <Link href="/?category=생활용품">생활용품</Link>
          <Link href="/?category=홈%2F유아">가구인테리어</Link>
          <Link href="/guide" style={{ fontWeight: 'bold', color: '#2563eb' }}>전문가이드</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>광고 없는 진짜 리뷰<br/>가장 확실한 선택</h1>
          <p>에디터가 직접 선별한 베스트 아이템을 만나보세요.</p>
        </section>

        <section style={{ maxWidth: '1200px', margin: '0 auto 4rem', padding: '0 0%' }}>
          <div className={styles.sectionHeader}>
            <h2 style={{ fontSize: '1.5rem', color: '#1e293b' }}>📚 오늘의 전문가이드</h2>
          </div>
          <GuidePreviewWidget />
        </section>

        <section className={styles.recentReviews}>
          <div className={styles.sectionHeader}>
            <h2>🔥 실시간 인기 특가 & 리뷰</h2>
          </div>
          <Suspense fallback={<div>로딩중...</div>}>
            <ProductGrid posts={posts} />
          </Suspense>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 아이템몬스터(ItemMonster). All rights reserved.</p>
        <LoginButton />
      </footer>
    </div>
  );
}
