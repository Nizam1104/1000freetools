import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryToOctalConverter from "@/components/binary-tools/binary-to-octal-converter";
import BinaryToOctalConverterSeo from "@/components/seo-content/binary-tools/binary-to-octal-converter";

export const metadata: Metadata = {
  title: `Binary to Octal Converter | Free Online Base-2 to Base-8`,
  description: `Convert binary to octal instantly. Free online binary to octal converter. Groups bits into threes for easy conversion. Simple and accurate.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-to-octal-converter`,
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

export default function BinaryToOctalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Binary to Octal Converter</h1>
        <p className="text-muted-foreground">
          Convert binary numbers to octal format. This tool groups bits into
          triplets and translates them to octal digits. A compact representation
          sometimes used in computing and permissions.
        </p>
      </header>
      <div className="mt-8">
        <BinaryToOctalConverter />
      </div>
      <div className="mt-8">
        <BinaryToOctalConverterSeo />
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
