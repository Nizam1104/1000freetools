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
  title: "Estimation & Rounding Tool – Round for Quick Estimation",
  description: "Round and estimate numbers quickly with our free online estimation and rounding tool. Round to nearest ten, hundred, thousand, or custom place value for fast mental math.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/estimation-rounding-tool",
  },
  openGraph: {
    title: "Estimation & Rounding Tool – Round for Quick Estimation",
    description: "Round and estimate numbers quickly with our free online estimation and rounding tool. Round to nearest ten, hundred, thousand, or custom place value for fast mental math.",
    type: "website",
    url: "https://1000freetools.com/math-tools/estimation-rounding-tool",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimation & Rounding Tool – Round for Quick Estimation",
    description: "Round and estimate numbers quickly with our free online estimation and rounding tool. Round to nearest ten, hundred, thousand, or custom place value for fast mental math.",
  },
};

const tools = [
  {
    "name": "Rounding Calculator – Round to Decimal Places or Sig Figs",
    "description": "Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.",
    "href": "/math-tools/rounding-calculator"
  },
  {
    "name": "Significant Figures Calculator – Count and Round Sig Figs",
    "description": "Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.",
    "href": "/math-tools/significant-figures-calculator"
  },
  {
    "name": "Scientific Notation Converter – Standard to Scientific Form",
    "description": "Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.",
    "href": "/math-tools/scientific-notation-converter"
  },
  {
    "name": "Free Online Standard Calculator – Fast & Easy Math",
    "description": "Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.",
    "href": "/math-tools/standard-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "BODMAS / PEMDAS Calculator – Order of Operations Solver",
    "description": "Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.",
    "href": "/math-tools/order-of-operations-solver"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
  },
  {
    "name": "Number Sorter – Sort Numbers Ascending or Descending Online",
    "description": "Sort any list of numbers in ascending or descending order instantly with our free online number sorter. Paste or enter numbers and get a sorted list in one click.",
    "href": "/math-tools/number-sorter"
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
              <BreadcrumbLink href="/math-tools/estimation-rounding-tool">Estimation Rounding Tool</BreadcrumbLink>
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
