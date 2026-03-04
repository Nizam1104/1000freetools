import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Bond Duration Calculator",
  description: "Measure your bond's sensitivity to interest rate changes. Calculate Macaulay and Modified Duration to better manage fixed-income portfolio risk.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/bond-duration-calculator",
  },
};

const tools = [
  {
    "name": "Bond Convexity Calculator",
    "description": "Bond Convexity Calculator",
    "href": "/bond-convexity-calculator"
  },
  {
    "name": "Bond Price Calculator",
    "description": "Bond Price Calculator",
    "href": "/bond-price-calculator"
  },
  {
    "name": "Bond Yield Calculator",
    "description": "Bond Yield Calculator",
    "href": "/bond-yield-calculator"
  },
  {
    "name": "Yield To Maturity Calculator",
    "description": "Yield-to-Maturity (YTM) Calculator",
    "href": "/yield-to-maturity-calculator"
  },
  {
    "name": "Npv Calculator",
    "description": "NPV Calculator – Net Present Value",
    "href": "/npv-calculator"
  },
  {
    "name": "Payback Period Calculator",
    "description": "Payback Period Calculator",
    "href": "/payback-period-calculator"
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
