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
  title: "Dopamine Detox Planner – Plan a Digital Detox & Reset Your Dopamine Levels",
  description: "Reset your reward system with our Dopamine Detox Planner. Schedule activity            restrictions, set detox duration, and plan healthy low-stimulation alternatives            to break addictive cycles and restore your natural motivation and focus.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/dopamine-detox-planner",
  },
};

const tools = [
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/calculators/meditation-timer-scheduler"
  },
  {
    "name": "Breathing Exercise Timer",
    "description": "Breathing Exercise Timer – Guided Timer for Box Breathing, 4-7-8 & More",
    "href": "/calculators/breathing-exercise-timer"
  },
  {
    "name": "Daily Habit Streak Calculator",
    "description": "Daily Habit Streak Calculator – Track & Build Your Daily Habit Streaks",
    "href": "/calculators/daily-habit-streak-calculator"
  },
  {
    "name": "Productivity Streak Calculator",
    "description": "Productivity Streak Calculator – Track Your Daily Productivity Streaks & Consistency",
    "href": "/calculators/productivity-streak-calculator"
  },
  {
    "name": "Revision Planner",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
    "href": "/calculators/revision-planner"
  },
  {
    "name": "Study Hour Planner",
    "description": "Study Hour Planner – Create a Personalized Study Schedule for Exams",
    "href": "/calculators/study-hour-planner"
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
              <BreadcrumbLink href="/calculators/dopamine-detox-planner">Dopamine Detox Planner</BreadcrumbLink>
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
