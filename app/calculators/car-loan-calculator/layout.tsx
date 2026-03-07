import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Car Loan Calculator – Calculate Auto Loan Payments",
  description: "Plan your auto financing with confidence. Calculate your monthly car loan payment and total cost based on vehicle price, down payment, rate, and duration.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/car-loan-calculator",
  },
};

const tools = [
  {
    "name": "Car Loan Affordability Calculator",
    "description": "Car Loan Affordability Calculator – Find Out What Car You Can Afford",
    "href": "/calculators/car-loan-affordability-calculator"
  },
  {
    "name": "Fuel Cost Calculator",
    "description": "Fuel Cost Calculator – Estimate Your Trip Fuel Expenses Instantly",
    "href": "/calculators/fuel-cost-calculator"
  },
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
    "name": "Trip Cost Estimator",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
    "href": "/calculators/trip-cost-estimator"
  },
  {
    "name": "Vehicle Depreciation Calculator",
    "description": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
    "href": "/calculators/vehicle-depreciation-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Car Loan Calculator – Calculate Auto Loan Payments</h1>
        <p className="text-muted-foreground">Plan your auto financing with confidence. Calculate your monthly car loan payment and total cost based on vehicle price, down payment, rate, and duration.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
