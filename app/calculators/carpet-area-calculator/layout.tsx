import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
  description: "Calculate the carpet area of a flat or house from built-up or super built-up area using standard ratios with our free carpet area calculator. Understand exactly how much usable space you're getting. Essential for home buyers in India.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/carpet-area-calculator",
  },
};

const tools = [
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/calculators/flooring-calculator"
  },
  {
    "name": "Tile Calculator",
    "description": "Tile Calculator – How Many Tiles Do You Need?",
    "href": "/calculators/tile-calculator"
  },
  {
    "name": "Ceiling Tile Calculator",
    "description": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
    "href": "/calculators/ceiling-tile-calculator"
  },
  {
    "name": "Paint Coverage Calculator",
    "description": "Paint Calculator – How Much Paint Do You Need to Cover a Room?",
    "href": "/calculators/paint-coverage-calculator"
  },
  {
    "name": "Plastering Calculator",
    "description": "Plastering Calculator – How Much Plaster Do You Need?",
    "href": "/calculators/plastering-calculator"
  },
  {
    "name": "Wallpaper Calculator",
    "description": "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room",
    "href": "/calculators/wallpaper-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Carpet Area Calculator – Calculate Carpet Area from Built-Up Area</h1>
        <p className="text-muted-foreground">Calculate the carpet area of a flat or house from built-up or super built-up area using standard ratios with our free carpet area calculator. Understand exactly how much usable space you're getting. Essential for home buyers in India.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
