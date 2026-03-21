import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Barcode, ArrowRight } from "lucide-react";

const barcodeTools = [
  {
    name: "Barcode Color Inverter",
    description: "Invert barcode colors for better scanning contrast",
    href: "/barcode-tools/barcode-color-inverter",
  },
  {
    name: "Barcode Comparison",
    description: "Compare two barcodes side by side to spot differences",
    href: "/barcode-tools/barcode-comparison",
  },
  {
    name: "Barcode Data Encoder",
    description: "Encode data into various barcode formats",
    href: "/barcode-tools/barcode-data-encoder",
  },
  {
    name: "Barcode Font Encoder",
    description: "Convert text to barcode using barcode fonts",
    href: "/barcode-tools/barcode-font-encoder",
  },
  {
    name: "Barcode Generator",
    description: "Generate barcodes in multiple formats (UPC, EAN, Code 128, QR)",
    href: "/barcode-tools/barcode-generator",
  },
  {
    name: "Barcode Image Resizer",
    description: "Resize barcode images while maintaining aspect ratio",
    href: "/barcode-tools/barcode-image-resizer",
  },
  {
    name: "Barcode Lookup",
    description: "Look up product information by barcode number",
    href: "/barcode-tools/barcode-lookup",
  },
  {
    name: "Barcode Repair",
    description: "Fix damaged or poorly printed barcodes",
    href: "/barcode-tools/barcode-repair",
  },
  {
    name: "Barcode Scanner",
    description: "Scan barcodes from uploaded images using your camera",
    href: "/barcode-tools/barcode-scanner",
  },
  {
    name: "Barcode Sequence Generator",
    description: "Generate sequential barcode numbers in bulk",
    href: "/barcode-tools/barcode-sequence-generator",
  },
  {
    name: "Barcode to Base64",
    description: "Convert barcode images to Base64 encoded strings",
    href: "/barcode-tools/barcode-to-base64",
  },
  {
    name: "Barcode to CSV",
    description: "Export scanned barcode data to CSV format",
    href: "/barcode-tools/barcode-to-csv",
  },
  {
    name: "Barcode to PDF",
    description: "Generate printable PDF sheets with barcodes",
    href: "/barcode-tools/barcode-to-pdf",
  },
  {
    name: "Barcode to Text Converter",
    description: "Extract text data from barcode images",
    href: "/barcode-tools/barcode-to-text-converter",
  },
  {
    name: "Barcode Validator",
    description: "Validate barcode checksums and format compliance",
    href: "/barcode-tools/barcode-validator",
  },
  {
    name: "Barcode Verification",
    description: "Verify barcode quality and scannability",
    href: "/barcode-tools/barcode-verification",
  },
  {
    name: "Bulk Barcode Generator",
    description: "Generate hundreds of barcodes at once from CSV or text",
    href: "/barcode-tools/bulk-barcode-generator",
  },
  {
    name: "Inventory Template Generator",
    description: "Create printable inventory labels with barcodes",
    href: "/barcode-tools/inventory-template-generator",
  },
  {
    name: "ISBN Barcode Generator",
    description: "Generate ISBN-10 and ISBN-13 barcodes for books",
    href: "/barcode-tools/isbn-barcode-generator",
  },
  {
    name: "QR Code Analytics Generator",
    description: "Create QR codes with tracking parameters and analytics",
    href: "/barcode-tools/qr-code-analytics-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Barcode Tools Online - 20 Barcode Generator & Scanner Tools",
  description:
    "Free online barcode tools for generating, scanning, and validating barcodes. Create UPC, EAN, Code 128, QR codes, and more. All tools run in your browser.",
  openGraph: {
    title: "Free Barcode Tools Online - 20 Barcode Generator & Scanner Tools",
    description:
      "Free online barcode tools for generating, scanning, and validating barcodes. Create UPC, EAN, Code 128, QR codes, and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/barcode-tools",
  },
};

export default function BarcodeToolsPage() {
  const faqsData = [
    {
      question: "Are these barcode tools really free?",
      answer:
        "Yes. All 20 barcode tools are completely free — no registration, no paywalls, no usage limits. Generate and scan as many barcodes as you need.",
    },
    {
      question: "Is my barcode data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your barcode images and data never leave your device or get uploaded to any server.",
    },
    {
      question: "What barcode formats are supported?",
      answer:
        "Tools support major 1D formats (UPC-A, UPC-E, EAN-8, EAN-13, Code 39, Code 128, ITF) and 2D formats (QR Code, Data Matrix, PDF417, Aztec).",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Can I scan barcodes from my phone camera?",
      answer:
        "Yes. The Barcode Scanner tool accesses your device camera (with permission) to scan barcodes in real-time, just like a dedicated scanner app.",
    },
    {
      question: "How do I print barcodes at the correct size?",
      answer:
        "Use the Barcode to PDF tool for print-ready output. Barcodes are generated at standard sizes that meet retail and shipping requirements.",
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
              <Barcode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Barcode Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online barcode tools for generating, scanning, and validating barcodes.
              Create UPC, EAN, Code 128, QR codes, and more — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={barcodeTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Label Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our QR code tools for more 2D barcode options, or explore all available tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/qr-code-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                QR Code Tools
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
              What These Barcode Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 20 free barcode tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter data or upload an image, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: generating barcodes from text or data, scanning barcodes from images or camera, validating and verifying barcode quality, and converting barcodes between formats (images, Base64, CSV, PDF).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your product number, URL, or text data</li>
              <li>Select the barcode format (UPC, EAN, Code 128, QR, etc.)</li>
              <li>Adjust size, color, or output format if needed</li>
              <li>Download the barcode as PNG, SVG, or PDF</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              For scanning tools, upload an image or allow camera access. Everything happens client-side using JavaScript libraries like QuaggaJS for scanning and JsBarcode for generation.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Retail businesses</strong> generate UPC and EAN barcodes for product labeling, create price tags, or verify supplier barcodes meet retail standards.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Warehouse and logistics teams</strong> print shipping labels with Code 128 or ITF barcodes, scan incoming packages, or generate sequential barcode batches for inventory tracking.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Libraries and schools</strong> create ISBN barcodes for books, generate student ID barcodes, or scan materials for checkout systems.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Event organizers</strong> generate ticket barcodes, create attendee badges with QR codes, or scan tickets at entry points using the camera-based scanner.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Barcode Generation</h3>
            <p className="text-muted-foreground mb-4">
              Barcode Generator creates barcodes in multiple formats from text input. Bulk Barcode Generator processes CSV files or text lists to produce hundreds of barcodes at once. ISBN Barcode Generator handles ISBN-10 and ISBN-13 formats with proper checksum calculation. Inventory Template Generator produces printable label sheets with barcodes and product information.
            </p>

            <h3 className="text-xl font-semibold mb-3">Barcode Scanning</h3>
            <p className="text-muted-foreground mb-4">
              Barcode Scanner uses your device camera to read barcodes in real-time, supporting both 1D and 2D formats. Barcode to Text Converter extracts data from uploaded barcode images. Barcode Lookup queries product databases using barcode numbers to retrieve product information.
            </p>

            <h3 className="text-xl font-semibold mb-3">Validation and Quality</h3>
            <p className="text-muted-foreground mb-4">
              Barcode Validator checks checksum digits and format compliance for UPC, EAN, and other standards. Barcode Verification analyzes barcode quality metrics like contrast, quiet zones, and element width to ensure scannability. Barcode Repair attempts to fix damaged or poorly printed barcodes using image processing.
            </p>

            <h3 className="text-xl font-semibold mb-3">Format Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Barcode to Base64 encodes barcode images as Base64 strings for embedding in HTML or JSON. Barcode to CSV exports scanned barcode data to spreadsheet format. Barcode to PDF generates print-ready PDF documents with barcodes arranged for label printers.
            </p>

            <h3 className="text-xl font-semibold mb-3">Image Editing</h3>
            <p className="text-muted-foreground mb-4">
              Barcode Color Inverter swaps foreground and background colors to improve contrast for difficult scanning scenarios. Barcode Image Resizer adjusts barcode dimensions while maintaining the aspect ratio required for scannability. Barcode Comparison displays two barcodes side by side to spot visual differences.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Tools</h3>
            <p className="text-muted-foreground mb-4">
              Barcode Sequence Generator creates sequential barcode numbers for batch labeling. Barcode Data Encoder formats data according to specific barcode symbology rules. Barcode Font Encoder converts text to barcode using barcode fonts for custom layouts. QR Code Analytics Generator adds tracking parameters to QR codes for campaign measurement.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Barcode size:</strong> Retail barcodes have minimum size requirements (typically 80% magnification minimum). Very small barcodes may not scan reliably.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Print quality:</strong> Laser printers produce sharper barcodes than inkjet. Always test-print and scan before mass production.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Camera scanning:</strong> Lighting and focus affect scan success. Ensure barcodes are well-lit and held steady.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Format compatibility:</strong> Not all scanners read all formats. Verify your scanner supports the barcode type you're generating.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Barcodes remain the backbone of retail, logistics, and inventory management. But barcode software often costs hundreds of dollars or requires subscriptions. These tools exist because you shouldn't need expensive software to generate a few product barcodes, scan a package, or verify a supplier's barcode meets standards. Everything runs in your browser — no installation, no watermarks, no paywalls.
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
