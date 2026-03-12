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
  title: "Toddler Growth Chart Calculator – Track Height & Weight Percentiles for Your Child",
  description: "Monitor your child&apos;s healthy development with our Toddler Growth Chart Calculator.            Enter age, height, and weight to plot on WHO/CDC growth charts and see height and weight            percentile rankings — helping parents identify growth patterns early.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/toddler-growth-chart-calculator",
  },
};

const tools = [
  {
    "name": "Child Height Predictor",
    "description": "Child Height Predictor – Free Adult Height Calculator",
    "href": "/calculators/child-height-predictor"
  },
  {
    "name": "Baby Age Calculator",
    "description": "Baby Age Calculator – Free Infant Age Calculator in Weeks and Months",
    "href": "/calculators/baby-age-calculator"
  },
  {
    "name": "Baby Feeding Chart Calculator",
    "description": "Baby Feeding Chart Calculator – How Much & How Often to Feed Your Baby",
    "href": "/calculators/baby-feeding-chart-calculator"
  },
  {
    "name": "Diaper Usage Estimator",
    "description": "Diaper Usage Estimator – Calculate Monthly Diaper Costs for Your Baby",
    "href": "/calculators/diaper-usage-estimator"
  },
  {
    "name": "Pet Age Calculator",
    "description": "Pet Age Calculator – Convert Dog & Cat Age to Human Years",
    "href": "/calculators/pet-age-calculator"
  },
  {
    "name": "Baby Sleep Schedule Calculator",
    "description": "Baby Sleep Schedule Calculator – Create the Perfect Sleep Routine for Your Baby",
    "href": "/calculators/baby-sleep-schedule-calculator"
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
              <BreadcrumbLink href="/calculators/toddler-growth-chart-calculator">Toddler Growth Chart Calculator</BreadcrumbLink>
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
