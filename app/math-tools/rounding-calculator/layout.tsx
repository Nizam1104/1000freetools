import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Rounding Calculator – Round to Decimal Places or Sig Figs",
  description: "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/rounding-calculator",
  },
  openGraph: {
    title: "Rounding Calculator – Round to Decimal Places or Sig Figs",
    description: "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    type: "website",
    url: "https://1000freetools.com/math-tools/rounding-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rounding Calculator – Round to Decimal Places or Sig Figs",
    description: "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
  },
};

const tools = [
  {
    "name": "Significant Figures Calculator – Count and Round Sig Figs",
    "description": "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
    "href": "/math-tools/significant-figures-calculator"
  },
  {
    "name": "Estimation & Rounding Tool – Round for Quick Estimation",
    "description": "Round and estimate numbers quickly with our free online estimation and rounding tool. Round to nearest ten, hundred, thousand, or custom place value for fast mental math.",
    "href": "/math-tools/estimation-rounding-tool"
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
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Decimal to Fraction Converter – Convert Decimals to Fractions",
    "description": "Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.",
    "href": "/math-tools/decimal-to-fraction-converter"
  },
  {
    "name": "Fraction to Decimal Converter – Convert Fractions to Decimals",
    "description": "Convert any fraction or mixed number to a decimal with our free online fraction to decimal converter. Get exact or rounded decimal results instantly with the division shown.",
    "href": "/math-tools/fraction-to-decimal-converter"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
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
