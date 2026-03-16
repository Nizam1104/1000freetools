import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import OctalToBinaryConverter from "@/components/binary-tools/octal-to-binary-converter";
import OctalToBinaryConverterSeo from "@/components/seo-content/binary-tools/octal-to-binary-converter";

export const metadata: Metadata = {
  title: `Octal to Binary Converter | Free Online Base-8 to Base-2`,
  description: `Convert octal to binary instantly. Free online octal to binary converter. Expands each octal digit to 3 bits. Quick and straightforward.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/octal-to-binary-converter`,
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

export default function OctalToBinaryConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Octal to Binary Converter</h1>
        <p className="text-muted-foreground">
          Convert octal numbers to binary code. This tool expands each octal
          digit into its 3-bit binary form. Useful for interpreting octal-based
          systems like Unix file permissions.
        </p>
      </header>
      <div className="mt-8">
        <OctalToBinaryConverter />
      </div>
      <div className="mt-8">
        <OctalToBinaryConverterSeo />
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
