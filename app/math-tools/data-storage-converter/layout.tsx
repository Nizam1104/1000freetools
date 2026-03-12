import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Data Storage Converter – Convert KB, MB, GB, TB Online",
  description: "Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/data-storage-converter",
  },
  openGraph: {
    title: "Data Storage Converter – Convert KB, MB, GB, TB Online",
    description: "Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
    type: "website",
    url: "https://1000freetools.com/math-tools/data-storage-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Storage Converter – Convert KB, MB, GB, TB Online",
    description: "Convert between any digital storage unit with our free online data storage converter. Supports bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
  },
};

const tools = [
  {
    "name": "Number Base Converter – Binary, Octal, Decimal, Hex Converter",
    "description": "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly with our free online number base converter. Perfect for computer science students and programmers.",
    "href": "/math-tools/number-base-converter"
  },
  {
    "name": "Binary Addition & Subtraction Calculator – Compute in Base 2",
    "description": "Add and subtract binary numbers step by step with our free online binary calculator. See each bit-by-bit operation clearly – perfect for computer science and digital electronics.",
    "href": "/math-tools/binary-arithmetic-calculator"
  },
  {
    "name": "Two's Complement Calculator – Convert to Twos Complement",
    "description": "Convert any integer to its two's complement binary form or decode two's complement back to decimal with our free online calculator. Supports various bit widths.",
    "href": "/math-tools/twos-complement-calculator"
  },
  {
    "name": "Bitwise Operations Calculator – Compute AND OR XOR NOT Shifts",
    "description": "Perform bitwise AND, OR, XOR, NOT, left shift, and right shift operations on integers with our free online bitwise calculator. See binary representations alongside results.",
    "href": "/math-tools/bitwise-operations-calculator"
  },
  {
    "name": "Length Converter – Convert Meters, Feet, Inches, Miles Online",
    "description": "Convert between any length or distance units with our free online length converter. Covers metric and imperial systems including meters, feet, inches, kilometers, and miles.",
    "href": "/math-tools/length-converter"
  },
  {
    "name": "Weight Converter – Convert kg, lbs, grams, oz Online",
    "description": "Convert between any weight or mass unit with our free online weight converter. Supports kilograms, pounds, grams, ounces, stones, metric tons, and more instantly.",
    "href": "/math-tools/weight-converter"
  },
  {
    "name": "Time Converter – Convert Seconds, Minutes, Hours, Days Online",
    "description": "Convert between any time unit with our free online time converter. Quickly convert between seconds, minutes, hours, days, weeks, months, and years with precise results.",
    "href": "/math-tools/time-converter"
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
