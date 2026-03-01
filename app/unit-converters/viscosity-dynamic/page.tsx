"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ViscosityDynamicPage() {
  const config = converterMappings["Viscosity - Dynamic"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Viscosity - Dynamic"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dynamic Viscosity Converter</h1>
        <p className="text-muted-foreground">Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering.</p>
      </div>
      <UnitConverterBase
        title="Dynamic Viscosity Converter"
        description="Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Dynamic Viscosity</h2>
          <p className="text-muted-foreground mb-4">
            Dynamic viscosity, also called absolute viscosity, measures a fluid's internal resistance to flow. When you apply force to move one layer of fluid past another, dynamic viscosity quantifies the friction between those layers. This property determines how easily fluids pour, pump, or flow through pipes.
          </p>
          <p className="text-muted-foreground">
            The SI unit for dynamic viscosity is the pascal-second (Pa·s). Engineers often use centipoise (cP) because water at 20°C has a viscosity of approximately 1 cP, providing a convenient reference point. The imperial system uses pound per foot-second (lb/(ft·s)).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Newton's Law of Viscosity</h2>
          <p className="text-muted-foreground mb-4">
            Isaac Newton established the fundamental relationship between shear stress and velocity gradient in fluids:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">τ = μ × (du/dy)</p>
            <p className="text-sm text-muted-foreground mt-2">where τ = shear stress (Pa), μ = dynamic viscosity (Pa·s), du/dy = velocity gradient (s⁻¹)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Fluids that follow this linear relationship are called Newtonian fluids. Water, air, gasoline, and most common liquids behave as Newtonian fluids. Non-Newtonian fluids like ketchup, blood, and paint show viscosity that changes with applied stress.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reynolds Number and Flow Regimes</h2>
          <p className="text-muted-foreground mb-4">
            Dynamic viscosity plays a critical role in determining flow behavior through the Reynolds number:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Re = (ρ × v × D) / μ</p>
            <p className="text-sm text-muted-foreground mt-2">where ρ = fluid density, v = velocity, D = pipe diameter, μ = dynamic viscosity</p>
          </div>
          <p className="text-muted-foreground mb-4">
            The Reynolds number predicts whether flow will be laminar or turbulent:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Re less than 2300: Laminar flow (smooth, orderly)</li>
            <li>Re between 2300 and 4000: Transitional flow</li>
            <li>Re greater than 4000: Turbulent flow (chaotic, mixed)</li>
          </ul>
          <p className="text-muted-foreground">
            Higher viscosity reduces the Reynolds number, promoting laminar flow. This principle guides pipe sizing, pump selection, and process design in chemical engineering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dynamic Viscosity of Common Fluids at 20°C</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Fluid</th>
                  <th className="border border-border p-3 text-left">Dynamic Viscosity (Pa·s)</th>
                  <th className="border border-border p-3 text-left">Dynamic Viscosity (cP)</th>
                  <th className="border border-border p-3 text-left">Dynamic Viscosity (lb/(ft·s))</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Air</td>
                  <td className="border border-border p-3">1.81 × 10⁻⁵</td>
                  <td className="border border-border p-3">0.0181</td>
                  <td className="border border-border p-3">1.22 × 10⁻⁵</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Water</td>
                  <td className="border border-border p-3">0.001002</td>
                  <td className="border border-border p-3">1.002</td>
                  <td className="border border-border p-3">0.000673</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Ethanol</td>
                  <td className="border border-border p-3">0.0012</td>
                  <td className="border border-border p-3">1.2</td>
                  <td className="border border-border p-3">0.00081</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Methanol</td>
                  <td className="border border-border p-3">0.00059</td>
                  <td className="border border-border p-3">0.59</td>
                  <td className="border border-border p-3">0.00040</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Gasoline</td>
                  <td className="border border-border p-3">0.0006</td>
                  <td className="border border-border p-3">0.6</td>
                  <td className="border border-border p-3">0.00040</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Kerosene</td>
                  <td className="border border-border p-3">0.00164</td>
                  <td className="border border-border p-3">1.64</td>
                  <td className="border border-border p-3">0.00110</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Diesel fuel</td>
                  <td className="border border-border p-3">0.003</td>
                  <td className="border border-border p-3">3.0</td>
                  <td className="border border-border p-3">0.0020</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Olive oil</td>
                  <td className="border border-border p-3">0.084</td>
                  <td className="border border-border p-3">84</td>
                  <td className="border border-border p-3">0.056</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">SAE 10 motor oil</td>
                  <td className="border border-border p-3">0.088</td>
                  <td className="border border-border p-3">88</td>
                  <td className="border border-border p-3">0.059</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">SAE 30 motor oil</td>
                  <td className="border border-border p-3">0.29</td>
                  <td className="border border-border p-3">290</td>
                  <td className="border border-border p-3">0.195</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Glycerin</td>
                  <td className="border border-border p-3">1.49</td>
                  <td className="border border-border p-3">1490</td>
                  <td className="border border-border p-3">1.00</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Honey</td>
                  <td className="border border-border p-3">10.0</td>
                  <td className="border border-border p-3">10000</td>
                  <td className="border border-border p-3">6.72</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Corn syrup</td>
                  <td className="border border-border p-3">5.0</td>
                  <td className="border border-border p-3">5000</td>
                  <td className="border border-border p-3">3.36</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Pitch (bitumen)</td>
                  <td className="border border-border p-3">2.3 × 10⁸</td>
                  <td className="border border-border p-3">2.3 × 10¹¹</td>
                  <td className="border border-border p-3">1.5 × 10⁸</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Effect on Viscosity</h2>
          <p className="text-muted-foreground mb-4">
            Viscosity changes significantly with temperature. For liquids, viscosity decreases as temperature rises because molecules move faster and overcome intermolecular forces more easily. For gases, viscosity increases with temperature because faster-moving molecules transfer more momentum between layers.
          </p>
          <p className="text-muted-foreground mb-4">
            The Arrhenius equation models the temperature dependence of liquid viscosity:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">μ = A × exp(Ea / RT)</p>
            <p className="text-sm text-muted-foreground mt-2">where A = pre-exponential factor, Ea = activation energy, R = gas constant, T = absolute temperature</p>
          </div>
          <p className="text-muted-foreground">
            Water viscosity drops from 1.79 cP at 0°C to 0.28 cP at 100°C, a six-fold decrease. Motor oil specifications include viscosity grades like 10W-30 that indicate performance across temperature ranges.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Use these conversion factors to switch between common dynamic viscosity units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Pa·s = 1000 cP (centipoise)</li>
            <li>1 Pa·s = 10 P (poise)</li>
            <li>1 cP = 0.01 P</li>
            <li>1 Pa·s = 0.67197 lb/(ft·s)</li>
            <li>1 lb/(ft·s) = 1.48816 Pa·s</li>
            <li>1 kgf·s/m² = 9.80665 Pa·s</li>
          </ul>
          <p className="text-muted-foreground">
            The centipoise remains popular in industry because water's viscosity equals approximately 1 cP at room temperature, providing an intuitive reference.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Dynamic Viscosity</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Lubricant selection for bearings, gears, and engines</li>
            <li>Pipeline design and pump sizing in oil and gas industry</li>
            <li>Paint and coating formulation for proper application</li>
            <li>Food processing and quality control</li>
            <li>Pharmaceutical manufacturing and drug delivery systems</li>
            <li>Polymer processing and extrusion</li>
            <li>Hydraulic fluid selection for machinery</li>
            <li>Blood flow analysis in medical applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between dynamic and kinematic viscosity?</h3>
            <p className="text-muted-foreground">
              Dynamic viscosity measures internal resistance to flow, while kinematic viscosity equals dynamic viscosity divided by density. Kinematic viscosity describes how fast a fluid flows under gravity. Use dynamic viscosity for force calculations and kinematic viscosity for flow rate problems.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is centipoise commonly used instead of Pa·s?</h3>
            <p className="text-muted-foreground">
              Centipoise provides convenient numbers for common fluids. Water has a viscosity of about 1 cP at 20°C, making it easy to compare other fluids. A fluid with 100 cP is 100 times more viscous than water. Using Pa·s would give water a viscosity of 0.001 Pa·s, requiring more decimal places.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How does viscosity affect pump power requirements?</h3>
            <p className="text-muted-foreground">
              Higher viscosity fluids require more pump power because they create greater friction losses in pipes and fittings. Pump efficiency drops significantly as viscosity increases above 100 cP. You must derate centrifugal pumps or switch to positive displacement pumps for high-viscosity applications.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What viscosity grade motor oil should I use?</h3>
            <p className="text-muted-foreground">
              Motor oil viscosity grades like 5W-30 indicate performance at different temperatures. The first number with W (winter) shows cold-start viscosity, and the second number shows viscosity at 100°C. Follow your vehicle manufacturer's recommendation based on climate and engine design. Colder climates need lower winter grades like 0W or 5W for easier cold starting.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
