import type { Metadata } from "next";
import { SITE_OPERATOR } from "../../lib/site-info";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import articleStyles from "../article.module.css";
import siteStyles from "../site.module.css";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "아이템몬스터의 문의 처리와 광고·쿠키 관련 개인정보 처리 방침입니다.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <header className={articleStyles.articleHead}>
          <span className={siteStyles.eyebrow}>개인정보 보호</span>
          <h1>개인정보처리방침</h1>
          <p className={articleStyles.description}>시행일: 2026년 7월 18일 · 운영자: {SITE_OPERATOR.name}</p>
        </header>

        <section className={articleStyles.articleSection}>
          <h2>수집하는 정보와 이용 목적</h2>
          <div className={articleStyles.markdown}>
            <p>아이템몬스터는 회원가입이나 직접 결제 기능을 운영하지 않습니다. 다만 이메일로 문의를 보내는 경우 발신자 이메일 주소와 문의 내용이 전달될 수 있으며, 오류 정정·권리 요청·답변을 위해서만 사용합니다.</p>
            <p>서버 로그, 보안·오류 진단, 방문 통계 도구 또는 광고 서비스가 사용되는 경우 기기 정보, IP 주소, 브라우저·쿠키 식별자와 이용 기록이 처리될 수 있습니다. 해당 정보는 서비스 운영, 보안, 통계와 광고 제공 목적에 한해 사용됩니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>쿠키와 제3자 광고</h2>
          <div className={articleStyles.markdown}>
            <p>광고 서비스가 제공되는 경우 Google을 포함한 제3자가 쿠키, 웹 비콘, IP 주소 또는 유사 기술을 사용해 광고를 제공하고 측정할 수 있습니다. 이 정보는 관심 기반 광고, 광고 빈도 관리, 성과 측정에 사용될 수 있습니다.</p>
            <p>브라우저 설정에서 쿠키를 제한하거나 삭제할 수 있습니다. 쿠키를 제한하면 일부 기능이나 광고 개인화 방식이 달라질 수 있습니다. Google의 데이터 사용 방식은 Google의 파트너 사이트·앱 데이터 안내에서 확인할 수 있습니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>보관·제공·문의</h2>
          <div className={articleStyles.markdown}>
            <p>문의 정보는 답변과 분쟁·권리 요청 처리에 필요한 기간 동안만 보관한 뒤 삭제합니다. 법령상 보관 의무가 있는 경우에는 그 기간을 따릅니다. 운영자는 개인정보를 판매하지 않으며, 법령상 요구되거나 서비스 제공에 필요한 경우 외에는 제3자에게 제공하지 않습니다.</p>
            <p>개인정보 처리와 관련한 문의, 열람·정정·삭제 요청은 <a href={SITE_OPERATOR.contactHref}>{SITE_OPERATOR.email}</a>로 보내주세요.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
