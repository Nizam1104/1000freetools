import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Cocktail ABV Calculator – Calculate the Alcohol Content of Any Mixed Drink",
  description: "Know what&apos;s in your glass with our Cocktail ABV Calculator. Enter each            ingredient&apos;s volume and ABV to calculate the total alcohol content of your            cocktail — great for bartenders, party planners, and responsible drinkers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cocktail-abv-calculator",
  },
};

const tools = [
  {
    "name": "Beer Abv Calculator",
    "description": "Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew",
    "href": "/calculators/beer-abv-calculator"
  },
  {
    "name": "Alcohol Dilution Calculator",
    "description": "Alcohol Dilution Calculator – Calculate Water to Add for Target ABV",
    "href": "/calculators/alcohol-dilution-calculator"
  },
  {
    "name": "Wine Abv Calculator",
    "description": "Wine ABV Calculator – Calculate Alcohol Content in Homemade Wine",
    "href": "/calculators/wine-abv-calculator"
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
