import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

const htmlTools = [
  {
    name: "HTML Base64 Image Encoder",
    description: "Convert images to Base64 data URIs for embedding in HTML",
    href: "/html-tools/html-base64-image-encoder",
  },
  {
    name: "HTML Color Picker/Generator",
    description: "Pick and generate HTML color codes",
    href: "/html-tools/html-color-picker-generator",
  },
  {
    name: "HTML Comment Remover/Extractor",
    description: "Remove or extract HTML comments from code",
    href: "/html-tools/html-comment-remover-extractor",
  },
  {
    name: "HTML Diff Checker/Comparator",
    description: "Compare two HTML documents and highlight differences",
    href: "/html-tools/html-diff-checker-comparator",
  },
  {
    name: "HTML Email Template Builder",
    description: "Create responsive HTML email templates",
    href: "/html-tools/html-email-template-builder",
  },
  {
    name: "HTML Entity Encoder/Decoder",
    description: "Encode/decode HTML entities like &amp; &lt; &gt;",
    href: "/html-tools/html-entity-encoder-decoder",
  },
  {
    name: "HTML Escape/Unescape",
    description: "Escape or unescape special characters in HTML",
    href: "/html-tools/html-escape-unescape",
  },
  {
    name: "HTML Formatter/Beautifier",
    description: "Format and beautify minified HTML code",
    href: "/html-tools/html-formatter-beautifier",
  },
  {
    name: "HTML Image Map Generator",
    description: "Create clickable image maps with HTML area tags",
    href: "/html-tools/html-image-map-generator",
  },
  {
    name: "HTML Link Extractor/Checker",
    description: "Extract and validate all links from HTML",
    href: "/html-tools/html-link-extractor-checker",
  },
  {
    name: "HTML Meta Tag Generator",
    description: "Generate SEO meta tags for web pages",
    href: "/html-tools/html-meta-tag-generator",
  },
  {
    name: "HTML Sitemap Generator",
    description: "Create HTML sitemaps from URL lists",
    href: "/html-tools/html-sitemap-generator",
  },
  {
    name: "HTML Special Characters Library",
    description: "Browse and copy HTML special character entities",
    href: "/html-tools/html-special-characters-library",
  },
  {
    name: "HTML Table Generator",
    description: "Create HTML tables with customizable styles",
    href: "/html-tools/html-table-generator",
  },
  {
    name: "HTML Tag Remover/Stripper",
    description: "Remove HTML tags and extract plain text",
    href: "/html-tools/html-tag-remover-stripper",
  },
  {
    name: "HTML to JSON Converter",
    description: "Convert HTML structure to JSON format",
    href: "/html-tools/html-to-json-converter",
  },
  {
    name: "HTML to Markdown Converter",
    description: "Convert HTML content to Markdown format",
    href: "/html-tools/html-to-markdown-converter",
  },
  {
    name: "HTML to PDF Converter",
    description: "Convert HTML pages to PDF documents",
    href: "/html-tools/html-to-pdf-converter",
  },
  {
    name: "HTML Validator/Linter",
    description: "Validate HTML syntax and check for errors",
    href: "/html-tools/html-validator-linter",
  },
];

export const metadata: Metadata = {
  title: "Free HTML Tools Online - 19 HTML Editor & Converter Tools",
  description:
    "Free online HTML tools for editing, formatting, and converting HTML. HTML validator, formatter, entity encoder, table generator. All tools run in your browser.",
  openGraph: {
    title: "Free HTML Tools Online - 19 HTML Editor & Converter Tools",
    description:
      "Free online HTML tools for editing, formatting, and converting HTML. HTML validator, formatter, entity encoder, table generator. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/html-tools",
  },
};

export default function HtmlToolsPage() {
  const faqsData = [
    {
      question: "Are these HTML tools really free?",
      answer:
        "Yes. All 19 HTML tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my HTML code private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your HTML code never leaves your device or gets uploaded to any server.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Do these tools work with modern HTML5?",
      answer:
        "Yes. Tools support HTML5, HTML4, and XHTML. The validator checks against modern HTML5 standards.",
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
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free HTML Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online HTML tools for editing, formatting, and converting HTML.
              HTML validator, formatter, entity encoder — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={htmlTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Web Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our CSS tools, JavaScript tools, or markdown tools for more web utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/css-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                CSS Tools
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
              What These HTML Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 19 free HTML tools that run entirely in your browser. No software installation, no server uploads, no waiting. You paste HTML code or upload files, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: editing and formatting HTML (beautifier, comment remover, tag stripper), validating and checking HTML (validator, link checker, diff comparator), generating HTML elements (tables, meta tags, image maps, sitemaps), and converting HTML to other formats (Markdown, JSON, PDF).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your HTML code or upload an HTML file</li>
              <li>Select the operation or output format</li>
              <li>Adjust settings like indentation or encoding</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript and DOM parsing. Your HTML stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Web developers</strong> format minified HTML, validate syntax, extract links, or convert HTML to Markdown for documentation.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Email marketers</strong> build HTML email templates, encode special characters, or generate Base64 images for inline embedding.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Content creators</strong> generate meta tags for SEO, create HTML tables, or convert HTML content to Markdown for blogs.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>QA testers</strong> compare HTML versions with diff checker, validate HTML for compliance, or check links for broken references.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">HTML Editing</h3>
            <p className="text-muted-foreground mb-4">
              HTML Formatter/Beautifier indents and formats minified HTML. HTML Comment Remover strips comments. HTML Tag Remover extracts plain text. HTML Escape/Unescape handles special characters.
            </p>

            <h3 className="text-xl font-semibold mb-3">HTML Validation</h3>
            <p className="text-muted-foreground mb-4">
              HTML Validator/Linter checks syntax and standards compliance. HTML Link Extractor/Checker finds and validates all links. HTML Diff Checker/Comparator highlights differences between versions.
            </p>

            <h3 className="text-xl font-semibold mb-3">HTML Generation</h3>
            <p className="text-muted-foreground mb-4">
              HTML Table Generator creates styled tables. HTML Meta Tag Generator produces SEO tags. HTML Image Map Generator defines clickable areas. HTML Sitemap Generator builds navigation pages. HTML Email Template Builder creates responsive email layouts.
            </p>

            <h3 className="text-xl font-semibold mb-3">HTML Conversion</h3>
            <p className="text-muted-foreground mb-4">
              HTML to Markdown Converter transforms HTML to Markdown. HTML to JSON Converter parses HTML structure to JSON. HTML to PDF Converter generates printable documents. HTML Base64 Image Encoder embeds images inline.
            </p>

            <h3 className="text-xl font-semibold mb-3">HTML Utilities</h3>
            <p className="text-muted-foreground mb-4">
              HTML Entity Encoder/Decoder converts special characters to entities. HTML Color Picker/Generator creates color codes. HTML Special Characters Library provides entity reference.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>HTML parsing:</strong> Browser-based parsing may differ from server-side parsers for malformed HTML.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>HTML to PDF:</strong> Complex layouts, external resources, or JavaScript-dependent content may not render perfectly.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Email templates:</strong> Email client support varies. Test templates across major clients before sending.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Base64 images:</strong> Base64 encoding increases file size by ~33%. Use for small images only.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              HTML tools are scattered across IDEs, online services, and paid suites. But sometimes you need to quickly format some minified HTML, check if your meta tags are correct, or convert an HTML table to Markdown. These tools exist because working with HTML shouldn't require expensive software or uploading your code to sketchy websites. Everything runs in your browser — no installation, no uploads, no barriers.
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
