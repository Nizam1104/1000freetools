import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Goal Tracker Calculator – Track Your Progress Toward Any Goal",
  description: "Stay on track to achieve your goals with our Goal Tracker Calculator.            Enter your starting point, current progress, and target to see your completion            percentage and projected finish date — perfect for fitness, financial, and            personal development goals.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/goal-tracker-calculator",
  },
};

const tools = [
  {
    "name": "Daily Habit Streak Calculator",
    "description": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
    "href": "/daily-habit-streak-calculator"
  },
  {
    "name": "Productivity Streak Calculator",
    "description": "Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency",
    "href": "/productivity-streak-calculator"
  },
  {
    "name": "Revision Planner",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
    "href": "/revision-planner"
  },
  {
    "name": "Study Hour Planner",
    "description": "Study Hour Planner – Create a Personalized Study Schedule for Exams",
    "href": "/study-hour-planner"
  },
  {
    "name": "Study Hour Efficiency Calculator",
    "description": "Study Hour Efficiency Calculator – Measure and Improve Your Study Productivity",
    "href": "/study-hour-efficiency-calculator"
  },
  {
    "name": "Dopamine Detox Planner",
    "description": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
    "href": "/dopamine-detox-planner"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
