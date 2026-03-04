import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Dividend Reinvestment (DRIP) Calculator",
  description: "Calculate how reinvesting dividends to buy more shares compounds your portfolio growth over time. See the power of DRIP on your long-term wealth.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dividend-reinvestment-calculator",
  },
};

const tools = [
  {
    "name": "Dividend Payout Calculator",
    "description": "Dividend Payout Calculator",
    "href": "/dividend-payout-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/dollar-cost-averaging-calculator"
  },
  {
    "name": "Stock Cagr Calculator",
    "description": "Stock CAGR Calculator",
    "href": "/stock-cagr-calculator"
  },
  {
    "name": "Stock Split Calculator",
    "description": "Stock Split Calculator",
    "href": "/stock-split-calculator"
  },
  {
    "name": "Reverse Stock Split Calculator",
    "description": "Reverse Stock Split Calculator",
    "href": "/reverse-stock-split-calculator"
  },
  {
    "name": "Investment Return Rate Calculator",
    "description": "Investment Return Rate Calculator",
    "href": "/investment-return-rate-calculator"
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
