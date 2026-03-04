import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Map Scale Calculator – Convert Map Distances to Real-World Measurements",
  description: "Navigate any map accurately with our Map Scale Calculator. Enter a map            measurement and scale ratio to instantly calculate the actual real-world            distance — useful for hiking, urban planning, and geography education.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/map-scale-calculator",
  },
};

const tools = [
  {
    "name": "Land Area Converter",
    "description": "Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha",
    "href": "/land-area-converter"
  },
  {
    "name": "Trip Cost Estimator",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
    "href": "/trip-cost-estimator"
  },
  {
    "name": "Mileage Calculator",
    "description": "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
    "href": "/mileage-calculator"
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
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/0-100-acceleration-estimator"
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
