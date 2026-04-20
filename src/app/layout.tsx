import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nong Geng Ji - Authentic Hunan Cuisine in Vancouver",
  description: "Experience the authentic taste of Hunan cuisine at Nong Geng Ji in Vancouver. Traditional flavors, modern atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <main className="min-h-screen bg-white">
          {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
