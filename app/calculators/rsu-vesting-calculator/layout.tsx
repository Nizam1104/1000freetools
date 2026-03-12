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
  title: "RSU Vesting Calculator",
  description: "Track your RSU compensation clearly. Calculate shares vesting on each date, their estimated value, and estimated tax liability based on your vesting schedule.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/rsu-vesting-calculator",
  },
};

const tools = [
  {
    "name": "Startup Equity Calculator",
    "description": "Startup Equity Calculator",
    "href": "/calculators/startup-equity-calculator"
  },
  {
    "name": "Valuation Cap Calculator",
    "description": "Valuation Cap Calculator – SAFE & Convertible Notes",
    "href": "/calculators/valuation-cap-calculator"
  },
  {
    "name": "Stock Split Calculator",
    "description": "Stock Split Calculator",
    "href": "/calculators/stock-split-calculator"
  },
  {
    "name": "Stock Cagr Calculator",
    "description": "Stock CAGR Calculator",
    "href": "/calculators/stock-cagr-calculator"
  },
  {
    "name": "Reverse Stock Split Calculator",
    "description": "Reverse Stock Split Calculator",
    "href": "/calculators/reverse-stock-split-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/calculators/investment-return-rate-calculator"
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
              <BreadcrumbLink href="/calculators/rsu-vesting-calculator">Rsu Vesting Calculator</BreadcrumbLink>
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
