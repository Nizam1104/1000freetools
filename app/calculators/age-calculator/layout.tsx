import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
  description: "Find out your exact age down to the day with our free age calculator. Enter any date of birth and get a precise breakdown of years, months, and days elapsed.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/age-calculator",
  },
};

const tools = [
  {
    "name": "Anniversary Calculator",
    "description": "Anniversary Calculator – Free Anniversary Date Counter",
    "href": "/calculators/anniversary-calculator"
  },
  {
    "name": "Date Add Subtract Calculator",
    "description": "Date Calculator – Add or Subtract Days, Weeks & Months from a Date",
    "href": "/calculators/date-add-subtract-calculator"
  },
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator – Days Between Two Dates",
    "href": "/calculators/date-difference-calculator"
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
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/calculators/baby-age-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Age Calculator – Calculate Your Exact Age in Years, Months & Days</h1>
        <p className="text-muted-foreground">Find out your exact age down to the day with our free age calculator. Enter any date of birth and get a precise breakdown of years, months, and days elapsed.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
