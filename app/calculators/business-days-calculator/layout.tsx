import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Business Days Calculator – Count Working Days Between Dates",
  description: "Count the number of working/business days between two dates, excluding weekends and holidays. Perfect for project planning and deadline calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/business-days-calculator",
  },
};

const tools = [
  {
    "name": "Date Add Subtract Calculator",
    "description": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
    "href": "/date-add-subtract-calculator"
  },
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
        <h1 className="text-3xl font-bold mb-3">Business Days Calculator – Count Working Days Between Dates</h1>
        <p className="text-muted-foreground">Count the number of working/business days between two dates, excluding weekends and holidays. Perfect for project planning and deadline calculations.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
