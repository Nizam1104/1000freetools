import type { Metadata } from "next";
import CaseConverter from "@/components/text-tools/CaseConverter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Case Converter — Transform Text Case Instantly Online",
  description:
    "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and more.",
  openGraph: {
    title: "Case Converter — Transform Text Case Instantly",
    description:
      "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, and more.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/case-converter",
  },
};

const faqsData = [
  {
    question: "What case formats are supported?",
    answer:
      "The tool supports 10 case formats: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, and aLtErNaTiNg CaSe.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. This case converter is completely free with no registration required.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What is Title Case vs Sentence case?",
    answer:
      "Title Case capitalizes the first letter of most words (The Quick Brown Fox). Sentence case only capitalizes the first word and proper nouns (The quick brown fox).",
  },
  {
    question: "When should I use snake_case vs kebab-case?",
    answer:
      "snake_case (with underscores) is common in Python, Ruby, and database column names. kebab-case (with hyphens) is standard for URL slugs and CSS class names.",
  },
  {
    question: "What is SCREAMING_SNAKE_CASE used for?",
    answer:
      "SCREAMING_SNAKE_CASE is typically used for constants in programming languages like JavaScript, Python, and Java. It signals that a value should not change.",
  },
];

export default function CaseConverterPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-2 md:px-4">
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
              <BreadcrumbLink href="/text-tools/case-converter">
                Case Converter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Case Converter</h1>
        <p className="text-xl text-muted-foreground">
          From snake_case to Title Case to SCREAMING_SNAKE_CASE — convert your text into any case format in one click. Built for developers, copywriters, and anyone who's ever pasted the wrong casing into production.
        </p>
      </header>

      <CaseConverter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Case Converter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This case converter processes text entirely in your browser. Paste any text and click a case format button to instantly transform it.
            </p>
            <p>
              The tool identifies word boundaries using spaces, hyphens, underscores, and capitalization patterns. It then applies the appropriate transformation rules for each case format.
            </p>
            <p>
              Each output appears with a copy button, so you can grab the formatted text and paste it directly into your code, document, or CMS.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Case Format Reference Guide</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>UPPERCASE:</strong> All letters capitalized. Used for acronyms (NASA), emphasis, and some CSS values.
            </p>
            <p>
              <strong>lowercase:</strong> All letters lowercase. Standard for email addresses, URLs, and many programming contexts.
            </p>
            <p>
              <strong>Title Case:</strong> First letter of each major word capitalized. Used for book titles, article headlines, and proper headings.
            </p>
            <p>
              <strong>Sentence case:</strong> Only the first word and proper nouns capitalized. Standard for body text and most prose.
            </p>
            <p>
              <strong>camelCase:</strong> First word lowercase, subsequent words capitalized. Standard for JavaScript variables and Java method names.
            </p>
            <p>
              <strong>PascalCase:</strong> Every word capitalized. Used for C# class names, React components, and TypeScript types.
            </p>
            <p>
              <strong>snake_case:</strong> Words separated by underscores, all lowercase. Common in Python, Ruby, and SQL column names.
            </p>
            <p>
              <strong>kebab-case:</strong> Words separated by hyphens, all lowercase. Standard for URL slugs, HTML attributes, and CSS classes.
            </p>
            <p>
              <strong>SCREAMING_SNAKE_CASE:</strong> Words separated by underscores, all uppercase. Used for constants and environment variables.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses This Case Converter</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Developers:</strong> Convert variable names between camelCase, snake_case, and PascalCase when migrating code or following different style guides.
            </p>
            <p>
              <strong>Content writers:</strong> Transform article titles to Title Case for headlines or Sentence case for email subject lines.
            </p>
            <p>
              <strong>SEO specialists:</strong> Generate properly formatted URL slugs in kebab-case from blog post titles.
            </p>
            <p>
              <strong>Data analysts:</strong> Standardize column names in datasets when merging data from different sources with inconsistent naming conventions.
            </p>
            <p>
              <strong>Technical writers:</strong> Ensure consistent casing in documentation, especially when referencing code elements alongside prose.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Word boundary detection isn't perfect:</strong> The tool makes educated guesses about where words begin and end. Unusual inputs like "iPhone" or "eBay" may need manual correction.
            </p>
            <p>
              <strong>Title Case rules vary:</strong> Different style guides (APA, Chicago, AP) have different rules for which words to capitalize. This tool uses standard Title Case conventions but may not match your specific style guide.
            </p>
            <p>
              <strong>Special characters are preserved:</strong> Numbers, symbols, and punctuation remain unchanged during case conversion.
            </p>
            <p>
              <strong>Non-English characters supported:</strong> Accented characters and non-Latin scripts are handled correctly, though case conversion rules vary by language.
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
