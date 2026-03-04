import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
  description: "Brew the perfect cup of tea with our Tea Brewing Strength Calculator.            Select your tea type and desired strength to get optimal steeping time,            temperature, and tea leaf quantity per cup.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/tea-brewing-strength-calculator",
  },
};

const tools = [
  {
    "name": "Coffee To Water Ratio Calculator",
    "description": "Coffee to Water Ratio Calculator – Perfect Coffee Every Time",
    "href": "/coffee-to-water-ratio-calculator"
  },
  {
    "name": "Baking Time Adjustment Calculator",
    "description": "Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes",
    "href": "/baking-time-adjustment-calculator"
  },
  {
    "name": "Calories Per Serving Calculator",
    "description": "Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe",
    "href": "/calories-per-serving-calculator"
  },
  {
    "name": "Recipe Scaler Calculator",
    "description": "Recipe Scaler Calculator – Adjust Recipe Servings Instantly",
    "href": "/recipe-scaler-calculator"
  },
  {
    "name": "Kitchen Measurement Converter",
    "description": "Kitchen Measurement Converter – Convert Cooking Units Instantly",
    "href": "/kitchen-measurement-converter"
  },
  {
    "name": "Oven Temperature Converter",
    "description": "Oven Temperature Converter – Convert Celsius, Fahrenheit & Gas Mark Instantly",
    "href": "/oven-temperature-converter"
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
