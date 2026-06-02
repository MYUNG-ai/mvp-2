import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/layout/QueryProvider";

export const metadata: Metadata = {
  title: "myung.ai — 나를 비추는 클론",
  description: "사주를 기반으로 나를 비추는 클론을 만들어, 일상의 고민을 구조화하고 선택을 돕는 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
