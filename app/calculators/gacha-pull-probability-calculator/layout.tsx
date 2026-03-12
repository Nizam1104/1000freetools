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
  title: "Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games",
  description: "Know your odds before you spend with our Gacha Pull Probability Calculator.            Enter the pull rate for your desired character or item and the number of            attempts to calculate the cumulative probability — essential for gacha game            players managing their budgets.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gacha-pull-probability-calculator",
  },
};

const tools = [
  {
    "name": "Loot Probability Calculator",
    "description": "Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items",
    "href": "/calculators/loot-probability-calculator"
  },
  {
    "name": "Random Number Generator",
    "description": "Random Number Generator",
    "href": "/calculators/random-number-generator"
  },
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/calculators/combination-calculator"
  },
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/calculators/permutation-calculator"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/calculators/factorial-calculator"
  },
  {
    "name": "Pascals Triangle Calculator",
    "description": "Pascal's Triangle Calculator",
    "href": "/calculators/pascals-triangle-calculator"
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
              <BreadcrumbLink href="/calculators/gacha-pull-probability-calculator">Gacha Pull Probability Calculator</BreadcrumbLink>
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
