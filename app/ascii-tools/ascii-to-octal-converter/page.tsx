import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiToOctalConverter from "@/components/ascii-tools/ascii-to-octal-converter";
import AsciiToOctalConverterSeo from "@/components/seo-content/ascii-tools/ascii-to-octal-converter";

export const metadata: Metadata = {
  title: `ASCII to Octal Converter: Text to Base-8 Online Tool`,
  description: `Free ASCII to octal converter. Translate text to octal numbers and back. Perfect for Unix permissions, legacy systems, and CS education. Simple and accurate conversion.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-to-octal-converter`,
  },
};

const tools = [
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `MD5 Hash Generator & Checker`,
    description: `MD5 Hash Generator & Checker`,
    href: `/hash-tools/md5-hash-generator-checker`,
  },
  {
    name: `TOML to JSON Converter`,
    description: `Convert TOML to JSON Instantly`,
    href: `/toml-tools/toml-to-json-converter`,
  },
];

export default function AsciiToOctalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII to Octal Converter: Text to Base-8 Translator
        </h1>
        <p className="text-muted-foreground">
          Easily convert ASCII characters to octal numbers and decode octal to
          plain text. Ideal for working with Unix/Linux systems, understanding
          legacy encoding, and computer science fundamentals.
        </p>
      </header>
      <div className="mt-8">
        <AsciiToOctalConverter />
      </div>
      <div className="mt-8">
        <AsciiToOctalConverterSeo />
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
