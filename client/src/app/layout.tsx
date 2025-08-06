import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouRelate - AI-Powered YouTube Q&A",
  description: "Ask questions about YouTube videos and get intelligent answers powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
