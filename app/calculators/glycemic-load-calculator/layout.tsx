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
  title: "Glycemic Load Calculator – Calculate GL of Foods and Meals",
  description: "Understand the real impact of carbohydrates on your blood sugar. Our glycemic load calculator factors in both the GI and the amount of carbs to give you a true measure of glycemic impact.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/glycemic-load-calculator",
  },
};

const tools = [
  {
    "name": "Glycemic Index Calculator",
    "description": "Glycemic Index Calculator – Find the GI of Any Food",
    "href": "/calculators/glycemic-index-calculator"
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
    "name": "Ketogenic Macro Calculator",
    "description": "Keto Macro Calculator – Perfect Macros for a Ketogenic Diet",
    "href": "/calculators/ketogenic-macro-calculator"
  },
  {
    "name": "Macro Calculator",
    "description": "Macro Calculator – Calculate Your Daily Macros for Any Goal",
    "href": "/calculators/macro-calculator"
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
                    <BreadcrumbLink href="/calculators/glycemic-load-calculator">Glycemic Load Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Glycemic Load Calculator – Calculate GL of Foods and Meals</h1>
        <p className="text-muted-foreground">Understand the real impact of carbohydrates on your blood sugar. Our glycemic load calculator factors in both the GI and the amount of carbs to give you a true measure of glycemic impact.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
