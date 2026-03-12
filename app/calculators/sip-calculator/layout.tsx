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
  title: "SIP Calculator",
  description: "Calculate the maturity value of your Systematic Investment Plan. Enter your monthly investment, expected return rate, and duration to see your potential corpus.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/sip-calculator",
  },
};

const tools = [
  {
    "name": "Sip Step Up Calculator",
    "description": "SIP Step-Up Calculator",
    "href": "/calculators/sip-step-up-calculator"
  },
  {
    "name": "Step Down Sip Calculator",
    "description": "Step-Down SIP Calculator",
    "href": "/calculators/step-down-sip-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/calculators/dollar-cost-averaging-calculator"
  },
  {
    "name": "Lump Sum Vs Sip Analyzer",
    "description": "Lump Sum vs SIP Analyzer",
    "href": "/calculators/lump-sum-vs-sip-analyzer"
  },
  {
    "name": "Future Value Calculator",
    "description": "Future Value Calculator",
    "href": "/calculators/future-value-calculator"
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
                    <BreadcrumbLink href="/calculators/sip-calculator">Sip Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SIP Calculator</h1>
        <p className="text-muted-foreground">Calculate the maturity value of your Systematic Investment Plan. Enter your monthly investment, expected return rate, and duration to see your potential corpus.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
