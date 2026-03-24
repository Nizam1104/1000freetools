import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/typography-tools-links.json";

export default function TypographyToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Typography Tools"
      description="Typography utilities for scale, spacing, readability, and font workflow improvements."
      tools={tools}
    />
  );
}
