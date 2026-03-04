import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "NPV Calculator – Net Present Value",
  description: "Evaluate the viability of an investment by calculating its Net Present Value. Discount all future cash flows at your required rate of return to make smarter decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/npv-calculator",
  },
};

const tools = [
  {
    "name": "Irr Calculator",
    "description": "IRR Calculator – Internal Rate of Return",
    "href": "/irr-calculator"
  },
  {
    "name": "Payback Period Calculator",
    "description": "Payback Period Calculator",
    "href": "/payback-period-calculator"
  },
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/roi-calculator"
  },
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/cost-of-capital-calculator"
  },
  {
    "name": "Wacc Calculator",
    "description": "WACC Calculator – Weighted Average Cost of Capital",
    "href": "/wacc-calculator"
  },
  {
    "name": "Ebitda Calculator",
    "description": "EBITDA Calculator",
    "href": "/ebitda-calculator"
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
