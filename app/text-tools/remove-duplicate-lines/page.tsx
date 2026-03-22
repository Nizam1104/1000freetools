import type { Metadata } from "next";
import RemoveDuplicateLines from "@/components/text-tools/RemoveDuplicateLines";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines — Clean Your Lists Instantly",
  description:
    "Free online duplicate line remover. Remove duplicates from lists, CSV data, email lists, and keywords with case-sensitive and sorting options.",
  openGraph: {
    title: "Remove Duplicate Lines — Clean Your Lists Instantly",
    description:
      "Free online duplicate line remover. Remove duplicates from lists, CSV data, email lists, and keywords with case-sensitive and sorting options.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/remove-duplicate-lines",
  },
};

const faqsData = [
  {
    question: "How does the duplicate detection work?",
    answer:
      "The tool compares each line and removes exact duplicates. You can enable case-sensitive matching to treat 'Hello' and 'hello' as different lines.",
  },
  {
    question: "Can I sort the output?",
    answer:
      "Yes. Enable the 'Sort output alphabetically' option to sort the deduplicated lines.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Does it keep the first or last occurrence?",
    answer:
      "The tool keeps the first occurrence of each unique line and removes subsequent duplicates. This preserves the original order of your list.",
  },
  {
    question: "Can I remove duplicates from CSV files?",
    answer:
      "Yes. Paste your CSV data and the tool will remove duplicate rows. For CSVs with commas in values, make sure each row is on its own line.",
  },
  {
    question: "What happens to blank lines?",
    answer:
      "Blank lines are treated as duplicates of each other. Only one blank line will remain unless you enable the 'Remove blank lines' option.",
  },
];

const relatedTools = [
  {
    name: `Text Differ`,
    description: `Compare two texts side-by-side and highlight differences`,
    href: `/text-tools/text-differ`,
  },
  {
    name: `Duplicate Word Remover`,
    description: `Remove repeated words from text, keyword lists, and tag clouds`,
    href: `/text-tools/duplicate-word-remover`,
  },
  {
    name: `Whitespace Remover`,
    description: `Remove extra spaces, tabs, and blank lines from messy text`,
    href: `/text-tools/whitespace-remover`,
  },
  {
    name: `Word Counter`,
    description: `Count words, characters, sentences, and reading time instantly`,
    href: `/text-tools/word-counter`,
  },
  {
    name: `Text to List Converter`,
    description: `Convert text to comma-separated, newline, or custom delimited lists`,
    href: `/text-tools/text-to-list-converter`,
  },
  {
    name: `Text Line Sorter`,
    description: `Sort lines of text alphabetically or in reverse order`,
    href: `/text-tools/text-line-sorter`,
  },
];

export default function RemoveDuplicateLinesPage() {
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
              <BreadcrumbLink href="/text-tools/remove-duplicate-lines">
                Remove Duplicate Lines
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Remove Duplicate Lines</h1>
        <p className="text-xl text-muted-foreground">
          Got a messy list full of repeats? Paste it in and watch duplicates vanish — with options for case-sensitive matching, sorting, and a live count of exactly what got cleaned out.
        </p>
      </header>

      <RemoveDuplicateLines />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Duplicate Line Remover Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool processes text line by line in your browser. Each line is compared against all previously seen lines. When a duplicate is found, it's removed from the output.
            </p>
            <p>
              The tool maintains the original order of your list, keeping the first occurrence of each unique line. A counter shows exactly how many duplicates were removed.
            </p>
            <p>
              Optional features include case-sensitive matching (treating "ABC" and "abc" as different), alphabetical sorting of the output, and removal of blank lines.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Email list cleanup:</strong> Merge multiple subscriber lists and remove duplicate email addresses before importing to your email marketing platform.
            </p>
            <p>
              <strong>Keyword research:</strong> Combine keyword suggestions from multiple tools and remove duplicates to build a master keyword list.
            </p>
            <p>
              <strong>CSV data cleaning:</strong> Remove duplicate rows from exported data before analysis or import into a database.
            </p>
            <p>
              <strong>Code refactoring:</strong> Clean up repeated import statements, CSS classes, or configuration entries.
            </p>
            <p>
              <strong>Customer data deduplication:</strong> Merge customer lists from different sources and remove duplicate entries before CRM import.
            </p>
            <p>
              <strong>URL list cleanup:</strong> Remove duplicate URLs from web scraping results or sitemap files.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Exact matching only:</strong> The tool removes exact duplicates. Lines that differ by even a single character (including trailing spaces) are considered unique.
            </p>
            <p>
              <strong>Case sensitivity matters:</strong> By default, "Hello" and "hello" are treated as duplicates. Enable case-sensitive matching if you need to preserve both.
            </p>
            <p>
              <strong>Large lists work fine:</strong> The tool handles thousands of lines, but very large lists (10,000+) may take a moment to process.
            </p>
            <p>
              <strong>Whitespace is significant:</strong> A line with trailing spaces is different from the same line without. Use the Whitespace Remover tool first if needed.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Faqs faqs={faqsData} />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Related Text Tools</h2>
          <ToolLinkCards tools={relatedTools} />
        </div>
      </section>
    </div>
  );
}
