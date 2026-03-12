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
  title: "MET Calorie Calculator – Calculate Calories Burned by Activity",
  description: "Estimate calories burned during exercise using MET values. Free calculator helps track energy expenditure for weight management and fitness goals with activity library.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/met-calorie-calculator",
  },
};

const tools = [
  {
    "name": "Activity Calorie Calculator",
    "description": "Activity Calorie Calculator",
    "href": "/calculators/activity-calorie-calculator"
  },
  {
    "name": "Tdee Calculator",
    "description": "Tdee Calculator",
    "href": "/calculators/tdee-calculator"
  },
  {
    "name": "Calorie Deficit Calculator",
    "description": "Calorie Deficit Calculator",
    "href": "/calculators/calorie-deficit-calculator"
  },
  {
    "name": "Steps to Calories Calculator",
    "description": "Steps to Calories Calculator",
    "href": "/calculators/steps-to-calories-calculator"
  },
  {
    "name": "Walking Calorie Calculator",
    "description": "Walking Calorie Calculator",
    "href": "/calculators/walking-calorie-calculator"
  },
  {
    "name": "Cycling Calorie Calculator",
    "description": "Cycling Calorie Calculator",
    "href": "/calculators/cycling-calorie-calculator"
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
              <BreadcrumbLink href="/calculators/met-calorie-calculator">Met Calorie Calculator</BreadcrumbLink>
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
