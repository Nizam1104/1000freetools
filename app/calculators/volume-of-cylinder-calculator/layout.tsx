import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Volume of Cylinder Calculator",
  description: "Calculate volume and surface area of a cylinder",
  alternates: {
    canonical: "https://1000freetools.com/calculators/volume-of-cylinder-calculator",
  },
};

const tools = [
  {
    "name": "Volume Of Cone Calculator",
    "description": "Volume of Cone Calculator",
    "href": "/volume-of-cone-calculator"
  },
  {
    "name": "Volume Of Cube Calculator",
    "description": "Volume of Cube Calculator – Calculate Cube Volume and Surface Area",
    "href": "/volume-of-cube-calculator"
  },
  {
    "name": "Volume Of Cuboid Calculator",
    "description": "Volume of Cuboid Calculator",
    "href": "/volume-of-cuboid-calculator"
  },
  {
    "name": "Volume Of Pyramid Calculator",
    "description": "Volume of Pyramid Calculator",
    "href": "/volume-of-pyramid-calculator"
  },
  {
    "name": "Volume Of Sphere Calculator",
    "description": "Volume of Sphere Calculator – Find Volume and Surface Area",
    "href": "/volume-of-sphere-calculator"
  },
  {
    "name": "Circle Area Calculator",
    "description": "Circle Area Calculator",
    "href": "/circle-area-calculator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
            <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Volume of Cylinder Calculator</h1>
        <p className="text-muted-foreground">Calculate volume and surface area of a cylinder</p>
      </header>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
