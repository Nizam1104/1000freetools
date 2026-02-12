import type { Metadata } from "next";
import FaviconGeneratorComponent from "@/components/design-tools/favicon/FaviconGenerator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Image from "next/image";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

// more tools
const tools = [
  {
    toolName: "Image Compressor",
    toolDescription: "Compress images to reduce file size",
    toolLink: "/image-tools/image-compressor",
  },
];

export const metadata: Metadata = {
  title: "Free Favicon Generator - Favicon from Text, Image & Emoji",
  description:
    "Create professional favicons instantly with our free online favicon generator. Convert text, image, or emoji to favicon. Download in all formats",
  openGraph: {
    title: "Free Favicon Generator - Create Custom Favicons Online",
    description:
      "Generate professional favicons from text, images, or emojis. Free online tool with custom colors, fonts, and instant download in all formats.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Favicon Generator - Create Custom Favicons Online",
    description:
      "Generate professional favicons from text, images, or emojis. Free online tool with custom colors, fonts, and instant download.",
  },
  alternates: {
    canonical: "https://1000freetools.com/design-tools/favicon-generator",
  },
};

export default function FaviconGeneratorPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-tools">Design Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-tools/favicon-generator">
                Favicon Generator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* SEO-optimized Hero Section */}
      <section className="container mx-auto px-4 py-8 ">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free Favicon Generator - Create Custom Favicons Online
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Create professional favicons in seconds. Convert text, images, or
            emojis into the perfect website icon. Open source, privacy-friendly,
            and free.
          </p>
        </div>
      </section>

      {/* Main Tool Component */}
      <FaviconGeneratorComponent />

      <section className="container mx-auto px-1 md:px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Features Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Features of Favicon Generator</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Text to Favicon</strong>
                  <span className="text-muted-foreground">Turn letters into icons with custom fonts, colors, and shapes.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Image Converter</strong>
                  <span className="text-muted-foreground">Convert PNG, JPG, or SVG logos into pixel-perfect favicons.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Emoji Support</strong>
                  <span className="text-muted-foreground">Create fun, expressive icons using the standard emoji library.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Complete Package</strong>
                  <span className="text-muted-foreground">Get .ico for legacy browsers and high-res .png for iOS/Android.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Why Choose Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Choose This Favicon Maker</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">100% Free & Open</strong>
                  <span className="text-muted-foreground">No hidden costs, no sign-ups, and open-source transparency.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Privacy First</strong>
                  <span className="text-muted-foreground">Processing happens in your browser. No images are uploaded to servers.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Instant Preview</strong>
                  <span className="text-muted-foreground">See exactly how your icon looks in browser tabs before downloading.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">Developer Friendly</strong>
                  <span className="text-muted-foreground">Generates the exact HTML code you need for your website head.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Faqs
          faqs={[
            {
              question: "What file formats does this tool generate?",
              answer: "It generates a standard favicon.ico file (containing multiple sizes) for older browsers and high-resolution PNG files (16x16 up to 512x512) for modern browsers, Android, and iOS devices."
            },
            {
              question: "How do I add the favicon to my website?",
              answer: "Download the ZIP file, extract it, and place the images in your website's root folder. Then, copy the provided HTML code into the <head> section of your pages."
            },
            {
              question: "Can I use these favicons commercially?",
              answer: "Yes! You can use the favicons generated here for any personal or commercial project without restriction or attribution."
            },
            {
              question: "Is my data safe?",
              answer: "Absolutely. All image processing happens locally in your web browser. We do not store or upload your images to any server."
            }
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What file formats does this tool generate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It generates a standard favicon.ico file (containing multiple sizes) for older browsers and high-resolution PNG files (16x16 up to 512x512) for modern browsers, Android, and iOS devices."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I add the favicon to my website?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Download the ZIP file, extract it, and place the images in your website's root folder. Then, copy the provided HTML code into the <head> section of your pages."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use these favicons commercially?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! You can use the favicons generated here for any personal or commercial project without restriction or attribution."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my data safe?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. All image processing happens locally in your web browser. We do not store or upload your images to any server."
                  }
                }
              ]
            })
          }}
        />
      </section>

      <section className="px-1 md:px-4">
        <ToolLinkCards tools={tools} />
      </section>
    </div>
  );
}
