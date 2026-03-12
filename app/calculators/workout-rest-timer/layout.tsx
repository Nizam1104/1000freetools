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
  title: "Workout Rest Timer – Optimal Rest Time Between Sets Calculator",
  description: "Rest the right amount between sets to hit your goals. Our workout rest timer recommends evidence-based rest periods for strength, muscle building, or endurance training.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/workout-rest-timer",
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
    "name": "Slope Calculator",
    "description": "Slope Calculator",
    "href": "/calculators/slope-calculator"
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
                    <BreadcrumbLink href="/calculators/workout-rest-timer">Workout Rest Timer</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Workout Rest Timer – Optimal Rest Time Between Sets Calculator</h1>
        <p className="text-muted-foreground">Rest the right amount between sets to hit your goals. Our workout rest timer recommends evidence-based rest periods for strength, muscle building, or endurance training.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
