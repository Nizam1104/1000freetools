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
  title: "Unix Timestamp Converter – Convert Between Unix Time and Date",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Free timestamp converter supports seconds and milliseconds, shows timezone info for programmers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/unix-timestamp-converter",
  },
};

const tools = [
  {
    "name": "Date Difference Calculator",
    "description": "Date Difference Calculator",
    "href": "/calculators/date-difference-calculator"
  },
  {
    "name": "Date Add Subtract Calculator",
    "description": "Date Add Subtract Calculator",
    "href": "/calculators/date-add-subtract-calculator"
  },
  {
    "name": "Time Duration Calculator",
    "description": "Time Duration Calculator",
    "href": "/calculators/time-duration-calculator"
  },
  {
    "name": "Week Number Calculator",
    "description": "Week Number Calculator",
    "href": "/calculators/week-number-calculator"
  },
  {
    "name": "Business Days Calculator",
    "description": "Business Days Calculator",
    "href": "/calculators/business-days-calculator"
  },
  {
    "name": "Countdown Calculator",
    "description": "Countdown Calculator",
    "href": "/calculators/countdown-calculator"
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
              <BreadcrumbLink href="/calculators/unix-timestamp-converter">Unix Timestamp Converter</BreadcrumbLink>
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
