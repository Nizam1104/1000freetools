import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Mileage Calculator – Calculate Your Car's Fuel Efficiency (MPG & km/L)",
  description: "Find out your car's real-world mileage with our free Mileage Calculator. Simply enter            the distance traveled and the amount of fuel used to instantly calculate MPG, km/L, or            L/100km. Great for tracking fuel efficiency and planning fuel budgets.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mileage-calculator",
  },
};

const tools = [
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
    "name": "Trip Cost Estimator",
    "description": "Trip Cost Estimator – Plan Your Road Trip Budget with Ease",
    "href": "/calculators/trip-cost-estimator"
  },
  {
    "name": "Map Scale Calculator",
    "description": "Map Scale Calculator – Convert Map Distances to Real-World Measurements",
    "href": "/calculators/map-scale-calculator"
  },
  {
    "name": "Boat Speed Calculator",
    "description": "Boat Speed Calculator – Calculate Maximum Hull Speed for Any Boat",
    "href": "/calculators/boat-speed-calculator"
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
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/mileage-calculator">Mileage Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
