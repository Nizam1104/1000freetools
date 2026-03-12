import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Trig Identity Verifier – Verify Trigonometric Identities Online",
  description: "Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/trig-identity-verifier",
  },
  openGraph: {
    title: "Trig Identity Verifier – Verify Trigonometric Identities Online",
    description: "Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.",
    type: "website",
    url: "https://1000freetools.com/math-tools/trig-identity-verifier",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trig Identity Verifier – Verify Trigonometric Identities Online",
    description: "Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.",
  },
};

const tools = [
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
    "name": "Degrees to Radians Converter – Convert Angles Online",
    "description": "Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.",
    "href": "/math-tools/degrees-radians-converter"
  },
  {
    "name": "Unit Circle Reference Tool – Interactive Unit Circle Chart",
    "description": "Explore the complete unit circle with our free interactive unit circle reference tool. View all key angles in degrees and radians with their exact trig values and coordinates.",
    "href": "/math-tools/unit-circle-reference"
  },
  {
    "name": "Law of Sines Calculator – Solve Triangles Using Sine Rule",
    "description": "Solve any triangle using the Law of Sines with our free online calculator. Find missing sides and angles for ASA, AAS, and SSA triangle configurations with step-by-step solutions.",
    "href": "/math-tools/law-of-sines-calculator"
  },
  {
    "name": "Law of Cosines Calculator – Solve Triangles Using Cosine Rule",
    "description": "Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.",
    "href": "/math-tools/law-of-cosines-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
  },
  {
    "name": "Right Triangle Calculator – Solve Right Triangles Online",
    "description": "Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.",
    "href": "/math-tools/right-triangle-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
