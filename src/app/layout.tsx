import type { Metadata } from "next";
import { Jost, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecondSkinStyle | Premium Sports Apparels",
  description: "Experience the ultimate in performance and style with SecondSkinStyle.",
};

import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${geistMono.variable} antialiased bg-white text-black font-sans`}
      >
        <LanguageProvider>
          <CartProvider>
            <SmoothScroll>
              <Preloader />
              <CustomCursor />
              <GrainOverlay />
              {children}
            </SmoothScroll>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
