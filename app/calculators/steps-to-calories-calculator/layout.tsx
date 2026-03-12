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
  title: "Steps to Calories Calculator – Convert Your Steps to Calories Burned",
  description: "Easily convert your daily step count into calories burned. Our step-to-calorie calculator gives you accurate results based on your weight and stride length.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/steps-to-calories-calculator",
  },
};

const tools = [
  {
    "name": "Activity Calorie Calculator",
    "description": "Activity Calorie Burn Calculator – Calories Burned by Activity & Duration",
    "href": "/calculators/activity-calorie-calculator"
  },
  {
    "name": "Calorie Deficit Calculator",
    "description": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
    "href": "/calculators/calorie-deficit-calculator"
  },
  {
    "name": "Daily Calorie Needs Calculator",
    "description": "Daily Calorie Needs Calculator – How Many Calories Should You Eat?",
    "href": "/calculators/daily-calorie-needs-calculator"
  },
  {
    "name": "Cycling Calorie Calculator",
    "description": "Cycling Calorie Calculator – Calories Burned Biking Calculator",
    "href": "/calculators/cycling-calorie-calculator"
  },
  {
    "name": "Swimming Calorie Calculator",
    "description": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?",
    "href": "/calculators/swimming-calorie-calculator"
  },
  {
    "name": "Walking Calorie Calculator",
    "description": "Walking Calorie Calculator – How Many Calories Do You Burn Walking?",
    "href": "/calculators/walking-calorie-calculator"
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
                    <BreadcrumbLink href="/calculators/steps-to-calories-calculator">Steps To Calories Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Steps to Calories Calculator – Convert Your Steps to Calories Burned</h1>
        <p className="text-muted-foreground">Easily convert your daily step count into calories burned. Our step-to-calorie calculator gives you accurate results based on your weight and stride length.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
