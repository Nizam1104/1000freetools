import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Exponent Calculator – Calculate Base to the Power of n",
  description: "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/exponent-calculator",
  },
  openGraph: {
    title: "Exponent Calculator – Calculate Base to the Power of n",
    description: "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/exponent-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exponent Calculator – Calculate Base to the Power of n",
    description: "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
  },
};

const tools = [
  {
    "name": "Square Root Calculator – Compute √ of Any Number",
    "description": "Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.",
    "href": "/math-tools/square-root-calculator"
  },
  {
    "name": "Logarithm Calculator – Compute Log of Any Base Online",
    "description": "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
    "href": "/math-tools/logarithm-calculator"
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
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
  },
  {
    "name": "Taylor Series Calculator – Expand Functions as Taylor Series",
    "description": "Generate Taylor and Maclaurin series expansions of any function with our free online calculator. Compute series up to any number of terms with coefficient and error visualization.",
    "href": "/math-tools/taylor-series-approximation"
  },
  {
    "name": "Exponent Calculator – Calculate Base to the Power of n",
    "description": "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    "href": "/math-tools/exponent-calculator"
  },
  {
    "name": "Derivative Calculator – Differentiate Functions Step by Step",
    "description": "Calculate the derivative of any function with our free online derivative calculator. Applies power, product, quotient, and chain rules with detailed step-by-step differentiation shown.",
    "href": "/math-tools/derivative-calculator"
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
