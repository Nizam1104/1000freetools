import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
  description: "Wondering how much it costs to charge your electric vehicle? Our EV Charging Cost            Calculator lets you enter your battery size (kWh) and local electricity rate to estimate            charging costs at home or at a public station. Save more by knowing your real charging            expenses.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/charging-cost-ev-calculator",
  },
};

const tools = [
  {
    "name": "Ev Battery Capacity Estimator",
    "description": "EV Battery Capacity Estimator – Calculate Your Electric Car&apos;s Real Battery Life",
    "href": "/calculators/ev-battery-capacity-estimator"
  },
  {
    "name": "Range Estimator Ev",
    "description": "EV Range Estimator – Calculate How Far Your Electric Car Can Go",
    "href": "/calculators/range-estimator-ev"
  },
  {
    "name": "Battery Backup Time Calculator",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
    "href": "/calculators/battery-backup-time-calculator"
  },
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/calculators/battery-life-calculator"
  },
  {
    "name": "Battery C Rate Calculator",
    "description": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
    "href": "/calculators/battery-c-rate-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
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
