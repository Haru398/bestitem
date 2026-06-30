import Link from 'next/link';
import db from '../../lib/db';
import styles from './guide.module.css';

export const metadata = {
  title: '전문가이드 | 아이템몬스터',
  description: '검색자들의 다양한 궁금증과 문제를 해결해 주는 ITEM.MONSTER의 전문 정보 가이드 모음입니다.',
};

export default function GuideIndexPage() {
  const rawGuides = db.prepare('SELECT id, title, summary, createdAt FROM guides ORDER BY createdAt DESC').all() as any[];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>전문가이드</h1>
      <p className={styles.summary} style={{ borderBottom: 'none' }}>
        원하는 정보를 찾고 문제를 해결하세요. 제품 구매에 필요한 실질적인 정보와 가이드를 제공합니다.
      </p>

      <div className={styles.previewGrid}>
        {rawGuides.map(guide => (
          <Link href={`/guide/${guide.id}`} key={guide.id} className={styles.previewCard}>
            <div className={styles.previewContent}>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <span className={styles.readMoreText}>자세히 보기 &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
