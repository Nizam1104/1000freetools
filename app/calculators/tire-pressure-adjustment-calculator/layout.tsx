import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Tire Pressure Adjustment Calculator – Correct PSI for Temperature & Load",
  description: "Maintain optimal tire pressure in all conditions with our Tire Pressure Adjustment Calculator.            Account for ambient temperature, vehicle load, and altitude to calculate the correct PSI —            improving fuel efficiency, tire life, and driving safety.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/tire-pressure-adjustment-calculator",
  },
};

const tools = [
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
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/car-loan-calculator"
  },
  {
    "name": "Mileage Calculator",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
    "href": "/mileage-calculator"
  },
  {
    "name": "Vehicle Turning Radius Calculator",
    "description": "Vehicle Turning Radius Calculator – Calculate Minimum Turning Circle for Any Car",
    "href": "/vehicle-turning-radius-calculator"
  },
  {
    "name": "Boat Speed Calculator",
    "description": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat",
    "href": "/boat-speed-calculator"
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
