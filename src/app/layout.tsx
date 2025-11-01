import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UmweltBank - Gamified Financial Learning",
  description: "Learn about sustainable finance and green investing through interactive quizzes and gamification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
