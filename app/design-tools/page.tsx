import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const designTools = [
  {
    toolName: "Favicon Generator",
    toolDescription:
      "Create professional favicons from text, images, or emojis",
    toolLink: "/design-tools/favicon-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Design Tools | Online Design Utilities",
  description:
    "Free online design tools for web designers and developers. Create favicons and graphics directly in your browser.",
  openGraph: {
    title: "Free Design Tools | Online Design Utilities",
    description:
      "Free online design tools for web designers and developers. Create favicons and graphics directly in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/design-tools",
  },
};

export default function DesignToolsPage() {
  const faqsData = [
    {
      question: "What design tools are available?",
      answer:
        "Currently we offer a favicon generator, with more design tools coming soon...",
    },
    {
      question: "Are all these tools free?",
      answer: "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits."
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No installation required. All tools work directly in your web browser on any device.",
    },
    {
      question: "Are my designs stored on your servers?",
      answer:
        "No. All processing happens in your browser for maximum privacy. Your designs never leave your device.",
    },
  ];

  // JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Design Tools | 1000 Free Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Professional online design tools that help you create web graphics quickly and easily. No software installation required.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={designTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Simple Design Tools for Everyone</h2>
            <p className="text-muted-foreground mb-6">
              Our design tools are built for web designers, developers, and anyone who needs to create professional graphics without complex software. Everything runs in your browser, making it fast, private, and accessible from any device.
            </p>

            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <p className="text-muted-foreground mb-6">
              Choose a tool from the list above, customize your design using the available options, and download your creation. It's that simple. No sign-up required, no watermarks, completely free.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
            <ul className="text-muted-foreground space-y-2 mb-6">
              <li>Works directly in your browser - no installation needed</li>
              <li>Completely free for personal and commercial use</li>
              <li>Privacy-focused - your designs never leave your device</li>
              <li>Professional quality output for all your projects</li>
              <li>Easy to use interface designed for everyone</li>
            </ul>
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