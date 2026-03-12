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
  title: "Cell Culture Doubling Time Calculator – Calculate Cell Growth Rate",
  description: "Calculate how long it takes for your cell population to double. Essential for cell biology research, bioprocessing, and understanding cell growth kinetics.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/cell-culture-doubling-calculator",
  },
};

const tools = [
  {
    "name": "Bacterial Growth Calculator",
    "description": "Bacterial Growth Calculator",
    "href": "/calculators/bacterial-growth-calculator"
  },
  {
    "name": "Reaction Rate Constant Calculator",
    "description": "Reaction Rate Constant Calculator",
    "href": "/calculators/reaction-rate-constant-calculator"
  },
  {
    "name": "Dilution Calculator",
    "description": "Dilution Calculator",
    "href": "/calculators/dilution-calculator"
  },
  {
    "name": "Concentration Calculator",
    "description": "Concentration Calculator",
    "href": "/calculators/concentration-calculator"
  },
  {
    "name": "Molarity Calculator",
    "description": "Molarity Calculator",
    "href": "/calculators/molarity-calculator"
  },
  {
    "name": "Dna Base Count Calculator",
    "description": "Dna Base Count Calculator",
    "href": "/calculators/dna-base-count-calculator"
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
              <BreadcrumbLink href="/calculators/cell-culture-doubling-calculator">Cell Culture Doubling Calculator</BreadcrumbLink>
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
