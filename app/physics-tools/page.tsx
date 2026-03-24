import CategoryToolsLandingPage from "@/components/utils/category-tools-landing-page";
import tools from "@/json-assets/physics-tools-links.json";

export default function PhysicsToolsPage() {
  return (
    <CategoryToolsLandingPage
      title="Physics Tools"
      description="Physics calculators and simulators for mechanics, electricity, waves, fluids, and optics."
      tools={tools}
    />
  );
}
