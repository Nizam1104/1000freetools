import "./globals.css";
import { Roboto_Slab, Bebas_Neue } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"], // Only load weight 400 - removed 700 unless needed
  variable: "--font-roboto-slab",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true, // Auto-adjust fallback font metrics
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://1000freetools.com"),
  title: {
    default: "1000 Free Tools - Free Online Web Tools & Utilities",
    template: "%s",
  },
  description:
    "A comprehensive suite of free online tools for file conversion, data processing, audio editing, PDF generation, and more. Fast, secure, and privacy-focused web utilities.",
  keywords: [
    "online tools",
    "web utilities",
    "file converter",
    "PDF tools",
    "audio editor",
    "CSV converter",
    "Excel tools",
    "JSON formatter",
    "hash generator",
    "favicon generator",
    "image tools",
    "data processing",
    "free tools",
    "privacy-focused",
  ],
  authors: [{ name: "1000 Free Tools" }],
  creator: "1000 Free Tools",
  publisher: "1000 Free Tools",
  icons: {
    icon: "/favicon.ico",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://1000freetools.com",
    siteName: "1000 Free Tools",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
  },
  alternates: {
    canonical: "/",  // Root canonical URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${robotoSlab.variable} ${bebasNeue.variable} w-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryLayout>{children}</PrimaryLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
