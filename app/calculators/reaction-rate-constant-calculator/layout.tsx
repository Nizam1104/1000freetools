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
  title: "Reaction Rate Constant Calculator – Calculate k from Rate and Concentration",
  description: "Calculate the rate constant (k) for chemical reactions. Chemistry calculator supports zero, first, and second order reactions with half-life calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/reaction-rate-constant-calculator",
  },
};

const tools = [
  {
    "name": "Stoichiometry Calculator",
    "description": "Stoichiometry Calculator",
    "href": "/calculators/stoichiometry-calculator"
  },
  {
    "name": "Reaction Yield Calculator",
    "description": "Reaction Yield Calculator",
    "href": "/calculators/reaction-yield-calculator"
  },
  {
    "name": "Half Life Calculator",
    "description": "Half Life Calculator",
    "href": "/calculators/half-life-calculator"
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
    "name": "Cell Culture Doubling Calculator",
    "description": "Cell Culture Doubling Calculator",
    "href": "/calculators/cell-culture-doubling-calculator"
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
              <BreadcrumbLink href="/calculators/reaction-rate-constant-calculator">Reaction Rate Constant Calculator</BreadcrumbLink>
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
