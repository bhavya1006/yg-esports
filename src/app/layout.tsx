import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YG Esports — Yuva Gabbrus | From Practice to Pro",
  description:
    "India's community-first esports platform. Tier-based Valorant tournaments, free scrims, verified competitive play. Join Yuva Gabbrus and level up.",
  keywords: ["esports", "valorant", "tournament", "india", "yuva gabbrus", "YG", "competitive gaming"],
  icons: {
    icon: "/YG-logo.jpg",
    apple: "/YG-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
