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
  title: "Curtain Length Calculator – Find the Perfect Curtain Size for Your Windows",
  description: "Get perfectly sized curtains every time with our Curtain Length Calculator. Enter your            window height and width along with your preferred drop and fullness ratio to calculate            the exact fabric dimensions needed.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/curtain-length-calculator",
  },
};

const tools = [
  {
    "name": "Carpet Area Calculator",
    "description": "Carpet Area Calculator – Calculate Carpet Area from Built-Up Area",
    "href": "/calculators/carpet-area-calculator"
  },
  {
    "name": "Window Area Calculator",
    "description": "Window Area Calculator – Calculate Total Window Size for Glass & Heat Loss",
    "href": "/calculators/window-area-calculator"
  },
  {
    "name": "Wallpaper Calculator",
    "description": "Wallpaper Calculator – Calculate How Many Rolls You Need for Your Room",
    "href": "/calculators/wallpaper-calculator"
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
              <BreadcrumbLink href="/calculators/curtain-length-calculator">Curtain Length Calculator</BreadcrumbLink>
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
