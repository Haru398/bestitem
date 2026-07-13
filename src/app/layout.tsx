import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://item.monster"),
  title: {
    default: "아이템몬스터 | 사기 전에 확인하는 구매 가이드",
    template: "%s | 아이템몬스터",
  },
  description:
    "장점만 나열하지 않습니다. 사용 환경, 구성, 주의사항과 비추천 조건까지 구매 전에 확인할 내용을 정리합니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "아이템몬스터 | 사기 전에 확인하는 구매 가이드",
    description:
      "제품을 사기 전 확인해야 할 조건과 주의사항을 먼저 정리하는 구매 가이드",
    url: "https://item.monster/",
    siteName: "아이템몬스터",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "-QNGr2v5OMVwT2AUFGIdfWLpyzSVLmBdxO-tYAtkebw",
    other: {
      "naver-site-verification": "e8c86e95433d2791ada1d1475101e508e62e1743",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "아이템몬스터",
  url: "https://item.monster/",
  logo: "https://item.monster/icon.png",
  description: "구매 전에 확인해야 할 조건을 정리하는 상품 정보 가이드",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
