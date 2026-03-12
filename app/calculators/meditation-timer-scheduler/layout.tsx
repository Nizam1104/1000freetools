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
  title: "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
  description: "Create the perfect meditation session with our Meditation Timer Scheduler.            Set session duration, interval bells, and session type to stay focused            without watching the clock — ideal for beginners and experienced meditators alike.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/meditation-timer-scheduler",
  },
};

const tools = [
  {
    "name": "Breathing Exercise Timer",
    "description": "Breathing Exercise Timer – Guided Timer for Box Breathing, 4-7-8 & More",
    "href": "/calculators/breathing-exercise-timer"
  },
  {
    "name": "Sleep Cycle Calculator",
    "description": "Sleep Cycle Calculator – Wake Up Refreshed Every Morning",
    "href": "/calculators/sleep-cycle-calculator"
  },
  {
    "name": "Sleep Debt Calculator",
    "description": "Sleep Debt Calculator – How Much Sleep Are You Missing?",
    "href": "/calculators/sleep-debt-calculator"
  },
  {
    "name": "Sleep Wake Efficiency Calculator",
    "description": "Sleep Efficiency Calculator – Measure the Quality of Your Night&apos;s Sleep",
    "href": "/calculators/sleep-wake-efficiency-calculator"
  },
  {
    "name": "Deep Sleep Cycle Planner",
    "description": "Deep Sleep Planner – Optimize Your Sleep Schedule for Deep Rest",
    "href": "/calculators/deep-sleep-cycle-planner"
  },
  {
    "name": "Ideal Bedtime Calculator",
    "description": "Ideal Bedtime Calculator – What Time Should You Go to Sleep?",
    "href": "/calculators/ideal-bedtime-calculator"
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
              <BreadcrumbLink href="/calculators/meditation-timer-scheduler">Meditation Timer Scheduler</BreadcrumbLink>
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
