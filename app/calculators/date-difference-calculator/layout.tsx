import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Date Difference Calculator – Days Between Two Dates",
  description: "Easily find the difference between any two dates. Our date difference calculator returns results in days, weeks, months, and years—perfect for planning and tracking.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/date-difference-calculator",
  },
};

const tools = [
  {
    "name": "Date Add Subtract Calculator",
    "description": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
    "href": "/calculators/date-add-subtract-calculator"
  },
  {
    "name": "Age Calculator",
    "description": "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
    "href": "/calculators/age-calculator"
  },
  {
    "name": "Anniversary Calculator",
    "description": "Anniversary Calculator – Free Anniversary Date Counter",
    "href": "/calculators/anniversary-calculator"
  },
  {
    "name": "Business Days Calculator",
    "description": "Business Days Calculator – Count Working Days Between Dates",
    "href": "/calculators/business-days-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator – Find ISO Week Number for Any Date",
    "href": "/calculators/week-number-calculator"
  },
  {
    "name": "Revision Planner",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
    "href": "/calculators/revision-planner"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Date Difference Calculator – Days Between Two Dates</h1>
        <p className="text-muted-foreground">Easily find the difference between any two dates. Our date difference calculator returns results in days, weeks, months, and years—perfect for planning and tracking.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
