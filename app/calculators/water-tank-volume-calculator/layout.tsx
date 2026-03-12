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
  title: "Water Tank Volume Calculator – Calculate Tank Capacity in Liters & Gallons",
  description: "Quickly find out how much water your tank can hold with our Water Tank Volume            Calculator. Supports cylindrical, rectangular, and other tank shapes. Get results in            liters, gallons, or cubic meters instantly.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/water-tank-volume-calculator",
  },
};

const tools = [
  {
    "name": "Water Flow Rate Calculator",
    "description": "Water Flow Rate Calculator – Calculate Flow Rate in Pipes",
    "href": "/calculators/water-flow-rate-calculator"
  },
  {
    "name": "Pipe Water Tank Pressure Calculator",
    "description": "Pipe Water Pressure Calculator – Calculate Static Pressure from Water Tank Height",
    "href": "/calculators/pipe-water-tank-pressure-calculator"
  },
  {
    "name": "Water Requirement Calculator",
    "description": "Water Intake Calculator – How Much Water Should You Drink Per Day?",
    "href": "/calculators/water-requirement-calculator"
  },
  {
    "name": "Aquarium Filtration Calculator",
    "description": "Aquarium Filtration Calculator – Find the Right Filter Size for Your Fish Tank",
    "href": "/calculators/aquarium-filtration-calculator"
  },
  {
    "name": "Aquarium Volume Calculator",
    "description": "Aquarium Volume Calculator – Calculate Fish Tank Water Capacity",
    "href": "/calculators/aquarium-volume-calculator"
  },
  {
    "name": "Manning Equation Calculator",
    "description": "Manning Equation Calculator – Open Channel Flow",
    "href": "/calculators/manning-equation-calculator"
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
              <BreadcrumbLink href="/calculators/water-tank-volume-calculator">Water Tank Volume Calculator</BreadcrumbLink>
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
