import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers",
  description: "Calculate with mixed numbers easily using our free online mixed number calculator. Add, subtract, multiply, and divide mixed numbers with instant simplified results and full steps.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/mixed-number-calculator",
  },
  openGraph: {
    title: "Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers",
    description: "Calculate with mixed numbers easily using our free online mixed number calculator. Add, subtract, multiply, and divide mixed numbers with instant simplified results and full steps.",
    type: "website",
    url: "https://1000freetools.com/math-tools/mixed-number-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixed Number Calculator – Add, Subtract, Multiply Mixed Numbers",
    description: "Calculate with mixed numbers easily using our free online mixed number calculator. Add, subtract, multiply, and divide mixed numbers with instant simplified results and full steps.",
  },
};

const tools = [
  {
    "name": "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    "description": "Easily add, subtract, multiply, and divide fractions with our free online fraction calculator. Get instant simplified results and step-by-step solutions for all fraction operations.",
    "href": "/math-tools/fraction-calculator"
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
  },
  {
    "name": "Weighted Average Calculator – Compute Weighted Mean Online",
    "description": "Calculate the weighted average or weighted mean of any set of values with our free online calculator. Enter values and weights to get the accurate weighted result instantly.",
    "href": "/math-tools/weighted-average-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
