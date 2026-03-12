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
  title: "Load Progression Calculator – Plan Your Strength Training Increases",
  description: "Calculate optimal weight increases for strength training. Progressive overload calculator helps plan weekly load increases based on experience level and rep targets.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/load-progression-calculator",
  },
};

const tools = [
  {
    "name": "1rm Calculator",
    "description": "1rm Calculator",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "Strength Training Pr Estimator",
    "description": "Strength Training Pr Estimator",
    "href": "/calculators/strength-training-pr-estimator"
  },
  {
    "name": "Workout Volume Calculator",
    "description": "Workout Volume Calculator",
    "href": "/calculators/workout-volume-calculator"
  },
  {
    "name": "Warm Up Calculator",
    "description": "Warm Up Calculator",
    "href": "/calculators/warm-up-calculator"
  },
  {
    "name": "Workout Max Reps Estimator",
    "description": "Workout Max Reps Estimator",
    "href": "/calculators/workout-max-reps-estimator"
  },
  {
    "name": "Bmi Calculator",
    "description": "Bmi Calculator",
    "href": "/calculators/bmi-calculator"
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
              <BreadcrumbLink href="/calculators/load-progression-calculator">Load Progression Calculator</BreadcrumbLink>
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
