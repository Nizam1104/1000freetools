import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
  description: "Plan your next road trip with confidence using our Trip Cost Estimator. Calculate total            travel expenses including fuel, tolls, meals, and lodging all in one place. Get a full            cost breakdown before you hit the road.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/trip-cost-estimator",
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
    "name": "Mileage Calculator",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
    "href": "/mileage-calculator"
  },
  {
    "name": "Map Scale Calculator",
    "description": "Map Scale Calculator – Convert Map Distances to Real-World Measurements",
    "href": "/map-scale-calculator"
  },
  {
    "name": "Boat Speed Calculator",
    "description": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat",
    "href": "/boat-speed-calculator"
  },
  {
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/car-loan-calculator"
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
