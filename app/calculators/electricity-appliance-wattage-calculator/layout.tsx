import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Appliance Wattage & Electricity Cost Calculator – See What's Draining Your Power Bill",
  description: "Find out exactly how much each appliance costs to run with our Electricity Appliance            Wattage Calculator. Enter wattage and daily usage hours to see kWh consumption and            monthly electricity cost — perfect for reducing your power bill.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/electricity-appliance-wattage-calculator",
  },
};

const tools = [
  {
    "name": "Electrical Load Calculator",
    "description": "Electrical Load Calculator – Calculate Circuit Load",
    "href": "/calculators/electrical-load-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Room Heater Wattage Calculator",
    "description": "Room Heater Wattage Calculator – Find the Right Heater Size for Your Room",
    "href": "/calculators/room-heater-wattage-calculator"
  },
  {
    "name": "Electric Power Calculator",
    "description": "Electric Power Calculator",
    "href": "/calculators/electric-power-calculator"
  },
  {
    "name": "Resistance Calculator",
    "description": "Resistance Calculator – Calculate Resistance with Ohm's Law",
    "href": "/calculators/resistance-calculator"
  },
  {
    "name": "Inverter Capacity Calculator",
    "description": "Inverter Capacity Calculator – Size Your Inverter",
    "href": "/calculators/inverter-capacity-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/electricity-appliance-wattage-calculator">Electricity Appliance Wattage Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
