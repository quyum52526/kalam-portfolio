import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  Space_Grotesk,
  Noto_Sans_Bengali,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingDock } from "@/components/FloatingDock";

const fontDisplay = Plus_Jakarta_Sans({
  variable: "--next-font-display",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--next-font-body",
  subsets: ["latin"],
});

const fontAccent = Space_Grotesk({
  variable: "--next-font-accent",
  subsets: ["latin"],
});

const fontBangla = Noto_Sans_Bengali({
  variable: "--next-font-bangla",
  subsets: ["bengali", "latin"],
});

export const siteUrl = "https://kalamcreative.com";
const defaultTitle = "Abu Kalam — Motion Designer & Creative Developer";
const defaultDescription =
  "Portfolio of Abu Kalam Khandaker | Motion Graphics, AI Video & Interactive Frontend";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Abu Kalam",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    siteName: "Abu Kalam",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontAccent.variable} ${fontBangla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
