import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matcha",
  description: "Matcha is a social media platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
