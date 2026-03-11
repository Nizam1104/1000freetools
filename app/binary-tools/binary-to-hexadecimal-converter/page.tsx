import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryToHexadecimalConverter from "@/components/binary-tools/binary-to-hexadecimal-converter";
import BinaryToHexadecimalConverterSeo from "@/components/seo-content/binary-tools/binary-to-hexadecimal-converter";

export const metadata: Metadata = {
  title: `Binary to Hex Converter | Free Binary to Hexadecimal`,
  description: `Convert binary to hexadecimal instantly. Free online binary to hex converter. Groups bits into nibbles for easy reading. Useful for programmers and engineers.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-to-hexadecimal-converter`,
  },
};

const tools = [
  {
    name: `Binary Bit Flipper & Manipulator`,
    description: `Binary Bit Flipper & Manipulator`,
    href: `/binary-tools/binary-bit-flipper-manipulator`,
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

export default function BinaryToHexadecimalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Binary to Hexadecimal Converter
        </h1>
        <p className="text-muted-foreground">
          Convert binary numbers to hexadecimal format. This tool translates
          base-2 binary into compact hex (base-16) notation. Commonly used in
          programming, debugging, and low-level system work.
        </p>
      </header>
      <div className="mt-8">
        <BinaryToHexadecimalConverter />
      </div>
      <div className="mt-8">
        <BinaryToHexadecimalConverterSeo />
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
