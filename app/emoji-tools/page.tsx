import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Smile, ArrowRight } from "lucide-react";

const emojiTools = [
  {
    name: "Animated Emoji GIF Maker",
    description: "Create animated GIF emojis from static emoji sequences",
    href: "/emoji-tools/animated-emoji-gif-maker",
  },
  {
    name: "Bulk Emoji Downloader",
    description: "Download multiple emojis at once in various formats",
    href: "/emoji-tools/bulk-emoji-downloader",
  },
  {
    name: "Emoji Art Generator",
    description: "Create pictures and designs using emoji characters",
    href: "/emoji-tools/emoji-art-generator",
  },
  {
    name: "Emoji Background Remover",
    description: "Remove backgrounds from emoji images",
    href: "/emoji-tools/emoji-background-remover",
  },
  {
    name: "Emoji Calendar Date",
    description: "Represent dates using emoji combinations",
    href: "/emoji-tools/emoji-calendar-date",
  },
  {
    name: "Emoji Combiner/Mixer",
    description: "Combine multiple emojis into new emoji sequences",
    href: "/emoji-tools/emoji-combiner-mixer",
  },
  {
    name: "Emoji Counter",
    description: "Count emoji occurrences in text",
    href: "/emoji-tools/emoji-counter",
  },
  {
    name: "Emoji Font Generator",
    description: "Generate emoji fonts for custom typography",
    href: "/emoji-tools/emoji-font-generator",
  },
  {
    name: "Emoji Keyboard (PC/Mac)",
    description: "Access emoji keyboard shortcuts for desktop",
    href: "/emoji-tools/emoji-keyboard-pc-mac",
  },
  {
    name: "Emoji Kitchen Mashup",
    description: "Mix two emojis to create fun combinations",
    href: "/emoji-tools/emoji-kitchen-mashup",
  },
  {
    name: "Emoji Password Generator",
    description: "Create secure passwords using emoji sequences",
    href: "/emoji-tools/emoji-password-generator",
  },
  {
    name: "Emoji Picker/Copy/Paste",
    description: "Browse and copy emojis for use in messages",
    href: "/emoji-tools/emoji-picker-copy-paste",
  },
  {
    name: "Emoji Prediction/Trends",
    description: "Analyze emoji usage patterns and trends",
    href: "/emoji-tools/emoji-prediction-trends",
  },
  {
    name: "Emoji Quiz Game",
    description: "Play guessing games with emoji puzzles",
    href: "/emoji-tools/emoji-quiz-game",
  },
  {
    name: "Emoji Size Changer",
    description: "Resize emoji images for different platforms",
    href: "/emoji-tools/emoji-size-changer",
  },
  {
    name: "Emoji Slider/Scale",
    description: "Create emoji rating scales for feedback",
    href: "/emoji-tools/emoji-slider-scale",
  },
  {
    name: "Emoji Style Converter",
    description: "Convert emojis between platform styles (Apple, Google, etc.)",
    href: "/emoji-tools/emoji-style-converter",
  },
  {
    name: "Emoji to Text Converter",
    description: "Translate emoji sequences to text descriptions",
    href: "/emoji-tools/emoji-to-text-converter",
  },
  {
    name: "Emoji Translator/Meaning",
    description: "Look up emoji meanings and translations",
    href: "/emoji-tools/emoji-translator-meaning",
  },
  {
    name: "Emoji Word Cloud",
    description: "Generate word clouds using emoji instead of words",
    href: "/emoji-tools/emoji-word-cloud",
  },
  {
    name: "Random Emoji Generator",
    description: "Generate random emojis for fun or testing",
    href: "/emoji-tools/random-emoji-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Emoji Tools Online - 21 Emoji Generators & Converters",
  description:
    "Free online emoji tools for creating, converting, and analyzing emojis. Generate emoji art, create passwords, convert styles, play games. All tools run in your browser.",
  openGraph: {
    title: "Free Emoji Tools Online - 21 Emoji Generators & Converters",
    description:
      "Free online emoji tools for creating, converting, and analyzing emojis. Generate emoji art, create passwords, convert styles, play games. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/emoji-tools",
  },
};

export default function EmojiToolsPage() {
  const faqsData = [
    {
      question: "Are these emoji tools really free?",
      answer:
        "Yes. All 21 emoji tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your emoji data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "Do these emojis work on all devices?",
      answer:
        "Emojis are Unicode characters that work across modern devices. However, emoji appearance varies by platform (Apple, Google, Samsung, Microsoft). Tools show how emojis render on different systems.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Can I download emojis as images?",
      answer:
        "Yes. Bulk Emoji Downloader and other tools let you save emojis as PNG or SVG files for use in designs, presentations, or documents.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Smile className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Emoji Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online emoji tools for creating, converting, and analyzing emojis.
              Generate emoji art, create passwords, convert styles — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={emojiTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Text Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our text tools or unicode tools for more character utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/text-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Text Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These Emoji Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 21 free emoji tools that run entirely in your browser. No software installation, no downloads, no waiting. You pick emojis, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: creating and generating emoji content (art, GIFs, passwords, word clouds), converting and transforming emojis (style conversion, text translation, resizing), analyzing emoji usage (counting, trends, predictions), and playing with emojis (quiz games, kitchen mashups, random generators).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Select emojis using the picker or paste existing emoji text</li>
              <li>Choose your output format or transformation type</li>
              <li>Adjust settings like size, style, or platform</li>
              <li>Copy, download, or share the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript and Unicode emoji handling. Your emoji data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Social media managers</strong> create emoji-heavy posts, generate emoji rating scales for feedback, or build emoji calendars for content planning.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Designers</strong> remove emoji backgrounds for use in graphics, convert emoji styles for cross-platform consistency, or create emoji art for presentations.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> test emoji rendering across platforms, generate emoji fonts for apps, or create emoji-based test data.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Teachers and parents</strong> play emoji quiz games with kids, create emoji passwords for fun learning, or use emoji counters for classroom activities.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Emoji Generation</h3>
            <p className="text-muted-foreground mb-4">
              Animated Emoji GIF Maker creates moving emoji animations. Emoji Art Generator builds pictures from emoji characters. Random Emoji Generator picks emojis for testing or fun. Emoji Password Generator creates memorable emoji-based passwords.
            </p>

            <h3 className="text-xl font-semibold mb-3">Emoji Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Emoji Style Converter translates between Apple, Google, Samsung, and Microsoft emoji designs. Emoji to Text Converter describes emoji sequences in words. Emoji Font Generator creates custom emoji typography.
            </p>

            <h3 className="text-xl font-semibold mb-3">Emoji Editing</h3>
            <p className="text-muted-foreground mb-4">
              Emoji Background Remover isolates emojis from backgrounds. Emoji Size Changer resizes for different platforms. Emoji Combiner/Mixer blends multiple emojis. Bulk Emoji Downloader saves multiple emojis at once.
            </p>

            <h3 className="text-xl font-semibold mb-3">Emoji Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Emoji Counter tallies emoji occurrences in text. Emoji Prediction/Trends analyzes usage patterns. Emoji Translator/Meaning looks up definitions and translations across languages.
            </p>

            <h3 className="text-xl font-semibold mb-3">Emoji Fun & Games</h3>
            <p className="text-muted-foreground mb-4">
              Emoji Kitchen Mashup combines two emojis into fun hybrids. Emoji Quiz Game creates guessing puzzles. Emoji Calendar Date represents dates with emojis. Emoji Slider/Scale builds rating interfaces.
            </p>

            <h3 className="text-xl font-semibold mb-3">Emoji Utilities</h3>
            <p className="text-muted-foreground mb-4">
              Emoji Picker/Copy/Paste provides quick emoji browsing. Emoji Keyboard (PC/Mac) shows desktop shortcuts. Emoji Word Cloud generates visual emoji frequency displays.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Platform differences:</strong> Emojis look different on Apple, Google, Samsung, and Microsoft devices. Tools show previews but actual rendering depends on the viewer's device.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Unicode version:</strong> New emojis require recent OS versions. Older devices may show blank boxes for newer emoji characters.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Emoji sequences:</strong> Some emojis combine (like skin tones or flags). Tools handle standard sequences but custom combinations may not render consistently.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Animated emojis:</strong> GIF exports work everywhere, but native animated emojis (like Apple's Memoji) require specific platforms.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Emojis are everywhere — in messages, social posts, documentation, even code commits. But emoji tools are scattered across apps, paid services, and platform-specific utilities. These tools exist because you shouldn't need to install software to remove an emoji background, convert emoji styles, or settle a debate about what an emoji means. Everything runs in your browser. No account, no downloads, no platform lock-in.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
