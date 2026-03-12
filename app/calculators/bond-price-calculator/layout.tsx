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
  title: "Bond Price Calculator",
  description: "Calculate the fair market price of a bond based on its face value, coupon rate, years to maturity, and the prevailing market yield or discount rate.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bond-price-calculator",
  },
};

const tools = [
  {
    "name": "Bond Convexity Calculator",
    "description": "Bond Convexity Calculator",
    "href": "/calculators/bond-convexity-calculator"
  },
  {
    "name": "Bond Duration Calculator",
    "description": "Bond Duration Calculator",
    "href": "/calculators/bond-duration-calculator"
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
    "name": "Payback Period Calculator",
    "description": "Payback Period Calculator",
    "href": "/calculators/payback-period-calculator"
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
              <BreadcrumbLink href="/calculators/bond-price-calculator">Bond Price Calculator</BreadcrumbLink>
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
