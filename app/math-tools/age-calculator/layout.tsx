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
  title: "Age Calculator – Find Your Exact Age in Years & Days",
  description: "Calculate your exact age in years, months, and days with our free online age calculator. Enter your birthdate to find your precise age as of today or any specific date.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/age-calculator",
  },
  openGraph: {
    title: "Age Calculator – Find Your Exact Age in Years & Days",
    description: "Calculate your exact age in years, months, and days with our free online age calculator. Enter your birthdate to find your precise age as of today or any specific date.",
    type: "website",
    url: "https://1000freetools.com/calculators/age-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator – Find Your Exact Age in Years & Days",
    description: "Calculate your exact age in years, months, and days with our free online age calculator. Enter your birthdate to find your precise age as of today or any specific date.",
  },
};

const tools = [
  {
    "name": "Date Difference Calculator – Find Days Between Two Dates",
    "description": "Calculate the exact difference between any two dates in days, weeks, months, and years with our free online date difference calculator. Instant and accurate date comparison.",
    "href": "/math-tools/date-difference-calculator"
  },
  {
    "name": "Days Until / Since Calculator – Countdown to Any Date",
    "description": "Find out how many days until or since any date with our free online countdown calculator. Perfect for counting down to events, deadlines, holidays, and special occasions.",
    "href": "/math-tools/days-until-since-calculator"
  },
  {
    "name": "Leap Year Checker – Is It a Leap Year? Find Out Online",
    "description": "Check if any year is a leap year with our free online leap year checker. Instantly verify using Gregorian calendar rules with a clear explanation of why it is or isn't a leap year.",
    "href": "/math-tools/leap-year-checker"
  },
  {
    "name": "Day of the Week Calculator – Find What Day Any Date Falls On",
    "description": "Find out what day of the week any past, present, or future date falls on with our free online day of the week calculator. Works for any date in history.",
    "href": "/math-tools/day-of-week-calculator"
  },
  {
    "name": "Time Duration Calculator – Find Time Between Two Times",
    "description": "Calculate the exact duration between any two times with our free online time duration calculator. Find hours, minutes, and seconds elapsed for any start and end time.",
    "href": "/math-tools/time-duration-calculator"
  },
  {
    "name": "Date Arithmetic Calculator – Add or Subtract Days from a Date",
    "description": "Add or subtract days, weeks, or months from any date with our free online date arithmetic calculator. Find past and future dates from any starting date instantly.",
    "href": "/math-tools/date-arithmetic-calculator"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
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
              <BreadcrumbLink href="/design-tools">Math Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/math-tools/age-calculator">
                Age Calculator
              </BreadcrumbLink>
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
