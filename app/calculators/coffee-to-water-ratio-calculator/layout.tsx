import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Coffee to Water Ratio Calculator – Perfect Coffee Every Time",
  description: "Brew the perfect cup of coffee with our Coffee to Water Ratio Calculator. Enter your desired water amount and brewing method to get the ideal coffee-to-water ratio — essential for baristas and coffee enthusiasts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/coffee-to-water-ratio-calculator",
  },
};

const tools = [
  {
    "name": "Tea Brewing Strength Calculator",
    "description": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
    "href": "/tea-brewing-strength-calculator"
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
    "name": "Beer Abv Calculator",
    "description": "Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew",
    "href": "/beer-abv-calculator"
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
