import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Exam Scoring Calculator – Calculate Weighted Exam Scores & Final Grades",
  description: "Calculate your final exam grade from multiple components like quizzes, midterms, and            finals with our Exam Scoring Calculator. Enter each component's score and weight to see            your weighted average and projected final grade.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/exam-scoring-calculator",
  },
};

const tools = [
  {
    "name": "Exam Correction Curve Calculator",
    "description": "Exam Correction Curve Calculator – Apply Grade Curves to Exam Scores",
    "href": "/exam-correction-curve-calculator"
  },
  {
    "name": "Grade Percentage Calculator",
    "description": "Grade Percentage Calculator – Convert Marks to Percentage & Letter Grade",
    "href": "/grade-percentage-calculator"
  },
  {
    "name": "Cgpa Calculator",
    "description": "CGPA Calculator – Calculate Your Cumulative GPA Across All Semesters",
    "href": "/cgpa-calculator"
  },
  {
    "name": "Gpa Calculator",
    "description": "GPA Calculator – Calculate Your Grade Point Average Instantly",
    "href": "/gpa-calculator"
  },
  {
    "name": "Gpa Weight Distribution Calculator",
    "description": "GPA Weight Distribution Calculator – See How Each Course Impacts Your GPA",
    "href": "/gpa-weight-distribution-calculator"
  },
  {
    "name": "Attendance Percentage Calculator",
    "description": "Attendance Percentage Calculator – Check If You Meet the Minimum Attendance Requirement",
    "href": "/attendance-percentage-calculator"
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
