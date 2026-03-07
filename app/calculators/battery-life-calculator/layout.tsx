import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Battery Life Calculator – Calculate Battery Runtime",
  description: "Estimate how long your battery will last with our battery life calculator. Enter battery capacity and load to calculate runtime in hours and minutes.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/battery-life-calculator",
  },
};

const tools = [
  {
    "name": "Battery Backup Time Calculator",
    "description": "Battery Backup Time Calculator – How Long Will Your Battery Last?",
    "href": "/calculators/battery-backup-time-calculator"
  },
  {
    "name": "Battery C Rate Calculator",
    "description": "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
    "href": "/calculators/battery-c-rate-calculator"
  },
  {
    "name": "Mobile Charging Time Calculator",
    "description": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
    "href": "/calculators/mobile-charging-time-calculator"
  },
  {
    "name": "Screen Brightness Battery Calculator",
    "description": "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life",
    "href": "/calculators/screen-brightness-battery-calculator"
  },
  {
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/calculators/charging-cost-ev-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Battery Life Calculator – Calculate Battery Runtime</h1>
        <p className="text-muted-foreground">Estimate how long your battery will last with our battery life calculator. Enter battery capacity and load to calculate runtime in hours and minutes.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
