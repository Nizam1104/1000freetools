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
  title: "Ranking Percentile Calculator – Find Your Percentile Rank in Class or Exam",
  description: "Find out where you stand among your peers with our Ranking Percentile Calculator.            Enter your rank and total number of students to instantly calculate your percentile —            useful for competitive exams, university admissions, and class rankings.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ranking-percentile-calculator",
  },
};

const tools = [
  {
    "name": "Z Score Calculator",
    "description": "Z-Score Calculator",
    "href": "/calculators/z-score-calculator"
  },
  {
    "name": "Standard Deviation Calculator",
    "description": "Standard Deviation Calculator",
    "href": "/calculators/standard-deviation-calculator"
  },
  {
    "name": "Variance Calculator",
    "description": "Variance Calculator – Calculate Population and Sample Variance",
    "href": "/calculators/variance-calculator"
  },
  {
    "name": "Average Calculator",
    "description": "Average Calculator – Calculate Mean, Median & More",
    "href": "/calculators/average-calculator"
  },
  {
    "name": "Median Calculator",
    "description": "Median Calculator",
    "href": "/calculators/median-calculator"
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
              <BreadcrumbLink href="/calculators/ranking-percentile-calculator">Ranking Percentile Calculator</BreadcrumbLink>
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
