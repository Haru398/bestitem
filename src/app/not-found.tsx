import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/404/",
  },
};

export default function NotFound() {
  return (
    <main>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 존재하지 않는 페이지입니다.</p>
    </main>
  );
}
