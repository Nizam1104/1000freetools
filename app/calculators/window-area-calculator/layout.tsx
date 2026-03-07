import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
  description: "Calculate the exact area of your windows with our Window Area Calculator.            Enter window dimensions to find total glazing area — useful for ordering glass,            estimating heat loss, and window treatment planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/window-area-calculator",
  },
};

const tools = [
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/calculators/carpet-area-calculator"
  },
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/calculators/flooring-calculator"
  },
  {
    "name": "Curtain Length Calculator",
    "description": "Curtain Length Calculator – Find the Perfect Curtain Size for Your Windows",
    "href": "/calculators/curtain-length-calculator"
  },
  {
    "name": "Paint Cost Estimate Calculator",
    "description": "Paint Cost Estimate Calculator – How Much Paint Do You Need for a Room?",
    "href": "/calculators/paint-cost-estimate-calculator"
  },
  {
    "name": "Paint Coverage Calculator",
    "description": "Paint Calculator – How Much Paint Do You Need to Cover a Room?",
    "href": "/calculators/paint-coverage-calculator"
  },
  {
    "name": "Tile Calculator",
    "description": "Tile Calculator – How Many Tiles Do You Need?",
    "href": "/calculators/tile-calculator"
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
