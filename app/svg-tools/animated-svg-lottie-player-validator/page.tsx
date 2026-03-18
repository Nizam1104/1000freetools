import type { Metadata } from "next";
import AnimatedSvgLottiePlayerValidatorSeo from "@/components/seo-content/svg-tools/animated-svg-lottie-player-validator";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { AnimatedSvgLottiePlayerValidator } from "@/components/svg-tools/animated-svg-lottie-player-validator.tsx";

export const metadata: Metadata = {
  title: `Animated SVG Player - Preview & Validate Lottie JSON`,
  description: `Preview animated SVG and Lottie JSON files online. Play animations, control speed, loop, and validate file structure. Free player and validator tool.`,
  alternates: {
    canonical: `https://1000freetools.com/svg-tools/animated-svg-lottie-player-validator`,
  },
};

const tools = [
  {
    name: `SVG to PNG Converter`,
    description: `Free SVG to PNG Converter`,
    href: `/svg-tools/svg-to-png-converter`,
  },
  {
    name: `SVG Editor Online`,
    description: `Free Online SVG Editor`,
    href: `/svg-tools/svg-editor-online`,
  },
  {
    name: `SVG to JPG Converter`,
    description: `SVG to JPG Converter Online`,
    href: `/svg-tools/svg-to-jpg-converter`,
  },
  {
    name: `SVG Viewer & Inspector`,
    description: `SVG Viewer & Code Inspector`,
    href: `/svg-tools/svg-viewer-inspector`,
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

export default function AnimatedSvgLottiePlayerValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Animated SVG & Lottie Player
        </h1>
        <p className="text-muted-foreground">
          Preview and validate your animated SVG or Lottie JSON files right in
          the browser. Play, pause, adjust speed, and check for errors before
          using them in your projects.
        </p>
      </header>
      {<AnimatedSvgLottiePlayerValidator />}
      <div className="mt-16">
        <AnimatedSvgLottiePlayerValidatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
