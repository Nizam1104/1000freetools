import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/minifier-tools-links.json";

export default function MinifierToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Minifier Tools"
      description="Code and text minification tools for shrinking assets and improving load performance."
      tools={tools}
    />
  );
}
