import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
  description: "Find out exactly how far your electric vehicle can travel on a full charge with our EV            Range Estimator. Input your battery capacity and average energy consumption to get an            accurate range estimate in miles or kilometers. Perfect for trip planning and avoiding            range anxiety.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/range-estimator-ev",
  },
};

const tools = [
  {
    "name": "Ev Battery Capacity Estimator",
    "description": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
    "href": "/calculators/ev-battery-capacity-estimator"
  },
  {
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/calculators/charging-cost-ev-calculator"
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
    "name": "Vehicle Depreciation Calculator",
    "description": "Vehicle Depreciation Calculator – Find Out How Much Your Car Has Lost in Value",
    "href": "/calculators/vehicle-depreciation-calculator"
  },
  {
    "name": "Car Loan Calculator",
    "description": "Car Loan Calculator – Calculate Auto Loan Payments",
    "href": "/calculators/car-loan-calculator"
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
