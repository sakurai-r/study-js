import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DateTimeDisplay from "./components/DateTimeDisplay";
import TopButton from "./components/TopButton";
import { PlanProvider } from "./context/PlanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI お出かけプラン",
  description: "AI があなたに最適な旅行プランを提案します",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlanProvider>
          <DateTimeDisplay />
          {children}
          <TopButton />
        </PlanProvider>
      </body>
    </html>
  );
}
