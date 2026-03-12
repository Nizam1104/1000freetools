import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Number to Words Converter – Convert Numbers to English Words",
  description: "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/number-word-converter",
  },
  openGraph: {
    title: "Number to Words Converter – Convert Numbers to English Words",
    description: "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
    type: "website",
    url: "https://1000freetools.com/math-tools/number-word-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number to Words Converter – Convert Numbers to English Words",
    description: "Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.",
  },
};

const tools = [
  {
    "name": "Roman Numeral Converter – Convert Numbers to Roman Numerals",
    "description": "Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.",
    "href": "/math-tools/roman-numeral-converter"
  },
  {
    "name": "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    "description": "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    "href": "/math-tools/number-base-converter"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Digit Sum Calculator – Find Sum of Digits of Any Number",
    "description": "Calculate the sum of all digits in any number with our free online digit sum calculator. Also computes the digital root through repeated digit summation.",
    "href": "/math-tools/digit-sum-calculator"
  },
  {
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Number Sorter – Sort Numbers Ascending or Descending Online",
    "description": "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    "href": "/math-tools/number-sorter"
  },
  {
    "name": "Number Line Visualizer – Plot Numbers on a Number Line",
    "description": "Visualize numbers, fractions, and inequalities on an interactive number line with our free online number line tool. Plot points and ranges to better understand number concepts.",
    "href": "/math-tools/number-line-visualizer"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/number-word-converter">Number Word Converter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
