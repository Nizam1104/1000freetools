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
  title: "Random Number Generator",
  description: "Generate random numbers within a range",
  alternates: {
    canonical: "https://1000freetools.com/calculators/random-number-generator",
  },
};

const tools = [
  {
    "name": "Combination Calculator",
    "description": "Combination Calculator",
    "href": "/calculators/combination-calculator"
  },
  {
    "name": "Factorial Calculator",
    "description": "Factorial Calculator",
    "href": "/calculators/factorial-calculator"
  },
  {
    "name": "Permutation Calculator",
    "description": "Permutation Calculator",
    "href": "/calculators/permutation-calculator"
  },
  {
    "name": "Gacha Pull Probability Calculator",
    "description": "Gacha Pull Probability Calculator – Calculate Your Odds in Gacha Games",
    "href": "/calculators/gacha-pull-probability-calculator"
  },
  {
    "name": "Loot Probability Calculator",
    "description": "Loot Drop Probability Calculator – Calculate Your Chances of Getting Rare Items",
    "href": "/calculators/loot-probability-calculator"
  },
  {
    "name": "Z Score Calculator",
    "description": "Z-Score Calculator",
    "href": "/calculators/z-score-calculator"
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
                    <BreadcrumbLink href="/calculators/random-number-generator">Random Number Generator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Random Number Generator</h1>
        <p className="text-muted-foreground">Generate random numbers within a range</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
