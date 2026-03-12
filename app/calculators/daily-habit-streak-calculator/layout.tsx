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
  title: "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
  description: "Build lasting habits with our Daily Habit Streak Calculator.            Log your habit completions to track your current streak, longest streak,            and overall success rate — using positive reinforcement to keep you            consistent and motivated.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/daily-habit-streak-calculator",
  },
};

const tools = [
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
    "name": "Business Days Calculator",
    "description": "Business Days Calculator – Count Working Days Between Dates",
    "href": "/calculators/business-days-calculator"
  },
  {
    "name": "Date Add Subtract Calculator",
    "description": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
    "href": "/calculators/date-add-subtract-calculator"
  },
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator – Days Between Two Dates",
    "href": "/calculators/date-difference-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
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
              <BreadcrumbLink href="/calculators/daily-habit-streak-calculator">Daily Habit Streak Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
