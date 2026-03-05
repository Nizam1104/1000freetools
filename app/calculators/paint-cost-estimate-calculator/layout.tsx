import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?",
  description: "Calculate the exact amount of paint and budget needed for your next painting project            with our Paint Cost Estimate Calculator. Enter room dimensions, number of coats, and            paint price per liter to get an accurate estimate instantly.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/paint-cost-estimate-calculator",
  },
};

const tools = [
  {
    "name": "Paint Coverage Calculator",
    "description": "Paint Calculator – How Much Paint Do You Need to Cover a Room?",
    "href": "/paint-coverage-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/flooring-calculator"
  },
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/carpet-area-calculator"
  },
  {
    "name": "Wallpaper Calculator",
    "description": "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room",
    "href": "/wallpaper-calculator"
  },
  {
    "name": "Tile Calculator",
    "description": "Tile Calculator – How Many Tiles Do You Need?",
    "href": "/tile-calculator"
  },
  {
    "name": "Ceiling Tile Calculator",
    "description": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
    "href": "/ceiling-tile-calculator"
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
