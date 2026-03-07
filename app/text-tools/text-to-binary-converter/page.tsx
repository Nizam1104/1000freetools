import type { Metadata } from "next";
import TextToBinaryConverter from "@/components/text-tools/TextToBinaryConverter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text to Binary Converter — Encode & Decode Binary Instantly",
  description:
    "Free online text to binary converter. Convert text to binary and back with ASCII, hex, and decimal breakdowns.",
  openGraph: {
    title: "Text to Binary Converter — Encode & Decode Binary Instantly",
    description:
      "Free online text to binary converter. Convert text to binary and back with ASCII, hex, and decimal breakdowns.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-to-binary-converter",
  },
};

const faqsData = [
  {
    question: "How does text to binary conversion work?",
    answer:
      "Each character is converted to its ASCII code, which is then represented as an 8-bit binary number. For example, 'A' becomes 01000001.",
  },
  {
    question: "Can I decode binary back to text?",
    answer:
      "Yes. Switch to the 'Binary to Text' tab and paste your binary code. The tool will decode it back to readable text.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "What is ASCII?",
    answer:
      "ASCII (American Standard Code for Information Interchange) assigns numbers 0-127 to characters. Extended ASCII goes to 255. Unicode extends beyond that for international characters.",
  },
  {
    question: "Why are there 8 bits per character?",
    answer:
      "Standard ASCII uses 7 bits, but modern systems use 8-bit bytes. Each byte can represent 256 different values (0-255), covering ASCII and extended characters.",
  },
  {
    question: "Can I convert hex to binary?",
    answer:
      "Yes. The tool shows hexadecimal output alongside binary. Each hex digit represents 4 bits, so two hex digits equal one byte (8 bits).",
  },
];

export default function TextToBinaryConverterPage() {
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
              <BreadcrumbLink href="/text-tools/text-to-binary-converter">
                Text to Binary Converter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text to Binary Converter</h1>
        <p className="text-xl text-muted-foreground">
          Translate any text into binary code — or decode a wall of 0s and 1s back into readable English. With ASCII, hex, and decimal outputs all in one tool.
        </p>
      </header>

      <TextToBinaryConverter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How Text to Binary Conversion Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Computers store text as numbers. Each character gets assigned a numeric code (ASCII or Unicode), which is then stored as binary (0s and 1s).
            </p>
            <p>
              This tool converts each character to its ASCII code, then displays that number in binary (base-2), hexadecimal (base-16), and decimal (base-10) formats.
            </p>
            <p>
              For example, the letter 'A' has ASCII code 65, which is 01000001 in binary and 41 in hexadecimal. The tool shows all three representations side by side.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses Binary Conversion</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Computer science students:</strong> Learn how computers represent and store text data. Binary conversion is fundamental to understanding digital systems.
            </p>
            <p>
              <strong>Developers:</strong> Debug encoding issues, understand data transmission, or work with low-level protocols.
            </p>
            <p>
              <strong>Security researchers:</strong> Analyze encoded data, understand steganography, or work with binary file formats.
            </p>
            <p>
              <strong>Hardware engineers:</strong> Work with serial communication, UART protocols, or embedded systems that transmit text as binary.
            </p>
            <p>
              <strong>Puzzle enthusiasts:</strong> Create or solve binary-based puzzles, geocaches, or escape room challenges.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Binary Representation</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Binary (base-2):</strong> Uses only 0 and 1. Each position represents a power of 2. 01000001 = 64 + 1 = 65.
            </p>
            <p>
              <strong>Hexadecimal (base-16):</strong> Uses 0-9 and A-F. More compact than binary. Each hex digit equals 4 bits. 41 hex = 65 decimal.
            </p>
            <p>
              <strong>Decimal (base-10):</strong> The number system we use daily. ASCII codes are typically shown in decimal (A = 65).
            </p>
            <p>
              <strong>ASCII table:</strong> Characters 0-31 are control characters. 32-126 are printable (letters, numbers, punctuation). 127+ are extended ASCII.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Unicode vs ASCII:</strong> This tool uses standard ASCII (0-127). Extended characters and emojis use Unicode, which requires multiple bytes per character.
            </p>
            <p>
              <strong>Spaces have codes too:</strong> A space character is ASCII 32 (00100000 in binary). It's not "nothing" — it's a character with a specific code.
            </p>
            <p>
              <strong>Case matters:</strong> 'A' (65) and 'a' (97) have different ASCII codes. Binary conversion reflects this difference.
            </p>
            <p>
              <strong>Binary grouping:</strong> Binary is often shown in groups of 8 bits (one byte) for readability. Some systems group by 4 bits instead.
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
