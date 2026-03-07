import type { Metadata } from "next";
import TextRepeater from "@/components/text-tools/TextRepeater";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text Repeater — Repeat Any Text as Many Times as You Want",
  description:
    "Free online text repeater. Repeat text multiple times with custom separators like newline, comma, space, or custom delimiter.",
  openGraph: {
    title: "Text Repeater — Repeat Any Text as Many Times as You Want",
    description:
      "Free online text repeater. Repeat text multiple times with custom separators like newline, comma, space, or custom delimiter.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-repeater",
  },
};

const faqsData = [
  {
    question: "What is the maximum repeat count?",
    answer:
      "You can repeat text up to 10,000 times. For very large counts, your browser may take a moment to generate the output.",
  },
  {
    question: "Can I add line numbers?",
    answer:
      "Yes. Enable the 'Number each repetition' option to add sequential numbers (1., 2., 3...) before each repeated text.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What separators can I use?",
    answer:
      "Choose from newline, comma, space, semicolon, or enter a custom separator. The separator appears between each repetition.",
  },
  {
    question: "Can I repeat multiple words at once?",
    answer:
      "Yes. Paste any text — a single character, word, phrase, or entire paragraph — and it will be repeated as a unit.",
  },
  {
    question: "Why would I need to repeat text?",
    answer:
      "Common uses include generating test data, creating placeholder content, filling forms for testing, and making bulk CSV entries.",
  },
];

export default function TextRepeaterPage() {
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
              <BreadcrumbLink href="/text-tools/text-repeater">
                Text Repeater
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text Repeater</h1>
        <p className="text-xl text-muted-foreground">
          Repeat a word, phrase, or character hundreds of times with your choice of separator — for testing, data generation, form filling, or just a good old-fashioned wall of 'hahaha'.
        </p>
      </header>

      <TextRepeater />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Text Repeater Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool takes any text input and repeats it a specified number of times. All processing happens in your browser.
            </p>
            <p>
              Choose your repeat count (1 to 10,000), select a separator (newline, comma, space, or custom), and optionally add line numbers to each repetition.
            </p>
            <p>
              The repeated text appears instantly with a copy button for easy transfer to your application or document.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Test data generation:</strong> Create bulk test entries for databases, forms, or applications. Generate thousands of placeholder records quickly.
            </p>
            <p>
              <strong>CSV file creation:</strong> Build CSV files with repeated values for bulk imports. Add line numbers for unique identifiers.
            </p>
            <p>
              <strong>Form testing:</strong> Fill form fields with repeated text to test validation, character limits, and display behavior.
            </p>
            <p>
              <strong>Placeholder content:</strong> Generate filler text for layouts, templates, or prototypes when Lorem Ipsum doesn't fit.
            </p>
            <p>
              <strong>Pattern creation:</strong> Create repeating patterns for text-based art, ASCII designs, or decorative elements.
            </p>
            <p>
              <strong>Social media fun:</strong> Create those messages with repeated characters for emphasis or humor.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Separator Options Explained</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Newline:</strong> Each repetition appears on its own line. Useful for lists, CSV rows, or line-separated data.
            </p>
            <p>
              <strong>Comma:</strong> Repetitions separated by commas. Creates CSV-style output: "text,text,text".
            </p>
            <p>
              <strong>Space:</strong> Repetitions separated by spaces. Creates running text: "text text text".
            </p>
            <p>
              <strong>Semicolon:</strong> Useful for SQL queries or programming arrays: "text;text;text".
            </p>
            <p>
              <strong>Custom:</strong> Enter any character or string as your separator. Use tabs, pipes, or any delimiter your use case requires.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Large repeats take time:</strong> Generating 10,000 repetitions of long text may take a moment. Be patient with large outputs.
            </p>
            <p>
              <strong>Browser memory limits:</strong> Extremely large outputs may strain your browser. Stick to reasonable repeat counts for best performance.
            </p>
            <p>
              <strong>Line numbers add length:</strong> Numbered repetitions add characters. Factor this in if you have character limits.
            </p>
            <p>
              <strong>Copy button included:</strong> Use the copy button instead of selecting all text manually. It's faster and more reliable.
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
