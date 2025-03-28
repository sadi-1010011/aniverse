import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aniverse",
  description: "Explore the Anime Verse",
};

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
          <link rel="manifest" href="/public/manifest.json" />
          <link rel="icon" href="/favicon.png" sizes="192x192" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 lg:w-2/5 lg:mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
