import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import DecimalToBinaryConverter from "@/components/binary-tools/decimal-to-binary-converter";
import DecimalToBinaryConverterSeo from "@/components/seo-content/binary-tools/decimal-to-binary-converter";

export const metadata: Metadata = {
  title: `Decimal to Binary Converter | Free Base-10 to Base-2`,
  description: `Convert decimal to binary numbers instantly. Free online decimal to binary converter with step-by-step explanation. Perfect for learning and digital systems.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/decimal-to-binary-converter`,
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
    name: `Binary to Decimal Converter`,
    description: `Binary to Decimal Converter`,
    href: `/binary-tools/binary-to-decimal-converter`,
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

export default function DecimalToBinaryConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Decimal to Binary Converter</h1>
        <p className="text-muted-foreground">
          Convert decimal numbers to binary code. This free tool transforms
          base-10 integers into their binary (base-2) equivalent. Ideal for
          computer science students and software developers.
        </p>
      </header>
      <div className="mt-8">
        <DecimalToBinaryConverter />
      </div>
      <div className="mt-8">
        <DecimalToBinaryConverterSeo />
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
