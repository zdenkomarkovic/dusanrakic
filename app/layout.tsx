import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dušan Rakić - Raka Gegenpresing | Fudbal IQ Trenerska edukacija",
  description:
    "Stručna literatura o fudbalu i trenerskoj edukaciji za modernu igru. Elektronske knjige dostupne za instant download.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "fudbal",
    "trenerska edukacija",
    "fudbal IQ",
    "gegenpressing",
    "taktika fudbala",
    "trenerske knjige",
    "e-knjige o fudbalu",
    "Dušan Rakić",
    "Raka Gegenpresing",
    "Teren & Tabla",
    "trenerski centar",
    "moderna igra",
    "trening fudbala",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
