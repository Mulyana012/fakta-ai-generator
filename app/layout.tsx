import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fakta AI Generator",
  description: "Generator konten fakta unik dengan AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
