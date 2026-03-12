import type { Metadata } from "next";
import RandomTextShuffler from "@/components/text-tools/RandomTextShuffler";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text Shuffler — Randomize Lines, Sentences & Words Online",
  description:
    "Free online text shuffler. Randomize lines, sentences, words, or characters with optional seeded randomization for reproducible results.",
  openGraph: {
    title: "Text Shuffler — Randomize Lines, Sentences & Words Online",
    description:
      "Free online text shuffler. Randomize lines, sentences, words, or characters with optional seeded randomization for reproducible results.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/random-text-shuffler",
  },
};

const faqsData = [
  {
    question: "What can I shuffle?",
    answer:
      "You can shuffle by lines, sentences, words, or individual characters. Choose the option that best fits your needs.",
  },
  {
    question: "What does 'seeded shuffle' mean?",
    answer:
      "Using a seed allows you to reproduce the same shuffle order. Enter the same seed value to get the same random order every time.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "How random is the shuffle?",
    answer:
      "The tool uses the Fisher-Yates shuffle algorithm, which produces uniformly random permutations. Every possible order is equally likely.",
  },
  {
    question: "When would I use seeded randomization?",
    answer:
      "Seeded shuffle is useful for testing (reproducible results), creating consistent quiz versions, or when you need to regenerate the same random order.",
  },
  {
    question: "Can I shuffle a list of names?",
    answer:
      "Yes. Paste one name per line and shuffle by lines to randomize the order. Perfect for raffles, team assignments, or presentation order.",
  },
];

export default function RandomTextShufflerPage() {
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
              <BreadcrumbLink href="/text-tools/random-text-shuffler">
                Random Text Shuffler
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Random Text Shuffler</h1>
        <p className="text-xl text-muted-foreground">
          Shuffle a list into a new random order, scramble sentence positions in a paragraph, or randomize words within a sentence — with one click and a copy button waiting at the end.
        </p>
      </header>

      <RandomTextShuffler />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Text Shuffler Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool randomizes the order of text elements using the Fisher-Yates shuffle algorithm. All processing happens in your browser.
            </p>
            <p>
              Choose what to shuffle (lines, sentences, words, or characters), optionally enter a seed for reproducible results, and click shuffle.
            </p>
            <p>
              The shuffled output appears instantly with a copy button. Shuffle again for a new random order, or use the same seed to reproduce a previous result.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Randomize quiz options:</strong> Shuffle answer choices to prevent pattern guessing. Create multiple test versions with different answer orders.
            </p>
            <p>
              <strong>Team assignments:</strong> Randomly assign people to teams by shuffling a name list and splitting into groups.
            </p>
            <p>
              <strong>Raffle drawings:</strong> Shuffle participant names and pick winners from the top of the randomized list.
            </p>
            <p>
              <strong>Language learning:</strong> Scramble sentence word order for grammar exercises. Students reconstruct the correct sentence.
            </p>
            <p>
              <strong>A/B testing:</strong> Randomize test condition order or create shuffled stimulus sets for experiments.
            </p>
            <p>
              <strong>Content variation:</strong> Shuffle bullet points or paragraph order to create unique content variations.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Shuffle Types Explained</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Shuffle by lines:</strong> Randomizes the order of lines. Each line stays intact but lines change position. Best for lists and names.
            </p>
            <p>
              <strong>Shuffle by sentences:</strong> Randomizes sentence order within a paragraph. Each sentence stays intact. Good for content variation.
            </p>
            <p>
              <strong>Shuffle by words:</strong> Randomizes word order within the text. Creates scrambled sentences. Useful for language exercises.
            </p>
            <p>
              <strong>Shuffle by characters:</strong> Randomizes individual character order. Creates completely scrambled text. Fun for puzzles.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Seeded Randomization</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Without a seed:</strong> Each shuffle produces a different random order based on the current time. Results cannot be reproduced.
            </p>
            <p>
              <strong>With a seed:</strong> The same seed always produces the same shuffle order. Seed "123" will always give the same result.
            </p>
            <p>
              <strong>When to use seeds:</strong> Testing (reproducible results), creating consistent versions, or when you need to verify a specific shuffle.
            </p>
            <p>
              <strong>Seed format:</strong> Any text or number works as a seed. "test123", "42", or "my-seed" all work. Same input = same output.
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
