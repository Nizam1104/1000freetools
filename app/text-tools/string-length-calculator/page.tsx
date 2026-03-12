import type { Metadata } from "next";
import StringLengthCalculator from "@/components/text-tools/StringLengthCalculator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "String Length Calculator — Measure Exact String Length Online",
  description:
    "Free online string length calculator. Measure string length in characters, bytes, Unicode code points with per-line breakdown.",
  openGraph: {
    title: "String Length Calculator — Measure Exact String Length Online",
    description:
      "Free online string length calculator. Measure string length in characters, bytes, Unicode code points with per-line breakdown.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/string-length-calculator",
  },
};

const faqsData = [
  {
    question: "What's the difference between characters and code points?",
    answer:
      "Characters count JavaScript string length (UTF-16 code units), while code points count actual Unicode characters. Emojis and special characters may be multiple code units but one code point.",
  },
  {
    question: "Why do bytes differ from character count?",
    answer:
      "UTF-8 encoding uses 1-4 bytes per character. ASCII characters use 1 byte, but special characters and emojis use more. A single emoji can be 4 bytes.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What is multi-line mode?",
    answer:
      "Multi-line mode shows the length of each line separately, plus the total. Useful for checking individual line limits in forms or code.",
  },
  {
    question: "When do I need to know string length?",
    answer:
      "Developers check string length for database field limits, API input validation, form field constraints, and ensuring data fits within system limits.",
  },
  {
    question: "How are emojis counted?",
    answer:
      "Emojis are complex. A single emoji like 🌍 counts as 1 character visually, but may be 2 code units and 4 bytes in UTF-8 encoding.",
  },
];

export default function StringLengthCalculatorPage() {
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
              <BreadcrumbLink href="/text-tools/string-length-calculator">
                String Length Calculator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">String Length Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Know exactly how long your string is — in characters, bytes, and Unicode code points. Built for developers who need precise length checks for database fields, API limits, and input validation.
        </p>
      </header>

      <StringLengthCalculator />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How String Length Calculation Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool measures string length in multiple ways, all processed in your browser. Different contexts require different length measurements.
            </p>
            <p>
              Character count shows JavaScript string length (UTF-16 code units). Code points count actual Unicode characters. Byte count shows storage size in UTF-8 encoding.
            </p>
            <p>
              Multi-line mode breaks down length per line, useful for checking line-by-line constraints in forms, code, or data files.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses String Length Calculation</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Backend developers:</strong> Validate input lengths before database insertion. Ensure strings fit within VARCHAR column limits.
            </p>
            <p>
              <strong>API developers:</strong> Check payload sizes against API limits. Validate request parameters meet length requirements.
            </p>
            <p>
              <strong>Frontend developers:</strong> Implement client-side validation for form fields with maxlength attributes.
            </p>
            <p>
              <strong>Database administrators:</strong> Troubleshoot data truncation issues. Verify data fits within defined column sizes.
            </p>
            <p>
              <strong>Mobile developers:</strong> Work with SMS character limits, push notification payload sizes, and constrained display areas.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding String Length Measurements</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Characters (with spaces):</strong> Total character count including all spaces. Most common measurement for user-facing limits.
            </p>
            <p>
              <strong>Characters (without spaces):</strong> Excludes all space characters. Useful for word-based analysis or certain validation rules.
            </p>
            <p>
              <strong>Code points:</strong> Actual Unicode characters. Differs from JavaScript length for emojis and special characters.
            </p>
            <p>
              <strong>Bytes (UTF-8):</strong> Storage size in bytes. ASCII = 1 byte, European accented chars = 2 bytes, Asian chars/emojis = 3-4 bytes.
            </p>
            <p>
              <strong>Bytes (UTF-16):</strong> JavaScript internal encoding. Most common chars = 2 bytes, some emojis = 4 bytes (surrogate pairs).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Emojis are complex:</strong> A single emoji may count as 2 characters in JavaScript but 1 code point. Different systems count differently.
            </p>
            <p>
              <strong>Database limits are in bytes:</strong> VARCHAR(255) means 255 bytes in some databases, 255 characters in others. Know your database.
            </p>
            <p>
              <strong>Line endings matter:</strong> Windows uses \r\n (2 chars), Unix uses \n (1 char). This affects byte count for multi-line strings.
            </p>
            <p>
              <strong>Zero-width characters exist:</strong> Some Unicode characters have no visual width but still count toward string length.
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
