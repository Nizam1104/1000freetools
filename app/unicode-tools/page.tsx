import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/unicode-tools-links.json";

export default function UnicodeToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Unicode Tools"
      description="Unicode utilities for inspection, conversion, normalization, escaping, and hidden character detection."
      tools={tools}
    />
  );
}
