import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Concrete Mix Ratio Calculator – Calculate Material Quantities",
  description: "Calculate cement, sand, and aggregate quantities for concrete mixes. Enter volume and mix ratio.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/concrete-mix-ratio-calculator",
  },
};

const tools = [
  {
    "name": "Concrete Volume Calculator",
    "description": "Concrete Volume Calculator – How Much Concrete Do You Need?",
    "href": "/concrete-volume-calculator"
  },
  {
    "name": "Brick Calculator",
    "description": "Brick Calculator",
    "href": "/brick-calculator"
  },
  {
    "name": "Brick Bond Calculator",
    "description": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern",
    "href": "/brick-bond-calculator"
  },
  {
    "name": "Mortar Volume Calculator",
    "description": "Mortar Volume Calculator – Calculate Mortar Needed for Bricklaying & Tiling",
    "href": "/mortar-volume-calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/sand-quantity-calculator"
  },
  {
    "name": "Asphalt Quantity Calculator",
    "description": "Asphalt Quantity Calculator – Calculate Asphalt Needed for Roads & Driveways",
    "href": "/asphalt-quantity-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Concrete Mix Ratio Calculator – Calculate Material Quantities</h1>
        <p className="text-muted-foreground">Calculate cement, sand, and aggregate quantities for concrete mixes. Enter volume and mix ratio.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
