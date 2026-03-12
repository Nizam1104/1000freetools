import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Currency Exchange Calculator – Convert Currencies Online",
  description: "Convert amounts between major world currencies with our free online currency exchange calculator. Uses static reference rates to provide quick currency conversion estimates.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/currency-exchange-calculator",
  },
  openGraph: {
    title: "Currency Exchange Calculator – Convert Currencies Online",
    description: "Convert amounts between major world currencies with our free online currency exchange calculator. Uses static reference rates to provide quick currency conversion estimates.",
    type: "website",
    url: "https://1000freetools.com/math-tools/currency-exchange-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Exchange Calculator – Convert Currencies Online",
    description: "Convert amounts between major world currencies with our free online currency exchange calculator. Uses static reference rates to provide quick currency conversion estimates.",
  },
};

const tools = [
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
    "name": "Temperature Converter – Celsius to Fahrenheit & Kelvin",
    "description": "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly with our free online temperature converter. Get accurate conversions with the formula used shown clearly.",
    "href": "/math-tools/temperature-converter"
  },
  {
    "name": "Speed Converter – Convert mph, km/h, m/s Online",
    "description": "Convert between any speed unit with our free online speed converter. Covers mph, km/h, m/s, knots, and more for travel, physics, and engineering applications.",
    "href": "/math-tools/speed-converter"
  },
  {
    "name": "Area Converter – Convert sq ft, sq m, Acres, Hectares Online",
    "description": "Convert between any area unit with our free online area converter. Supports square meters, square feet, acres, hectares, and many more area measurement units.",
    "href": "/math-tools/area-converter"
  },
  {
    "name": "Volume Converter – Convert Liters, Gallons, Cubic Meters",
    "description": "Convert between any volume or capacity unit with our free online volume converter. Covers liters, gallons, milliliters, cubic meters, fluid ounces, and more.",
    "href": "/math-tools/volume-converter"
  },
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
  },
  {
    "name": "Discount & Markup Calculator – Find Sale Price Online",
    "description": "Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.",
    "href": "/math-tools/discount-markup-calculator"
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
