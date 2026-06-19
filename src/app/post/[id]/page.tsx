import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from "next/link";
import { marked } from 'marked';
import db from "../../../lib/db";
import styles from "../post.module.css";

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const stmt = db.prepare('SELECT * FROM posts_v2 WHERE postId = ?');
  const post = stmt.get(resolvedParams.id) as any;
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} - 아이템몬스터`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.thumbnail],
    }
  };
}

export async function generateStaticParams() {
  const stmt = db.prepare("SELECT postId FROM posts_v2");
  const posts = stmt.all() as { postId: string }[];
  return posts.map((post) => ({
    id: post.postId,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  // Post 정보 가져오기
  const postStmt = db.prepare('SELECT * FROM posts_v2 WHERE postId = ?');
  const post = postStmt.get(resolvedParams.id) as any;

  if (!post) {
    notFound();
  }

  // Sections 가져오기
  const secStmt = db.prepare('SELECT * FROM post_sections WHERE postId = ? ORDER BY sectionOrder ASC');
  const sections = secStmt.all(resolvedParams.id) as any[];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/icon.png" alt="아이템몬스터 로고" width={32} height={32} style={{ borderRadius: '50%' }} /> 아이템몬스터
          </Link>
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
        
        {post.thumbnail && (
          <div className={styles.heroImage} style={{ backgroundImage: `url(${post.thumbnail})` }}></div>
        )}

        <div className={styles.ftcAlert}>
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </div>

        <div className={styles.adBanner}>
          <a href="https://link.coupang.com/a/exy45HN1I4" target="_blank" rel="noreferrer" referrerPolicy="unsafe-url">
            <img src="https://ads-partners.coupang.com/banners/996779?subId=&traceId=V0-301-879dd1202e5c73b2-I996779&w=728&h=90" alt="오늘의 쿠팡 특가는?" />
          </a>
        </div>

        <div className={styles.content}>
          {/* 도입부 */}
          {post.intro && (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(post.intro) }} className={styles.markdownContent} />
          )}

          {/* 이미지 + 설명 섹션들 */}
          {sections.map(sec => (
            <div key={sec.id} style={{ marginBottom: '2rem' }}>
              {sec.image && (
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <img src={sec.image} alt={sec.imageAlt || `이미지 ${sec.sectionOrder}`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                </div>
              )}
              {sec.text && (
                <div dangerouslySetInnerHTML={{ __html: marked.parse(sec.text) }} className={styles.markdownContent} />
              )}
            </div>
          ))}

          {/* 마무리 */}
          {post.outro && (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(post.outro) }} className={styles.markdownContent} />
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href={post.coupangLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block', padding: '16px 40px', background: '#346aff', 
              color: 'white', fontWeight: 'bold', fontSize: '1.2rem', borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            최저가 확인하기
          </a>
        </div>

        <div className={styles.linkCardWrapper}>
          <p className={styles.linkCardHeading}>더 자세한 정보는 아래 링크를 확인하세요.</p>
          <a 
            href={post.coupangLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            {post.thumbnail && (
              <img src={post.thumbnail} alt={post.title} className={styles.linkCardImg} />
            )}
            <div className={styles.linkCardInfo}>
              <span className={styles.linkCardName}>{post.title}</span>
              <span className={styles.linkCardBrand}>COUPANG</span>
              <span className={styles.linkCardUrl}>link.coupang.com</span>
            </div>
          </a>
        </div>

        {post.coupangHtml && (
          <div 
            className={styles.iframeContainer} 
            dangerouslySetInnerHTML={{ __html: post.coupangHtml }} 
          />
        )}
      </main>

      <footer className={styles.footer}>
        <p>© 2026 아이템몬스터(ItemMonster). All rights reserved.</p>
      </footer>
    </div>
  );
}
