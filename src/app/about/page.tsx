import type { Metadata } from "next";
import Link from "next/link";
import { COUPANG_PARTNERS_DISCLOSURE } from "../../lib/affiliate";
import { SITE_OPERATOR } from "../../lib/site-info";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import articleStyles from "../article.module.css";
import siteStyles from "../site.module.css";

export const metadata: Metadata = {
  title: "아이템몬스터를 만든 이유",
  description: "아이템몬스터 운영자가 제품 정보를 어디까지 확인하고, 직접 사용한 후기와 찾아본 정보를 어떻게 나누는지 소개합니다.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className={siteStyles.shell}>
      <SiteHeader />
      <main className={siteStyles.main}>
        <header className={articleStyles.articleHead}>
          <span className={siteStyles.eyebrow}>이 사이트를 만든 이유</span>
          <h1>광고 문구만 믿고 사기엔<br />좀 찜찜하잖아요.</h1>
          <p className={articleStyles.description}>
            운영자 {SITE_OPERATOR.name}은 제품을 사기 전에 모델명·구성·설치 조건을 다시 확인하는 과정을 기록하려고 아이템몬스터를 만들었습니다. 써보지 않은 제품은 후기처럼 포장하지 않고, 판매 옵션과 제조사 공식 자료에서 확인한 내용만 적습니다.
          </p>
        </header>

        <section className={articleStyles.articleSection}>
          <h2>글을 쓸 때는 이런 순서로 봅니다</h2>
          <div className={articleStyles.markdown}>
            <ol>
              <li>이 제품을 찾는 사람이 제일 궁금한 게 뭔지 먼저 정합니다.</li>
              <li>상품 사진과 제조사 자료에서 실제로 확인되는지 찾아봅니다.</li>
              <li>좋은 점보다 먼저, 누구에게 안 맞을 수 있는지 적습니다.</li>
              <li>크기·구성·호환성처럼 결제하고 후회하기 쉬운 부분을 다시 봅니다.</li>
              <li>가격과 옵션은 바뀌니 마지막 확인은 판매 페이지에서 하도록 남겨 둡니다.</li>
            </ol>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>누가, 어떻게 확인하나요</h2>
          <div className={articleStyles.markdown}>
            <p>글의 작성·검수 책임자는 {SITE_OPERATOR.name}입니다. 판매 옵션의 모델명·색상·구성, 제공 이미지 표기, 제조사 공식 제품·지원 자료가 서로 맞는지 확인한 뒤 공개합니다.</p>
            <p>직접 사용한 제품은 사용 환경과 기간을 함께 밝힙니다. 직접 쓰지 않은 제품은 공식 사양과 구매 전 확인 항목을 정리한 정보 글로 구분하며, 체감 성능이나 실측 결과를 만들어 내지 않습니다.</p>
            <p>오류, 링크 불일치, 권리 관련 문의는 <Link href="/contact/">문의 및 정정 요청 페이지</Link>에서 알려주세요.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>써본 것과 찾아본 것을 섞지 않아요</h2>
          <div className={articleStyles.markdown}>
            <p>직접 사용한 기간과 환경을 보여줄 수 있을 때만 ‘써보니’라고 말합니다. 판매 페이지와 공식 문서를 찾아본 글이라면 그 사실을 글 안에서 분명히 밝힙니다.</p>
            <p>모르는 내용을 그럴듯하게 채우지 않습니다. 실측 온도나 소음, 실제 포획량처럼 직접 확인하지 못한 값은 판매자에게 물어볼 항목으로 남겨 둡니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>자동화 도구는 공개 수량을 늘리는 용도로 쓰지 않습니다</h2>
          <div className={articleStyles.markdown}>
            <p>상품 후보 정리, 문서 형식 통일과 누락 항목 점검에는 자동화 도구를 사용할 수 있습니다. 그러나 같은 문장을 제품명만 바꿔 대량 공개하거나, 확인하지 않은 사양과 사용 경험을 채워 넣는 방식으로 운영하지 않습니다.</p>
            <p>공개 전에는 글마다 검색 의도, 모델 식별 정보, 공식 출처, 이미지 이용 근거와 다른 글과의 문장 중복을 확인합니다. 이 기준을 통과하지 못한 예약 글은 자동 발행하지 않고 비공개 상태로 보관합니다.</p>
          </div>
        </section>

        <section className={articleStyles.articleSection}>
          <h2>쿠팡 링크는 이렇게 씁니다</h2>
          <div className={articleStyles.markdown}>
            <p><strong>{COUPANG_PARTNERS_DISCLOSURE}</strong></p>
            <p>상품 링크가 있는 글 맨 앞에는 위 문구를 그대로 표시합니다. 링크를 눌러 구매하면 수수료를 받을 수 있지만, 그렇다고 단점이나 확인할 내용을 빼지는 않습니다.</p>
          </div>
        </section>

        <div className={articleStyles.sourceBox}>
          <strong>공개 상태 관리</strong>
          모델·옵션·이미지·제조사 공식 자료 중 하나라도 맞지 않거나 근거가 부족한 글은 공개하지 않습니다. 이미 공개된 글도 판매 정보나 공식 자료가 달라지면 다시 확인하거나 검색 노출을 중단합니다.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
