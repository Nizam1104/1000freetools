import type { Metadata } from "next";
import TextToListConverter from "@/components/text-tools/TextToListConverter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text to List Converter — Turn Any Text Into a Formatted List Instantly",
  description:
    "Free online text to list converter. Convert text to comma-separated list, bullet list, numbered list, or JSON array.",
  openGraph: {
    title: "Text to List Converter — Turn Any Text Into a Formatted List Instantly",
    description:
      "Free online text to list converter. Convert text to comma-separated list, bullet list, numbered list, or JSON array.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-to-list-converter",
  },
};

const faqsData = [
  {
    question: "What output formats are supported?",
    answer:
      "You can convert text to comma-separated values, bullet lists (• item), numbered lists (1. item), or JSON arrays.",
  },
  {
    question: "Can I split by custom delimiters?",
    answer:
      "Yes. Choose 'Custom' and enter any delimiter to split your text by that character or string.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What delimiters can I split by?",
    answer:
      "Split by newline, period, comma, semicolon, tab, or any custom character. The tool identifies items based on your chosen delimiter.",
  },
  {
    question: "Does it trim whitespace from items?",
    answer:
      "Yes. Leading and trailing whitespace is automatically removed from each list item for clean output.",
  },
  {
    question: "Can I convert a list back to a paragraph?",
    answer:
      "Yes. The reverse mode joins list items back into a paragraph with your choice of separator.",
  },
];

export default function TextToListConverterPage() {
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
              <BreadcrumbLink href="/text-tools/text-to-list-converter">
                Text to List Converter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text to List Converter</h1>
        <p className="text-xl text-muted-foreground">
          Dump a paragraph in, get a clean numbered list, bullet list, comma-separated string, or JSON array out. The converter for anyone who's ever manually copied things into square brackets one by one.
        </p>
      </header>

      <TextToListConverter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Text to List Converter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool splits text into individual items based on your chosen delimiter, then formats them into your selected output format. All processing happens in your browser.
            </p>
            <p>
              Choose how to split the input (newline, comma, period, custom) and select your output format (comma-separated, bullet list, numbered list, JSON array).
            </p>
            <p>
              The converted list appears instantly with a copy button for easy transfer to your document, code, or application.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Create JSON arrays:</strong> Convert a list of items into a JSON array for use in code. No more manual quoting and comma placement.
            </p>
            <p>
              <strong>Format email lists:</strong> Turn a paragraph of email addresses into a comma-separated list for mail merge or bulk operations.
            </p>
            <p>
              <strong>Generate bullet points:</strong> Convert raw text into formatted bullet points for presentations, documents, or web content.
            </p>
            <p>
              <strong>Prepare CSV data:</strong> Split text by delimiter and output as CSV-ready format for spreadsheet import.
            </p>
            <p>
              <strong>Create numbered lists:</strong> Automatically number items for instructions, rankings, or ordered content.
            </p>
            <p>
              <strong>Clean up copied data:</strong> Text copied from tables or formatted documents often needs list conversion for database import.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Output Formats Explained</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Comma-separated:</strong> Items separated by commas. "item1, item2, item3". Useful for CSV, email lists, SQL IN clauses.
            </p>
            <p>
              <strong>Bullet list:</strong> Each item prefixed with a bullet. "• item1\n• item2". Ready for documents and presentations.
            </p>
            <p>
              <strong>Numbered list:</strong> Each item numbered sequentially. "1. item1\n2. item2". Perfect for instructions and rankings.
            </p>
            <p>
              <strong>JSON array:</strong> Properly formatted JSON. ["item1", "item2", "item3"]. Ready for JavaScript and APIs.
            </p>
            <p>
              <strong>Space-separated:</strong> Items separated by single spaces. Useful for command-line arguments or search queries.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Empty items are removed:</strong> Consecutive delimiters create empty items, which are automatically filtered out.
            </p>
            <p>
              <strong>Whitespace is trimmed:</strong> Leading and trailing spaces are removed from each item for clean output.
            </p>
            <p>
              <strong>JSON strings are escaped:</strong> Special characters in JSON output are properly escaped (quotes, backslashes, newlines).
            </p>
            <p>
              <strong>Custom delimiters work:</strong> Enter any character or string as your delimiter. Split by " - " or "::" or anything else.
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
