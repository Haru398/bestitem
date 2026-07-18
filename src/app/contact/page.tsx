import type { Metadata } from "next";
import Link from "next/link";
import { SITE_OPERATOR } from "../../lib/site-info";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import articleStyles from "../article.module.css";
import siteStyles from "../site.module.css";

export const metadata: Metadata = {
  title: "문의 및 정정 요청",
  description: "아이템몬스터의 제품 정보, 링크, 이미지 출처 또는 권리 관련 문의 방법을 안내합니다.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <header className={articleStyles.articleHead}>
          <span className={siteStyles.eyebrow}>운영자에게 연락하기</span>
          <h1>문의 및 정정 요청</h1>
          <p className={articleStyles.description}>제품 정보의 오류, 링크 불일치, 이미지·저작권 관련 요청은 아래 이메일로 알려주세요. 확인 가능한 근거를 함께 보내주시면 더 정확하게 검토할 수 있습니다.</p>
        </header>

        <section className={articleStyles.articleSection}>
          <h2>연락처</h2>
          <div className={articleStyles.markdown}>
            <p><strong>운영자:</strong> {SITE_OPERATOR.name}<br /><strong>이메일:</strong> <a href={SITE_OPERATOR.contactHref}>{SITE_OPERATOR.email}</a></p>
            <p>문의에는 해당 페이지 주소, 제품 모델명 또는 문제로 본 부분을 적어주세요. 주문번호, 결제수단 정보, 주민등록번호 같은 민감한 개인정보는 보내지 마세요.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>이런 요청을 확인합니다</h2>
          <div className={articleStyles.markdown}>
            <ul>
              <li>모델명·색상·구성품·공식 사양의 오류 또는 판매 링크 불일치</li>
              <li>이미지 출처, 저작권 또는 상표 관련 정정·삭제 요청</li>
              <li>끊어진 링크, 접근성 문제, 오탈자와 페이지 이용 관련 의견</li>
              <li>제휴 고지나 운영 기준에 관한 문의</li>
            </ul>
            <p>가격, 재고, 배송·교환 조건과 주문 처리는 판매처가 관리합니다. 주문·결제·배송 문제는 결제한 판매처 고객센터에 문의해 주세요.</p>
          </div>
        </section>

        <div className={articleStyles.sourceBox}>
          <strong>운영 기준도 확인해 주세요</strong>
          제품 글은 직접 사용 후기와 공식 자료 기반 정보 글을 구분합니다. 자세한 기준은 <Link href="/about/">운영 기준</Link>에서 확인할 수 있습니다.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
