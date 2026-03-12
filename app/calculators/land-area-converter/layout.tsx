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
  title: "Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha",
  description: "Convert land area between acres, hectares, square meters, square feet, bigha, and other units with our free land area converter. Perfect for real estate buyers, sellers, farmers, and property developers needing accurate area conversions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/land-area-converter",
  },
};

const tools = [
  {
    "name": "Map Scale Calculator",
    "description": "Map Scale Calculator – Convert Map Distances to Real-World Measurements",
    "href": "/calculators/map-scale-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/calculators/50-30-20-budget-rule-calculator"
  },
  {
    "name": "A B Test Significance Calculator",
    "description": "A/B Test Significance Calculator – Check If Your Test Results Are Statistically Valid",
    "href": "/calculators/a-b-test-significance-calculator"
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
                    <BreadcrumbLink href="/calculators/land-area-converter">Land Area Converter</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha</h1>
        <p className="text-muted-foreground">Convert land area between acres, hectares, square meters, square feet, bigha, and other units with our free land area converter. Perfect for real estate buyers, sellers, farmers, and property developers needing accurate area conversions.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
