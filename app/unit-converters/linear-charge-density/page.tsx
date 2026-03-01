"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LinearChargeDensityPage() {
  const config = converterMappings["Linear Charge Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Linear Charge Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Linear Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Linear Charge Density Converter"
        description="Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Linear Charge Density</h2>
          <p className="text-muted-foreground mb-4">
            Linear charge density measures electric charge per unit length along a line. You express it in coulombs per meter (C/m). This quantity describes charge distribution on wires, rods, and linear conductors.
          </p>
          <p className="text-muted-foreground mb-4">
            Linear charge density applies when charge distributes uniformly along a one-dimensional object. The total charge equals density multiplied by length.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Linear Charge Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">λ = Q / L</p>
            <p className="text-muted-foreground text-sm">
              Definition: Linear density equals total charge divided by length. Lambda (λ) represents linear charge density.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = λ / (2 × π × ε₀ × r)</p>
            <p className="text-muted-foreground text-sm">
              Electric field: Field from infinite line charge equals density divided by 2πε₀ times radial distance.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Q = λ × L</p>
            <p className="text-muted-foreground text-sm">
              Total charge: Charge equals linear density times length for uniform distribution.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 2-meter wire carrying 5 microcoulombs has λ = 5 × 10⁻⁶ C / 2 m = 2.5 × 10⁻⁶ C/m or 2.5 μC/m.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Linear Charge Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">C/m</th>
                  <th className="border border-border p-2 text-left">mC/mm</th>
                  <th className="border border-border p-2 text-left">μC/cm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Transmission Line Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Power lines carry distributed charge. Linear charge density determines capacitance per unit length. Typical values range from 10-100 nC/m for high-voltage lines.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electrostatic Precipitators</h3>
              <p className="text-muted-foreground text-sm">
                Charged wires create electric fields to remove particles. Wire charge density affects collection efficiency. Corona discharge limits maximum density.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Particle Beam Physics</h3>
              <p className="text-muted-foreground text-sm">
                Charged particle beams have linear charge density. Space charge effects depend on density. Beam focusing requires density management.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">When do you use linear charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Use linear density for long thin objects where length dominates other dimensions. Wires, rods, and filaments suit this model when diameter is much smaller than length.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does linear density relate to surface density?</h3>
              <p className="text-muted-foreground text-sm">
                Linear density equals surface density times circumference for a cylindrical wire. For a wire of radius r, λ = σ × 2πr where σ is surface charge density.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What limits linear charge density on wires?</h3>
              <p className="text-muted-foreground text-sm">
                Air breakdown limits charge density. At 3 kV/mm breakdown field, a 1 mm radius wire reaches maximum density around 0.17 μC/m before corona discharge begins.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure linear charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Measure total charge with an electrometer. Divide by conductor length. Field mill sensors can measure field and calculate density using Gauss's law.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
