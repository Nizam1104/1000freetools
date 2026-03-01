"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceCurrentDensityPage() {
  const config = converterMappings["Surface Current Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Current Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Current Density Converter</h1>
        <p className="text-muted-foreground">Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems.</p>
      </div>
      <UnitConverterBase
        title="Surface Current Density Converter"
        description="Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Surface Current Density</h2>
          <p className="text-muted-foreground mb-4">
            Surface current density measures electric current per unit cross-sectional area. You express it in amperes per square meter (A/m²). This quantity describes how current distributes through conductors and affects heating and magnetic fields.
          </p>
          <p className="text-muted-foreground mb-4">
            Current density determines conductor sizing and thermal performance. Higher density increases resistive heating. Proper density selection balances efficiency against material cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Surface Current Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">J = I / A</p>
            <p className="text-muted-foreground text-sm">
              Definition: Current density equals total current divided by cross-sectional area. J represents current density in A/m².
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">P = J² × ρ × V</p>
            <p className="text-muted-foreground text-sm">
              Power dissipation: Losses equal density squared times resistivity times volume.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">∇ × B = μ₀ × J</p>
            <p className="text-muted-foreground text-sm">
              Ampere's Law: Magnetic field curl equals permeability times current density.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A wire with 1 mm² cross-section carrying 5 amperes has J = 5 A / 1 × 10⁻⁶ m² = 5 × 10⁶ A/m² or 5 A/mm².
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Surface Current Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">A/m²</th>
                  <th className="border border-border p-2 text-left">mA/cm²</th>
                  <th className="border border-border p-2 text-left">kA/m²</th>
                  <th className="border border-border p-2 text-left">A/mm²</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.00001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.0001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conductor Current Density Guidelines</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">Current Density (A/mm²)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Household Wiring</td>
                  <td className="border border-border p-2">3-5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Power Cables</td>
                  <td className="border border-border p-2">2-4</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Transformer Windings</td>
                  <td className="border border-border p-2">2-5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Motor Windings</td>
                  <td className="border border-border p-2">4-8</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">PCB Traces (internal)</td>
                  <td className="border border-border p-2">10-20</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">PCB Traces (external)</td>
                  <td className="border border-border p-2">20-40</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Busbars</td>
                  <td className="border border-border p-2">1-3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Wire Sizing</h3>
              <p className="text-muted-foreground text-sm">
                Electrical codes specify maximum current for wire gauges. AWG 14 copper wire handles 15 amperes at 2.5 A/mm². Larger wires reduce density and heating for higher currents.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">PCB Design</h3>
              <p className="text-muted-foreground text-sm">
                Trace width calculators determine minimum width for current. External traces handle more current due to better cooling. IPC-2152 standards guide trace sizing.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electric Machine Design</h3>
              <p className="text-muted-foreground text-sm">
                Motor windings balance current density against temperature rise. Forced cooling allows higher density. Continuous duty requires conservative density selection.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electroplating</h3>
              <p className="text-muted-foreground text-sm">
                Plating current density affects deposit quality. Copper plating uses 2-10 A/dm². Too high density causes rough deposits. Too low density slows production.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is a safe current density for copper wire?</h3>
              <p className="text-muted-foreground text-sm">
                For general wiring, 3-5 A/mm² provides safe operation. Enclosed spaces require lower density. Forced cooling allows higher density up to 10 A/mm² in some applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does current density affect heating?</h3>
              <p className="text-muted-foreground text-sm">
                Heating increases with density squared. Doubling density quadruples heat generation. This relationship drives conservative density selection for reliability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is skin effect?</h3>
              <p className="text-muted-foreground text-sm">
                AC current concentrates near conductor surface at high frequency. Effective cross-section decreases, increasing apparent resistance. Litz wire mitigates skin effect.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate trace width for PCBs?</h3>
              <p className="text-muted-foreground text-sm">
                Use IPC-2152 charts or online calculators. Input current, copper weight, and temperature rise. External traces need less width than internal traces for same current.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
