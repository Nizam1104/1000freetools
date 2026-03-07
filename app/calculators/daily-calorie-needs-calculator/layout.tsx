import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Daily Calorie Needs Calculator – How Many Calories Should You Eat?",
  description: "Find out exactly how many calories you need each day with our daily calorie needs calculator. Personalized results based on your age, weight, height, and activity level.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/daily-calorie-needs-calculator",
  },
};

const tools = [
  {
    "name": "Calorie Deficit Calculator",
    "description": "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
    "href": "/calculators/calorie-deficit-calculator"
  },
  {
    "name": "Activity Calorie Calculator",
    "description": "Activity Calorie Burn Calculator – Calories Burned by Activity & Duration",
    "href": "/calculators/activity-calorie-calculator"
  },
  {
    "name": "Steps To Calories Calculator",
    "description": "Steps to Calories Calculator – Convert Your Steps to Calories Burned",
    "href": "/calculators/steps-to-calories-calculator"
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
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Daily Calorie Needs Calculator – How Many Calories Should You Eat?</h1>
        <p className="text-muted-foreground">Find out exactly how many calories you need each day with our daily calorie needs calculator. Personalized results based on your age, weight, height, and activity level.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
