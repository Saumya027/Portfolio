import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Script from "next/script";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saumya Pandey",
  description:
    "Computer Engineering undergraduate at PDEU building scalable software, AI-powered applications, and open source solutions. CGPA 9.64, 300+ LeetCode problems, GSSoC 2026 contributor.",
  keywords: [
    "Saumya Pandey",
    "Full Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "PDEU",
    "Computer Engineering",
    "Open Source",
    "GSSoC",
    "LeetCode",
  ],
  authors: [{ name: "Saumya Pandey", url: "https://github.com/Saumya027" }],
  creator: "Saumya Pandey",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Saumya Pandey — Full-Stack Developer & AI Engineer",
    description:
      "Building Intelligent Software Solutions with Modern Web Technologies. Computer Engineering @ PDEU.",
    siteName: "Saumya Pandey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saumya Pandey — Full-Stack Developer & AI Engineer",
    description: "Building Intelligent Software Solutions with Modern Web Technologies.",
    creator: "@SaumyaP",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saumya Pandey",
  jobTitle: "Full-Stack Developer & AI Engineer",
  description:
    "Computer Engineering undergraduate at PDEU building scalable software and AI-powered applications.",
  url: "https://saumyapandey.dev",
  email: "saumyap0107@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Pandit Deendayal Energy University",
  },
  sameAs: [
    "https://github.com/Saumya027",
    "https://linkedin.com/in/saumya-pandey-747421348",
    "https://leetcode.com/SaumyaP0107",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgressBar />
          <CustomCursor />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
