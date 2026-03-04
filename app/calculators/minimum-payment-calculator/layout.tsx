import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Credit Card Minimum Payment Calculator",
  description: "Discover the true cost of paying only the minimum on your credit card. See the total interest paid and years it takes to clear your balance this way.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/minimum-payment-calculator",
  },
};

const tools = [
  {
    "name": "Matrix Addition Calculator",
    "description": "Matrix Addition Calculator",
    "href": "/matrix-addition-calculator"
  },
  {
    "name": "Matrix Multiplication Calculator",
    "description": "Matrix Multiplication Calculator",
    "href": "/matrix-multiplication-calculator"
  },
  {
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/median-calculator"
  },
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/meditation-timer-scheduler"
  },
  {
    "name": "Mileage Calculator",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
    "href": "/mileage-calculator"
  },
  {
    "name": "Mirror Equation Calculator",
    "description": "Mirror Equation Calculator – Spherical Mirror Formula",
    "href": "/mirror-equation-calculator"
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
