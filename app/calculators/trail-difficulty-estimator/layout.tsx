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
  title: "Trail Difficulty Estimator – Calculate How Hard a Hiking Trail Really Is",
  description: "Choose the right hiking trail for your fitness level with our Trail Difficulty Estimator.            Input trail distance, total elevation gain, and terrain type to get an objective            difficulty rating — ensuring safe and enjoyable outdoor adventures.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/trail-difficulty-estimator",
  },
};

const tools = [
  {
    "name": "Hiking Pace Calculator",
    "description": "Hiking Pace Calculator – Estimate Trail Time with Naismith's Rule",
    "href": "/calculators/hiking-pace-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/calculators/pace-to-speed-converter"
  },
  {
    "name": "Speed To Pace Converter",
    "description": "Speed to Pace Converter – Convert Speed to Running Pace Online",
    "href": "/calculators/speed-to-pace-converter"
  },
  {
    "name": "Backpack Load Calculator",
    "description": "Backpack Load Calculator – Find Your Safe Maximum Pack Weight",
    "href": "/calculators/backpack-load-calculator"
  },
  {
    "name": "Camping Gear Weight Calculator",
    "description": "Camping Gear Weight Calculator – Plan Your Pack Weight for Any Trip",
    "href": "/calculators/camping-gear-weight-calculator"
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
              <BreadcrumbLink href="/calculators/trail-difficulty-estimator">Trail Difficulty Estimator</BreadcrumbLink>
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
