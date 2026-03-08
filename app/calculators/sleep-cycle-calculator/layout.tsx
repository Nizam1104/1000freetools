import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator – Wake Up Refreshed Every Morning",
  description: "Wake up feeling energized by timing your sleep with our sleep cycle calculator. Find the best times to wake up or fall asleep based on natural 90-minute sleep cycles.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/sleep-cycle-calculator",
  },
};

const tools = [
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
    "name": "Baby Sleep Schedule Calculator",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
    "href": "/calculators/baby-sleep-schedule-calculator"
  },
  {
    "name": "Ideal Bedtime Calculator",
    "description": "Ideal Bedtime Calculator – What Time Should You Go to Sleep?",
    "href": "/calculators/ideal-bedtime-calculator"
  },
  {
    "name": "Meditation Timer Scheduler",
    "description": "Meditation Timer Scheduler – Set Up & Time Your Daily Meditation Sessions",
    "href": "/calculators/meditation-timer-scheduler"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Sleep Cycle Calculator – Wake Up Refreshed Every Morning</h1>
        <p className="text-muted-foreground">Wake up feeling energized by timing your sleep with our sleep cycle calculator. Find the best times to wake up or fall asleep based on natural 90-minute sleep cycles.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
