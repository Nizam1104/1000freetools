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
  title: "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room",
  description: "Avoid over- or under-buying wallpaper with our free Wallpaper Calculator. Enter your            room dimensions and roll size to instantly find out how many rolls you need, including            a waste allowance for pattern matching.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/wallpaper-calculator",
  },
};

const tools = [
  {
    "name": "Flooring Calculator",
    "description": "Flooring Calculator – How Much Flooring Do You Need?",
    "href": "/calculators/flooring-calculator"
  },
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/calculators/carpet-area-calculator"
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
    "name": "Tile Calculator",
    "description": "Tile Calculator – How Many Tiles Do You Need?",
    "href": "/calculators/tile-calculator"
  },
  {
    "name": "Ceiling Tile Calculator",
    "description": "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
    "href": "/calculators/ceiling-tile-calculator"
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
              <BreadcrumbLink href="/calculators/wallpaper-calculator">Wallpaper Calculator</BreadcrumbLink>
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
