import type { Metadata } from "next";
import TextLineSorter from "@/components/text-tools/TextLineSorter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text Line Sorter — Sort, Shuffle & Organize Lists Instantly",
  description:
    "Free online text line sorter. Sort lines alphabetically, by length, numerically, or randomly with options to remove blanks and trim whitespace.",
  openGraph: {
    title: "Text Line Sorter — Sort, Shuffle & Organize Lists Instantly",
    description:
      "Free online text line sorter. Sort lines alphabetically, by length, numerically, or randomly with options to remove blanks and trim whitespace.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-line-sorter",
  },
};

const faqsData = [
  {
    question: "What sorting methods are available?",
    answer:
      "You can sort alphabetically (A-Z or Z-A), by line length (shortest to longest or vice versa), numerically, or randomly shuffle the lines.",
  },
  {
    question: "Can I remove empty lines?",
    answer:
      "Yes. Enable the 'Remove blank lines' option to filter out empty lines from your sorted output.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What does trim whitespace do?",
    answer:
      "Trim whitespace removes leading and trailing spaces from each line before sorting. This ensures ' apple' and 'apple' are treated the same.",
  },
  {
    question: "Can I sort numbers correctly?",
    answer:
      "Yes. Use the 'Sort numerically' option to sort numbers by value (1, 2, 10) instead of alphabetically (1, 10, 2).",
  },
  {
    question: "How does random shuffle work?",
    answer:
      "The shuffle option randomizes line order using the Fisher-Yates algorithm. Each shuffle produces a new random order.",
  },
];

export default function TextLineSorterPage() {
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
              <BreadcrumbLink href="/text-tools/text-line-sorter">
                Text Line Sorter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text Line Sorter</h1>
        <p className="text-xl text-muted-foreground">
          Alphabetize a list, sort by length, shuffle randomly, or flip the order — this line sorter handles any list you throw at it, with one-click copy when you're done.
        </p>
      </header>

      <TextLineSorter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Text Line Sorter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool processes text line by line in your browser. Each line is treated as a separate item for sorting.
            </p>
            <p>
              Choose your sorting method: alphabetical (A-Z or Z-A), by line length, numerical, random shuffle, or reverse order. Options include removing blank lines and trimming whitespace before sorting.
            </p>
            <p>
              The sorted output appears instantly with a copy button for easy transfer to your document, spreadsheet, or code.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Alphabetize names:</strong> Sort lists of names, locations, or items alphabetically for directories, rosters, or indexes.
            </p>
            <p>
              <strong>Organize code imports:</strong> Sort import statements alphabetically to maintain clean, consistent code style.
            </p>
            <p>
              <strong>Sort data by value:</strong> Use numerical sorting to order prices, quantities, or measurements from smallest to largest.
            </p>
            <p>
              <strong>Randomize quiz options:</strong> Shuffle answer choices for tests and quizzes to prevent pattern guessing.
            </p>
            <p>
              <strong>Clean up copied data:</strong> Remove blank lines and trim whitespace from data pasted from websites or documents.
            </p>
            <p>
              <strong>Reverse list order:</strong> Flip a list upside-down, useful for reversing stack traces or chronological data.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Sorting Methods Explained</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Alphabetical A-Z:</strong> Standard dictionary order. "Apple" comes before "banana". Case-insensitive by default.
            </p>
            <p>
              <strong>Alphabetical Z-A:</strong> Reverse alphabetical order. Useful for finding items at the end of the alphabet quickly.
            </p>
            <p>
              <strong>By line length:</strong> Sorts from shortest line to longest (or vice versa). Useful for organizing text by complexity.
            </p>
            <p>
              <strong>Numerical:</strong> Sorts by numeric value. "2" comes before "10" (unlike alphabetical where "10" comes before "2").
            </p>
            <p>
              <strong>Random shuffle:</strong> Randomizes line order. Each shuffle produces a different arrangement.
            </p>
            <p>
              <strong>Reverse order:</strong> Flips the entire list. The last line becomes first, first becomes last.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>One item per line:</strong> Each line is treated as a separate sortable item. Multi-line entries won't work correctly.
            </p>
            <p>
              <strong>Whitespace affects sorting:</strong> Lines with leading spaces may sort differently. Use the trim option to normalize.
            </p>
            <p>
              <strong>Numbers in text:</strong> Alphabetical sorting treats numbers as characters. "Item 10" comes before "Item 2". Use numerical sort for pure number lists.
            </p>
            <p>
              <strong>Large lists work fine:</strong> The tool handles thousands of lines, but very large lists may take a moment to process.
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
