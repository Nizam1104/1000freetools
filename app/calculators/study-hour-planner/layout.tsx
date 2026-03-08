import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Study Hour Planner – Create a Personalized Study Schedule for Exams",
  description: "Ace your exams with a smart study plan. Our Study Hour Planner helps you            allocate study time across subjects based on difficulty, exam dates, and            your daily availability. Build a realistic, balanced study schedule.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/study-hour-planner",
  },
};

const tools = [
  {
    "name": "Study Hour Efficiency Calculator",
    "description": "Study Hour Efficiency Calculator – Measure and Improve Your Study Productivity",
    "href": "/calculators/study-hour-efficiency-calculator"
  },
  {
    "name": "Revision Planner",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
    "href": "/calculators/revision-planner"
  },
  {
    "name": "Productivity Streak Calculator",
    "description": "Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency",
    "href": "/calculators/productivity-streak-calculator"
  },
  {
    "name": "Goal Tracker Calculator",
    "description": "Goal Tracker Calculator – Track Your Progress Toward Any Goal",
    "href": "/calculators/goal-tracker-calculator"
  },
  {
    "name": "Daily Habit Streak Calculator",
    "description": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
    "href": "/calculators/daily-habit-streak-calculator"
  },
  {
    "name": "Dopamine Detox Planner",
    "description": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
    "href": "/calculators/dopamine-detox-planner"
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
