import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryLogicGateCalculator from "@/components/binary-tools/binary-logic-gate-calculator";
import BinaryLogicGateCalculatorSeo from "@/components/seo-content/binary-tools/binary-logic-gate-calculator";

export const metadata: Metadata = {
  title: `Binary Logic Calculator | XOR, AND, OR, NOT Operations`,
  description: `Perform bitwise logic operations on binary numbers. Free online XOR, AND, OR, NOT calculator with truth table. Great for electronics and coding.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-logic-gate-calculator`,
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

export default function BinaryLogicGateCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Binary Logic Gate Calculator (XOR, AND, OR, NOT)
        </h1>
        <p className="text-muted-foreground">
          Perform bitwise logic operations on binary numbers. Calculate XOR,
          AND, OR, and NOT results with a visual truth table. Useful for digital
          circuit design and programming.
        </p>
      </header>
      <div className="mt-8">
        <BinaryLogicGateCalculator />
      </div>
      <div className="mt-8">
        <BinaryLogicGateCalculatorSeo />
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
