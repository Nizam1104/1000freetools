import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/font-tools-links.json";

export default function FontToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Font Tools"
      description="Font utilities for conversion, previewing, analysis, generation, and typography optimization."
      tools={tools}
    />
  );
}
