import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Cursor } from "@/components/cursor";
import { MotionProvider } from "./providers";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Tannia Silva - Maquilladora Profesional",
  description:
    "Portafolio de maquillaje profesional especializado en belleza editorial, comercial y cine. Piel primero, rostros no convencionales, textura real.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${cormorantGaramond.variable} font-sans antialiased`}
      >
        <Cursor />
        <div className="pl-20 md:pl-24">
          <MotionProvider>{children}</MotionProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
