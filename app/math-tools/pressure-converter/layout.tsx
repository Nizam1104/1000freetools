import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pressure Converter – Convert Pascal, Bar, PSI, ATM Online",
  description: "Convert between any pressure unit with our free online pressure converter. Covers pascals, bar, PSI, atmospheres, mmHg, and more for science, engineering, and weather applications.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/pressure-converter",
  },
  openGraph: {
    title: "Pressure Converter – Convert Pascal, Bar, PSI, ATM Online",
    description: "Convert between any pressure unit with our free online pressure converter. Covers pascals, bar, PSI, atmospheres, mmHg, and more for science, engineering, and weather applications.",
    type: "website",
    url: "https://1000freetools.com/math-tools/pressure-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pressure Converter – Convert Pascal, Bar, PSI, ATM Online",
    description: "Convert between any pressure unit with our free online pressure converter. Covers pascals, bar, PSI, atmospheres, mmHg, and more for science, engineering, and weather applications.",
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
    "name": "Time Converter – Convert Seconds, Minutes, Hours, Days Online",
    "description": "Convert between any time unit with our free online time converter. Quickly convert between seconds, minutes, hours, days, weeks, months, and years with precise results.",
    "href": "/math-tools/time-converter"
  },
  {
    "name": "Energy Converter – Convert Joules, Calories, kWh Online",
    "description": "Convert between any energy unit with our free online energy converter. Supports joules, calories, kilocalories, kilowatt-hours, BTU, and more for science and engineering.",
    "href": "/math-tools/energy-converter"
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
