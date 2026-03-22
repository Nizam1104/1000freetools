import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import LoremIpsumGenerator from "@/components/ascii-tools/lorem-ipsum-generator";
import LoremIpsumGeneratorSeo from "@/components/seo-content/ascii-tools/lorem-ipsum-generator";

export const metadata: Metadata = {
  title: `Lorem Ipsum Generator: Dummy Text for Designers Free`,
  description: `Free Lorem Ipsum generator. Create custom placeholder text with paragraphs, words, or characters. HTML formatting available. Perfect for mockups, design, and typesetting.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/lorem-ipsum-generator`,
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

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Lorem Ipsum Generator: Placeholder Text for Designers
        </h1>
        <p className="text-muted-foreground">
          Generate custom Lorem Ipsum placeholder text for your designs,
          mockups, and layouts. Choose number of paragraphs, words, or
          characters. Output as plain text or HTML. Perfect for web design and
          print.
        </p>
      </header>
      <div className="mt-8">
        <LoremIpsumGenerator />
      </div>
      <div className="mt-8">
        <LoremIpsumGeneratorSeo />
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
