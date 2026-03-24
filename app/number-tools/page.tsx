import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/number-tools-links.json";

export default function NumberToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Number Tools"
      description="Number, base, formatting, and sequence tools for calculations, validation, and transformations."
      tools={tools}
    />
  );
}
