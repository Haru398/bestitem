import Link from 'next/link';
import db from '../../../lib/db';
import styles from '../guide.module.css';

export default function GuidePreviewWidget() {
  // 전체 가이드 가져오기
  const allGuides = db.prepare('SELECT id, title, summary, createdAt FROM guides ORDER BY createdAt ASC').all() as any[];

  if (!allGuides || allGuides.length === 0) {
    return null;
  }

  // 날짜 기반 로테이션: 오늘 날짜(년+월+일)를 숫자로 변환해 offset 계산
  const today = new Date();
  const dayNumber = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const offset = dayNumber % allGuides.length;

  // 오늘의 시작점부터 최대 4개 선택 (순환)
  const rotated: typeof allGuides = [];
  for (let i = 0; i < Math.min(4, allGuides.length); i++) {
    rotated.push(allGuides[(offset + i) % allGuides.length]);
  }

  return (
    <div className={styles.previewGrid}>
      {rotated.map((guide) => (
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
