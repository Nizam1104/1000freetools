"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricConductancePage() {
  const config = converterMappings["Electric Conductance"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Conductance"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Conductance Converter</h1>
        <p className="text-muted-foreground">Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis.</p>
      </div>
      <UnitConverterBase
        title="Electric Conductance Converter"
        description="Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Conductance</h2>
          <p className="text-muted-foreground mb-4">
            Electric conductance measures how easily current flows through a component. You express conductance in siemens (S), named after inventor Werner von Siemens. One siemens equals one ampere per volt.
          </p>
          <p className="text-muted-foreground mb-4">
            Conductance represents the reciprocal of resistance. High conductance indicates good current flow. Low conductance indicates poor current flow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conductance Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">G = 1 / R</p>
            <p className="text-muted-foreground text-sm">
              Definition: Conductance equals one divided by resistance. Siemens and ohms are reciprocal units.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">G = I / V</p>
            <p className="text-muted-foreground text-sm">
              Ohm's Law form: Conductance equals current divided by voltage.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">G = σ × A / L</p>
            <p className="text-muted-foreground text-sm">
              Material conductance: Conductance equals conductivity times area divided by length.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100-ohm resistor has conductance G = 1 / 100 Ω = 0.01 S or 10 millisiemens.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Conductance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Siemens (S)</th>
                  <th className="border border-border p-2 text-left">Millisiemens (mS)</th>
                  <th className="border border-border p-2 text-left">Microsiemens (μS)</th>
                  <th className="border border-border p-2 text-left">Mho</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.000001</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.000001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Water Quality Testing</h3>
              <p className="text-muted-foreground text-sm">
                Conductivity meters measure water purity in microsiemens per centimeter. Pure water shows 0.055 μS/cm. Seawater reaches 50,000 μS/cm. Municipal water typically ranges 50-1,500 μS/cm.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Parallel Circuit Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Parallel conductances add directly. Total conductance equals G1 + G2 + G3. This simplifies parallel resistor calculations compared to resistance formulas.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Semiconductor Characterization</h3>
              <p className="text-muted-foreground text-sm">
                Transconductance measures amplifier gain in millisiemens. A MOSFET with 50 mS transconductance produces 50 mA drain current change per volt of gate voltage.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electroplating Solutions</h3>
              <p className="text-muted-foreground text-sm">
                Bath conductivity indicates ion concentration. Operators monitor conductance to maintain proper plating rates. Temperature compensation ensures accurate readings.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between conductance and conductivity?</h3>
              <p className="text-muted-foreground text-sm">
                Conductance describes a specific component in siemens. Conductivity describes a material property in siemens per meter. Conductivity remains constant regardless of dimensions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why use siemens instead of mho?</h3>
              <p className="text-muted-foreground text-sm">
                Siemens is the official SI unit. Mho (ohm spelled backward) was the older name. Both represent the same quantity. Modern standards prefer siemens.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does temperature affect conductance?</h3>
              <p className="text-muted-foreground text-sm">
                Metal conductance decreases with temperature. Electrolyte conductance increases with temperature. Semiconductor conductance increases dramatically with temperature.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure conductance?</h3>
              <p className="text-muted-foreground text-sm">
                Measure resistance with an ohmmeter, then calculate G = 1/R. Conductivity meters directly display conductance for liquid samples using specialized probes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
