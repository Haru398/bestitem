import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "아이템몬스터 | 세상의 모든 꿀템 리뷰 & 특가 정보",
  description: "광고에 속지 마세요! 가전, 생활용품, 다이어트 식품 등 에디터가 직접 선별한 진짜 베스트 아이템과 실시간 쿠팡 특가 정보를 제공합니다.",
  referrer: "no-referrer",
  verification: {
    google: "-QNGr2v5OMVwT2AUFGIdfWLpyzSVLmBdxO-tYAtkebw",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>

        {children}
      </body>
    </html>
  );
}
