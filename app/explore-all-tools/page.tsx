import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import calculators from "@/json-assets/calculators-links.json";
import unitConvertersLinks from "@/json-assets/unit-converters-links.json";
import colorToolsLinks from "@/json-assets/color-tools-links.json";
import jsonToolLinks from "@/json-assets/json-tools-links.json";
import videoToolLinks from "@/json-assets/video-tool-links.json";
import imageToolLinks from "@/json-assets/image-tool-links.json";
import mathToolsData from "@/json-assets/math-tools-links.json";

// Additional tool categories
import asciiToolsLinks from "@/json-assets/ascii-tools-links.json";
import audioToolsLinks from "@/json-assets/audio-tools-links.json";
import barcodeToolsLinks from "@/json-assets/barcode-tools-links.json";
import binaryToolsLinks from "@/json-assets/binary-tools-links.json";
import calendarToolsLinks from "@/json-assets/calendar-tools-links.json";
import chartToolsLinks from "@/json-assets/chart-tools-links.json";
import cronExpressionToolsLinks from "@/json-assets/cron-expression-tools-links.json";
import cssToolsLinks from "@/json-assets/css-tools-links.json";
import csvToolsLinks from "@/json-assets/csv-tools-links.json";
import dateTimeToolsLinks from "@/json-assets/date-time-tools-links.json";
import developerToolsLinks from "@/json-assets/developer-tools-links.json";
import emojiToolsLinks from "@/json-assets/emoji-tools-links.json";
import encodingToolsLinks from "@/json-assets/encoding-tools-links.json";
import encryptionToolsLinks from "@/json-assets/encryption-tools-links.json";
import excelToolsLinks from "@/json-assets/excel-tools-links.json";
import fontToolsLinks from "@/json-assets/font-tools-links.json";
import funToolsLinks from "@/json-assets/fun-tools-links.json";
import hashToolsLinks from "@/json-assets/hash-tools-links.json";
import hexToolsLinks from "@/json-assets/hex-tools-links.json";
import htmlToolsLinks from "@/json-assets/html-tools-links.json";
import iconToolsLinks from "@/json-assets/icon-tools-links.json";
import javascriptToolsLinks from "@/json-assets/javascript-tools-links.json";
import jwtToolsLinks from "@/json-assets/jwt-tools-links.json";
import markdownToolsLinks from "@/json-assets/markdown-tools-links.json";
import minifierToolsLinks from "@/json-assets/minifier-tools-links.json";
import numberToolsLinks from "@/json-assets/number-tools-links.json";
import passwordToolsLinks from "@/json-assets/password-tools-links.json";
import physicsToolsLinks from "@/json-assets/physics-tools-links.json";
import qrCodeToolsLinks from "@/json-assets/qr-code-tools-links.json";
import simulatorsLinks from "@/json-assets/simulators-links.json";
import sqlToolsLinks from "@/json-assets/sql-tools-links.json";
import statisticsToolsLinks from "@/json-assets/statistics-tools-links.json";
import stringToolsLinks from "@/json-assets/string-tools-links.json";
import svgToolsLinks from "@/json-assets/svg-tools-links.json";
import textToolsLinks from "@/json-assets/text-tools-links.json";
import timestampToolsLinks from "@/json-assets/timestamp-tools-links.json";
import timezoneToolsLinks from "@/json-assets/timezone-tools-links.json";
import tomlToolsLinks from "@/json-assets/toml-tools-links.json";
import typographyToolsLinks from "@/json-assets/typography-tools-links.json";
import unicodeToolsLinks from "@/json-assets/unicode-tools-links.json";
import urlToolsLinks from "@/json-assets/url-tools-links.json";
import uuidToolsLinks from "@/json-assets/uuid-tools-links.json";
import xmlToolsLinks from "@/json-assets/xml-tools-links.json";
import yamlToolsLinks from "@/json-assets/yaml-tools-links.json";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UniversalSearch from "@/components/utils/universal-search";

export const metadata: Metadata = {
  title: "Explore All Tools - 1000 Free Online Tools",
  description:
    "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
  openGraph: {
    title: "Explore All Tools - 1000 Free Online Tools",
    description:
      "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/explore-all-tools",
  },
};

// All tools data grouped by category
const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: imageToolLinks,
  },
  {
    categoryName: "Video Tools",
    tools: videoToolLinks,
  },
  {
    categoryName: "Audio Tools",
    tools: audioToolsLinks,
  },
  {
    categoryName: "Design Tools",
    tools: [
      {
        name: "Favicon Generator",
        description:
          "Create Professional Looking Favicon for Free, supports text, image, and emojis",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: developerToolsLinks,
  },
  {
    categoryName: "CSS Tools",
    tools: cssToolsLinks,
  },
  {
    categoryName: "HTML Tools",
    tools: htmlToolsLinks,
  },
  {
    categoryName: "JavaScript Tools",
    tools: javascriptToolsLinks,
  },
  {
    categoryName: "JSON Tools",
    tools: jsonToolLinks,
  },
  {
    categoryName: "CSV Tools",
    tools: csvToolsLinks,
  },
  {
    categoryName: "SQL Tools",
    tools: sqlToolsLinks,
  },
  {
    categoryName: "XML Tools",
    tools: xmlToolsLinks,
  },
  {
    categoryName: "YAML Tools",
    tools: yamlToolsLinks,
  },
  {
    categoryName: "TOML Tools",
    tools: tomlToolsLinks,
  },
  {
    categoryName: "Markdown Tools",
    tools: markdownToolsLinks,
  },
  {
    categoryName: "Text Tools",
    tools: textToolsLinks,
  },
  {
    categoryName: "String Tools",
    tools: stringToolsLinks,
  },
  {
    categoryName: "Color Tools",
    tools: colorToolsLinks,
  },
  {
    categoryName: "Math Tools",
    tools: mathToolsData.tools,
  },
  {
    categoryName: "Unit Converters",
    tools: unitConvertersLinks,
  },
  {
    categoryName: "Calculators",
    tools: calculators,
  },
  {
    categoryName: "Hash Tools",
    tools: hashToolsLinks,
  },
  {
    categoryName: "Encryption Tools",
    tools: encryptionToolsLinks,
  },
  {
    categoryName: "Encoding Tools",
    tools: encodingToolsLinks,
  },
  {
    categoryName: "Password Tools",
    tools: passwordToolsLinks,
  },
  {
    categoryName: "ASCII Tools",
    tools: asciiToolsLinks,
  },
  {
    categoryName: "Binary Tools",
    tools: binaryToolsLinks,
  },
  {
    categoryName: "Hex Tools",
    tools: hexToolsLinks,
  },
  {
    categoryName: "Unicode Tools",
    tools: unicodeToolsLinks,
  },
  {
    categoryName: "Number Tools",
    tools: numberToolsLinks,
  },
  {
    categoryName: "Date & Time Tools",
    tools: dateTimeToolsLinks,
  },
  {
    categoryName: "Timestamp Tools",
    tools: timestampToolsLinks,
  },
  {
    categoryName: "Timezone Tools",
    tools: timezoneToolsLinks,
  },
  {
    categoryName: "Calendar Tools",
    tools: calendarToolsLinks,
  },
  {
    categoryName: "URL Tools",
    tools: urlToolsLinks,
  },
  {
    categoryName: "QR Code Tools",
    tools: qrCodeToolsLinks,
  },
  {
    categoryName: "Barcode Tools",
    tools: barcodeToolsLinks,
  },
  {
    categoryName: "SVG Tools",
    tools: svgToolsLinks,
  },
  {
    categoryName: "Icon Tools",
    tools: iconToolsLinks,
  },
  {
    categoryName: "Font Tools",
    tools: fontToolsLinks,
  },
  {
    categoryName: "Typography Tools",
    tools: typographyToolsLinks,
  },
  {
    categoryName: "Chart Tools",
    tools: chartToolsLinks,
  },
  {
    categoryName: "Excel Tools",
    tools: excelToolsLinks,
  },
  {
    categoryName: "Statistics Tools",
    tools: statisticsToolsLinks,
  },
  {
    categoryName: "Physics Tools",
    tools: physicsToolsLinks,
  },
  {
    categoryName: "Simulators",
    tools: simulatorsLinks,
  },
  {
    categoryName: "Fun Tools",
    tools: funToolsLinks,
  },
  {
    categoryName: "Emoji Tools",
    tools: emojiToolsLinks,
  },
  {
    categoryName: "JWT Tools",
    tools: jwtToolsLinks,
  },
  {
    categoryName: "Minifier Tools",
    tools: minifierToolsLinks,
  },
  {
    categoryName: "Cron Expression Tools",
    tools: cronExpressionToolsLinks,
  },
  {
    categoryName: "UUID Tools",
    tools: uuidToolsLinks,
  },
].sort((a, b) => a.categoryName.localeCompare(b.categoryName));

export default function ExploreAllToolsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore All Tools
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Browse our comprehensive collection of free online tools that run
            directly in your browser.
          </p>
        </div>
      </section>

      <div>
        <h2>Universal Tool Search</h2>
        <UniversalSearch />
      </div>

      {/* Accordion Categories */}
      <section className=" mx-auto px-4 pb-12 w-full">
        <Accordion type="multiple" className="w-full">
          {toolsByCategory.map((category, categoryIndex) => (
            <AccordionItem key={categoryIndex} value={`item-${categoryIndex}`}>
              <AccordionTrigger className="text-xl md:text-2xl font-bold">
                {category.categoryName}
              </AccordionTrigger>

              <AccordionContent>
                <ToolLinkCards tools={category.tools} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
