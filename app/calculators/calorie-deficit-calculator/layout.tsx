import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?",
  description: "Find out exactly how large a calorie deficit you need to reach your weight loss goals. Our calorie deficit calculator helps you lose weight safely and sustainably.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/calorie-deficit-calculator",
  },
};

const tools = [
  {
    "name": "Activity Calorie Calculator",
    "description": "Activity Calorie Burn Calculator – Calories Burned by Activity & Duration",
    "href": "/activity-calorie-calculator"
  },
  {
    "name": "Daily Calorie Needs Calculator",
    "description": "Daily Calorie Needs Calculator – How Many Calories Should You Eat?",
    "href": "/daily-calorie-needs-calculator"
  },
  {
    "name": "Steps To Calories Calculator",
    "description": "Steps to Calories Calculator – Convert Your Steps to Calories Burned",
    "href": "/steps-to-calories-calculator"
  },
  {
    "name": "Cycling Calorie Calculator",
    "description": "Cycling Calorie Calculator – Calories Burned Biking Calculator",
    "href": "/cycling-calorie-calculator"
  },
  {
    "name": "Swimming Calorie Calculator",
    "description": "Swimming Calorie Calculator – How Many Calories Does Swimming Burn?",
    "href": "/swimming-calorie-calculator"
  },
  {
    "name": "Walking Calorie Calculator",
    "description": "Walking Calorie Calculator – How Many Calories Do You Burn Walking?",
    "href": "/walking-calorie-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Calorie Deficit Calculator – How Many Calories to Cut to Lose Weight?</h1>
        <p className="text-muted-foreground">Find out exactly how large a calorie deficit you need to reach your weight loss goals. Our calorie deficit calculator helps you lose weight safely and sustainably.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
