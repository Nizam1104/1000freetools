import type { Metadata } from "next";
import WhitespaceRemover from "@/components/text-tools/WhitespaceRemover";
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
  title: "Remove Extra Spaces & Blank Lines — Clean Messy Text Instantly",
  description:
    "Free online whitespace remover. Remove extra spaces, tabs, blank lines, and clean up messy pasted text from PDFs or web pages.",
  openGraph: {
    title: "Remove Extra Spaces & Blank Lines — Clean Messy Text Instantly",
    description:
      "Free online whitespace remover. Remove extra spaces, tabs, blank lines, and clean up messy pasted text from PDFs or web pages.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/whitespace-remover",
  },
};

const faqsData = [
  {
    question: "What does this tool clean up?",
    answer:
      "This tool removes extra spaces, leading/trailing whitespace, tabs (optionally converts to spaces), and blank lines from your text.",
  },
  {
    question: "Can I convert tabs to spaces?",
    answer:
      "Yes. Enable the 'Convert tabs to spaces' option to replace all tab characters with 4 spaces.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Why does pasted text have so many extra spaces?",
    answer:
      "PDFs, Word documents, and web pages often use extra spacing for formatting. When you copy text, these formatting characters come along. This tool strips them out.",
  },
  {
    question: "Does it remove all spaces?",
    answer:
      "No. The tool removes extra spaces (multiple consecutive spaces become one) but preserves single spaces between words. Use other options to remove all spaces if needed.",
  },
  {
    question: "Can I remove blank lines only?",
    answer:
      "Yes. You can choose to remove only blank lines while preserving the rest of the formatting, or combine multiple cleanup options.",
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
    name: `Remove Duplicate Lines`,
    description: `Remove duplicates from lists, CSV data, email lists, and keywords`,
    href: `/text-tools/remove-duplicate-lines`,
  },
  {
    name: `Word Counter`,
    description: `Count words, characters, sentences, and reading time instantly`,
    href: `/text-tools/word-counter`,
  },
  {
    name: `Character Counter`,
    description: `Count characters with/without spaces for Twitter, SMS, meta descriptions`,
    href: `/text-tools/character-counter`,
  },
  {
    name: `Case Converter`,
    description: `Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more`,
    href: `/text-tools/case-converter`,
  },
];

export default function WhitespaceRemoverPage() {
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
              <BreadcrumbLink href="/text-tools/whitespace-remover">
                Whitespace Remover
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Whitespace & Blank Line Remover</h1>
        <p className="text-xl text-muted-foreground">
          Pasted text from a PDF, Word doc, or web scrape and it came out a mangled mess of spaces and blank lines? One click fixes everything — trailing spaces, double spaces, empty lines, all gone.
        </p>
      </header>

      <WhitespaceRemover />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Whitespace Remover Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool processes text in your browser and removes unwanted whitespace characters. All cleaning happens locally — no data is sent anywhere.
            </p>
            <p>
              Options include removing extra spaces (multiple spaces become one), stripping leading/trailing whitespace from each line, removing blank lines, converting tabs to spaces, and removing all whitespace.
            </p>
            <p>
              The cleaned text appears instantly with a copy button for easy transfer to your document or application.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Clean PDF text:</strong> PDFs often copy with weird line breaks and extra spaces. This tool normalizes the text for use in documents.
            </p>
            <p>
              <strong>Fix Word document paste:</strong> Text from Word often includes hidden formatting characters. Strip them out for plain text use.
            </p>
            <p>
              <strong>Web scraping cleanup:</strong> Scraped text often has inconsistent spacing and blank lines. Normalize it for database storage or analysis.
            </p>
            <p>
              <strong>Code formatting:</strong> Remove trailing whitespace from code files to meet linting requirements and reduce git diff noise.
            </p>
            <p>
              <strong>Email cleanup:</strong> Fix text copied from email clients that add extra spacing and line breaks.
            </p>
            <p>
              <strong>Social media posts:</strong> Clean up text before posting to platforms that don't preserve formatting well.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Types of Whitespace Removed</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Multiple spaces:</strong> Converts "hello    world" to "hello world". Preserves single spaces between words.
            </p>
            <p>
              <strong>Leading whitespace:</strong> Removes spaces at the start of each line. Useful for cleaning indented text.
            </p>
            <p>
              <strong>Trailing whitespace:</strong> Removes spaces at the end of lines. Important for code and data files.
            </p>
            <p>
              <strong>Tab characters:</strong> Converts tabs to spaces or removes them entirely. Helps normalize indentation.
            </p>
            <p>
              <strong>Blank lines:</strong> Removes empty lines or consecutive blank lines. Cleans up vertically spaced text.
            </p>
            <p>
              <strong>Non-breaking spaces:</strong> Some sources use special space characters ( ). These are normalized to regular spaces.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Indentation may be intentional:</strong> Code and formatted text often use indentation. Review before removing all leading whitespace.
            </p>
            <p>
              <strong>Multiple spaces sometimes matter:</strong> Markdown tables and ASCII art rely on precise spacing. Don't normalize these.
            </p>
            <p>
              <strong>Line breaks are preserved:</strong> This tool cleans whitespace but keeps your line structure. Use other tools to reflow paragraphs.
            </p>
            <p>
              <strong>Unicode spaces handled:</strong> Various Unicode space characters are recognized and normalized to regular spaces.
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
