import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextDiffer from "@/components/text-tools/text-differ";
import TextDifferSeo from "@/components/seo-content/string-tools/text-differ";

export const metadata: Metadata = {
  title: `Text Differ: Compare Text Online and Find Differences`,
  description: `Free text comparison tool. Compare two texts side-by-side and highlight differences. Shows additions, deletions, and changes. Perfect for code review and version control.`,
  alternates: {
    canonical: `https://1000freetools.com/text-tools/text-differ`,
  },
};

const tools = [
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
  },
  {
    name: `Leet Speak Converter`,
    description: `Leet Speak Converter: Convert Text to 1337 Online`,
    href: `/ascii-tools/leet-speak-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
];

export default function TextDifferPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text Differ: Compare Text and Find Differences
        </h1>
        <p className="text-muted-foreground">
          Compare two versions of text and instantly see what changed.
          Side-by-side diff with color-coded additions, deletions, and
          modifications. Perfect for code reviews, document versioning, and
          plagiarism detection.
        </p>
      </header>
      <div className="mt-8">
        <TextDiffer />
      </div>
      <div className="mt-8">
        <TextDifferSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
