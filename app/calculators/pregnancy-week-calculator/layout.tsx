import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker",
  description: "Calculate your current pregnancy week and due date. Enter your last menstrual period (LMP) or due date to track your pregnancy progress, trimester, and estimated conception date.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pregnancy-week-calculator",
  },
};

const tools = [
  {
    "name": "Pregnancy Due Date Calculator",
    "description": "Pregnancy Due Date Calculator – When Is My Baby Due?",
    "href": "/pregnancy-due-date-calculator"
  },
  {
    "name": "Pregnancy Weight Gain Calculator",
    "description": "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator",
    "href": "/pregnancy-weight-gain-calculator"
  },
  {
    "name": "Ovulation Calculator",
    "description": "Ovulation Calculator – Find Your Most Fertile Days",
    "href": "/ovulation-calculator"
  },
  {
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/baby-age-calculator"
  },
  {
    "name": "Child Height Predictor",
    "description": "Child Height Predictor – Free Adult Height Calculator",
    "href": "/child-height-predictor"
  },
  {
    "name": "Toddler Growth Chart Calculator",
    "description": "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child",
    "href": "/toddler-growth-chart-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker</h1>
        <p className="text-muted-foreground">Calculate your current pregnancy week and due date. Enter your last menstrual period (LMP) or due date to track your pregnancy progress, trimester, and estimated conception date.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
