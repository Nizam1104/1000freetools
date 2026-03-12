import type { Metadata } from "next";
import SentenceCounter from "@/components/text-tools/SentenceCounter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Sentence Counter — Count Sentences, Paragraphs & Clauses Online",
  description:
    "Free online sentence counter with punctuation-aware parsing. Count sentences, paragraphs, clauses with readability scoring.",
  openGraph: {
    title: "Sentence Counter — Count Sentences, Paragraphs & Clauses Online",
    description:
      "Free online sentence counter with punctuation-aware parsing. Count sentences, paragraphs, clauses with readability scoring.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/sentence-counter",
  },
};

const faqsData = [
  {
    question: "How does the sentence counter handle abbreviations?",
    answer:
      "The tool recognizes common abbreviations like Mr., Mrs., Dr., etc. and doesn't count them as sentence endings.",
  },
  {
    question: "What is a clause?",
    answer:
      "A clause is a part of a sentence containing a subject and predicate. This tool estimates clause count based on punctuation and conjunctions.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "How is average sentence length calculated?",
    answer:
      "Average sentence length is calculated by dividing total words by total sentences. This metric is used in readability formulas like Flesch-Kincaid.",
  },
  {
    question: "Why is sentence count important?",
    answer:
      "Sentence count helps assess writing complexity. Academic writing often has specific sentence requirements. Shorter sentences improve readability for general audiences.",
  },
  {
    question: "Does it handle ellipses correctly?",
    answer:
      "Yes. The tool recognizes ellipses (...) as continuation markers, not sentence endings. This prevents false sentence counts.",
  },
];

export default function SentenceCounterPage() {
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
              <BreadcrumbLink href="/text-tools/sentence-counter">
                Sentence Counter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Sentence Counter</h1>
        <p className="text-xl text-muted-foreground">
          More accurate than just counting periods — this sentence counter handles abbreviations, ellipses, and complex punctuation to give you a real sentence count alongside paragraph and readability stats.
        </p>
      </header>

      <SentenceCounter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Sentence Counter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool uses punctuation-aware parsing to identify sentence boundaries. It processes text entirely in your browser.
            </p>
            <p>
              The counter looks for terminal punctuation (periods, question marks, exclamation points) but excludes false positives like abbreviations (Dr., Mr., etc.), decimal numbers (3.14), and ellipses (...).
            </p>
            <p>
              In addition to sentence count, the tool calculates paragraphs, clauses, average sentence length, and provides readability metrics based on standard formulas.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses Sentence Counting</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Students and academics:</strong> Many assignments specify sentence or paragraph requirements. Track your writing to meet guidelines.
            </p>
            <p>
              <strong>Content writers:</strong> Shorter sentences improve readability. Monitor average sentence length to keep content accessible.
            </p>
            <p>
              <strong>Technical writers:</strong> Documentation standards often specify maximum sentence length for clarity.
            </p>
            <p>
              <strong>Editors:</strong> Identify overly long sentences that may confuse readers. Break up complex sentences for better flow.
            </p>
            <p>
              <strong>Language learners:</strong> Practice writing complete sentences. Track progress in sentence construction skills.
            </p>
            <p>
              <strong>Legal professionals:</strong> Legal writing often has strict formatting requirements including sentence structure guidelines.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Readability Metrics</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Average sentence length:</strong> Shorter sentences (15-20 words) are easier to read. Long sentences (30+ words) can confuse readers.
            </p>
            <p>
              <strong>Sentences per paragraph:</strong> Web content typically uses 2-4 sentences per paragraph. Academic writing may use longer paragraphs.
            </p>
            <p>
              <strong>Clause density:</strong> More clauses per sentence indicate complex sentence structure. High clause density can reduce readability.
            </p>
            <p>
              <strong>Readability scores:</strong> Formulas like Flesch-Kincaid use sentence length and syllable count to estimate reading grade level.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Abbreviations are handled:</strong> Common abbreviations like Dr., Mr., Mrs., Ms., Jr., Sr., and Inc. are recognized and don't trigger sentence breaks.
            </p>
            <p>
              <strong>Edge cases exist:</strong> Unusual abbreviations or creative punctuation may not be recognized. Review the count for accuracy.
            </p>
            <p>
              <strong>Quotations handled correctly:</strong> Sentences ending with quoted speech are counted properly.
            </p>
            <p>
              <strong>Large documents work fine:</strong> The tool handles books and long documents, but very large texts may take a moment to process.
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
