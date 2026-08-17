import type { Metadata } from "next";
import Link from "next/link";
import { COUPANG_PARTNERS_DISCLOSURE } from "../../lib/affiliate";
import { SITE_OPERATOR } from "../../lib/site-info";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import articleStyles from "../article.module.css";
import siteStyles from "../site.module.css";

export const metadata: Metadata = {
  title: "이용약관",
  description: "아이템몬스터 콘텐츠 이용, 제휴 링크와 면책 범위를 안내합니다.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <header className={articleStyles.articleHead}>
          <span className={siteStyles.eyebrow}>사이트 이용 안내</span>
          <h1>이용약관</h1>
          <p className={articleStyles.description}>시행일: 2026년 7월 18일 · 최종 수정: 2026년 8월 18일 · 운영자: {SITE_OPERATOR.name}</p>
        </header>

        <section className={articleStyles.articleSection}>
          <h2>콘텐츠의 성격</h2>
          <div className={articleStyles.markdown}>
            <p>아이템몬스터는 제품 구매 전 확인할 모델·구성·호환성·관리 조건을 정리한 정보 사이트입니다. 직접 사용하지 않은 제품은 사용 후기가 아니며, 공식 자료와 판매 정보는 변경될 수 있습니다.</p>
            <p>글은 일반적인 정보 제공 목적이며, 제품의 성능·가격·재고·배송·교환·A/S 또는 특정 구매 결과를 보장하지 않습니다. 구매 결정과 판매처와의 거래는 이용자와 판매처의 책임으로 진행됩니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>제휴 링크 안내</h2>
          <div className={articleStyles.markdown}>
            <p><strong>{COUPANG_PARTNERS_DISCLOSURE}</strong></p>
            <p>제휴 링크가 있는 글은 고지 문구와 함께 표시합니다. 제휴 여부와 관계없이 모델·옵션·구성의 불확실한 부분은 확인 항목으로 남기며, 결제 전 판매 페이지에서 최신 조건을 다시 확인해야 합니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>콘텐츠 이용과 정정 요청</h2>
          <div className={articleStyles.markdown}>
            <p>본문·사진·상표 등 각 권리의 귀속은 해당 권리자에게 있을 수 있습니다. 출처나 권리 관련 문제가 있거나 정보가 달라졌다면 <Link href="/contact/">문의 및 정정 요청</Link>으로 알려주세요. 확인 후 수정, 비공개 또는 필요한 조치를 검토합니다.</p>
            <p>선택 가이드의 설명 도식은 운영자가 직접 제작합니다. 제휴 상품 글에서 제공 이미지를 사용하는 경우에는 이미지 제공 경로와 출처를 표시하고, 허용 근거를 확인할 수 없는 이미지는 새 글에 사용하지 않습니다.</p>
            <p>이용자는 사이트의 정상적인 운영을 방해하거나 타인의 권리를 침해하는 방식으로 콘텐츠를 이용해서는 안 됩니다.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
