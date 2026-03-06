import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Roman Numeral Converter – Convert Numbers to Roman Numerals",
  description: "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/roman-numeral-converter",
  },
  openGraph: {
    title: "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    description: "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    type: "website",
    url: "https://1000freetools.com/math-tools/roman-numeral-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    description: "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
  },
};

const tools = [
  {
    "name": "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    "description": "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    "href": "/math-tools/number-base-converter"
  },
  {
    "name": "Number to Words Converter – Convert Numbers to English Words",
    "description": "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
    "href": "/math-tools/number-word-converter"
  },
  {
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    "description": "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    "href": "/math-tools/roman-numeral-converter"
  },
  {
    "name": "Length Converter – Convert Meters, Feet, Inches, Miles Online",
    "description": "Convert between any length or distance units with our free online length converter. Covers metric and imperial systems including meters, feet, inches, kilometers, and miles.",
    "href": "/math-tools/length-converter"
  },
  {
    "name": "Weight Converter – Convert kg, lbs, grams, oz Online",
    "description": "Convert between any weight or mass unit with our free online weight converter. Supports kilograms, pounds, grams, ounces, stones, metric tons, and more instantly.",
    "href": "/math-tools/weight-converter"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
