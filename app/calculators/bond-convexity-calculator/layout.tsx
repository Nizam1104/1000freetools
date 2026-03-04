import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

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
    "href": "/bond-duration-calculator"
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
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
