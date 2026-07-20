import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eyamazimela.vercel.app"),
  title: "Eyamazimela Pty Ltd — Premium Events, Catering & Décor | Hammarsdale",
  description:
    "Eyamazimela Pty Ltd brings government-grade event execution to private celebrations across KwaZulu-Natal — premium catering, elegant décor, custom cakes and professional media. We strive in making your special day perfect.",
  keywords: [
    "Eyamazimela",
    "event planning Hammarsdale",
    "catering KwaZulu-Natal",
    "event decor KZN",
    "custom cakes Mpumalanga Township",
    "event photography Durban",
  ],
  openGraph: {
    title: "Eyamazimela Pty Ltd — Premium Events & Catering",
    description:
      "Government-grade event execution for private celebrations in KwaZulu-Natal. Catering, décor, cakes and media.",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = {
  themeColor: "#082B20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
