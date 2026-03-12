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
  title: "Bond Convexity Calculator",
  description: "Go beyond duration with convexity. Calculate bond convexity to accurately assess interest rate risk by measuring the curvature in the price-yield relationship.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bond-convexity-calculator",
  },
};

const tools = [
  {
    "name": "Bond Duration Calculator",
    "description": "Bond Duration Calculator",
    "href": "/calculators/bond-duration-calculator"
  },
  {
    "name": "Bond Price Calculator",
    "description": "Bond Price Calculator",
    "href": "/calculators/bond-price-calculator"
  },
  {
    "name": "Bond Yield Calculator",
    "description": "Bond Yield Calculator",
    "href": "/calculators/bond-yield-calculator"
  },
  {
    "name": "Yield To Maturity Calculator",
    "description": "Yield-to-Maturity (YTM) Calculator",
    "href": "/calculators/yield-to-maturity-calculator"
  },
  {
    "name": "Npv Calculator",
    "description": "NPV Calculator – Net Present Value",
    "href": "/calculators/npv-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
              <BreadcrumbLink href="/calculators/bond-convexity-calculator">Bond Convexity Calculator</BreadcrumbLink>
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
