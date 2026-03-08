import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Anniversary Calculator – Free Anniversary Date Counter",
  description: "Calculate how long since your special day and when your next anniversary is. Perfect for weddings, birthdays, relationships, and any memorable date.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/anniversary-calculator",
  },
};

const tools = [
  {
    "name": "Age Calculator",
    "description": "Age Calculator – Calculate Your Exact Age in Years, Months & Days",
    "href": "/calculators/age-calculator"
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
        <h1 className="text-3xl font-bold mb-3">Anniversary Calculator – Free Anniversary Date Counter</h1>
        <p className="text-muted-foreground">Calculate how long since your special day and when your next anniversary is. Perfect for weddings, birthdays, relationships, and any memorable date.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
