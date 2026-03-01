"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThermalExpansionPage() {
  const config = converterMappings["Thermal Expansion"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thermal Expansion"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thermal Expansion Converter</h1>
        <p className="text-muted-foreground">Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering.</p>
      </div>
      <UnitConverterBase
        title="Thermal Expansion Converter"
        description="Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Thermal Expansion</h2>
          <p className="text-muted-foreground mb-4">
            Thermal expansion coefficient measures how much a material expands when heated. You express this property as fractional length change per degree temperature change. Common units include per kelvin (1/K) or parts per million per kelvin (ppm/K).
          </p>
          <p className="text-muted-foreground">
            Engineers account for thermal expansion in bridges, pipelines, and buildings. You calculate dimensional changes to prevent structural damage. Electronics designers match component expansion coefficients to avoid solder joint failure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Linear Thermal Expansion Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate length change due to temperature using this formula:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ΔL = α × L0 × ΔT</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where ΔL equals change in length, α equals linear expansion coefficient, L0 equals original length, and ΔT equals temperature change.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A 10 meter steel rail (α = 12 ppm/K) heats up by 40°C. The expansion equals:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ΔL = 12×10⁻⁶ × 10 m × 40 K = 0.0048 m = 4.8 mm</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Calculate volumetric expansion for liquids and gases using β = 3α for isotropic materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thermal Expansion Coefficients of Common Materials</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">ppm/K</th>
                  <th className="border border-border p-2 text-left">1/°F</th>
                  <th className="border border-border p-2 text-left">Application Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">23</td>
                  <td className="border border-border p-2">12.8×10⁻⁶</td>
                  <td className="border border-border p-2">High expansion, lightweight</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Brass</td>
                  <td className="border border-border p-2">19</td>
                  <td className="border border-border p-2">10.6×10⁻⁶</td>
                  <td className="border border-border p-2">Fittings, valves</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Copper</td>
                  <td className="border border-border p-2">17</td>
                  <td className="border border-border p-2">9.4×10⁻⁶</td>
                  <td className="border border-border p-2">Plumbing, electrical</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Steel (carbon)</td>
                  <td className="border border-border p-2">12</td>
                  <td className="border border-border p-2">6.7×10⁻⁶</td>
                  <td className="border border-border p-2">Structural, pipelines</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Stainless steel</td>
                  <td className="border border-border p-2">17</td>
                  <td className="border border-border p-2">9.4×10⁻⁶</td>
                  <td className="border border-border p-2">Food processing, chemical</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Concrete</td>
                  <td className="border border-border p-2">12</td>
                  <td className="border border-border p-2">6.7×10⁻⁶</td>
                  <td className="border border-border p-2">Construction</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Glass (soda-lime)</td>
                  <td className="border border-border p-2">9</td>
                  <td className="border border-border p-2">5×10⁻⁶</td>
                  <td className="border border-border p-2">Windows, containers</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Borosilicate glass</td>
                  <td className="border border-border p-2">3.3</td>
                  <td className="border border-border p-2">1.8×10⁻⁶</td>
                  <td className="border border-border p-2">Labware, cookware</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Invar alloy</td>
                  <td className="border border-border p-2">1.2</td>
                  <td className="border border-border p-2">0.67×10⁻⁶</td>
                  <td className="border border-border p-2">Precision instruments</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Fused silica</td>
                  <td className="border border-border p-2">0.55</td>
                  <td className="border border-border p-2">0.31×10⁻⁶</td>
                  <td className="border border-border p-2">Optics, semiconductors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Expansion Joints and Design Considerations</h2>
          <p className="text-muted-foreground mb-4">
            You install expansion joints to accommodate thermal movement in structures. Bridge expansion joints handle several centimeters of movement. Pipeline loops absorb thermal expansion without excessive stress.
          </p>
          <p className="text-muted-foreground mb-4">
            Match thermal expansion coefficients when bonding dissimilar materials. Glass-to-metal seals use alloys with matched expansion. Circuit boards use materials compatible with silicon chip expansion.
          </p>
          <p className="text-muted-foreground">
            Calculate thermal stress when expansion is constrained using: σ = E × α × ΔT. Where σ equals thermal stress, E equals Young modulus, α equals expansion coefficient, and ΔT equals temperature change.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversion Factors</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">From Unit</th>
                  <th className="border border-border p-2 text-left">Multiply By</th>
                  <th className="border border-border p-2 text-left">To Get</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1/K</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1/°C</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">1/K</td>
                  <td className="border border-border p-2">0.5556</td>
                  <td className="border border-border p-2">1/°F</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1/°F</td>
                  <td className="border border-border p-2">1.8</td>
                  <td className="border border-border p-2">1/K</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">ppm/K</td>
                  <td className="border border-border p-2">1×10⁻⁶</td>
                  <td className="border border-border p-2">1/K</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1/K</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">ppm/K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why do different materials have different expansion coefficients</h3>
              <p className="text-muted-foreground">
                Atomic bond strength determines thermal expansion. Strong covalent bonds in diamond resist expansion. Metallic bonds allow more movement. Molecular structure and crystal lattice geometry also affect expansion behavior.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if you ignore thermal expansion in design</h3>
              <p className="text-muted-foreground">
                Constrained expansion creates thermal stress that causes buckling, cracking, or joint failure. Railroad tracks buckle in summer heat. Concrete cracks without control joints. Pipelines develop leaks at rigid connections.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does thermal expansion affect bimetallic strips</h3>
              <p className="text-muted-foreground">
              Bimetallic strips use two metals with different expansion coefficients bonded together. Temperature changes cause the strip to bend. You find these in thermostats, circuit breakers, and temperature gauges.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Does thermal expansion apply to liquids and gases</h3>
              <p className="text-muted-foreground">
                Yes, fluids expand with temperature. Liquids have volumetric expansion coefficients around 100 to 1000 ppm/K. Gases expand much more according to the ideal gas law. You must account for fluid expansion in closed systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
