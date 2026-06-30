import Link from 'next/link';
import db from '../../../../lib/db';
import styles from '../guide.module.css';

export default function GuidePreviewWidget() {
  // Fetch latest 4 guides
  const rawGuides = db.prepare('SELECT id, title, summary, createdAt FROM guides ORDER BY createdAt DESC LIMIT 4').all() as any[];

  if (!rawGuides || rawGuides.length === 0) {
    return null;
  }

  return (
    <div className={styles.previewGrid}>
      {rawGuides.map((guide) => (
        <Link href={`/guide/${guide.id}`} key={guide.id} className={styles.previewCard}>
          <div className={styles.previewContent}>
            <h3>{guide.title}</h3>
            <p>{guide.summary}</p>
            <span className={styles.readMoreText}>가이드 읽기 &rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
