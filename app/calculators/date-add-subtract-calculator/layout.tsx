import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
  description: "Find past or future dates instantly by adding or subtracting time from any date. Works with days, weeks, months, and years for deadlines, events, and planning.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/date-add-subtract-calculator",
  },
};

const tools = [
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator – Days Between Two Dates",
    "href": "/date-difference-calculator"
  },
  {
    "name": "Age Calculator",
    "description": "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
    "href": "/age-calculator"
  },
  {
    "name": "Anniversary Calculator",
    "description": "Anniversary Calculator – Free Anniversary Date Counter",
    "href": "/anniversary-calculator"
  },
  {
    "name": "Business Days Calculator",
    "description": "Business Days Calculator – Count Working Days Between Dates",
    "href": "/business-days-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator – Find ISO Week Number for Any Date",
    "href": "/week-number-calculator"
  },
  {
    "name": "Revision Planner",
    "description": "Revision Planner – Create a Smart Spaced Repetition Study Schedule",
    "href": "/revision-planner"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Date Calculator – Add or Subtract Days, Weeks & Months from a Date</h1>
        <p className="text-muted-foreground">Find past or future dates instantly by adding or subtracting time from any date. Works with days, weeks, months, and years for deadlines, events, and planning.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
