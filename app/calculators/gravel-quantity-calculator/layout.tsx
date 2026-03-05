import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Gravel Quantity Calculator – Calculate Gravel Needed for Driveways & Landscaping",
  description: "Estimate the exact amount of gravel for your project with our Gravel Quantity Calculator.            Enter area dimensions and desired depth to get volume in cubic yards or meters and weight            in tons — perfect for driveways, garden paths, and construction bases.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gravel-quantity-calculator",
  },
};

const tools = [
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/sand-quantity-calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
    "href": "/asphalt-quantity-calculator"
  },
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/brick-calculator"
  },
  {
    "name": "Concrete Mix Ratio Calculator",
    "description": "Concrete Mix Ratio Calculator – Calculate Material Quantities",
    "href": "/concrete-mix-ratio-calculator"
  },
  {
    "name": "Concrete Volume Calculator",
    "description": "Concrete Volume Calculator – How Much Concrete Do You Need?",
    "href": "/concrete-volume-calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
    "href": "/mortar-volume-calculator"
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
