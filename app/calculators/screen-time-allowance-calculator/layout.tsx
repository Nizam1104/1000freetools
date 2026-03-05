import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Screen-Time Allowance Calculator – Set Healthy Screen Time Limits for Kids",
  description: "Set healthy digital boundaries for your children with our Screen-Time Allowance Calculator.            Enter your child&apos;s age to get evidence-based daily screen time recommendations from            AAP guidelines — broken down by content type.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/screen-time-allowance-calculator",
  },
};

const tools = [
  {
    "name": "Screen Time Calculator",
    "description": "Screen Time Calculator – Track & Manage Your Digital Wellness",
    "href": "/screen-time-calculator"
  },
  {
    "name": "Screen Brightness Battery Calculator",
    "description": "Screen Brightness Battery Calculator – How Brightness Affects Your Battery Life",
    "href": "/screen-brightness-battery-calculator"
  },
  {
    "name": "Battery Life Calculator",
    "description": "Battery Life Calculator – Calculate Battery Runtime",
    "href": "/battery-life-calculator"
  },
  {
    "name": "Dopamine Detox Planner",
    "description": "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
    "href": "/dopamine-detox-planner"
  },
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/meditation-timer-scheduler"
  },
  {
    "name": "Daily Habit Streak Calculator",
    "description": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
    "href": "/daily-habit-streak-calculator"
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
