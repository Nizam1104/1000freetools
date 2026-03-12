import type { Metadata } from "next";
import FindAndReplaceText from "@/components/text-tools/FindAndReplaceText";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Find and Replace Text Online — Bulk Edit Any Text Instantly",
  description:
    "Free online find and replace tool. Bulk edit text with regex support, case-sensitive matching, and whole word options.",
  openGraph: {
    title: "Find and Replace Text Online — Bulk Edit Any Text Instantly",
    description:
      "Free online find and replace tool. Bulk edit text with regex support, case-sensitive matching, and whole word options.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/find-and-replace-text",
  },
};

const faqsData = [
  {
    question: "Can I use regular expressions?",
    answer:
      "Yes. Enable the 'Use regex' option to use regular expressions for advanced pattern matching and replacement.",
  },
  {
    question: "What does whole word matching do?",
    answer:
      "Whole word matching ensures that only complete words are matched. For example, searching for 'cat' won't match 'category' when whole word is enabled.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Can I replace one occurrence at a time?",
    answer:
      "Yes. The tool shows match count and lets you review before replacing all occurrences. You can also use regex with capture groups for targeted replacements.",
  },
  {
    question: "What is case-sensitive matching?",
    answer:
      "Case-sensitive matching treats 'Hello' and 'hello' as different. Enable this when you need to replace only specific capitalizations.",
  },
  {
    question: "Can I use find and replace for coding?",
    answer:
      "Yes. Developers use this tool for refactoring code, updating variable names, fixing repeated patterns, and bulk editing configuration files.",
  },
];

export default function FindAndReplaceTextPage() {
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
              <BreadcrumbLink href="/text-tools/find-and-replace-text">
                Find and Replace Text
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Find and Replace Text</h1>
        <p className="text-xl text-muted-foreground">
          The find-and-replace you wish every text box had. Swap words, fix typos across a whole document, or run regex patterns — right in your browser with no setup required.
        </p>
      </header>

      <FindAndReplaceText />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How Find and Replace Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool scans your text for matches and replaces them with your specified text. All processing happens in your browser — no data is sent to any server.
            </p>
            <p>
              Enter the text you want to find and the replacement text. The tool shows how many matches exist before you replace. Options include case-sensitive matching, whole word matching, and regular expression support.
            </p>
            <p>
              Regular expressions enable powerful pattern matching. Replace all email addresses, phone numbers, or specific text patterns with a single operation.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Fix typos across documents:</strong> Replace a misspelled word throughout an entire manuscript, report, or article in one click.
            </p>
            <p>
              <strong>Update product names:</strong> When a product gets renamed, bulk replace all instances in documentation or marketing materials.
            </p>
            <p>
              <strong>Code refactoring:</strong> Rename variables, functions, or classes across code files. Use regex for more complex patterns.
            </p>
            <p>
              <strong>Format data:</strong> Add or remove formatting from lists, CSV files, or structured data.
            </p>
            <p>
              <strong>Remove unwanted text:</strong> Strip out boilerplate text, watermarks, or repeated phrases from copied content.
            </p>
            <p>
              <strong>Standardize terminology:</strong> Replace multiple variations of a term with a single consistent version.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Regular Expression Examples</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Remove extra spaces:</strong> Find <code>\s+</code> and replace with a single space to normalize whitespace.
            </p>
            <p>
              <strong>Swap first and last names:</strong> Find <code>(\w+)\s+(\w+)</code> and replace with <code>$2 $1</code> to reverse name order.
            </p>
            <p>
              <strong>Add commas to numbers:</strong> Use regex to format large numbers with thousand separators.
            </p>
            <p>
              <strong>Extract or replace emails:</strong> Find <code>\b[\w.-]+@[\w.-]+\.\w+\b</code> to match email addresses.
            </p>
            <p>
              <strong>Replace dates:</strong> Convert date formats like MM/DD/YYYY to YYYY-MM-DD using capture groups.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Review before replacing:</strong> Always check the match count before replacing. Unexpected matches can occur, especially with common substrings.
            </p>
            <p>
              <strong>Regex requires escaping:</strong> Special characters like <code>.</code>, <code>*</code>, and <code>?</code> have special meaning in regex. Escape them with <code>\</code> to match literally.
            </p>
            <p>
              <strong>Whole word prevents partial matches:</strong> Without whole word matching, replacing "he" would affect "the", "here", and "help".
            </p>
            <p>
              <strong>Large texts work fine:</strong> The tool handles documents of any size, but very large replacements may take a moment.
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
