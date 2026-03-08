import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Office Space Per Employee Calculator – How Much Office Space Do You Need?",
  description: "Plan your office space efficiently with our Office Space Calculator.            Enter your headcount and workspace style to calculate the total square footage            required per employee — essential for lease planning and workplace design.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/office-space-per-employee-calculator",
  },
};

const tools = [
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  },
  {
    "name": "1rm Calculator",
    "description": "1RM Calculator – Calculate Your One Rep Max for Any Lift",
    "href": "/calculators/1rm-calculator"
  },
  {
    "name": "4 Percent Rule Retirement Calculator",
    "description": "4% Rule Retirement Calculator",
    "href": "/calculators/4-percent-rule-retirement-calculator"
  },
  {
    "name": "50 30 20 Budget Rule Calculator",
    "description": "50/30/20 Budget Rule Calculator",
    "href": "/calculators/50-30-20-budget-rule-calculator"
  },
  {
    "name": "A B Test Significance Calculator",
    "description": "A/B Test Significance Calculator – Check If Your Test Results Are Statistically Valid",
    "href": "/calculators/a-b-test-significance-calculator"
  },
  {
    "name": "Ac Impedance Calculator",
    "description": "AC Impedance Calculator – Calculate Impedance in AC Circuits",
    "href": "/calculators/ac-impedance-calculator"
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
