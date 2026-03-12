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
  title: "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade",
  description: "Instantly convert your exam or assignment marks to a percentage grade with our Grade Percentage Calculator. Enter your score and the maximum marks to get your grade percentage, letter grade, and GPA equivalent.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/grade-percentage-calculator",
  },
};

const tools = [
  {
    "name": "Cgpa Calculator",
    "description": "CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters",
    "href": "/calculators/cgpa-calculator"
  },
  {
    "name": "Gpa Calculator",
    "description": "GPA Calculator – Calculate Your Grade Point Average Instantly",
    "href": "/calculators/gpa-calculator"
  },
  {
    "name": "Gpa Weight Distribution Calculator",
    "description": "GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA",
    "href": "/calculators/gpa-weight-distribution-calculator"
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
                    <BreadcrumbLink href="/calculators/grade-percentage-calculator">Grade Percentage Calculator</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade</h1>
        <p className="text-muted-foreground">Instantly convert your exam or assignment marks to a percentage grade with our Grade Percentage Calculator. Enter your score and the maximum marks to get your grade percentage, letter grade, and GPA equivalent.</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
