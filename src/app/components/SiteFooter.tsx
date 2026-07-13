import styles from "../site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>ITEM.MONSTER</strong>
          구매 전에 확인해야 할 조건을 먼저 정리하는 상품 정보 가이드입니다.
          <br />© 2026 ItemMonster.
        </div>
        <div>
          <strong>제휴 링크 안내</strong>
          일부 링크를 통해 구매가 발생하면 일정액의 수수료를 제공받을 수 있습니다.
          링크 여부와 관계없이 확인 기준과 주의사항을 먼저 제시합니다.
        </div>
      </div>
    </footer>
  );
}
