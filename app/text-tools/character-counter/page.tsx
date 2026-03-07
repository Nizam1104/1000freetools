import type { Metadata } from "next";
import CharacterCounter from "@/components/text-tools/CharacterCounter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Character Counter — Count Characters Instantly for Any Platform",
  description:
    "Free online character counter with platform limits. Count characters with/without spaces for Twitter, SMS, meta descriptions, and more.",
  openGraph: {
    title: "Character Counter — Count Characters Instantly",
    description:
      "Free online character counter with platform limits. Count characters with/without spaces for Twitter, SMS, meta descriptions, and more.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/character-counter",
  },
};

const faqsData = [
  {
    question: "Is this character counter free?",
    answer:
      "Yes. This character counter is completely free with no registration required.",
  },
  {
    question: "Does it count spaces?",
    answer:
      "Yes. The tool shows both character counts: with spaces and without spaces. Most platforms count spaces toward their limits.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Why do character limits matter for SEO?",
    answer:
      "Google displays about 60 characters for page titles and 160 characters for meta descriptions in search results. Staying within these limits ensures your full title and description show without truncation.",
  },
  {
    question: "Do emojis count as one character?",
    answer:
      "Most platforms count emojis as 2 characters because they use multiple bytes in UTF-8 encoding. Some older systems may count them differently.",
  },
  {
    question: "How accurate are the platform limits shown?",
    answer:
      "The limits displayed (Twitter 280, SMS 160, etc.) are the official limits as of 2024. Platforms occasionally update these, so always verify with the platform directly for critical use cases.",
  },
];

export default function CharacterCounterPage() {
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
              <BreadcrumbLink href="/text-tools/character-counter">
                Character Counter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Character Counter</h1>
        <p className="text-xl text-muted-foreground">
          Whether you're writing a tweet, a meta description, or an SMS, this character counter keeps you inside the limit — with real-time feedback for every platform that actually matters.
        </p>
      </header>

      <CharacterCounter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Character Counter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This character counter processes text in real-time as you type or paste. It counts every character including letters, numbers, punctuation, spaces, and special characters.
            </p>
            <p>
              The tool displays two counts: characters with spaces and characters without spaces. Most platforms include spaces in their character limits, but some specific use cases (like certain programming contexts) may exclude them.
            </p>
            <p>
              Progress bars show how close you are to common platform limits. When you approach a limit, the counter provides visual feedback so you can adjust before hitting the ceiling.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Common Character Limits by Platform</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>SMS text messages:</strong> 160 characters per message. Longer texts get split into multiple messages, which may incur additional charges from carriers.
            </p>
            <p>
              <strong>Twitter/X posts:</strong> 280 characters for standard accounts. Premium accounts have higher limits.
            </p>
            <p>
              <strong>Google search titles:</strong> About 60 characters display fully in search results. Longer titles get truncated with an ellipsis.
            </p>
            <p>
              <strong>Meta descriptions:</strong> 155-160 characters display fully in Google search results.
            </p>
            <p>
              <strong>Instagram bio:</strong> 150 characters including spaces and emojis.
            </p>
            <p>
              <strong>YouTube video titles:</strong> 100 characters, though only about 60 display in search results.
            </p>
            <p>
              <strong>LinkedIn headlines:</strong> 220 characters for profile headlines.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses This Character Counter</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>SEO specialists:</strong> Meta titles and descriptions need to fit within Google's display limits. This counter helps craft snippets that show completely in search results.
            </p>
            <p>
              <strong>Social media managers:</strong> Every platform has different character limits. Writing posts that fit without truncation requires constant character counting.
            </p>
            <p>
              <strong>Developers:</strong> Database field limits, API payload constraints, and input validation often require exact character counts.
            </p>
            <p>
              <strong>Students:</strong> Some assignments specify character limits instead of word counts, especially for language learning exercises.
            </p>
            <p>
              <strong>Marketers:</strong> Email subject lines perform better under 60 characters. Ad copy for Google Ads has strict character limits per headline and description line.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Spaces usually count:</strong> Most social media platforms and search engines count spaces toward character limits. The "without spaces" count is mainly useful for specific technical applications.
            </p>
            <p>
              <strong>Emoji character counts vary:</strong> Emojis typically count as 2 characters due to UTF-8 encoding, but some platforms may display them differently. Test critical posts before publishing.
            </p>
            <p>
              <strong>Platform limits change:</strong> Twitter increased from 140 to 280 characters in 2017. Always verify current limits on the platform itself for important content.
            </p>
            <p>
              <strong>Display width differs from character count:</strong> Google and other search engines may truncate titles based on pixel width, not just character count. Wide characters like "W" take more space than "i".
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
