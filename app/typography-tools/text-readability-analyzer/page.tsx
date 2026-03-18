import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { TextReadabilityAnalyzer } from "@/components/text-tools/text-readability-analyzer.tsx";
import TextReadabilityAnalyzerSeo from "@/components/seo-content/typography-tools/text-readability-analyzer";

export const metadata: Metadata = {
  title: `Readability Analyzer | Check Text Readability Online`,
  description: `Analyze text readability with Flesch-Kincaid scores, contrast checks, and line length analysis. Improve your typography for better accessibility.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/text-readability-analyzer`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
  },
  {
    name: `Letter Spacing Tool`,
    description: `Letter Spacing & Kerning Tool`,
    href: `/typography-tools/letter-spacing-tool`,
  },
  {
    name: `Line Height Generator`,
    description: `Line Height Calculator`,
    href: `/typography-tools/line-height-generator`,
  },
  {
    name: `Font Size Converter`,
    description: `Font Size Unit Converter`,
    href: `/typography-tools/font-size-converter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function TextReadabilityAnalyzerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Text Readability Checker</h1>
        <p className="text-muted-foreground">
          Analyze your text for readability. Get scores for reading ease,
          contrast, and line length, with suggestions to make your typography
          more accessible.
        </p>
      </header>
      {<TextReadabilityAnalyzer />}
      <div className="mt-8"><TextReadabilityAnalyzerSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
