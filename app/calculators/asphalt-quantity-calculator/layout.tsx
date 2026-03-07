import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
  description: "Accurately estimate asphalt requirements for any paving project with our            Asphalt Quantity Calculator. Enter the area and compacted depth to calculate            volume in cubic yards and weight in tons — enabling accurate material            ordering and cost estimation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/asphalt-quantity-calculator",
  },
};

const tools = [
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/calculators/brick-calculator"
  },
  {
    "name": "Concrete Mix Ratio Calculator",
    "description": "Concrete Mix Ratio Calculator – Calculate Material Quantities",
    "href": "/calculators/concrete-mix-ratio-calculator"
  },
  {
    "name": "Concrete Volume Calculator",
    "description": "Concrete Volume Calculator – How Much Concrete Do You Need?",
    "href": "/calculators/concrete-volume-calculator"
  },
  {
    "name": "Gravel Quantity Calculator",
    "description": "Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping",
    "href": "/calculators/gravel-quantity-calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
    "href": "/calculators/mortar-volume-calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/calculators/sand-quantity-calculator"
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
