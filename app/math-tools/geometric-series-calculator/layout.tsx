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
  title: "Geometric Series Sum Calculator – Find Sum of GP Online",
  description: "Calculate the sum of finite and infinite geometric series with our free online calculator. Supports both converging and diverging series with the geometric sum formula shown.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/geometric-series-calculator",
  },
  openGraph: {
    title: "Geometric Series Sum Calculator – Find Sum of GP Online",
    description: "Calculate the sum of finite and infinite geometric series with our free online calculator. Supports both converging and diverging series with the geometric sum formula shown.",
    type: "website",
    url: "https://1000freetools.com/math-tools/geometric-series-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geometric Series Sum Calculator – Find Sum of GP Online",
    description: "Calculate the sum of finite and infinite geometric series with our free online calculator. Supports both converging and diverging series with the geometric sum formula shown.",
  },
};

const tools = [
  {
    "name": "Geometric Sequence Calculator – Find Terms & Sum Online",
    "description": "Calculate any term, common ratio, or sum of a geometric sequence with our free online calculator. Solve geometric progressions for any number of terms with full solutions.",
    "href": "/math-tools/geometric-sequence-calculator"
  },
  {
    "name": "nth Term Finder – Find Any Term of a Sequence Online",
    "description": "Find the nth term of any arithmetic or geometric sequence with our free online nth term finder. Enter sequence parameters to calculate any specific term instantly.",
    "href": "/math-tools/nth-term-finder"
  },
  {
    "name": "Arithmetic Sequence Calculator – Find Terms & Sum Online",
    "description": "Calculate any term, common difference, or partial sum of an arithmetic sequence with our free online calculator. Enter known values to solve arithmetic progressions instantly.",
    "href": "/math-tools/arithmetic-sequence-calculator"
  },
  {
    "name": "Arithmetic Series Sum Calculator – Find Sum of AP Online",
    "description": "Calculate the sum of any arithmetic series with our free online calculator. Enter the first term, common difference, and number of terms to find the series sum instantly.",
    "href": "/math-tools/arithmetic-series-calculator"
  },
  {
    "name": "Fibonacci Sequence Generator – Calculate Fibonacci Numbers Online",
    "description": "Generate the Fibonacci sequence up to any number of terms or find the nth Fibonacci number with our free online Fibonacci calculator. Fast and accurate for any value of n.",
    "href": "/math-tools/fibonacci-generator"
  },
  {
    "name": "Harmonic Series Calculator – Compute Partial Sums Online",
    "description": "Calculate the partial sum of the harmonic series up to any number of terms with our free online harmonic series calculator. Explore the divergent nature of this classic series.",
    "href": "/math-tools/harmonic-series-calculator"
  },
  {
    "name": "Geometric Mean Calculator – Find Geometric Average Online",
    "description": "Calculate the geometric mean of any set of numbers with our free online calculator. Ideal for finance, biology, and statistics where multiplicative relationships matter.",
    "href": "/math-tools/geometric-mean-calculator"
  },
  {
    "name": "Average Calculator – Find the Mean of Any Numbers",
    "description": "Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.",
    "href": "/math-tools/average-calculator"
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
              <BreadcrumbLink href="/math-tools/geometric-series-calculator">Geometric Series Calculator</BreadcrumbLink>
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
