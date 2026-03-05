import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
  description: "Find out exactly when your phone will be fully charged with our Mobile Charging Time Calculator. Enter battery capacity (mAh), charger wattage, and current charge level to get an accurate estimated charging time.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/mobile-charging-time-calculator",
  },
};

const tools = [
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/battery-life-calculator"
  },
  {
    "name": "Battery Backup Time Calculator",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
    "href": "/battery-backup-time-calculator"
  },
  {
    "name": "Battery C Rate Calculator",
    "description": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
    "href": "/battery-c-rate-calculator"
  },
  {
    "name": "Screen Brightness Battery Calculator",
    "description": "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life",
    "href": "/screen-brightness-battery-calculator"
  },
  {
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/charging-cost-ev-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/electrical-load-calculator"
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
