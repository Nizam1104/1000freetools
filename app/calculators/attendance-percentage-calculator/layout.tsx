import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement",
  description: "Instantly check your attendance percentage and find out how many more classes you can            miss with our Attendance Calculator. Enter classes attended and total classes held to            stay on top of your attendance requirements.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/attendance-percentage-calculator",
  },
};

const tools = [
  {
    "name": "Grade Percentage Calculator",
    "description": "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade",
    "href": "/calculators/grade-percentage-calculator"
  },
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
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
