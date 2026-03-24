import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/password-tools-links.json";

export default function PasswordToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Password Tools"
      description="Password security tools for generating, auditing, testing strength, and policy management."
      tools={tools}
    />
  );
}
