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
  title: "GPA Calculator – Calculate Your Grade & GPA Online",
  description: "Calculate your GPA and overall grade from multiple subject scores and credit hours with our free online GPA calculator. Supports weighted and unweighted GPA calculations.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gpa-calculator",
  },
  openGraph: {
    title: "GPA Calculator – Calculate Your Grade & GPA Online",
    description: "Calculate your GPA and overall grade from multiple subject scores and credit hours with our free online GPA calculator. Supports weighted and unweighted GPA calculations.",
    type: "website",
    url: "https://1000freetools.com/calculators/gpa-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator – Calculate Your Grade & GPA Online",
    description: "Calculate your GPA and overall grade from multiple subject scores and credit hours with our free online GPA calculator. Supports weighted and unweighted GPA calculations.",
  },
};

const tools = [
  {
    "name": "Percentage Calculator – Find % of Any Number Instantly",
    "description": "Calculate any percentage instantly with our free online percentage calculator. Find what percent a number is, calculate percentage increase or decrease, and solve all percent-related problems easily.",
    "href": "/math-tools/percentage-calculator"
  },
  {
    "name": "Percentage Change Calculator – Find % Increase or Decrease",
    "description": "Calculate the percentage change between any two values with our free online percentage change calculator. Instantly find percentage increase or decrease with the formula shown.",
    "href": "/math-tools/percentage-change-calculator"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  },
  {
    "name": "Mean, Median, Mode Calculator – Statistics Calculator Online",
    "description": "Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.",
    "href": "/math-tools/mean-median-mode-calculator"
  },
  {
    "name": "Weighted Average Calculator – Compute Weighted Mean Online",
    "description": "Calculate the weighted average or weighted mean of any set of values with our free online calculator. Enter values and weights to get the accurate weighted result instantly.",
    "href": "/math-tools/weighted-average-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "GPA Calculator – Calculate Your Grade & GPA Online",
    "description": "Calculate your GPA and overall grade from multiple subject scores and credit hours with our free online GPA calculator. Supports weighted and unweighted GPA calculations.",
    "href": "/math-tools/gpa-calculator"
  },
  {
    "name": "Confidence Interval Calculator – Find CI for Mean Online",
    "description": "Calculate confidence intervals for population means with our free online confidence interval calculator. Supports 90%, 95%, and 99% confidence levels with margin of error shown.",
    "href": "/math-tools/confidence-interval-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/gpa-calculator">Gpa Calculator</BreadcrumbLink>
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
