import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby",
  description: "Navigate the early months of feeding with our Baby Feeding Chart Calculator.            Enter your baby&apos;s age and weight to get recommended feeding frequency,            milk volume per feed, and solid food introduction milestones — backed by            pediatric guidelines.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/baby-feeding-chart-calculator",
  },
};

const tools = [
  {
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/baby-age-calculator"
  },
  {
    "name": "Baby Sleep Schedule Calculator",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
    "href": "/baby-sleep-schedule-calculator"
  },
  {
    "name": "Diaper Usage Estimator",
    "description": "Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby",
    "href": "/diaper-usage-estimator"
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
  },
  {
    "name": "Pet Age Calculator",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
    "href": "/pet-age-calculator"
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
