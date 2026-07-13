import type { Metadata } from "next";
import { COUPANG_PARTNERS_DISCLOSURE } from "../../lib/affiliate";
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
            저도 뭔가 사려면 검색창과 상품 페이지를 몇 번씩 오갑니다. 그때마다 다시 찾기 아까웠던 내용들을 한곳에 모으려고 아이템몬스터를 만들었습니다. 써보지 않은 제품은 후기처럼 포장하지 않고, 사진과 공식 자료에서 확인한 내용만 적습니다.
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
          <h2>써본 것과 찾아본 것을 섞지 않아요</h2>
          <div className={articleStyles.markdown}>
            <p>직접 사용한 기간과 환경을 보여줄 수 있을 때만 ‘써보니’라고 말합니다. 판매 페이지와 공식 문서를 찾아본 글이라면 그 사실을 글 안에서 분명히 밝힙니다.</p>
            <p>모르는 내용을 그럴듯하게 채우지 않습니다. 실측 온도나 소음, 실제 포획량처럼 직접 확인하지 못한 값은 판매자에게 물어볼 항목으로 남겨 둡니다.</p>
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
          <strong>예전에 만든 글은 잠시 숨겨 뒀어요</strong>
          자동으로 만들어진 티가 나거나 출처가 애매한 글은 검색에 나오지 않게 해뒀습니다. 하나씩 자료를 다시 확인하고, 사람이 읽기 편한 말로 고친 뒤에만 다시 공개합니다.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
