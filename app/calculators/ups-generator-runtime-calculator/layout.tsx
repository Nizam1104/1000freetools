import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?",
  description: "Know exactly how long your UPS or generator will run during a power outage.            Enter battery or fuel capacity and total connected load to calculate expected            runtime — critical for emergency preparedness and business continuity planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ups-generator-runtime-calculator",
  },
};

const tools = [
  {
    "name": "Ups Load Calculator",
    "description": "UPS Load Calculator – Calculate UPS Capacity & Runtime for Your Equipment",
    "href": "/calculators/ups-load-calculator"
  },
  {
    "name": "Inverter Capacity Calculator",
    "description": "Inverter Capacity Calculator – Size Your Inverter",
    "href": "/calculators/inverter-capacity-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
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
