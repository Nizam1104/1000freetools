import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/javascript-tools-links.json";

export default function JavaScriptToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="JavaScript Tools"
      description="JavaScript helpers for encoding, formatting, testing, conversion, and code quality workflows."
      tools={tools}
    />
  );
}
