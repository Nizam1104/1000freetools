import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/image-tool-links.json";

export default function ImageToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Image Tools"
      description="Image editing and conversion tools to compress, convert, crop, filter, and optimize visuals."
      tools={tools}
    />
  );
}
