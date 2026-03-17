import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UpsideDownTextGenerator from "@/components/ascii-tools/upside-down-text-generator";
import UpsideDownTextGeneratorSeo from "@/components/seo-content/ascii-tools/upside-down-text-generator";

export const metadata: Metadata = {
  title: `Upside Down Text Generator: Create sıɥʇ ǝʞıן Text`,
  description: `Free upside down text generator. Flip text online using Unicode characters. Perfect for social media, memes, and creative posts. Copy and paste ready.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/upside-down-text-generator`,
  },
};

const tools = [
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
  },
  {
    name: `Text Differ`,
    description: `Text Differ: Compare Text and Find Differences`,
    href: `/ascii-tools/text-differ`,
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

export default function UpsideDownTextGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Upside Down Text Generator: Flip Text Online
        </h1>
        <p className="text-muted-foreground">
          Create upside-down text that actually renders as flipped in browsers
          and apps. Perfect for social media bios, memes, and creative posts.
          Just type and your text appears upside down using special Unicode
          characters.
        </p>
      </header>
      <div className="mt-8">
        <UpsideDownTextGenerator />
      </div>
      <div className="mt-8">
        <UpsideDownTextGeneratorSeo />
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
