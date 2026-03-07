import type { Metadata } from "next";
import DuplicateWordRemover from "@/components/text-tools/DuplicateWordRemover";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Duplicate Word Remover — Clean Up Repetitive Text Instantly",
  description:
    "Free online duplicate word remover. Remove repeated words from text, keyword lists, and tag clouds with case sensitivity options.",
  openGraph: {
    title: "Duplicate Word Remover — Clean Up Repetitive Text Instantly",
    description:
      "Free online duplicate word remover. Remove repeated words from text, keyword lists, and tag clouds with case sensitivity options.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/duplicate-word-remover",
  },
};

const faqsData = [
  {
    question: "How does duplicate word detection work?",
    answer:
      "The tool identifies repeated words and keeps only the first occurrence of each. You can enable case-sensitive matching to treat 'Word' and 'word' as different.",
  },
  {
    question: "Can I output as a list?",
    answer:
      "Yes. Choose 'Comma-separated list' to get your deduplicated words as a list instead of a paragraph.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Does it preserve punctuation?",
    answer:
      "Yes. The tool can preserve punctuation marks. Words with different punctuation (like 'word' vs 'word,') are treated as different entries when punctuation preservation is enabled.",
  },
  {
    question: "Can I remove duplicates from a keyword list?",
    answer:
      "Yes. This is a common use case. Paste your keyword list and the tool will remove duplicate keywords while preserving the order.",
  },
  {
    question: "What's the difference between duplicate words and duplicate lines?",
    answer:
      "Duplicate word remover finds repeated words within text (like 'the the'). Duplicate line remover finds repeated entire lines in a list. Use the tool that matches your data format.",
  },
];

export default function DuplicateWordRemoverPage() {
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
              <BreadcrumbLink href="/text-tools/duplicate-word-remover">
                Duplicate Word Remover
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Duplicate Word Remover</h1>
        <p className="text-xl text-muted-foreground">
          Whether you're cleaning up a keyword list, a tag cloud, or a draft full of repeated phrases — this tool strips every duplicate word and gives you back a lean, clean version.
        </p>
      </header>

      <DuplicateWordRemover />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Duplicate Word Remover Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool scans your text word by word and tracks which words it has seen. When a duplicate is found, it's removed from the output.
            </p>
            <p>
              The tool maintains the original order of your text, keeping the first occurrence of each unique word. Options include case-sensitive matching and punctuation preservation.
            </p>
            <p>
              Output can be formatted as a paragraph, comma-separated list, or other formats depending on your needs.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Keyword list cleanup:</strong> SEO professionals often end up with duplicate keywords when merging lists from multiple tools. Remove duplicates before importing to your SEO platform.
            </p>
            <p>
              <strong>Tag cloud generation:</strong> Create clean tag clouds by removing duplicate tags. Each topic should appear once, with size indicating frequency.
            </p>
            <p>
              <strong>Social media bio optimization:</strong> Instagram and Twitter bios have character limits. Remove repeated words to maximize information density.
            </p>
            <p>
              <strong>Writing cleanup:</strong> First drafts often contain repeated words and phrases. Use this tool to identify and remove unintentional repetition.
            </p>
            <p>
              <strong>Hashtag deduplication:</strong> Remove duplicate hashtags from social media posts while keeping unique tags.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Word boundaries matter:</strong> The tool splits text on spaces and punctuation. "keyword" and "keywords" are different words.
            </p>
            <p>
              <strong>Case sensitivity is optional:</strong> By default, "Word" and "word" are treated as the same. Enable case-sensitive matching if capitalization matters.
            </p>
            <p>
              <strong>Order is preserved:</strong> The first occurrence of each word is kept. This maintains the original flow and emphasis of your text.
            </p>
            <p>
              <strong>Not a grammar checker:</strong> Removing duplicate words doesn't guarantee grammatically correct output. Review the result before using.
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
