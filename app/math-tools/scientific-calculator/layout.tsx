import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Free Online Scientific Calculator – Advanced Math Functions",
  description: "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/scientific-calculator",
  },
  openGraph: {
    title: "Free Online Scientific Calculator – Advanced Math Functions",
    description: "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    type: "website",
    url: "https://1000freetools.com/math-tools/scientific-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Scientific Calculator – Advanced Math Functions",
    description: "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
  },
};

const tools = [
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Square Root Calculator – Compute √ of Any Number",
    "description": "Find the square root of any number instantly with our free online square root calculator. Supports both perfect and imperfect squares with high precision decimal results.",
    "href": "/math-tools/square-root-calculator"
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
    "name": "Trig Function Calculator – Calculate Sin Cos Tan Online",
    "description": "Calculate any trigonometric function value including sin, cos, tan, csc, sec, and cot for any angle in degrees or radians with our free online trig calculator.",
    "href": "/math-tools/trig-function-calculator"
  },
  {
    "name": "Inverse Trig Calculator – Find arcsin arccos arctan Online",
    "description": "Calculate inverse trigonometric functions including arcsin, arccos, and arctan with our free online inverse trig calculator. Get angle results in both degrees and radians.",
    "href": "/math-tools/inverse-trig-calculator"
  },
  {
    "name": "Derivative Calculator – Differentiate Functions Step by Step",
    "description": "Calculate the derivative of any function with our free online derivative calculator. Applies power, product, quotient, and chain rules with detailed step-by-step differentiation shown.",
    "href": "/math-tools/derivative-calculator"
  },
  {
    "name": "Definite Integral Calculator – Compute Integrals Numerically",
    "description": "Calculate definite integrals numerically with our free online integral calculator. Evaluate the area under any function curve over any interval with accurate numerical results.",
    "href": "/math-tools/definite-integral-calculator"
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
