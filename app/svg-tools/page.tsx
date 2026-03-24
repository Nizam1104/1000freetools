import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/svg-tools-links.json";

export default function SVGToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="SVG Tools"
      description="SVG editing, conversion, optimization, and inspection utilities for modern web graphics."
      tools={tools}
    />
  );
}
