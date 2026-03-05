import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Keto Macro Calculator – Perfect Macros for a Ketogenic Diet",
  description: "Start your keto journey the right way. Our ketogenic macro calculator gives you personalized fat, protein, and carb targets to keep your body in ketosis and burning fat.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ketogenic-macro-calculator",
  },
};

const tools = [
  {
    "name": "Macro Calculator",
    "description": "Macro Calculator – Calculate Your Daily Macros for Any Goal",
    "href": "/macro-calculator"
  },
  {
    "name": "Carb Intake Calculator",
    "description": "Carb Intake Calculator – Daily Carbohydrate Needs Calculator",
    "href": "/carb-intake-calculator"
  },
  {
    "name": "Fat Intake Calculator",
    "description": "Fat Intake Calculator – How Much Fat Should You Eat Daily?",
    "href": "/fat-intake-calculator"
  },
  {
    "name": "Protein Distribution Calculator",
    "description": "Protein Distribution Calculator – Optimize Protein Timing Per Meal",
    "href": "/protein-distribution-calculator"
  },
  {
    "name": "Protein Intake Calculator",
    "description": "Protein Intake Calculator – How Much Protein Do You Need Per Day?",
    "href": "/protein-intake-calculator"
  },
  {
    "name": "Calorie Deficit Calculator",
    "description": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
    "href": "/calorie-deficit-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Keto Macro Calculator – Perfect Macros for a Ketogenic Diet</h1>
        <p className="text-muted-foreground">Start your keto journey the right way. Our ketogenic macro calculator gives you personalized fat, protein, and carb targets to keep your body in ketosis and burning fat.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
