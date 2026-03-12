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
  title: "Protein Intake Calculator – How Much Protein Do You Need Per Day?",
  description: "Use our protein intake calculator to determine your optimal daily protein consumption. Whether you're building muscle, losing weight, or maintaining fitness, get personalized recommendations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/protein-intake-calculator",
  },
};

const tools = [
  {
    "name": "Protein Distribution Calculator",
    "description": "Protein Distribution Calculator – Optimize Protein Timing Per Meal",
    "href": "/calculators/protein-distribution-calculator"
  },
  {
    "name": "Macro Calculator",
    "description": "Macro Calculator – Calculate Your Daily Macros for Any Goal",
    "href": "/calculators/macro-calculator"
  },
  {
    "name": "Ketogenic Macro Calculator",
    "description": "Keto Macro Calculator – Perfect Macros for a Ketogenic Diet",
    "href": "/calculators/ketogenic-macro-calculator"
  },
  {
    "name": "Carb Intake Calculator",
    "description": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator",
    "href": "/calculators/carb-intake-calculator"
  },
  {
    "name": "Fat Intake Calculator",
    "description": "Fat Intake Calculator – How Much Fat Should You Eat Daily?",
    "href": "/calculators/fat-intake-calculator"
  },
  {
    "name": "Calorie Deficit Calculator",
    "description": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
    "href": "/calculators/calorie-deficit-calculator"
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
                    <BreadcrumbLink href="/calculators/protein-intake-calculator">Protein Intake Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Protein Intake Calculator – How Much Protein Do You Need Per Day?</h1>
        <p className="text-muted-foreground">Use our protein intake calculator to determine your optimal daily protein consumption. Whether you're building muscle, losing weight, or maintaining fitness, get personalized recommendations.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
