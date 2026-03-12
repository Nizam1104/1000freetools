import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Decimal to Fraction Converter – Convert Decimals to Fractions",
  description: "Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/decimal-to-fraction-calculator",
  },
  openGraph: {
    title: "Decimal to Fraction Converter – Convert Decimals to Fractions",
    description: "Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.",
    type: "website",
    url: "https://1000freetools.com/calculators/decimal-to-fraction-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decimal to Fraction Converter – Convert Decimals to Fractions",
    description: "Convert any decimal to a fraction instantly with our free online decimal to fraction converter. Returns fully simplified fractions with clear step-by-step conversion process.",
  },
};

const tools = [
  {
    "name": "Fraction to Decimal Converter – Convert Fractions to Decimals",
    "description": "Convert any fraction or mixed number to a decimal with our free online fraction to decimal converter. Get exact or rounded decimal results instantly with the division shown.",
    "href": "/math-tools/fraction-to-decimal-converter"
  },
  {
    "name": "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    "description": "Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.",
    "href": "/math-tools/fraction-calculator"
  },
  {
    "name": "Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers",
    "description": "Calculate with mixed numbers easily using our free online mixed number calculator. Add, subtract, multiply, and divide mixed numbers with instant simplified results and full steps.",
    "href": "/math-tools/mixed-number-calculator"
  },
  {
    "name": "Rounding Calculator – Round to Decimal Places or Sig Figs",
    "description": "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    "href": "/math-tools/rounding-calculator"
  },
  {
    "name": "Ratio Calculator – Simplify & Solve Ratios Online",
    "description": "Simplify ratios and solve ratio problems instantly with our free online ratio calculator. Solve for missing values in proportions and reduce ratios to their simplest form.",
    "href": "/math-tools/ratio-calculator"
  },
  {
    "name": "GCD / HCF Calculator – Find Greatest Common Divisor Online",
    "description": "Calculate the GCD or HCF of two or more numbers instantly with our free online calculator. Uses the Euclidean algorithm to find the greatest common divisor with step-by-step solutions.",
    "href": "/math-tools/gcd-hcf-calculator"
  },
  {
    "name": "LCM Calculator – Find Least Common Multiple Online",
    "description": "Calculate the Least Common Multiple (LCM) of two or more numbers instantly with our free online LCM calculator. Get accurate results with step-by-step explanations.",
    "href": "/math-tools/lcm-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
