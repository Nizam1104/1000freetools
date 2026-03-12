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
  title: "Online Seller Profit Calculator – Calculate Net Profit on Amazon, eBay & More",
  description: "Know exactly how much you're making from each sale with our Online Seller Profit            Calculator. Deduct platform fees, shipping, COGS, and taxes from your sale price to see            your real net profit. Built for Amazon, eBay, Etsy, and Shopify sellers.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/online-seller-profit-calculator",
  },
};

const tools = [
  {
    "name": "Npv Calculator",
    "description": "NPV Calculator – Net Present Value",
    "href": "/calculators/npv-calculator"
  },
  {
    "name": "Nuclear Decay Half Life Calculator",
    "description": "Nuclear Decay Half-Life Calculator – Radioactive Decay",
    "href": "/calculators/nuclear-decay-half-life-calculator"
  },
  {
    "name": "Number To Words Converter",
    "description": "Number to Words Converter",
    "href": "/calculators/number-to-words-converter"
  },
  {
    "name": "Office Space Per Employee Calculator",
    "description": "Office Space Per Employee Calculator – How Much Office Space Do You Need?",
    "href": "/calculators/office-space-per-employee-calculator"
  },
  {
    "name": "Ohms Law Calculator",
    "description": "Ohm's Law Calculator",
    "href": "/calculators/ohms-law-calculator"
  },
  {
    "name": "Operating Margin Calculator",
    "description": "Operating Margin Calculator",
    "href": "/calculators/operating-margin-calculator"
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
              <BreadcrumbLink href="/calculators/online-seller-profit-calculator">Online Seller Profit Calculator</BreadcrumbLink>
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
