"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricConductivityPage() {
  const config = converterMappings["Electric Conductivity"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Conductivity"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Conductivity Converter</h1>
        <p className="text-muted-foreground">Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing, material science, and electrochemistry.</p>
      </div>
      <UnitConverterBase
        title="Electric Conductivity Converter"
        description="Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing, material science, and electrochemistry."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Conductivity</h2>
          <p className="text-muted-foreground mb-4">
            Electric conductivity measures how well a material conducts electric current. You express conductivity in siemens per meter (S/m). Conductivity is the reciprocal of resistivity.
          </p>
          <p className="text-muted-foreground mb-4">
            High conductivity indicates good current flow. Metals show conductivity in megasiemens per meter. Insulators show microsiemens per meter or lower.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conductivity Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">σ = 1 / ρ</p>
            <p className="text-muted-foreground text-sm">
              Definition: Conductivity equals one divided by resistivity. Siemens per meter and ohm-meters are reciprocal.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">σ = L / (R × A)</p>
            <p className="text-muted-foreground text-sm">
              Measurement formula: Conductivity equals length divided by resistance times area.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">G = σ × A / L</p>
            <p className="text-muted-foreground text-sm">
              Conductance relationship: Conductance equals conductivity times area divided by length.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Copper with resistivity 1.68 × 10⁻⁸ Ω·m has conductivity σ = 1 / 1.68 × 10⁻⁸ = 59.5 × 10⁶ S/m or 59.5 MS/m.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Conductivity Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">S/m</th>
                  <th className="border border-border p-2 text-left">mS/cm</th>
                  <th className="border border-border p-2 text-left">μS/cm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Conductivity Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">Conductivity (MS/m)</th>
                  <th className="border border-border p-2 text-left">IACS Percent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Silver</td>
                  <td className="border border-border p-2">63.0</td>
                  <td className="border border-border p-2">105</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Copper (annealed)</td>
                  <td className="border border-border p-2">58.0</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Gold</td>
                  <td className="border border-border p-2">45.2</td>
                  <td className="border border-border p-2">78</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">37.8</td>
                  <td className="border border-border p-2">65</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Iron</td>
                  <td className="border border-border p-2">10.0</td>
                  <td className="border border-border p-2">17</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Seawater</td>
                  <td className="border border-border p-2">5</td>
                  <td className="border border-border p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Drinking Water</td>
                  <td className="border border-border p-2">0.005-0.05</td>
                  <td className="border border-border p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Pure Water</td>
                  <td className="border border-border p-2">0.000055</td>
                  <td className="border border-border p-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Water Quality Standards</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ultrapure Water</h3>
              <p className="text-muted-foreground text-sm">
                Semiconductor manufacturing requires 0.055 μS/cm conductivity. This represents 18.2 MΩ·cm resistivity. Only H⁺ and OH⁻ ions remain present.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Drinking Water</h3>
              <p className="text-muted-foreground text-sm">
                EPA recommends conductivity below 1,500 μS/cm. Typical municipal water ranges 50-1,500 μS/cm. High conductivity indicates dissolved mineral content.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Wastewater</h3>
              <p className="text-muted-foreground text-sm">
                Industrial discharge limits vary by jurisdiction. Values above 5,000 μS/cm may require treatment. Conductivity monitoring ensures compliance.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is IACS?</h3>
              <p className="text-muted-foreground text-sm">
                IACS stands for International Annealed Copper Standard. It expresses conductivity as a percentage of annealed copper. 100 percent IACS equals 58 MS/m.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does temperature affect conductivity?</h3>
              <p className="text-muted-foreground text-sm">
                Metal conductivity decreases with temperature. Water conductivity increases about 2 percent per degree Celsius. Meters apply automatic temperature compensation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the cell constant?</h3>
              <p className="text-muted-foreground text-sm">
                Conductivity probes have a cell constant in cm⁻¹. It relates measured conductance to conductivity. Common values are 0.1, 1.0, and 10 cm⁻¹.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why measure water conductivity?</h3>
              <p className="text-muted-foreground text-sm">
                Conductivity indicates total dissolved solids. It provides rapid water quality assessment. Changes signal contamination or treatment issues.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
