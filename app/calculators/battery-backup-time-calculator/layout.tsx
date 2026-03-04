import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Battery Backup Time Calculator – How Long Will Your Battery Last?",
  description: "Find out how long your battery will power your devices with our Battery Backup Time            Calculator. Enter battery capacity in Ah or Wh and your device's power draw in watts to            get an accurate runtime estimate — ideal for solar systems, UPS, and portable power banks.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/battery-backup-time-calculator",
  },
};

const tools = [
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
    "name": "Mobile Charging Time Calculator",
    "description": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
    "href": "/mobile-charging-time-calculator"
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
