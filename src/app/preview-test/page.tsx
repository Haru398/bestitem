import React from 'react';
import styles from '../post/post.module.css';

export default function PreviewPage() {
  const post = {
    id: "preview",
    category: "생활용품",
    title: "[강력 추천] 우리 집 욕실의 품격을 높여주는 깨끗한나라 순수 시그니처 천연펄프 3겹 롤화장지 완벽 리뷰",
    content: "테스트 내용...",
    imageUrl: "/uploads/real_blue_tissue_1.jpg",
    coupangIframe: `<iframe src="https://coupa.ng/cnrbdg" width="120" height="240" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>`
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><img src="/icon.png" alt="아이템몬스터 로고" width={32} height={32} style={{ borderRadius: '50%' }} /> 아이템몬스터</div>
      </header>
      <main className={styles.main}>
        <span className={styles.category}>{post.category}</span>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.heroImage} style={{ backgroundImage: `url(${post.imageUrl})` }}></div>
        <div className={styles.content}>
          <p>{post.content}</p>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 아이템몬스터(ItemMonster) - Preview Mode</p>
      </footer>
    </div>
  );
}
