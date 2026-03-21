import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Image, ArrowRight } from "lucide-react";

const funTools = [
  {
    name: "WhatsApp Screen Shot Maker",
    description: "Create fake WhatsApp chat screenshots for fun or mockups",
    href: "/fun-tools/whatsapp-screen-shot-maker",
  },
];

export const metadata: Metadata = {
  title: "Free Fun Tools Online - Entertainment & Prank Tools",
  description:
    "Free online fun tools for entertainment and creating mockups. WhatsApp screenshot maker and more. All tools run in your browser.",
  openGraph: {
    title: "Free Fun Tools Online - Entertainment & Prank Tools",
    description:
      "Free online fun tools for entertainment and creating mockups. WhatsApp screenshot maker and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/fun-tools",
  },
};

export default function FunToolsPage() {
  const faqsData = [
    {
      question: "Are these fun tools really free?",
      answer:
        "Yes. All fun tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Are these screenshots real?",
      answer:
        "No. These tools create fake/mockup screenshots for entertainment, education, or design purposes. Don't use them to mislead or deceive others.",
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
              <Image className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Fun Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online fun tools for entertainment and creating mockups.
              Create fake screenshots, pranks, and more — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={funTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore all available tools for more utilities.
            </p>
            <Link
              href="/explore-all-tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              Browse All Tools
            </Link>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These Fun Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This collection of free fun tools runs entirely in your browser. No software installation, no watermarks, no waiting. You enter text or upload images, customize appearance, and create mockups instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              These tools are for entertainment, education, and design mockups. Create fake chat screenshots for presentations, design social media mockups, or just have fun with friends.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your text content or upload images</li>
              <li>Customize appearance (profile pictures, names, timestamps)</li>
              <li>Preview the mockup and adjust as needed</li>
              <li>Download as PNG image</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Designers</strong> create app mockups for portfolios, design presentations, or client pitches without needing actual devices.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Teachers</strong> create example screenshots for digital literacy lessons, showing students how to recognize fake content.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Content creators</strong> make entertaining content, reaction videos, or social media posts using realistic-looking mockups.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Developers</strong> generate placeholder screenshots for app documentation, testing UI layouts, or demonstrating features before implementation.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Screenshot Mockups</h3>
            <p className="text-muted-foreground mb-4">
              WhatsApp Screen Shot Maker creates realistic WhatsApp chat screenshots with customizable contacts, messages, timestamps, and profile pictures.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Ethical use:</strong> These tools create fake content. Don't use them to spread misinformation, defraud, or harm others.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Accuracy:</strong> Mockups approximate real app interfaces. Design details may differ from actual apps.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Download format:</strong> Screenshots download as PNG images. For best quality, use high-resolution displays.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Screenshot tools often mean downloading sketchy apps, paying for mockup generators, or manually editing images in Photoshop. These tools exist because creating a quick mockup should be fast, free, and private. Everything runs in your browser — no installation, no watermarks, no judgment.
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
