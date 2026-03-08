import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Inverter Capacity Calculator – Size Your Inverter",
  description: "Calculate the required inverter capacity for your electrical loads. Enter your devices and their power consumption to determine the right inverter size.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/inverter-capacity-calculator",
  },
};

const tools = [
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
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
  {
    "name": "Ups Generator Runtime Calculator",
    "description": "UPS & Generator Runtime Calculator – How Long Will Your Backup Power Last?",
    "href": "/calculators/ups-generator-runtime-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Inverter Capacity Calculator – Size Your Inverter</h1>
        <p className="text-muted-foreground">Calculate the required inverter capacity for your electrical loads. Enter your devices and their power consumption to determine the right inverter size.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
