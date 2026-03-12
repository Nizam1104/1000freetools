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
  title: "Degrees to Radians Converter – Convert Angles Online",
  description: "Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/degrees-radians-converter",
  },
  openGraph: {
    title: "Degrees to Radians Converter – Convert Angles Online",
    description: "Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.",
    type: "website",
    url: "https://1000freetools.com/math-tools/degrees-radians-converter",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Degrees to Radians Converter – Convert Angles Online",
    description: "Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.",
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
    "name": "Trig Identity Verifier – Verify Trigonometric Identities Online",
    "description": "Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.",
    "href": "/math-tools/trig-identity-verifier"
  },
  {
    "name": "Unit Circle Reference Tool – Interactive Unit Circle Chart",
    "description": "Explore the complete unit circle with our free interactive unit circle reference tool. View all key angles in degrees and radians with their exact trig values and coordinates.",
    "href": "/math-tools/unit-circle-reference"
  },
  {
    "name": "Triangle Angle Calculator – Find Missing Angles in a Triangle",
    "description": "Find any missing angle in a triangle with our free online angle calculator. Enter known angles or sides and instantly solve for the remaining angles using trigonometry rules.",
    "href": "/math-tools/angle-calculator"
  },
  {
    "name": "Polygon Interior Angle Sum Calculator – Find Angle Sum of Polygon",
    "description": "Calculate the sum of interior angles of any polygon with our free online calculator. Enter the number of sides and instantly find the total interior angle sum and each angle for regular polygons.",
    "href": "/math-tools/polygon-interior-angle-sum-calculator"
  },
  {
    "name": "Free Online Scientific Calculator – Advanced Math Functions",
    "description": "Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.",
    "href": "/math-tools/scientific-calculator"
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
              <BreadcrumbLink href="/math-tools/degrees-radians-converter">Degrees Radians Converter</BreadcrumbLink>
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
