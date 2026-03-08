import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Dividend Payout Calculator",
  description: "Estimate your total dividend income from a stock holding. Enter shares held, dividend per share, and payout frequency to calculate your earnings.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dividend-payout-calculator",
  },
};

const tools = [
  {
    "name": "Dividend Reinvestment Calculator",
    "description": "Dividend Reinvestment (DRIP) Calculator",
    "href": "/calculators/dividend-reinvestment-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/calculators/dollar-cost-averaging-calculator"
  },
  {
    "name": "Stock Cagr Calculator",
    "description": "Stock CAGR Calculator",
    "href": "/calculators/stock-cagr-calculator"
  },
  {
    "name": "Stock Split Calculator",
    "description": "Stock Split Calculator",
    "href": "/calculators/stock-split-calculator"
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
