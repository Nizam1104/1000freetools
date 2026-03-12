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
  title: "Break-Even Point Calculator",
  description: "Find the exact number of units you need to sell to cover all costs. Calculate your break-even point from fixed costs, variable costs, and selling price.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/break-even-point-calculator",
  },
};

const tools = [
  {
    "name": "Break Even Discount Calculator",
    "description": "Break-Even Discount Calculator",
    "href": "/calculators/break-even-discount-calculator"
  },
  {
    "name": "Discount Calculator",
    "description": "Discount Calculator – Calculate Sale Price & Savings",
    "href": "/calculators/discount-calculator"
  },
  {
    "name": "Discount Stacking Calculator",
    "description": "Discount Stacking Calculator – Calculate Final Price After Multiple Discounts",
    "href": "/calculators/discount-stacking-calculator"
  },
  {
    "name": "Margin Calculator",
    "description": "Profit Margin Calculator",
    "href": "/calculators/margin-calculator"
  },
  {
    "name": "Markup Calculator",
    "description": "Markup Calculator",
    "href": "/calculators/markup-calculator"
  },
  {
    "name": "Profit Margin Calculator",
    "description": "Profit Margin Calculator – Calculate Gross Profit & Markup",
    "href": "/calculators/profit-margin-calculator"
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
              <BreadcrumbLink href="/calculators/break-even-point-calculator">Break Even Point Calculator</BreadcrumbLink>
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
