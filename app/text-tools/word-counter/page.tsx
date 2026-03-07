import type { Metadata } from "next";
import WordCounter from "@/components/text-tools/WordCounter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Word Counter — Instant Word & Character Count Online",
  description:
    "Free online word counter with real-time stats. Count words, characters, sentences, paragraphs, reading time, and keyword density.",
  openGraph: {
    title: "Word Counter — Instant Word & Character Count Online",
    description:
      "Free online word counter with real-time stats. Count words, characters, sentences, paragraphs, reading time, and keyword density.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/word-counter",
  },
};

const faqsData = [
  {
    question: "Is this word counter really free?",
    answer:
      "Yes. This word counter is completely free with no registration required. Use it as much as you need.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device or gets stored on any server.",
  },
  {
    question: "How accurate is the reading time estimate?",
    answer:
      "Reading time uses 200 words per minute, which is the standard average for adult readers. Speaking time uses 130 WPM, typical for presentations and audiobooks. Actual times vary based on text complexity and individual reading speed.",
  },
  {
    question: "Can I use this word counter offline?",
    answer:
      "Yes. Once the page loads, the word counter works entirely offline. All processing happens locally in your browser with no internet connection required.",
  },
  {
    question: "How does keyword density work?",
    answer:
      "Keyword density shows what percentage of your total words each unique word represents. For SEO content, aim for 1-2% density on target keywords. Higher densities can trigger keyword stuffing filters in search engines.",
  },
  {
    question: "What counts as a word?",
    answer:
      "Words are counted as sequences of characters separated by spaces. Hyphenated words like 'well-known' count as one word. Contractions like 'don't' count as one word. Numbers separated by spaces count individually.",
  },
  {
    question: "Does this work for languages other than English?",
    answer:
      "Yes. The word counter processes any text using standard word boundary detection. Character counts work for all languages. Reading time estimates assume similar reading speeds across languages.",
  },
];

export default function WordCounterPage() {
  return (
    <main className="w-full max-w-3xl mx-auto py-10">
      <div className="mb-6">
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
              <BreadcrumbLink href="/text-tools/word-counter">
                Word Counter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Word Counter
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Paste your essay, article, tweet, or novel draft and get an instant breakdown of words, characters, sentences, and reading time — all updating live as you type.
        </p>
      </header>

      <WordCounter />

      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-10 mt-10">
        <section className="space-y-10">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              How the Word Counter Works
            </h2>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                This word counter runs entirely in your browser using JavaScript. When you paste or type text, it processes everything locally — no data gets sent to any server.
              </p>
              <p>
                The tool counts words by splitting on whitespace boundaries, characters with and without spaces, sentences by detecting terminal punctuation (periods, exclamation marks, question marks), and paragraphs by line breaks. Reading and speaking times derive from the word count divided by standard rates: 200 WPM for reading, 130 WPM for speaking.
              </p>
              <p>
                Keyword density calculates how often each word appears as a percentage of total word count. The tool automatically excludes common stop words from the density analysis when enabled.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Who Uses This Word Counter
            </h2>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Students writing essays:</strong> Most high school and college essays have word count requirements. Paste your draft to check if you hit the target without manually counting.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Content writers and bloggers:</strong> SEO articles often need 1,000+ words. Meta descriptions should stay under 160 characters. This tool shows both counts simultaneously.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Social media managers:</strong> Twitter limits posts to 280 characters. Instagram captions allow 2,200. The character count updates as you write so you don't overshoot.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Authors and novelists:</strong> Track your daily writing output. NaNoWriMo participants use word counters to hit 50,000 words in 30 days.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Academic researchers:</strong> Journal submissions often have strict word limits for abstracts (150-300 words) and full papers.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              What to Know Before Using This Tool
            </h2>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Word count methods vary:</strong> Different tools count words slightly differently. Google Docs, Microsoft Word, and this counter may show small variations, especially with hyphenated words, contractions, or special characters.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Reading time is an estimate:</strong> The 200 WPM standard assumes average adult reading speed. Technical content, dense academic writing, or text with complex vocabulary will take longer to read.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Large texts may slow down:</strong> Pasting 50,000+ words may cause brief lag as the browser processes everything. The tool handles it, but give it a moment.
              </p>
              <p>
                <strong className="font-medium text-zinc-900 dark:text-zinc-100">Keyword density isn't everything:</strong> For SEO, natural writing matters more than hitting exact density percentages. Use keyword data as a guide, not a rule.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
              Frequently Asked Questions
            </h2>
            <Faqs faqs={faqsData} />
          </div>
        </section>
      </div>
    </main>
  );
}
