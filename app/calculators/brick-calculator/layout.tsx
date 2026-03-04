import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Brick Calculator",
  description: "Calculate how many bricks you need for your wall. Enter wall dimensions, brick size, and mortar thickness to get accurate quantities with waste allowance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/brick-calculator",
  },
};

const tools = [
  {
    "name": "Brick Bond Calculator",
    "description": "Brick Bond Calculator – Calculate Bricks Needed for Any Wall Pattern",
    "href": "/brick-bond-calculator"
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
  },
  {
    "name": "Plastering Calculator",
    "description": "Plastering Calculator – How Much Plaster Do You Need?",
    "href": "/plastering-calculator"
  },
  {
    "name": "Sand Quantity Calculator",
    "description": "Sand Quantity Calculator – Calculate How Much Sand You Need for Construction",
    "href": "/sand-quantity-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Brick Calculator</h1>
        <p className="text-muted-foreground">Calculate how many bricks you need for your wall. Enter wall dimensions, brick size, and mortar thickness to get accurate quantities with waste allowance.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
