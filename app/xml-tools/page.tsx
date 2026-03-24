import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/xml-tools-links.json";

export default function XMLToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="XML Tools"
      description="XML utilities for formatting, validation, conversion, schema workflows, and XPath testing."
      tools={tools}
    />
  );
}
