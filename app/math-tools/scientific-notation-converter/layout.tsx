import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Scientific Notation Converter – Standard to Scientific Form",
  description: "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/scientific-notation-converter",
  },
  openGraph: {
    title: "Scientific Notation Converter – Standard to Scientific Form",
    description: "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    type: "website",
    url: "https://1000freetools.com/math-tools/scientific-notation-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scientific Notation Converter – Standard to Scientific Form",
    description: "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
  },
};

const tools = [
  {
    "name": "Significant Figures Calculator – Count and Round Sig Figs",
    "description": "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
    "href": "/math-tools/significant-figures-calculator"
  },
  {
    "name": "Rounding Calculator – Round to Decimal Places or Sig Figs",
    "description": "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    "href": "/math-tools/rounding-calculator"
  },
  {
    "name": "Exponent Calculator – Calculate Base to the Power of n",
    "description": "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    "href": "/math-tools/exponent-calculator"
  },
  {
    "name": "Logarithm Calculator – Compute Log of Any Base Online",
    "description": "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
    "href": "/math-tools/logarithm-calculator"
  },
  {
    "name": "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    "description": "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    "href": "/math-tools/roman-numeral-converter"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Big Number Calculator – Compute Huge Numbers Online",
    "description": "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    "href": "/math-tools/big-number-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
