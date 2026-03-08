import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Ovulation Calculator – Find Your Most Fertile Days",
  description: "Maximize your chances of conception with our ovulation calculator. Get your predicted ovulation date and full fertile window based on your cycle length and last period.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/ovulation-calculator",
  },
};

const tools = [
  {
    "name": "Pregnancy Due Date Calculator",
    "description": "Pregnancy Due Date Calculator – When Is My Baby Due?",
    "href": "/calculators/pregnancy-due-date-calculator"
  },
  {
    "name": "Pregnancy Week Calculator",
    "description": "Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker",
    "href": "/calculators/pregnancy-week-calculator"
  },
  {
    "name": "Pregnancy Weight Gain Calculator",
    "description": "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator",
    "href": "/calculators/pregnancy-weight-gain-calculator"
  },
  {
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/calculators/baby-age-calculator"
  },
  {
    "name": "Child Height Predictor",
    "description": "Child Height Predictor – Free Adult Height Calculator",
    "href": "/calculators/child-height-predictor"
  },
  {
    "name": "Toddler Growth Chart Calculator",
    "description": "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child",
    "href": "/calculators/toddler-growth-chart-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Ovulation Calculator – Find Your Most Fertile Days</h1>
        <p className="text-muted-foreground">Maximize your chances of conception with our ovulation calculator. Get your predicted ovulation date and full fertile window based on your cycle length and last period.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
