import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";

const imageTools = [
  {
    name: "Image Compressor",
    description:
      "Compress images online - reduce file size while maintaining quality",
    href: "/image-tools/image-compressor",
  },
  {
    name: "Image Editor",
    description: "Edit images online with powerful editing tools",
    href: "/image-tools/image-editor",
  },
  {
    name: "Pick Color Code from Image",
    description: "Extract color codes from images - get HEX, RGB, HSL values",
    href: "/image-tools/pick-color-code-from-image",
  },
  {
    name: "Image Format Conversions",
    description:
      "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
    href: "/image-tools/image-format-conversions",
  },
  {
    name: "Background Remover",
    description: "Remove background from images automatically",
    href: "/image-tools/background-remover",
  },
  {
    name: "Image to GIF",
    description: "Convert images to animated GIF format",
    href: "/image-tools/image-to-gif",
  },
  {
    name: "Image Filters",
    description: "Apply beautiful filters and effects to your images",
    href: "/image-tools/image-filters",
  },
  {
    name: "Crop Image",
    description: "Crop images to your desired size and aspect ratio",
    href: "/image-tools/crop-image",
  },
  {
    name: "Sharpen Image",
    description: "Enhance image sharpness and clarity online",
    href: "/image-tools/sharpen-image",
  },
  {
    name: "Resize Image Dimensions",
    description: "Resize images by changing width and height dimensions",
    href: "/image-tools/resize-image-dimensions",
  },
  {
    name: "Image to PDF",
    description: "Convert images to PDF documents",
    href: "/image-tools/image-to-pdf",
  },
  {
    name: "Add Watermark on Image",
    description: "Add text or image watermarks to protect your photos",
    href: "/image-tools/add-watermark-on-image",
  },
  {
    name: "Blur Image",
    description: "Apply blur effect to images or specific areas",
    href: "/image-tools/blur-image",
  },
];

export const metadata: Metadata = {
  title: "Free Image Tools",
  description:
    "Free online image tools. Compress, edit, convert, resize and optimize images with ease.",
  openGraph: {
    title: "Free Image Tools",
    description:
      "Free online image tools. Compress, edit, convert, resize and optimize images with ease.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools",
  },
};

export default function ImageToolsPage() {
  const faqsData = [
    {
      question: "What image formats do you support?",
      answer:
        "We support JPEG, PNG, WebP, AVIF, and other common image formats. You can compress and convert between these formats easily.",
    },
    {
      question: "Are all these tool Free?",
      answer:
        "Yes! all current and upcoming tools are free to use. No hidden charges, no premium plans, no limits.",
    },
    {
      question: "Do you store my images?",
      answer:
        "No! all images are processed in your browser and are not stored on our servers.",
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
              Free Image Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online image tools. Compress, edit, convert, resize and
              optimize images with ease.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={imageTools} />
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Why use 1000freetools?
            </h2>
            <p className="text-muted-foreground mb-6">
              1000freetools is a free online tool that helps you compress, edit,
              convert, resize and optimize images with ease. All processing
              happens directly in your browser, so your images stay private and
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
