import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Ideal Bedtime Calculator – What Time Should You Go to Sleep?",
  description: "Struggling with morning grogginess? Our bedtime calculator tells you exactly when to go to sleep so you wake up feeling rested and refreshed every day.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ideal-bedtime-calculator",
  },
};

const tools = [
  {
    "name": "Sleep Cycle Calculator",
    "description": "Sleep Cycle Calculator – Wake Up Refreshed Every Morning",
    "href": "/sleep-cycle-calculator"
  },
  {
    "name": "Sleep Debt Calculator",
    "description": "Sleep Debt Calculator – How Much Sleep Are You Missing?",
    "href": "/sleep-debt-calculator"
  },
  {
    "name": "Sleep Wake Efficiency Calculator",
    "description": "Sleep Efficiency Calculator – Measure the Quality of Your Night&apos;s Sleep",
    "href": "/sleep-wake-efficiency-calculator"
  },
  {
    "name": "Deep Sleep Cycle Planner",
    "description": "Deep Sleep Planner – Optimize Your Sleep Schedule for Deep Rest",
    "href": "/deep-sleep-cycle-planner"
  },
  {
    "name": "Baby Sleep Schedule Calculator",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
    "href": "/baby-sleep-schedule-calculator"
  },
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/meditation-timer-scheduler"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Ideal Bedtime Calculator – What Time Should You Go to Sleep?</h1>
        <p className="text-muted-foreground">Struggling with morning grogginess? Our bedtime calculator tells you exactly when to go to sleep so you wake up feeling rested and refreshed every day.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
