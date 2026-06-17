import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from "next/link";
import { marked } from 'marked';
import db from "../../../lib/db";
import styles from "../post.module.css";

// Remove force-dynamic for SSG
// export const dynamic = 'force-dynamic';

// Generate dynamic SEO metadata including hashtags as keywords
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  const post = stmt.get(resolvedParams.id) as any;
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Remove '#' symbol for HTML meta keywords tag if they start with '#'
  const cleanKeywords = post.hashtags ? post.hashtags.map((tag: string) => tag.replace(/^#/, '')) : [];

  return {
    title: `${post.title} - 아이템몬스터`,
    description: post.content.substring(0, 160),
    keywords: cleanKeywords,
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [post.imageUrl],
    }
  };
}

export async function generateStaticParams() {
  const stmt = db.prepare('SELECT id FROM posts');
  const posts = stmt.all() as { id: string }[];
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isAdmin = false; // SSG page cannot determine admin status server-side. Wait, we can't use Client components here easily without 'use client', but we can just let ProductGrid handle it. Actually, this is the post page. We can just hide the views entirely for everyone since it's SSG.

  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  const postRaw = stmt.get(resolvedParams.id) as any;

  if (!postRaw) {
    notFound();
  }

  const post = {
    ...postRaw,
    additionalImages: postRaw.additionalImages ? JSON.parse(postRaw.additionalImages) : []
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><img src="/icon.png" alt="아이템몬스터 로고" width={32} height={32} style={{ borderRadius: '50%' }} /> 아이템몬스터</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">← 홈으로 돌아가기</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className={styles.category}>{post.category}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.heroImage} style={{ backgroundImage: `url(${post.imageUrl})` }}></div>

        <div className={styles.ftcAlert}>
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </div>

        <div className={styles.adBanner}>
          <a href="https://link.coupang.com/a/exy45HN1I4" target="_blank" rel="noreferrer" referrerPolicy="unsafe-url">
            <img src="https://ads-partners.coupang.com/banners/996779?subId=&traceId=V0-301-879dd1202e5c73b2-I996779&w=728&h=90" alt="오늘의 쿠팡 특가는?" />
          </a>
        </div>

        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }} className={styles.markdownContent} />
        </div>

        {/* SEO 해시태그 렌더링 */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className={styles.hashtags}>
            {post.hashtags.map((tag: string, i: number) => (
              <span key={i} className={styles.tag}>
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}

        <div className={styles.linkCardWrapper}>
          <p className={styles.linkCardHeading}>더 자세한 정보는 아래 링크를 확인하세요.</p>
          <a 
            href={post.coupangLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className={styles.linkCardImg} />
            )}
            <div className={styles.linkCardInfo}>
              <span className={styles.linkCardName}>{post.title}</span>
              <span className={styles.linkCardBrand}>COUPANG</span>
              <span className={styles.linkCardUrl}>link.coupang.com</span>
            </div>
          </a>
        </div>

        {post.coupangIframe && (
          <div 
            className={styles.iframeContainer} 
            dangerouslySetInnerHTML={{ __html: post.coupangIframe }} 
          />
        )}
      </main>

      <footer className={styles.footer}>
        <p>© 2026 아이템몬스터(ItemMonster). All rights reserved.</p>
      </footer>
    </div>
  );
}
