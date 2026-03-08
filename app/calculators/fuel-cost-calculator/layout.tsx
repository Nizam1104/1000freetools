import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly",
  description: "Use our free Fuel Cost Calculator to estimate how much you'll spend on fuel for any            trip. Enter your distance, vehicle fuel efficiency, and local fuel price to get an            instant cost breakdown. Perfect for road trips, daily commutes, and travel budgeting.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/fuel-cost-calculator",
  },
};

const tools = [
  {
    "name": "Fuel Efficiency Comparison Calculator",
    "description": "Fuel Efficiency Comparison Calculator – Compare Cars by MPG & Running Cost",
    "href": "/calculators/fuel-efficiency-comparison-calculator"
  },
  {
    "name": "Mileage Calculator",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
    "href": "/calculators/mileage-calculator"
  },
  {
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/calculators/car-loan-calculator"
  },
  {
    "name": "Trip Cost Estimator",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
    "href": "/calculators/trip-cost-estimator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
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
