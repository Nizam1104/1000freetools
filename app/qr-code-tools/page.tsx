import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";

const qrCodeTools = [
  {
    name: "Bulk QR Code Generator",
    description: "Generate hundreds of QR codes at once from CSV or text",
    href: "/qr-code-tools/bulk-qr-code-generator",
  },
  {
    name: "Dynamic QR Code Generator",
    description: "Create editable QR codes that can be updated after printing",
    href: "/qr-code-tools/dynamic-qr-code-generator",
  },
  {
    name: "QR Code Analytics Tracker",
    description: "Track scans and analytics for your QR codes",
    href: "/qr-code-tools/qr-code-analytics-tracker",
  },
  {
    name: "QR Code App Store",
    description: "Generate QR codes linking to app store pages",
    href: "/qr-code-tools/qr-code-app-store",
  },
  {
    name: "QR Code Augmented Reality",
    description: "Create AR-enabled QR codes for immersive experiences",
    href: "/qr-code-tools/qr-code-augmented-reality",
  },
  {
    name: "QR Code Calendar Event",
    description: "Generate QR codes that add events to calendars",
    href: "/qr-code-tools/qr-code-calendar-event",
  },
  {
    name: "QR Code Color Picker",
    description: "Customize QR code colors to match your brand",
    href: "/qr-code-tools/qr-code-color-picker",
  },
  {
    name: "QR Code Coupon Generator",
    description: "Create QR codes for discounts and promotional offers",
    href: "/qr-code-tools/qr-code-coupon-generator",
  },
  {
    name: "QR Code Crypto Address",
    description: "Generate QR codes for cryptocurrency wallet addresses",
    href: "/qr-code-tools/qr-code-crypto-address",
  },
  {
    name: "QR Code Document Download",
    description: "Create QR codes that link to downloadable documents",
    href: "/qr-code-tools/qr-code-document-download",
  },
  {
    name: "QR Code Email Generator",
    description: "Generate QR codes that open pre-filled email drafts",
    href: "/qr-code-tools/qr-code-email-generator",
  },
  {
    name: "QR Code Error Correction",
    description: "Adjust error correction levels for damaged QR codes",
    href: "/qr-code-tools/qr-code-error-correction",
  },
  {
    name: "QR Code Event Ticket",
    description: "Create QR codes for event tickets and admission",
    href: "/qr-code-tools/qr-code-event-ticket",
  },
  {
    name: "QR Code Feedback Form",
    description: "Generate QR codes linking to surveys and feedback forms",
    href: "/qr-code-tools/qr-code-feedback-form",
  },
  {
    name: "QR Code File Size Optimizer",
    description: "Optimize QR code size for different use cases",
    href: "/qr-code-tools/qr-code-file-size-optimizer",
  },
  {
    name: "QR Code for Crypto Payment",
    description: "Create payment QR codes for cryptocurrency transactions",
    href: "/qr-code-tools/qr-code-for-crypto-payment",
  },
  {
    name: "QR Code for PDF",
    description: "Generate QR codes that link to PDF documents",
    href: "/qr-code-tools/qr-code-for-pdf",
  },
  {
    name: "QR Code for WiFi",
    description: "Create QR codes for automatic WiFi network connection",
    href: "/qr-code-tools/qr-code-for-wifi",
  },
  {
    name: "QR Code for WhatsApp",
    description: "Generate QR codes for WhatsApp contacts or messages",
    href: "/qr-code-tools/qr-code-for-whatsapp",
  },
  {
    name: "QR Code Frame/Border Designer",
    description: "Add custom frames and borders to QR codes",
    href: "/qr-code-tools/qr-code-frame-border-designer",
  },
  {
    name: "QR Code Generator",
    description: "Create standard QR codes from URLs, text, or contact info",
    href: "/qr-code-tools/qr-code-generator",
  },
  {
    name: "QR Code Google Maps",
    description: "Generate QR codes for Google Maps locations",
    href: "/qr-code-tools/qr-code-google-maps",
  },
  {
    name: "QR Code Link Shortener",
    description: "Shorten URLs before generating QR codes",
    href: "/qr-code-tools/qr-code-link-shortener",
  },
  {
    name: "QR Code PayPal",
    description: "Create QR codes for PayPal payments",
    href: "/qr-code-tools/qr-code-paypal",
  },
  {
    name: "QR Code Phone Call",
    description: "Generate QR codes that initiate phone calls",
    href: "/qr-code-tools/qr-code-phone-call",
  },
  {
    name: "QR Code Restaurant Menu",
    description: "Create QR codes for digital restaurant menus",
    href: "/qr-code-tools/qr-code-restaurant-menu",
  },
  {
    name: "QR Code Scanner",
    description: "Scan QR codes from images or camera",
    href: "/qr-code-tools/qr-code-scanner",
  },
  {
    name: "QR Code SMS Generator",
    description: "Generate QR codes that send pre-filled SMS messages",
    href: "/qr-code-tools/qr-code-sms-generator",
  },
  {
    name: "QR Code Social Media",
    description: "Create QR codes for social media profiles",
    href: "/qr-code-tools/qr-code-social-media",
  },
  {
    name: "QR Code Spotify",
    description: "Generate QR codes for Spotify songs and playlists",
    href: "/qr-code-tools/qr-code-spotify",
  },
  {
    name: "QR Code to PDF",
    description: "Export QR codes to printable PDF documents",
    href: "/qr-code-tools/qr-code-to-pdf",
  },
  {
    name: "QR Code to Text Decoder",
    description: "Extract text data from QR code images",
    href: "/qr-code-tools/qr-code-to-text-decoder",
  },
  {
    name: "QR Code vCard Generator",
    description: "Create QR codes with contact information (vCard)",
    href: "/qr-code-tools/qr-code-vcard-generator",
  },
  {
    name: "QR Code with Logo Generator",
    description: "Add logos and branding to QR codes",
    href: "/qr-code-tools/qr-code-with-logo-generator",
  },
  {
    name: "QR Code YouTube",
    description: "Generate QR codes linking to YouTube videos",
    href: "/qr-code-tools/qr-code-youtube",
  },
];

export const metadata: Metadata = {
  title: "Free QR Code Tools Online - 35 QR Code Generators & Scanners",
  description:
    "Free online QR code tools for generating, scanning, and customizing QR codes. WiFi, vCard, URL, crypto, PayPal QR codes and more. All tools run in your browser.",
  openGraph: {
    title: "Free QR Code Tools Online - 35 QR Code Generators & Scanners",
    description:
      "Free online QR code tools for generating, scanning, and customizing QR codes. WiFi, vCard, URL, crypto, PayPal QR codes and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/qr-code-tools",
  },
};

export default function QrCodeToolsPage() {
  const faqsData = [
    {
      question: "Are these QR code tools really free?",
      answer:
        "Yes. All 35 QR code tools are completely free — no registration, no paywalls, no usage limits. Generate and scan as many QR codes as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your QR code data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What QR code formats are supported?",
      answer:
        "Tools support standard QR Code (Model 2), Micro QR Code, and various data types including URLs, text, vCards, WiFi credentials, calendar events, and cryptocurrency addresses.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Can I customize QR code colors and add logos?",
      answer:
        "Yes. QR Code Color Picker lets you customize foreground and background colors. QR Code with Logo Generator adds your brand logo to the center. QR Code Frame/Border Designer adds decorative frames.",
    },
    {
      question: "Do dynamic QR codes really work?",
      answer:
        "Dynamic QR codes redirect through a service that can be updated. Our tool generates the QR code, but you'll need a redirect service for true dynamic functionality.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free QR Code Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online QR code tools for generating, scanning, and customizing QR codes.
              WiFi, vCard, URL, crypto, PayPal — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={qrCodeTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Barcode Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our barcode tools for 1D barcode generators and scanners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/barcode-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Barcode Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These QR Code Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 35 free QR code tools that run entirely in your browser. No software installation, no subscriptions, no watermarks. You enter data, customize appearance, and generate QR codes instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: generating standard QR codes (URLs, text, contact info), creating specialized QR codes (WiFi, payments, events, social media), customizing QR code appearance (colors, logos, frames), and scanning/decoding QR codes from images or camera.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your data (URL, text, contact info, etc.)</li>
              <li>Choose QR code type and customize appearance</li>
              <li>Preview the QR code and test scan</li>
              <li>Download as PNG, SVG, or PDF</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Restaurants and cafes</strong> create QR codes for digital menus, WiFi access, payment links, and customer feedback forms.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Event organizers</strong> generate QR codes for tickets, calendar invites, venue maps, and contactless check-in.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Small businesses</strong> create QR codes for business cards (vCard), social media profiles, product pages, and promotional coupons.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Crypto users</strong> generate QR codes for wallet addresses, payment requests, and exchange links.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Standard QR Generation</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Generator creates basic QR codes from URLs, text, or contact information. Bulk QR Code Generator processes CSV files for hundreds of codes at once.
            </p>

            <h3 className="text-xl font-semibold mb-3">Communication QR Codes</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Email Generator creates mailto: links. QR Code SMS Generator pre-fills text messages. QR Code Phone Call initiates calls. QR Code for WhatsApp opens chats. QR Code vCard Generator shares contact information.
            </p>

            <h3 className="text-xl font-semibold mb-3">Payment & Commerce</h3>
            <p className="text-muted-foreground mb-4">
              QR Code PayPal generates payment links. QR Code for Crypto Payment creates wallet address QR codes. QR Code Coupon Generator makes discount codes. QR Code Restaurant Menu displays digital menus.
            </p>

            <h3 className="text-xl font-semibold mb-3">Location & Navigation</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Google Maps links to specific locations. QR Code App Store directs to iOS/Android app pages. QR Code YouTube links to videos. QR Code Spotify shares music.
            </p>

            <h3 className="text-xl font-semibold mb-3">Events & Calendar</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Calendar Event adds events to calendars. QR Code Event Ticket handles admission. QR Code Feedback Form collects responses.
            </p>

            <h3 className="text-xl font-semibold mb-3">Customization</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Color Picker changes colors. QR Code with Logo Generator adds branding. QR Code Frame/Border Designer adds decorative elements. QR Code File Size Optimizer adjusts for print or screen.
            </p>

            <h3 className="text-xl font-semibold mb-3">Scanning & Decoding</h3>
            <p className="text-muted-foreground mb-4">
              QR Code Scanner reads codes from camera or images. QR Code to Text Decoder extracts data. QR Code to PDF exports for printing.
            </p>

            <h3 className="text-xl font-semibold mb-3">Advanced Features</h3>
            <p className="text-muted-foreground mb-4">
              Dynamic QR Code Generator creates editable codes. QR Code Analytics Tracker monitors scans. QR Code Error Correction adjusts damage tolerance. QR Code Augmented Reality adds AR experiences. QR Code Link Shortener reduces URL length.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>QR code size:</strong> More data = denser QR codes. Keep URLs short for better scannability. Use link shorteners for long URLs.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Error correction:</strong> Higher error correction allows logo overlay but increases code density. Balance based on your use case.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Color contrast:</strong> Ensure sufficient contrast between foreground and background. Dark on light works best for scanning.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Dynamic QR codes:</strong> True dynamic QR codes require a redirect service. Our tool generates the code, but you need external hosting for editability.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              QR code tools often mean paid generators with monthly subscriptions, watermarked exports, or limited scans. But QR codes should be free and simple. You need a WiFi QR code for your cafe, a vCard for your business cards, or a payment QR code for your side hustle. These tools exist because QR codes are a standard — generating them shouldn't cost money or require an account. Everything runs in your browser — no watermarks, no limits, no catch.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
