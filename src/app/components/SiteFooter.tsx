import Link from "next/link";
import { COUPANG_PARTNERS_DISCLOSURE } from "../../lib/affiliate";
import { SITE_OPERATOR } from "../../lib/site-info";
import styles from "../site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <strong>ITEM.MONSTER</strong>
          운영자 {SITE_OPERATOR.name}이 제품의 모델·구성·사용 조건을 확인해 적는 구매 전 정보 사이트입니다.
          <br />판매 옵션과 공개된 공식 자료를 대조하고, 확인하지 못한 내용은 단정하지 않습니다.
          <br />© 2026 ItemMonster.
        </div>
        <div>
          <strong>쿠팡 파트너스 활동 안내</strong>
          일부 상품 글에 제휴 링크가 있으며 해당 글 본문에 <q>{COUPANG_PARTNERS_DISCLOSURE}</q> 문구를 표시합니다.
          이번 선택 가이드처럼 제휴 링크가 없는 정보 글도 구분해 운영합니다.
        </div>
        <div className={styles.footerLinks}>
          <strong>운영 정보</strong>
          <Link href="/about/">운영 기준</Link>
          <Link href="/contact/">문의 및 정정 요청</Link>
          <Link href="/privacy/">개인정보처리방침</Link>
          <Link href="/terms/">이용약관</Link>
          <a href="/rss.xml">최신 글 RSS</a>
          <a href={SITE_OPERATOR.contactHref}>운영자 이메일</a>
        </div>
      </div>
    </footer>
  );
}
