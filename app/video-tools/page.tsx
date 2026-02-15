import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const videoTools = [
  {
    name: "Video Compressor",
    description:
      "Compress videos online - reduce file size while maintaining quality",
    href: "/video-tools/video-compressor",
  },
];

export const metadata: Metadata = {
  title: "Free Video Tools",
  description:
    "Free online video tools. Compress, edit, convert, resize and optimize videos with ease.",
  openGraph: {
    title: "Free Video Tools",
    description:
      "Free online video tools. Compress, edit, convert, resize and optimize videos with ease.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/video-tools",
  },
};

export default function VideoToolsPage() {
  const faqsData = [
    {
      question: "What video formats do you support?",
      answer:
        "We support MP4, MOV, AVI, MKV, WMV, and other common video formats. You can compress and convert between these formats easily.",
    },
    {
      question: "Are all these tools Free?",
      answer:
        "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits.",
    },
    {
      question: "Do you store my videos?",
      answer:
        "No! all videos are processed in your browser and never leaves the device.",
    },
  ];

  // JSON-LD Schema
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Video Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online video tools. Compress, edit, convert, resize and
              optimize videos with ease.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={videoTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools is a free online tool that helps you compress, edit,
              convert, resize and optimize videos with ease. All processing
              happens directly in your browser, so your videos stay private and
              never touch our servers.
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
