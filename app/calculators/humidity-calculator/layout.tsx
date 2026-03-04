import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Humidity Calculator – Calculate Relative, Absolute & Specific Humidity",
  description: "Calculate various humidity measurements with our comprehensive Humidity Calculator. Enter temperature and dew point to determine relative humidity, absolute humidity, specific humidity, and vapor pressure — essential for meteorology, HVAC, and environmental monitoring.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/humidity-calculator",
  },
};

const tools = [
  {
    "name": "Dew Point Calculator",
    "description": "Dew Point Calculator – Calculate Dew Point from Temperature & Humidity",
    "href": "/dew-point-calculator"
  },
  {
    "name": "Air Density Calculator",
    "description": "Air Density Calculator – Calculate Air Density by Temperature & Pressure",
    "href": "/air-density-calculator"
  },
  {
    "name": "Heat Index Calculator",
    "description": "Heat Index Calculator – Calculate the 'Feels Like' Temperature",
    "href": "/heat-index-calculator"
  },
  {
    "name": "Wind Chill Calculator",
    "description": "Wind Chill Calculator – Find Out What the Temperature Really Feels Like",
    "href": "/wind-chill-calculator"
  },
  {
    "name": "Ideal Gas Law Calculator",
    "description": "Ideal Gas Law Calculator – Solve PV = nRT for Any Variable",
    "href": "/ideal-gas-law-calculator"
  },
  {
    "name": "Mountain Oxygen Calculator",
    "description": "Mountain Oxygen Calculator – Calculate Available Oxygen at Any Altitude",
    "href": "/mountain-oxygen-calculator"
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
