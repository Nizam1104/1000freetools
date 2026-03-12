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
  title: "Law of Cosines Calculator – Solve Triangles Using Cosine Rule",
  description: "Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/law-of-cosines-calculator",
  },
  openGraph: {
    title: "Law of Cosines Calculator – Solve Triangles Using Cosine Rule",
    description: "Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.",
    type: "website",
    url: "https://1000freetools.com/calculators/law-of-cosines-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law of Cosines Calculator – Solve Triangles Using Cosine Rule",
    description: "Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.",
  },
};

const tools = [
  {
    "name": "Law of Sines Calculator – Solve Triangles Using Sine Rule",
    "description": "Solve any triangle using the Law of Sines with our free online calculator. Find missing sides and angles for ASA, AAS, and SSA triangle configurations with step-by-step solutions.",
    "href": "/math-tools/law-of-sines-calculator"
  },
  {
    "name": "Triangle Solver – Solve Any Triangle SSS SAS ASA AAS",
    "description": "Solve any triangle completely using SSS, SAS, ASA, or AAS methods with our free online triangle solver. Find all missing sides, angles, and area with step-by-step trigonometric solutions.",
    "href": "/math-tools/triangle-solver"
  },
  {
    "name": "Triangle Angle Calculator – Find Missing Angles in a Triangle",
    "description": "Find any missing angle in a triangle with our free online angle calculator. Enter known angles or sides and instantly solve for the remaining angles using trigonometry rules.",
    "href": "/math-tools/angle-calculator"
  },
  {
    "name": "Trig Function Calculator – Calculate Sin Cos Tan Online",
    "description": "Calculate any trigonometric function value including sin, cos, tan, csc, sec, and cot for any angle in degrees or radians with our free online trig calculator.",
    "href": "/math-tools/trig-function-calculator"
  },
  {
    "name": "Inverse Trig Calculator – Find arcsin arccos arctan Online",
    "description": "Calculate inverse trigonometric functions including arcsin, arccos, and arctan with our free online inverse trig calculator. Get angle results in both degrees and radians.",
    "href": "/math-tools/inverse-trig-calculator"
  },
  {
    "name": "Trig Identity Verifier – Verify Trigonometric Identities Online",
    "description": "Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.",
    "href": "/math-tools/trig-identity-verifier"
  },
  {
    "name": "Right Triangle Calculator – Solve Right Triangles Online",
    "description": "Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.",
    "href": "/math-tools/right-triangle-calculator"
  },
  {
    "name": "Angle of Elevation & Depression Calculator – Solve Word Problems",
    "description": "Calculate the angle of elevation or depression with our free online solver. Enter height and distance to find the angle, or the angle to find missing dimensions – perfect for trig word problems.",
    "href": "/math-tools/angle-elevation-depression-solver"
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
              <BreadcrumbLink href="/math-tools/law-of-cosines-calculator">Law Of Cosines Calculator</BreadcrumbLink>
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
