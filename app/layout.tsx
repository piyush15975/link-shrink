import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Link Shrink - Smart URL Shortener",
    template: "%s | Link Shrink",
  },
  description:
    "Link Shrink is a fast and reliable URL shortener that makes sharing links simple, clean, and effective.",
  manifest: "/manifest.json",
  keywords: [
    "link shrink",
    "url shortener",
    "short links",
    "custom short links",
    "tinyurl alternative",
    "bitly alternative",
  ],
  authors: [{ name: "Piyush Mishra" }],
  creator: "Piyush Mishra",
  publisher: "Link Shrink",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://link-shrink-eta.vercel.app/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
