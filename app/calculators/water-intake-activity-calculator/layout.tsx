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
  title: "Water Intake Calculator – Calculate Daily Water Needs Based on Activity",
  description: "Calculate your daily water intake needs based on body weight, exercise duration, and climate. Free hydration calculator for optimal health and performance.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/water-intake-activity-calculator",
  },
};

const tools = [
  {
    "name": "Water Requirement Calculator",
    "description": "Water Requirement Calculator",
    "href": "/calculators/water-requirement-calculator"
  },
  {
    "name": "Daily Calorie Needs Calculator",
    "description": "Daily Calorie Needs Calculator",
    "href": "/calculators/daily-calorie-needs-calculator"
  },
  {
    "name": "Tdee Calculator",
    "description": "Tdee Calculator",
    "href": "/calculators/tdee-calculator"
  },
  {
    "name": "Macro Calculator",
    "description": "Macro Calculator",
    "href": "/calculators/macro-calculator"
  },
  {
    "name": "Protein Intake Calculator",
    "description": "Protein Intake Calculator",
    "href": "/calculators/protein-intake-calculator"
  },
  {
    "name": "Met Calorie Calculator",
    "description": "Met Calorie Calculator",
    "href": "/calculators/met-calorie-calculator"
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
              <BreadcrumbLink href="/calculators/water-intake-activity-calculator">Water Intake Activity Calculator</BreadcrumbLink>
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
