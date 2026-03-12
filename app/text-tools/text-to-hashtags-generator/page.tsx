import type { Metadata } from "next";
import TextToHashtagsGenerator from "@/components/text-tools/TextToHashtagsGenerator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Text to Hashtags Generator — Extract Trending Hashtags from Any Text",
  description:
    "Free online hashtag generator. Extract relevant hashtags from text for Instagram, Twitter, LinkedIn, and TikTok.",
  openGraph: {
    title: "Text to Hashtags Generator — Extract Trending Hashtags from Any Text",
    description:
      "Free online hashtag generator. Extract relevant hashtags from text for Instagram, Twitter, LinkedIn, and TikTok.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/text-to-hashtags-generator",
  },
};

const faqsData = [
  {
    question: "How does the hashtag generator work?",
    answer:
      "The tool extracts key words and topics from your text and converts them into hashtags. It filters out common words and focuses on meaningful terms.",
  },
  {
    question: "Are the hashtags platform-specific?",
    answer:
      "Yes. The tool organizes hashtags by platform (Instagram, Twitter/X, LinkedIn, TikTok) based on each platform's character limits and best practices.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Can I copy hashtags without the # symbol?",
    answer:
      "Yes. You can copy hashtags with or without the # symbol depending on your needs.",
  },
  {
    question: "How many hashtags should I use?",
    answer:
      "Instagram allows up to 30 hashtags per post. Twitter works best with 1-3 hashtags. LinkedIn recommends 3-5. TikTok can use 3-5 or more depending on content.",
  },
  {
    question: "Should I use trending or niche hashtags?",
    answer:
      "Mix both. Trending hashtags increase visibility but have more competition. Niche hashtags have less competition and more engaged audiences.",
  },
];

export default function TextToHashtagsGeneratorPage() {
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
              <BreadcrumbLink href="/text-tools/text-to-hashtags-generator">
                Text to Hashtags Generator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text to Hashtags Generator</h1>
        <p className="text-xl text-muted-foreground">
          Stop guessing which hashtags to use. Paste your caption or topic and instantly get platform-optimized hashtag suggestions — tiered by popularity and ready to copy straight into your post.
        </p>
      </header>

      <TextToHashtagsGenerator />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Hashtag Generator Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool analyzes your text to identify key topics, themes, and keywords. It then converts these into relevant hashtags.
            </p>
            <p>
              The generator filters out common stop words and focuses on meaningful terms that people actually search for. Hashtags are organized by platform and popularity tier.
            </p>
            <p>
              All processing happens in your browser. Your text and generated hashtags stay private.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Hashtag Best Practices by Platform</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Instagram:</strong> Up to 30 hashtags allowed. Mix popular (1M+ posts), medium (100K-1M), and niche (under 100K) hashtags. Place in caption or first comment.
            </p>
            <p>
              <strong>Twitter/X:</strong> 1-3 hashtags perform best. Tweets with hashtags get more engagement but too many looks spammy. Keep them short and relevant.
            </p>
            <p>
              <strong>LinkedIn:</strong> 3-5 hashtags recommended. Use industry-specific tags and follow relevant hashtag pages. Professional tone works best.
            </p>
            <p>
              <strong>TikTok:</strong> 3-5 hashtags typical. Mix trending sounds/challenges with niche content tags. Hashtag challenges drive discovery.
            </p>
            <p>
              <strong>Facebook:</strong> Limited hashtag use. 1-2 relevant hashtags can help but don't expect significant reach improvement.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses Hashtag Generators</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Social media managers:</strong> Generate hashtags quickly for multiple clients and platforms. Maintain consistent tagging strategies.
            </p>
            <p>
              <strong>Influencers and creators:</strong> Find relevant hashtags to increase post discoverability and reach new audiences.
            </p>
            <p>
              <strong>Small business owners:</strong> Compete with larger brands by using targeted niche hashtags that reach specific audiences.
            </p>
            <p>
              <strong>Content marketers:</strong> Extend content reach by adding relevant hashtags when sharing blog posts and articles.
            </p>
            <p>
              <strong>Event organizers:</strong> Create and promote event-specific hashtags while adding popular related tags for broader reach.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Hashtag Tiers</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>High popularity (1M+ posts):</strong> Massive reach but high competition. Posts get buried quickly. Examples: #love, #instagood, #photooftheday.
            </p>
            <p>
              <strong>Medium popularity (100K-1M posts):</strong> Good balance of reach and competition. Posts stay visible longer. Examples: #foodphotography, #travelblogger.
            </p>
            <p>
              <strong>Niche hashtags (under 100K posts):</strong> Lower reach but highly engaged audiences. Posts stay visible for days. Examples: #veganmealprep, #sustainablefashion.
            </p>
            <p>
              <strong>Branded hashtags:</strong> Unique to your brand or campaign. Lower reach but builds community. Examples: #JustDoIt, #ShareACoke.
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
