import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://item.monster"),
  title: {
    default: "아이템몬스터 | 사기 전에 한 번 더 찾아보는 곳",
    template: "%s | 아이템몬스터",
  },
  description:
    "광고 문구만 보고 사기 찜찜할 때, 구성품·설치 조건·호환성과 추가 비용을 먼저 찾아보는 개인 구매 메모입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "아이템몬스터 | 사기 전에 한 번 더 찾아보는 곳",
    description:
      "광고보다 구성과 조건을 먼저 찾아보는 아이템몬스터 운영자의 구매 메모",
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
  description: "사기 전에 궁금한 구성과 조건을 찾아 적는 개인 구매 메모",
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
