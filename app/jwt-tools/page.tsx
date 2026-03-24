import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/jwt-tools-links.json";

export default function JWTToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="JWT Tools"
      description="JSON Web Token utilities for decoding, validation, generation, key handling, and debugging."
      tools={tools}
    />
  );
}
