import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryGrayCodeConverter from "@/components/binary-tools/binary-gray-code-converter";
import BinaryGrayCodeConverterSeo from "@/components/seo-content/binary-tools/binary-gray-code-converter";

export const metadata: Metadata = {
  title: `Binary to Gray Code Converter | Free Online Tool`,
  description: `Convert binary to Gray code and Gray code to binary. Free online converter with XOR algorithm explanation. Useful for digital electronics and error reduction.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-gray-code-converter`,
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

export default function BinaryGrayCodeConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Binary Gray Code Converter</h1>
        <p className="text-muted-foreground">
          Convert between binary and Gray code. This tool translates standard
          binary to reflected binary code (Gray code) and vice versa. Used in
          digital communications, encoders, and Karnaugh maps.
        </p>
      </header>
      <div className="mt-8">
        <BinaryGrayCodeConverter />
      </div>
      <div className="mt-8">
        <BinaryGrayCodeConverterSeo />
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
