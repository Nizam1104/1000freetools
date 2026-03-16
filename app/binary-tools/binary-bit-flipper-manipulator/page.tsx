import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryBitFlipperManipulator from "@/components/binary-tools/binary-bit-flipper-manipulator";
import BinaryBitFlipperManipulatorSeo from "@/components/seo-content/binary-tools/binary-bit-flipper-manipulator";

export const metadata: Metadata = {
  title: `Binary Bit Manipulator | Flip, Shift, Rotate Bits Online`,
  description: `Interactively manipulate binary bits. Free online tool to flip, set, clear, shift, and rotate bits in a binary string. Visual feedback and instant results.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-bit-flipper-manipulator`,
  },
};

const tools = [
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

export default function BinaryBitFlipperManipulatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Binary Bit Flipper & Manipulator
        </h1>
        <p className="text-muted-foreground">
          Manipulate binary bits interactively. Flip, set, clear, shift, and
          rotate bits in a binary string with a visual interface. Great for
          understanding bitwise operations and binary arithmetic.
        </p>
      </header>
      <div className="mt-8">
        <BinaryBitFlipperManipulator />
      </div>
      <div className="mt-8">
        <BinaryBitFlipperManipulatorSeo />
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
