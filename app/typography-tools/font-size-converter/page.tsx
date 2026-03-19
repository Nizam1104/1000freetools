import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontSizeConverter from "@/components/font-tools/font-size-converter";
import FontSizeConverterSeo from "@/components/seo-content/typography-tools/font-size-converter";

export const metadata: Metadata = {
  title: `Font Size Converter | PX to PT, EM, REM Converter`,
  description: `Convert font size units instantly: pixels to points, ems to rems, and more. A free tool for web design and print typography.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/font-size-converter`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
  },
  {
    name: `Letter Spacing Tool`,
    description: `Letter Spacing & Kerning Tool`,
    href: `/typography-tools/letter-spacing-tool`,
  },
  {
    name: `Line Height Generator`,
    description: `Line Height Calculator`,
    href: `/typography-tools/line-height-generator`,
  },
  {
    name: `Text Shadow Generator`,
    description: `CSS Text Shadow Generator`,
    href: `/typography-tools/text-shadow-generator`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function FontSizeConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Font Size Unit Converter</h1>
        <p className="text-muted-foreground">
          Convert font sizes between pixels, points, ems, rems, and more.
          Essential for web developers and designers working across screen and
          print.
        </p>
      </header>
      {<FontSizeConverter />}
      <div className="mt-8"><FontSizeConverterSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
