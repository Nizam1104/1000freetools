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
  title: "Volume Calculator – Compute Volume of 3D Shapes Online",
  description: "Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.",
  alternates: {
    canonical: "https://1000freetools.com/math-tools/volume-calculator",
  },
  openGraph: {
    title: "Volume Calculator – Compute Volume of 3D Shapes Online",
    description: "Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.",
    type: "website",
    url: "https://1000freetools.com/math-tools/volume-calculator",
    siteName: "1000 Free Tools",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volume Calculator – Compute Volume of 3D Shapes Online",
    description: "Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.",
  },
};

const tools = [
  {
    "name": "Surface Area Calculator – Find Surface Area of Any 3D Shape",
    "description": "Calculate the surface area of any 3D geometric shape with our free online surface area calculator. Covers cube, sphere, cylinder, cone, pyramid, and prisms with full formula details.",
    "href": "/math-tools/surface-area-calculator"
  },
  {
    "name": "Area Calculator – Find Area of Any 2D Shape Online",
    "description": "Calculate the area of any 2D shape with our free online area calculator. Supports circle, rectangle, triangle, trapezoid, parallelogram, and more with formula explanations.",
    "href": "/math-tools/area-calculator"
  },
  {
    "name": "Perimeter Calculator – Find Perimeter of Any Shape Online",
    "description": "Calculate the perimeter of any 2D shape with our free online perimeter calculator. Covers rectangles, triangles, circles, polygons, and more with step-by-step solutions.",
    "href": "/math-tools/perimeter-calculator"
  },
  {
    "name": "Circle Calculator – Find Radius, Diameter, Area & Circumference",
    "description": "Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.",
    "href": "/math-tools/circle-calculator"
  },
  {
    "name": "Volume Converter – Convert Liters, Gallons, Cubic Meters",
    "description": "Convert between any volume or capacity unit with our free online volume converter. Covers liters, gallons, milliliters, cubic meters, fluid ounces, and more.",
    "href": "/math-tools/volume-converter"
  },
  {
    "name": "Volume Calculator – Compute Volume of 3D Shapes Online",
    "description": "Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.",
    "href": "/math-tools/volume-calculator"
  },
  {
    "name": "Area Converter – Convert sq ft, sq m, Acres, Hectares Online",
    "description": "Convert between any area unit with our free online area converter. Supports square meters, square feet, acres, hectares, and many more area measurement units.",
    "href": "/math-tools/area-converter"
  },
  {
    "name": "Length Converter – Convert Meters, Feet, Inches, Miles Online",
    "description": "Convert between any length or distance units with our free online length converter. Covers metric and imperial systems including meters, feet, inches, kilometers, and miles.",
    "href": "/math-tools/length-converter"
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
              <BreadcrumbLink href="/math-tools/volume-calculator">Volume Calculator</BreadcrumbLink>
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
