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
  title: "GPA Calculator – Calculate Your Grade Point Average Instantly",
  description: "Calculate your current GPA quickly and accurately with our free GPA Calculator. Enter            your grades and credit hours for each course to get your semester or cumulative GPA on            a 4.0 scale. Perfect for students planning for scholarships and graduate school.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/gpa-calculator",
  },
};

const tools = [
  {
    "name": "Gpa Weight Distribution Calculator",
    "description": "GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA",
    "href": "/calculators/gpa-weight-distribution-calculator"
  },
  {
    "name": "Cgpa Calculator",
    "description": "CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters",
    "href": "/calculators/cgpa-calculator"
  },
  {
    "name": "Grade Percentage Calculator",
    "description": "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade",
    "href": "/calculators/grade-percentage-calculator"
  },
  {
    "name": "Attendance Percentage Calculator",
    "description": "Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement",
    "href": "/calculators/attendance-percentage-calculator"
  },
  {
    "name": "Exam Correction Curve Calculator",
    "description": "Exam Correction Curve Calculator – Apply Grade Curves to Exam Scores",
    "href": "/calculators/exam-correction-curve-calculator"
  },
  {
    "name": "Exam Scoring Calculator",
    "description": "Exam Scoring Calculator – Calculate Weighted Exam Scores & Final Grades",
    "href": "/calculators/exam-scoring-calculator"
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
              <BreadcrumbLink href="/calculators/gpa-calculator">Gpa Calculator</BreadcrumbLink>
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
