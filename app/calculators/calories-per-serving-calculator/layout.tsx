import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe",
  description: "Track your nutrition accurately with our Calories Per Serving Calculator. Enter ingredients and their calorie values along with serving count to calculate total recipe calories and calories per serving — great for meal planning and diet tracking.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/calories-per-serving-calculator",
  },
};

const tools = [
  {
    "name": "Recipe Scaler Calculator",
    "description": "Recipe Scaler Calculator – Adjust Recipe Servings Instantly",
    "href": "/calculators/recipe-scaler-calculator"
  },
  {
    "name": "Kitchen Measurement Converter",
    "description": "Kitchen Measurement Converter – Convert Cooking Units Instantly",
    "href": "/calculators/kitchen-measurement-converter"
  },
  {
    "name": "Coffee To Water Ratio Calculator",
    "description": "Coffee to Water Ratio Calculator – Perfect Coffee Every Time",
    "href": "/calculators/coffee-to-water-ratio-calculator"
  },
  {
    "name": "Tea Brewing Strength Calculator",
    "description": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
    "href": "/calculators/tea-brewing-strength-calculator"
  },
  {
    "name": "Carb Intake Calculator",
    "description": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator",
    "href": "/calculators/carb-intake-calculator"
  },
  {
    "name": "Fat Intake Calculator",
    "description": "Fat Intake Calculator – How Much Fat Should You Eat Daily?",
    "href": "/calculators/fat-intake-calculator"
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
