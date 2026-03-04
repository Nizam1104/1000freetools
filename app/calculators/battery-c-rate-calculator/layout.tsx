import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Battery C-Rate Calculator – Calculate Charge/Discharge Rate",
  description: "Calculate battery C-rate and corresponding current. C-rate indicates how fast a battery charges or discharges.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/battery-c-rate-calculator",
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
    "name": "Charging Cost Ev Calculator",
    "description": "EV Charging Cost Calculator – Calculate the Cost to Charge Your Electric Car",
    "href": "/charging-cost-ev-calculator"
  },
  {
    "name": "Mobile Charging Time Calculator",
    "description": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
    "href": "/mobile-charging-time-calculator"
  },
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/electrical-load-calculator"
  },
  {
    "name": "Inverter Capacity Calculator",
    "description": "Inverter Capacity Calculator – Size Your Inverter",
    "href": "/inverter-capacity-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Battery C-Rate Calculator – Calculate Charge/Discharge Rate</h1>
        <p className="text-muted-foreground">Calculate battery C-rate and corresponding current. C-rate indicates how fast a battery charges or discharges.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
