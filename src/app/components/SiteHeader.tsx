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
            <small>사기 전에 한 번 더</small>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/articles/">살까 말까</Link>
          <Link href="/guide/">PC·전자제품</Link>
          <Link href="/about/">이 사이트 소개</Link>
        </nav>
      </div>
    </header>
  );
}
