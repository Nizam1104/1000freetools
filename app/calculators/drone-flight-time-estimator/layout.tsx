import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Drone Flight Time Estimator – Calculate How Long Your Drone Can Fly",
  description: "Plan your aerial shoots with our Drone Flight Time Estimator. Enter battery            capacity, drone weight, and flight style to estimate maximum flight time —            helping drone pilots manage battery usage for longer and safer flights.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/drone-flight-time-estimator",
  },
};

const tools = [
  {
    "name": "Battery Backup Time Calculator",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
    "href": "/battery-backup-time-calculator"
  },
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/battery-life-calculator"
  },
  {
    "name": "Battery C Rate Calculator",
    "description": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
    "href": "/battery-c-rate-calculator"
  },
  {
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/charging-cost-ev-calculator"
  },
  {
    "name": "Ev Battery Capacity Estimator",
    "description": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
    "href": "/ev-battery-capacity-estimator"
  },
  {
    "name": "Range Estimator Ev",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
    "href": "/range-estimator-ev"
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
