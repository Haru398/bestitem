import { COUPANG_PARTNERS_DISCLOSURE } from "../../lib/affiliate";
import styles from "../site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>ITEM.MONSTER</strong>
          뭔가 사기 전에 제가 궁금했던 것들을 하나씩 찾아 적습니다.
          <br />써보지 않은 제품은 후기인 척하지 않고, 모르는 건 모른다고 씁니다.
          <br />© 2026 ItemMonster.
        </div>
        <div>
          <strong>쿠팡 파트너스 활동 안내</strong>
          {COUPANG_PARTNERS_DISCLOSURE}
          제휴 링크가 있어도 장점만 골라 쓰지는 않습니다.
        </div>
      </div>
    </footer>
  );
}
