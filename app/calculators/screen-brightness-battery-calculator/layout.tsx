import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life",
  description: "Extend your device&apos;s battery life by understanding the cost of screen brightness.            Enter your screen brightness level and device battery capacity to estimate runtime            changes — helping you make smarter power management decisions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/screen-brightness-battery-calculator",
  },
};

const tools = [
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/calculators/battery-life-calculator"
  },
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
    "name": "Screen Time Allowance Calculator",
    "description": "Screen-Time Allowance Calculator – Set Healthy Screen Time Limits for Kids",
    "href": "/calculators/screen-time-allowance-calculator"
  },
  {
    "name": "Screen Time Calculator",
    "description": "Screen Time Calculator – Track & Manage Your Digital Wellness",
    "href": "/calculators/screen-time-calculator"
  },
  {
    "name": "Mobile Charging Time Calculator",
    "description": "Phone Charging Time Calculator – How Long Will It Take to Charge Your Phone?",
    "href": "/calculators/mobile-charging-time-calculator"
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
