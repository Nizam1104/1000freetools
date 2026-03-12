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
  title: "Ceiling Tile Calculator – How Many Ceiling Tiles Do You Need?",
  description: "Order the right number of ceiling tiles every time with our Ceiling Tile Calculator.            Input your ceiling dimensions and tile size to calculate the total number of tiles            needed, complete with a percentage allowance for waste and cuts.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ceiling-tile-calculator",
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
    "name": "Tile Calculator",
    "description": "Tile Calculator – How Many Tiles Do You Need?",
    "href": "/calculators/tile-calculator"
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
    "name": "Drywall Area Calculator",
    "description": "Drywall Calculator – Calculate How Many Drywall Sheets You Need",
    "href": "/calculators/drywall-area-calculator"
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
              <BreadcrumbLink href="/calculators/ceiling-tile-calculator">Ceiling Tile Calculator</BreadcrumbLink>
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
