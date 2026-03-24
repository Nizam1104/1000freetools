import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/simulators-links.json";

export default function SimulatorsPage() {
  return (
    <CategoryToolsLandingPage
      title="Simulators"
      description="Interactive simulators for experimentation, learning, and quick scenario testing."
      tools={tools}
    />
  );
}
