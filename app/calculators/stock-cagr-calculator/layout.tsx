import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Stock CAGR Calculator",
  description: "Calculate the Compound Annual Growth Rate of any stock or investment. Enter the beginning value, ending value, and number of years to find your CAGR.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/stock-cagr-calculator",
  },
};

const tools = [
  {
    "name": "Stock Split Calculator",
    "description": "Stock Split Calculator",
    "href": "/stock-split-calculator"
  },
  {
    "name": "Dividend Payout Calculator",
    "description": "Dividend Payout Calculator",
    "href": "/dividend-payout-calculator"
  },
  {
    "name": "Dividend Reinvestment Calculator",
    "description": "Dividend Reinvestment (DRIP) Calculator",
    "href": "/dividend-reinvestment-calculator"
  },
  {
    "name": "Dollar Cost Averaging Calculator",
    "description": "Dollar-Cost Averaging (DCA) Calculator",
    "href": "/dollar-cost-averaging-calculator"
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
