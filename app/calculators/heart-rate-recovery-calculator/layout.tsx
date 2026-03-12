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
  title: "Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness",
  description: "Heart rate recovery is a key fitness metric. Enter your peak and post-exercise heart rate to calculate HRR and gauge your cardiovascular health and recovery efficiency.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/heart-rate-recovery-calculator",
  },
};

const tools = [
  {
    "name": "Heart Rate Zones Calculator",
    "description": "Heart Rate Zones Calculator – Find Your Target Heart Rate Zones",
    "href": "/calculators/heart-rate-zones-calculator"
  },
  {
    "name": "Vo2 Max Calculator",
    "description": "VO2 Max Calculator – Estimate Your Aerobic Fitness Level",
    "href": "/calculators/vo2-max-calculator"
  },
  {
    "name": "Lactate Threshold Calculator",
    "description": "Lactate Threshold Calculator – Find Your Anaerobic Threshold",
    "href": "/calculators/lactate-threshold-calculator"
  },
  {
    "name": "Running Pace Calculator",
    "description": "Running Pace Calculator",
    "href": "/calculators/running-pace-calculator"
  },
  {
    "name": "Marathon Pace Calculator",
    "description": "Marathon Pace Calculator – Calculate Your Target Running Pace",
    "href": "/calculators/marathon-pace-calculator"
  },
  {
    "name": "Pace To Speed Converter",
    "description": "Pace to Speed Converter – Convert Running Pace to Speed Instantly",
    "href": "/calculators/pace-to-speed-converter"
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
                    <BreadcrumbLink href="/calculators/heart-rate-recovery-calculator">Heart Rate Recovery Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness</h1>
        <p className="text-muted-foreground">Heart rate recovery is a key fitness metric. Enter your peak and post-exercise heart rate to calculate HRR and gauge your cardiovascular health and recovery efficiency.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
