"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricResistivityPage() {
  const config = converterMappings["Electric Resistivity"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Resistivity"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Resistivity Converter</h1>
        <p className="text-muted-foreground">Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science, semiconductor design, and conductor selection.</p>
      </div>
      <UnitConverterBase
        title="Electric Resistivity Converter"
        description="Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science, semiconductor design, and conductor selection."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Resistivity</h2>
          <p className="text-muted-foreground mb-4">
            Electric resistivity measures how strongly a material opposes electric current flow. You express resistivity in ohm-meters (Ω·m). This intrinsic property depends on material composition and temperature.
          </p>
          <p className="text-muted-foreground mb-4">
            Resistivity differs from resistance. Resistance describes a specific object. Resistivity describes the material itself, independent of shape or size.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Resistivity Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ρ = R × A / L</p>
            <p className="text-muted-foreground text-sm">
              Definition: Resistivity equals resistance times cross-sectional area divided by length.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">R = ρ × L / A</p>
            <p className="text-muted-foreground text-sm">
              Resistance calculation: Resistance equals resistivity times length divided by area.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ρ(T) = ρ₀ × [1 + α × (T - T₀)]</p>
            <p className="text-muted-foreground text-sm">
              Temperature dependence: Resistivity at temperature T equals reference resistivity times temperature coefficient factor.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Copper wire 100 m long with 1 mm² area has R = 1.68 × 10⁻⁸ Ω·m × 100 m / 1 × 10⁻⁶ m² = 1.68 ohms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Resistivity Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Ω·m</th>
                  <th className="border border-border p-2 text-left">Ω·cm</th>
                  <th className="border border-border p-2 text-left">μΩ·cm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁸</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁴</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">100,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Resistivity Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">Resistivity (Ω·m)</th>
                  <th className="border border-border p-2 text-left">Temp Coefficient (1/°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Silver</td>
                  <td className="border border-border p-2">1.59 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.0038</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Copper</td>
                  <td className="border border-border p-2">1.68 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.0039</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Gold</td>
                  <td className="border border-border p-2">2.44 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.0034</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">2.82 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.0043</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Iron</td>
                  <td className="border border-border p-2">1.0 × 10⁻⁷</td>
                  <td className="border border-border p-2">0.0050</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Silicon</td>
                  <td className="border border-border p-2">6.4 × 10²</td>
                  <td className="border border-border p-2">-0.075</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Glass</td>
                  <td className="border border-border p-2">1 × 10¹⁰</td>
                  <td className="border border-border p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Rubber</td>
                  <td className="border border-border p-2">1 × 10¹³</td>
                  <td className="border border-border p-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Conductor Selection</h3>
              <p className="text-muted-foreground text-sm">
                Copper offers lowest cost per conductivity for wiring. Aluminum provides lighter weight for overhead lines. Gold plating prevents corrosion on connectors.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Semiconductor Manufacturing</h3>
              <p className="text-muted-foreground text-sm">
                Doping controls silicon resistivity from 0.001 to 100 Ω·cm. Four-point probe measurements verify wafer resistivity. Resistivity mapping ensures uniform device performance.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Heating Element Design</h3>
              <p className="text-muted-foreground text-sm">
                Nichrome alloy provides 1.1 × 10⁻⁶ Ω·m resistivity. High resistivity and temperature stability suit it for heating applications. Resistance wire length determines heater power.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Grounding Systems</h3>
              <p className="text-muted-foreground text-sm">
                Soil resistivity affects grounding electrode design. Values range from 10 Ω·m for wet clay to 10,000 Ω·m for dry rock. Soil treatment reduces resistivity for better grounding.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How does temperature affect resistivity?</h3>
              <p className="text-muted-foreground text-sm">
                Metals increase resistivity with temperature. Semiconductors decrease resistivity with temperature. The temperature coefficient quantifies this change per degree Celsius.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between resistivity and resistance?</h3>
              <p className="text-muted-foreground text-sm">
                Resistivity describes material properties in ohm-meters. Resistance describes specific objects in ohms. Resistance depends on resistivity plus dimensions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why is copper used for electrical wiring?</h3>
              <p className="text-muted-foreground text-sm">
                Copper offers excellent conductivity, good mechanical properties, and reasonable cost. Only silver conducts better but costs far more. Aluminum provides lighter weight for overhead applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure resistivity?</h3>
              <p className="text-muted-foreground text-sm">
                Use a four-point probe for semiconductors. Measure resistance of a known geometry sample for bulk materials. Soil resistivity meters use spaced electrodes for ground testing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
