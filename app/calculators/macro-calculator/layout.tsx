import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Macro Calculator – Calculate Your Daily Macros for Any Goal",
  description: "Dial in your nutrition with our macro calculator. Get personalized daily protein, carb, and fat targets tailored to your body, calories, and whether you want to cut, bulk, or maintain.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/macro-calculator",
  },
};

const tools = [
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
    "name": "Protein Distribution Calculator",
    "description": "Protein Distribution Calculator – Optimize Protein Timing Per Meal",
    "href": "/calculators/protein-distribution-calculator"
  },
  {
    "name": "Protein Intake Calculator",
    "description": "Protein Intake Calculator – How Much Protein Do You Need Per Day?",
    "href": "/calculators/protein-intake-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Macro Calculator – Calculate Your Daily Macros for Any Goal</h1>
        <p className="text-muted-foreground">Dial in your nutrition with our macro calculator. Get personalized daily protein, carb, and fat targets tailored to your body, calories, and whether you want to cut, bulk, or maintain.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
