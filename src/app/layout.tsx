import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSIP Research Procurement Portal",
  description: "A documentation-first research peptide experience designed for qualified laboratories and research buyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#F5F5F7] scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col text-[#111111]`}>
        <Navigation />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
