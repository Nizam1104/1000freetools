import type { Metadata } from "next";
import TextReverser from "@/components/text-tools/TextReverser";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text Reverser — Flip, Mirror & Reverse Any Text Online",
  description:
    "Free online text reverser. Reverse text by characters, words, or create mirror text with upside-down Unicode characters.",
  openGraph: {
    title: "Text Reverser — Flip, Mirror & Reverse Any Text Online",
    description:
      "Free online text reverser. Reverse text by characters, words, or create mirror text with upside-down Unicode characters.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-reverser",
  },
};

const faqsData = [
  {
    question: "What does the mirror text mode do?",
    answer:
      "Mirror text mode uses special Unicode characters that look like upside-down or flipped versions of regular letters. It creates text that appears upside down when viewed normally.",
  },
  {
    question: "Can I reverse each word individually?",
    answer:
      "Yes. The 'Reverse Each Word' option reverses the letters in each word while keeping the word order the same.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. This text reverser is completely free with no registration required.",
  },
  {
    question: "What is reverse word order?",
    answer:
      "Reverse word order flips the sequence of words while keeping each word intact. 'Hello world' becomes 'world Hello'.",
  },
  {
    question: "Can I reverse text by lines?",
    answer:
      "Yes. The 'Reverse by Line' option reverses the order of lines while keeping the content of each line unchanged.",
  },
  {
    question: "Does mirror text work everywhere?",
    answer:
      "Mirror text uses Unicode characters, so it works in most modern platforms including social media, messaging apps, and documents. Some older systems may not display it correctly.",
  },
];

export default function TextReverserPage() {
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
              <BreadcrumbLink href="/text-tools/text-reverser">
                Text Reverser
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text Reverser</h1>
        <p className="text-xl text-muted-foreground">
          Reverse your text by characters, by words, or line by line — or go full mirror mode with upside-down Unicode characters. Simple, instant, and oddly satisfying.
        </p>
      </header>

      <TextReverser />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Text Reverser Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool processes text entirely in your browser. Paste any text and choose from multiple reversal options.
            </p>
            <p>
              Character reversal flips every letter: "hello" becomes "olleh". Word order reversal keeps words intact but reverses their sequence: "hello world" becomes "world hello". Reverse each word flips letters within words but maintains word order.
            </p>
            <p>
              Mirror text mode maps each character to its Unicode upside-down equivalent. Not all characters have mirror equivalents, so some may display differently or fall back to the original character.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Social media posts:</strong> Create eye-catching upside-down text for Instagram captions, Twitter posts, or TikTok comments.
            </p>
            <p>
              <strong>Puzzles and games:</strong> Encode messages for scavenger hunts, escape rooms, or puzzle games.
            </p>
            <p>
              <strong>Programming tests:</strong> Test string manipulation functions and algorithms with reversed input.
            </p>
            <p>
              <strong>Data validation:</strong> Verify that systems handle reversed or unexpected text input correctly.
            </p>
            <p>
              <strong>Fun and pranks:</strong> Send messages that require effort to read, or create novelty content.
            </p>
            <p>
              <strong>Palindrome checking:</strong> Reverse text to verify if it reads the same forwards and backwards.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Reversal Types Explained</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Reverse Characters:</strong> Flips the entire string character by character. "Hello World" becomes "dlroW olleH".
            </p>
            <p>
              <strong>Reverse Word Order:</strong> Reverses the sequence of words. "Hello World" becomes "World Hello".
            </p>
            <p>
              <strong>Reverse Each Word:</strong> Flips letters within each word. "Hello World" becomes "olleH dlroW".
            </p>
            <p>
              <strong>Reverse by Line:</strong> Reverses line order in multi-line text. Useful for reordering lists or code.
            </p>
            <p>
              <strong>Mirror Text:</strong> Uses Unicode characters to create upside-down text. "Hello" becomes "ʇxǝHⱯ".
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Mirror text uses Unicode:</strong> Upside-down characters are real Unicode characters, not images. They copy and paste like regular text.
            </p>
            <p>
              <strong>Not all characters have mirrors:</strong> Some special characters and symbols don't have upside-down equivalents. These may display as the original character.
            </p>
            <p>
              <strong>Screen readers may struggle:</strong> Mirror text can confuse assistive technologies. Don't use it for important content that needs to be accessible.
            </p>
            <p>
              <strong>Search engines see normal text:</strong> Reversed text is still readable by search engines. Don't use reversal to hide keywords.
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
