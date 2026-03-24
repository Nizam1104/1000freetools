import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/markdown-tools-links.json";

export default function MarkdownToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Markdown Tools"
      description="Markdown converters and editors for formatting, linting, document generation, and publishing."
      tools={tools}
    />
  );
}
