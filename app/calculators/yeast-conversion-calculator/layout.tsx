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
  title: "Yeast Conversion Calculator – Convert Between Dry, Instant & Fresh Yeast",
  description: "Substitute yeast types without ruining your recipe using our Yeast Conversion Calculator.            Convert between active dry yeast, instant yeast, and fresh yeast with accurate ratios —            perfect for bakers who need to work with what&apos;s available.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/yeast-conversion-calculator",
  },
};

const tools = [
  {
    "name": "Baking Time Adjustment Calculator",
    "description": "Baking Time Adjustment Calculator – Adjust Oven Time When Changing Pan Sizes",
    "href": "/calculators/baking-time-adjustment-calculator"
  },
  {
    "name": "Tea Brewing Strength Calculator",
    "description": "Tea Brewing Strength Calculator – Get the Perfect Steep Time & Leaf Ratio",
    "href": "/calculators/tea-brewing-strength-calculator"
  },
  {
    "name": "Coffee To Water Ratio Calculator",
    "description": "Coffee to Water Ratio Calculator – Perfect Coffee Every Time",
    "href": "/calculators/coffee-to-water-ratio-calculator"
  },
  {
    "name": "Calories Per Serving Calculator",
    "description": "Calories Per Serving Calculator – Calculate Nutrition Calories in Any Recipe",
    "href": "/calculators/calories-per-serving-calculator"
  },
  {
    "name": "Recipe Scaler Calculator",
    "description": "Recipe Scaler Calculator – Adjust Recipe Servings Instantly",
    "href": "/calculators/recipe-scaler-calculator"
  },
  {
    "name": "Kitchen Measurement Converter",
    "description": "Kitchen Measurement Converter – Convert Cooking Units Instantly",
    "href": "/calculators/kitchen-measurement-converter"
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
              <BreadcrumbLink href="/calculators/yeast-conversion-calculator">Yeast Conversion Calculator</BreadcrumbLink>
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
