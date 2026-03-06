import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Logarithm Calculator – Compute Log of Any Base Online",
  description: "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/logarithm-calculator",
  },
  openGraph: {
    title: "Logarithm Calculator – Compute Log of Any Base Online",
    description: "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/logarithm-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logarithm Calculator – Compute Log of Any Base Online",
    description: "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
  },
};

const tools = [
  {
    "name": "Antilogarithm Calculator – Find Antilog of Any Number",
    "description": "Calculate the antilogarithm of any value for any base with our free online antilog calculator. Find the inverse of log base 10, natural log, or any custom base instantly.",
    "href": "/math-tools/antilogarithm-calculator"
  },
  {
    "name": "Exponent Calculator – Calculate Base to the Power of n",
    "description": "Easily calculate any number raised to a power with our free exponent calculator. Supports positive, negative, and fractional exponents for fast and accurate results.",
    "href": "/math-tools/exponent-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Square Root Calculator – Compute √ of Any Number",
    "description": "Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.",
    "href": "/math-tools/square-root-calculator"
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
    "name": "Logarithm Calculator – Compute Log of Any Base Online",
    "description": "Calculate logarithms of any number for any base with our free online logarithm calculator. Supports log base 10, natural log (ln), and custom base logarithms with instant results.",
    "href": "/math-tools/logarithm-calculator"
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
