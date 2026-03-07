import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "ROI Calculator – Calculate Return on Investment Percentage",
  description: "Calculate your Return on Investment (ROI) instantly with our free ROI Calculator. Enter your initial investment and final value to determine your profit or loss percentage — essential for evaluating investments, business projects, and financial decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/roi-calculator",
  },
};

const tools = [
  {
    "name": "Roi Calculator Ad",
    "description": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
    "href": "/calculators/roi-calculator-ad"
  },
  {
    "name": "Irr Calculator",
    "description": "IRR Calculator – Internal Rate of Return",
    "href": "/calculators/irr-calculator"
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
  },
  {
    "name": "Cost Of Capital Calculator",
    "description": "Cost of Capital Calculator",
    "href": "/calculators/cost-of-capital-calculator"
  },
  {
    "name": "Wacc Calculator",
    "description": "WACC Calculator – Weighted Average Cost of Capital",
    "href": "/calculators/wacc-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">ROI Calculator – Calculate Return on Investment Percentage</h1>
        <p className="text-muted-foreground">Calculate your Return on Investment (ROI) instantly with our free ROI Calculator. Enter your initial investment and final value to determine your profit or loss percentage — essential for evaluating investments, business projects, and financial decisions.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
