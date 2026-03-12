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
  title: "Alcohol Dilution Calculator – Calculate Water to Add for Target ABV",
  description: "Dilute spirits to your desired strength with our Alcohol Dilution Calculator.            Enter starting ABV and volume along with your target ABV to calculate exactly            how much water to add — perfect for home distillers and bartenders.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/alcohol-dilution-calculator",
  },
};

const tools = [
  {
    "name": "Beer Abv Calculator",
    "description": "Beer ABV Calculator – Calculate Alcohol Content of Your Home Brew",
    "href": "/calculators/beer-abv-calculator"
  },
  {
    "name": "Cocktail Abv Calculator",
    "description": "Cocktail ABV Calculator – Calculate the Alcohol Content of Any Mixed Drink",
    "href": "/calculators/cocktail-abv-calculator"
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
    "name": "Baking Time Adjustment Calculator",
    "description": "Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes",
    "href": "/calculators/baking-time-adjustment-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/alcohol-dilution-calculator">Alcohol Dilution Calculator</BreadcrumbLink>
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
