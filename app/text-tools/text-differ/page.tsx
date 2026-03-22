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
    name: `Case Converter`,
    description: `Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more`,
    href: `/text-tools/case-converter`,
  },
  {
    name: `Word Counter`,
    description: `Count words, characters, sentences, and reading time instantly`,
    href: `/text-tools/word-counter`,
  },
  {
    name: `Character Counter`,
    description: `Count characters with/without spaces for Twitter, SMS, meta descriptions`,
    href: `/text-tools/character-counter`,
  },
  {
    name: `Find and Replace Text`,
    description: `Bulk edit text with regex support and case-sensitive matching`,
    href: `/text-tools/find-and-replace-text`,
  },
  {
    name: `Remove Duplicate Lines`,
    description: `Remove duplicates from lists, CSV data, email lists, and keywords`,
    href: `/text-tools/remove-duplicate-lines`,
  },
  {
    name: `Duplicate Word Remover`,
    description: `Remove repeated words from text, keyword lists, and tag clouds`,
    href: `/text-tools/duplicate-word-remover`,
  },
  {
    name: `Whitespace Remover`,
    description: `Remove extra spaces, tabs, and blank lines from messy text`,
    href: `/text-tools/whitespace-remover`,
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
