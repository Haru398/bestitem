import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import articleStyles from "../article.module.css";
import siteStyles from "../site.module.css";

export const metadata: Metadata = {
  title: "편집 원칙",
  description: "아이템몬스터가 제품 정보를 확인하고 구매 가이드를 작성하는 기준과 제휴 링크 운영 원칙입니다.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <header className={articleStyles.articleHead}>
          <span className={siteStyles.eyebrow}>EDITORIAL STANDARD</span>
          <h1>좋다고만 말하지 않는<br />구매 가이드를 만듭니다.</h1>
          <p className={articleStyles.description}>
            아이템몬스터는 실제 사용하지 않은 제품을 사용 후기처럼 표현하지 않습니다. 제공된 이미지와 표시 정보에서 확인되는 사실, 구매 판단에 필요한 조건, 확인하지 못한 부분을 구분합니다.
          </p>
        </header>

        <section className={articleStyles.articleSection}>
          <h2>글 한 편이 공개되기 전 확인하는 것</h2>
          <div className={articleStyles.markdown}>
            <ol>
              <li>검색자가 이 글에서 해결하려는 질문이 한 문장으로 분명한가</li>
              <li>사진이나 제공 자료에서 확인되지 않은 기능을 상상해 넣지 않았는가</li>
              <li>장점뿐 아니라 맞지 않는 사용자와 구매 전 확인사항을 제시했는가</li>
              <li>크기, 구성, 규격, 호환성처럼 결제 후 후회하기 쉬운 조건을 확인했는가</li>
              <li>과장 제목, 의학적 단정, 근거 없는 최저가 표현을 제거했는가</li>
            </ol>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>리뷰와 정보 가이드를 구분합니다</h2>
          <div className={articleStyles.markdown}>
            <p>직접 사용한 기간과 환경을 증명할 수 있을 때만 사용 경험을 이야기합니다. 그렇지 않은 글은 상품 정보와 구매 전 체크를 정리한 가이드로 표시합니다.</p>
            <p>가격과 판매 구성은 바뀔 수 있으므로 ‘최저가’라고 단정하지 않고, 연결된 판매 페이지에서 현재 조건을 다시 확인하도록 안내합니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>제휴 링크 운영 원칙</h2>
          <div className={articleStyles.markdown}>
            <p>일부 글에는 쿠팡 파트너스 링크가 포함됩니다. 링크를 통해 구매가 발생하면 일정액의 수수료를 제공받을 수 있습니다.</p>
            <p>제휴 관계는 글 상단과 구매 링크 주변에 표시하며, 링크가 있다는 이유만으로 장점을 과장하지 않습니다.</p>
          </div>
        </section>

        <div className={articleStyles.sourceBox}>
          <strong>기존 글 개선 안내</strong>
          2026년 7월부터 기존 게시물을 새 편집 기준으로 다시 검수하고 있습니다. 검수가 끝나지 않은 글은 공개 목록과 검색엔진 색인에서 제외하며, 기준을 통과한 뒤에만 다시 공개합니다.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
