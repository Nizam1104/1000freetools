import type { Metadata } from "next";
import TextToSlugConverter from "@/components/text-tools/TextToSlugConverter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text to Slug Converter — Generate Clean SEO-Friendly URLs",
  description:
    "Free online slug generator. Convert titles and headlines into clean, SEO-friendly URL slugs with hyphens or underscores.",
  openGraph: {
    title: "Text to Slug Converter — Generate Clean SEO-Friendly URLs",
    description:
      "Free online slug generator. Convert titles and headlines into clean, SEO-friendly URL slugs with hyphens or underscores.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-to-slug-converter",
  },
};

const faqsData = [
  {
    question: "What is a URL slug?",
    answer:
      "A URL slug is the part of a web address that identifies a specific page. It's usually a simplified, readable version of the page title.",
  },
  {
    question: "Should I use hyphens or underscores?",
    answer:
      "Hyphens are recommended for SEO. Google treats hyphens as word separators, so 'my-page' is read as two words. Underscores connect words, so 'my_page' is read as one word.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Should I remove stop words?",
    answer:
      "Removing stop words (a, the, and, of, etc.) creates shorter, cleaner slugs. For SEO, shorter slugs are generally better, but keep words that add meaning.",
  },
  {
    question: "What characters are removed from slugs?",
    answer:
      "Special characters like quotes, exclamation marks, question marks, and symbols are stripped. Accented characters are converted to their ASCII equivalents (é becomes e).",
  },
  {
    question: "How long should a URL slug be?",
    answer:
      "Aim for 50-60 characters maximum. Google may truncate longer slugs in search results. Shorter slugs are easier to read, share, and remember.",
  },
];

export default function TextToSlugConverterPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/text-tools">Text Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/text-tools/text-to-slug-converter">
                Text to Slug Converter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text to Slug Converter</h1>
        <p className="text-xl text-muted-foreground">
          Turn any blog title or heading into a perfectly formatted URL slug in one click. Hyphens, lowercase, special characters stripped — ready to paste straight into WordPress, Shopify, or your CMS.
        </p>
      </header>

      <TextToSlugConverter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Slug Generator Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool converts any text into a URL-friendly slug by applying standard URL formatting rules. The process happens entirely in your browser.
            </p>
            <p>
              First, the text is converted to lowercase. Then special characters and symbols are removed. Spaces and separators are replaced with hyphens (or underscores if selected). Stop words can be optionally removed for shorter slugs.
            </p>
            <p>
              A live preview shows exactly what the slug will look like in a URL context, so you can verify the output before copying.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">SEO Best Practices for URL Slugs</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Use hyphens, not underscores:</strong> Google confirmed that hyphens act as word separators. "best-coffee-shops" is read as three words. "best_coffee_shops" is read as one word.
            </p>
            <p>
              <strong>Keep it short and descriptive:</strong> Slugs under 60 characters display fully in search results. Include your target keyword but avoid stuffing.
            </p>
            <p>
              <strong>Remove stop words:</strong> Words like "a", "the", "and", "of" add length without meaning. "best-coffee-shops-nyc" beats "the-best-coffee-shops-in-nyc".
            </p>
            <p>
              <strong>Use lowercase only:</strong> URLs are case-sensitive on some servers. Lowercase slugs avoid duplicate content issues and are easier to type.
            </p>
            <p>
              <strong>Avoid dates in evergreen content:</strong> "best-coffee-shops-2024" dates your content. Use "best-coffee-shops" unless the year is part of the topic.
            </p>
            <p>
              <strong>Don't change slugs after publishing:</strong> Changing a URL breaks existing links and loses SEO value. If you must change it, set up a 301 redirect.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses This Slug Generator</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Bloggers and content writers:</strong> Generate clean slugs for WordPress, Medium, or any CMS without manually formatting each title.
            </p>
            <p>
              <strong>E-commerce managers:</strong> Create consistent product URL slugs for Shopify, WooCommerce, or custom stores.
            </p>
            <p>
              <strong>SEO specialists:</strong> Optimize URL structure for better search visibility and click-through rates.
            </p>
            <p>
              <strong>Web developers:</strong> Auto-generate slugs for dynamic content or validate user-provided slugs against URL standards.
            </p>
            <p>
              <strong>Social media managers:</strong> Create clean, shareable links for campaigns and trackable URLs.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Some CMS platforms auto-generate slugs:</strong> WordPress, Shopify, and others create slugs automatically. Use this tool to preview or override the auto-generated version.
            </p>
            <p>
              <strong>Non-English characters get converted:</strong> Accented letters (é, ñ, ü) are converted to ASCII equivalents (e, n, u). This improves URL compatibility.
            </p>
            <p>
              <strong>Numbers are preserved:</strong> "10-best-recipes" keeps the number. This is useful for listicles and ranked content.
            </p>
            <p>
              <strong>Multiple spaces become one hyphen:</strong> "Best   Coffee   Shops" becomes "best-coffee-shops", not "best---coffee---shops".
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Faqs faqs={faqsData} />
        </div>
      </section>
    </div>
  );
}
