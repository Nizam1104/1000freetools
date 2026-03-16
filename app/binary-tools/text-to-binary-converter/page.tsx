import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextToBinaryConverter from "@/components/binary-tools/text-to-binary-converter";
import TextToBinaryConverterSeo from "@/components/seo-content/binary-tools/text-to-binary-converter";

export const metadata: Metadata = {
  title: `Text to Binary Converter | Free Online Text to Binary`,
  description: `Convert text to binary code instantly. Free online text to binary translator for ASCII and UTF-8. Simple, fast, and useful for coding and education.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/text-to-binary-converter`,
  },
};

const tools = [
  {
    name: `Binary Bit Flipper & Manipulator`,
    description: `Binary Bit Flipper & Manipulator`,
    href: `/binary-tools/binary-bit-flipper-manipulator`,
  },
  {
    name: `Binary to Hexadecimal Converter`,
    description: `Binary to Hexadecimal Converter`,
    href: `/binary-tools/binary-to-hexadecimal-converter`,
  },
  {
    name: `Decimal to Binary Converter`,
    description: `Decimal to Binary Converter`,
    href: `/binary-tools/decimal-to-binary-converter`,
  },
  {
    name: `Binary Gray Code Converter`,
    description: `Binary Gray Code Converter`,
    href: `/binary-tools/binary-gray-code-converter`,
  },
  {
    name: `Binary to Octal Converter`,
    description: `Binary to Octal Converter`,
    href: `/binary-tools/binary-to-octal-converter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
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
];

export default function TextToBinaryConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Text to Binary Converter</h1>
        <p className="text-muted-foreground">
          Translate any text into binary code. This free tool converts letters,
          numbers, and symbols into their binary equivalent. Use it for
          learning, programming, or data encoding projects.
        </p>
      </header>
      <div className="mt-8">
        <TextToBinaryConverter />
      </div>
      <div className="mt-8">
        <TextToBinaryConverterSeo />
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
