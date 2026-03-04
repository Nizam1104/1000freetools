import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
  description: "Estimate your car's current market value and total depreciation with our Vehicle            Depreciation Calculator. Enter the original purchase price, vehicle age, and annual            mileage to see how much value your car has lost — ideal for resale planning and            insurance purposes.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/vehicle-depreciation-calculator",
  },
};

const tools = [
  {
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/car-loan-calculator"
  },
  {
    "name": "Depreciation Calculator",
    "description": "Depreciation Calculator",
    "href": "/depreciation-calculator"
  },
  {
    "name": "Fuel Cost Calculator",
    "description": "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly",
    "href": "/fuel-cost-calculator"
  },
  {
    "name": "Fuel Efficiency Comparison Calculator",
    "description": "Fuel Efficiency Comparison Calculator – Compare Cars by MPG & Running Cost",
    "href": "/fuel-efficiency-comparison-calculator"
  },
  {
    "name": "Range Estimator Ev",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
    "href": "/range-estimator-ev"
  },
  {
    "name": "Ev Battery Capacity Estimator",
    "description": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
    "href": "/ev-battery-capacity-estimator"
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
