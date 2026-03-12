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
  title: "Sleep Debt Calculator – How Much Sleep Are You Missing?",
  description: "Are you chronically under-slept? Our sleep debt calculator totals your cumulative sleep deficit over days or weeks so you can understand and address your sleep deprivation.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/sleep-debt-calculator",
  },
};

const tools = [
  {
    "name": "Sleep Cycle Calculator",
    "description": "Sleep Cycle Calculator – Wake Up Refreshed Every Morning",
    "href": "/calculators/sleep-cycle-calculator"
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
                    <BreadcrumbLink href="/calculators/sleep-debt-calculator">Sleep Debt Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Sleep Debt Calculator – How Much Sleep Are You Missing?</h1>
        <p className="text-muted-foreground">Are you chronically under-slept? Our sleep debt calculator totals your cumulative sleep deficit over days or weeks so you can understand and address your sleep deprivation.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
