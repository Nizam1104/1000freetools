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
  title: "Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator",
  description: "Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. Get personalized weight gain recommendations for each trimester according to IOM guidelines.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/pregnancy-weight-gain-calculator",
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
    "name": "Ovulation Calculator",
    "description": "Ovulation Calculator – Find Your Most Fertile Days",
    "href": "/calculators/ovulation-calculator"
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
                    <BreadcrumbLink href="/calculators/pregnancy-weight-gain-calculator">Pregnancy Weight Gain Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pregnancy Weight Gain Calculator – Free Pregnancy BMI Calculator</h1>
        <p className="text-muted-foreground">Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. Get personalized weight gain recommendations for each trimester according to IOM guidelines.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
