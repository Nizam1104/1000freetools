import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pi Digit Generator – View Digits of π to Any Decimal Place",
  description: "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/pi-digit-generator",
  },
  openGraph: {
    title: "Pi Digit Generator – View Digits of π to Any Decimal Place",
    description: "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
    type: "website",
    url: "https://1000freetools.com/math-tools/pi-digit-generator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pi Digit Generator – View Digits of π to Any Decimal Place",
    description: "View the digits of Pi (π) to any decimal place with our free online Pi digit generator. Explore and study the infinite decimal expansion of this famous mathematical constant.",
  },
};

const tools = [
  {
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Circle Calculator – Find Radius, Diameter, Area & Circumference",
    "description": "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
    "href": "/math-tools/circle-calculator"
  },
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
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Magic Square Generator – Create Magic Squares Online",
    "description": "Generate magic squares of any order with our free online magic square generator. Creates valid magic squares where all rows, columns, and diagonals have the same magical sum.",
    "href": "/math-tools/magic-square-generator"
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
