import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room",
  description: "Choose the right room heater with our Wattage Calculator. Enter your room dimensions,            insulation level, and local climate to find the recommended heater wattage for            efficient and comfortable heating.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/room-heater-wattage-calculator",
  },
};

const tools = [
  {
    "name": "Robot Motor Torque Calculator",
    "description": "Robot Motor Torque Calculator – Calculate Required Torque for Motors & Actuators",
    "href": "/calculators/robot-motor-torque-calculator"
  },
  {
    "name": "Roi Calculator Ad",
    "description": "Ad ROI Calculator – Calculate Return on Investment for Your Ad Campaigns",
    "href": "/calculators/roi-calculator-ad"
  },
  {
    "name": "Roi Calculator",
    "description": "ROI Calculator – Calculate Return on Investment Percentage",
    "href": "/calculators/roi-calculator"
  },
  {
    "name": "Roman Numerals Converter",
    "description": "Roman Numerals Converter",
    "href": "/calculators/roman-numerals-converter"
  },
  {
    "name": "Roofing Sheets Calculator",
    "description": "Roofing Calculator – How Many Roofing Sheets Do You Need?",
    "href": "/calculators/roofing-sheets-calculator"
  },
  {
    "name": "Root Calculator",
    "description": "Root Calculator – Calculate Square, Cube and Nth Roots",
    "href": "/calculators/root-calculator"
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
