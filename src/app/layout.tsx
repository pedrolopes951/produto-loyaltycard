import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoyaltyCard — Cartão de Fidelidade Digital",
  description:
    "Substitua os cartões de carimbos de papel por fidelização digital. Sem app. Sem papel. Só resultados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
