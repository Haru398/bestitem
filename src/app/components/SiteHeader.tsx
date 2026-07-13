import Image from "next/image";
import Link from "next/link";
import styles from "../site.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="아이템몬스터 홈">
          <Image src="/icon.png" alt="" width={34} height={34} priority />
          <span className={styles.brandName}>
            ITEM.MONSTER
            <small>BUYING CHECK</small>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/articles/">구매 가이드</Link>
          <Link href="/guide/">전문 가이드</Link>
          <Link href="/about/">편집 기준</Link>
        </nav>
      </div>
    </header>
  );
}
