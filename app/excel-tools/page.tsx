import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/excel-tools-links.json";

export default function ExcelToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Excel Tools"
      description="Excel processing and spreadsheet utilities for conversion, formatting, analysis, and cleanup workflows."
      tools={tools}
    />
  );
}
