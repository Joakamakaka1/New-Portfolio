import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jcvstro.dev"),
  title: {
    default: "Joaquin Castro — Developer",
    template: "%s | Joaquin Castro",
  },
  description: "Portfolio de Joaquin Castro Salas, desarrollador fullstack.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://jcvstro.dev",
    title: "Joaquin Castro — Developer",
    description: "Portfolio de Joaquin Castro Salas, desarrollador fullstack.",
    siteName: "jcvstro.dev",
    images: [
      {
        url: "/Foto1.png",
        width: 1200,
        height: 630,
        alt: "Joaquin Castro — Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joaquin Castro — Developer",
    description: "Portfolio de Joaquin Castro Salas, desarrollador fullstack.",
    images: ["/Foto1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full overflow-hidden bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col md:flex-row h-full overflow-hidden text-gray-800 bg-white select-none`}
      >
        {/* Left Sidebar Layout */}
        <Sidebar />

        {/* Right Content Layout */}
        <div className="flex flex-col flex-1 h-full overflow-hidden relative bg-white">
          <Header />

          <main className="flex-1 overflow-hidden relative px-6 md:px-16 pb-16 md:pb-2 flex flex-col pt-4 md:pt-6">
            {children}
          </main>

          <Analytics />

          <Footer />
        </div>
      </body>
    </html>
  );
}
