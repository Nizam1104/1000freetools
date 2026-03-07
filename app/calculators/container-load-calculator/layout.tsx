import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Container Load Calculator – How Many Boxes Fit in a 20ft or 40ft Container?",
  description: "Optimize your container loading with our Container Load Calculator.            Enter your cargo dimensions and container size (20ft, 40ft, 40ft HC) to            calculate the maximum number of boxes that can fit, maximizing shipping efficiency.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/container-load-calculator",
  },
};

const tools = [
  {
    "name": "Dimensional Weight Calculator",
    "description": "Dimensional Weight Calculator – Calculate DIM Weight for FedEx, UPS & DHL",
    "href": "/calculators/dimensional-weight-calculator"
  },
  {
    "name": "Volumetric Weight Calculator",
    "description": "Volumetric Weight Calculator – Calculate Dimensional Weight for Shipping",
    "href": "/calculators/volumetric-weight-calculator"
  },
  {
    "name": "Pallet Stacking Calculator",
    "description": "Pallet Stacking Calculator – Maximize Box Quantities Per Pallet",
    "href": "/calculators/pallet-stacking-calculator"
  },
  {
    "name": "Cargo Volume Calculator",
    "description": "Cargo Volume Calculator – Calculate Total Shipment Volume & Chargeable Weight",
    "href": "/calculators/cargo-volume-calculator"
  },
  {
    "name": "Warehouse Storage Volume Calculator",
    "description": "Warehouse Storage Volume Calculator – Calculate Usable Warehouse Capacity",
    "href": "/calculators/warehouse-storage-volume-calculator"
  },
  {
    "name": "Land Area Converter",
    "description": "Land Area Converter – Convert Acres, Hectares, Sq Ft, and Bigha",
    "href": "/calculators/land-area-converter"
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
