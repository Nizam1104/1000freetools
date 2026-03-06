import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Significant Figures Calculator – Count and Round Sig Figs",
  description: "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/significant-figures-calculator",
  },
  openGraph: {
    title: "Significant Figures Calculator – Count and Round Sig Figs",
    description: "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
    type: "website",
    url: "https://1000freetools.com/math-tools/significant-figures-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Significant Figures Calculator – Count and Round Sig Figs",
    description: "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
  },
};

const tools = [
  {
    "name": "Rounding Calculator – Round to Decimal Places or Sig Figs",
    "description": "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    "href": "/math-tools/rounding-calculator"
  },
  {
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
  },
  {
    "name": "Estimation & Rounding Tool – Round for Quick Estimation",
    "description": "Round and estimate numbers quickly with our free online estimation and rounding tool. Round to nearest ten, hundred, thousand, or custom place value for fast mental math.",
    "href": "/math-tools/estimation-rounding-tool"
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
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  },
  {
    "name": "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    "description": "Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.",
    "href": "/math-tools/fraction-calculator"
  },
  {
    "name": "Big Number Calculator – Compute Huge Numbers Online",
    "description": "Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.",
    "href": "/math-tools/big-number-calculator"
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
