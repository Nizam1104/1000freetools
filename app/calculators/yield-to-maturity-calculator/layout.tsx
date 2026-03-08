import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Yield-to-Maturity (YTM) Calculator",
  description: "Calculate the total annualized return of a bond held to maturity. Factors in coupon payments, purchase price, face value, and time remaining to maturity.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/yield-to-maturity-calculator",
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
