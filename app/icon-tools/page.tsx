import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/icon-tools-links.json";

export default function IconToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Icon Tools"
      description="Icon creation and conversion tools for SVG, PNG, ICO, favicon, and app asset workflows."
      tools={tools}
    />
  );
}
