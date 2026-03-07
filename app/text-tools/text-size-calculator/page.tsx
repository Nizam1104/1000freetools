import type { Metadata } from "next";
import TextSizeCalculator from "@/components/text-tools/TextSizeCalculator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text Size Calculator — How Many Bytes, KB, or MB Is Your Text?",
  description:
    "Free online text size calculator. Calculate text size in bytes, KB, MB with UTF-8 and ASCII encoding breakdown.",
  openGraph: {
    title: "Text Size Calculator — How Many Bytes, KB, or MB Is Your Text?",
    description:
      "Free online text size calculator. Calculate text size in bytes, KB, MB with UTF-8 and ASCII encoding breakdown.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-size-calculator",
  },
};

const faqsData = [
  {
    question: "Why does UTF-8 use more bytes than ASCII?",
    answer:
      "UTF-8 is a variable-length encoding that uses 1-4 bytes per character. ASCII characters (0-127) use 1 byte, but special characters, emojis, and non-Latin scripts use 2-4 bytes.",
  },
  {
    question: "When should I care about text size?",
    answer:
      "Text size matters for API payloads, database field limits, email size limits, SMS messages, and HTTP request bodies where there are strict byte limits.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What's the difference between bytes and characters?",
    answer:
      "Characters are what you see. Bytes are how computers store them. ASCII characters use 1 byte each. Emojis and special characters can use 3-4 bytes each in UTF-8.",
  },
  {
    question: "Why do different encodings show different sizes?",
    answer:
      "ASCII only supports English characters and uses 1 byte per character. UTF-8 supports all Unicode characters but uses 1-4 bytes depending on the character. UTF-16 uses 2-4 bytes per character.",
  },
  {
    question: "How is KB calculated?",
    answer:
      "This tool uses the standard binary definition: 1 KB = 1024 bytes. Some systems use 1 KB = 1000 bytes (decimal), which is technically KiB vs KB.",
  },
];

export default function TextSizeCalculatorPage() {
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
              <BreadcrumbLink href="/text-tools/text-size-calculator">
                Text Size Calculator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text Size Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Stop guessing whether your payload is too large. Paste in your text and see its exact byte size in UTF-8, ASCII, and Unicode — before it breaks your API, your database, or your email client.
        </p>
      </header>

      <TextSizeCalculator />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How Text Size Calculation Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool calculates the exact byte size of your text using different character encodings. All processing happens in your browser.
            </p>
            <p>
              ASCII encoding uses 1 byte per character but only supports basic English letters, numbers, and symbols. UTF-8 supports all Unicode characters but uses 1-4 bytes per character depending on the character.
            </p>
            <p>
              The tool shows the size in bytes, kilobytes (KB), and megabytes (MB) so you can compare against system limits.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Text Size Limits</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>SMS messages:</strong> 160 characters (140 bytes for 7-bit encoding, 280 bytes for UTF-16).
            </p>
            <p>
              <strong>Twitter/X posts:</strong> 280 characters for standard accounts, but byte limits may apply for certain characters.
            </p>
            <p>
              <strong>Email subject lines:</strong> Typically 78 characters recommended, but technically limited by total email size (usually 10-25 MB).
            </p>
            <p>
              <strong>Database VARCHAR fields:</strong> Common sizes are VARCHAR(255), VARCHAR(500), VARCHAR(1000). The number is characters, but storage is bytes.
            </p>
            <p>
              <strong>API request bodies:</strong> Varies by API. Common limits are 1 MB, 4 MB, or 10 MB for POST request payloads.
            </p>
            <p>
              <strong>HTTP headers:</strong> Typically limited to 8 KB total for all headers combined.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses Text Size Calculation</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Developers:</strong> Check API payload sizes before sending requests. Ensure database fields can store the text. Debug encoding issues.
            </p>
            <p>
              <strong>Mobile developers:</strong> Optimize SMS messages and push notification payloads where byte limits are strict.
            </p>
            <p>
              <strong>Data engineers:</strong> Estimate storage requirements for text columns in databases and data warehouses.
            </p>
            <p>
              <strong>Email marketers:</strong> Keep email size under limits to avoid deliverability issues and ensure fast loading.
            </p>
            <p>
              <strong>IoT developers:</strong> Work with constrained devices where every byte matters for transmission and storage.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Character Encoding</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>ASCII:</strong> 7-bit encoding (128 characters) or 8-bit extended ASCII (256 characters). Only supports English and some European languages.
            </p>
            <p>
              <strong>UTF-8:</strong> Variable-length encoding. ASCII characters use 1 byte. European accented characters use 2 bytes. Asian characters and emojis use 3-4 bytes.
            </p>
            <p>
              <strong>UTF-16:</strong> Uses 2 bytes for most common characters, 4 bytes for rare characters. Used internally by JavaScript and Java.
            </p>
            <p>
              <strong>Why encoding matters:</strong> "Hello" is 5 bytes in any encoding. "Hello 🌍" is 9 bytes in UTF-8 (5 + 4 for emoji) but 7 characters.
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
