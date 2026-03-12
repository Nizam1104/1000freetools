"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricResistancePage() {
  const config = converterMappings["Electric Resistance"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Resistance"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Resistance Converter</h1>
        <p className="text-muted-foreground">Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design, electronics, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Electric Resistance Converter"
        description="Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design, electronics, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Resistance</h2>
          <p className="text-muted-foreground mb-4">
            Electric resistance measures how much a material opposes the flow of electric current. You express resistance in ohms (Ω), named after German physicist Georg Ohm.
          </p>
          <p className="text-muted-foreground mb-4">
            Resistance depends on material properties, length, cross-sectional area, and temperature. Conductors like copper have low resistance. Insulators like rubber have extremely high resistance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Resistance Formulas and Ohm's Law</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">R = V / I</p>
            <p className="text-muted-foreground text-sm">
              Ohm's Law: Resistance equals voltage divided by current. This fundamental relationship defines resistance in DC circuits.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">R = ρ × L / A</p>
            <p className="text-muted-foreground text-sm">
              Resistivity formula: Resistance equals resistivity times length divided by cross-sectional area. Use this for conductor sizing.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">P = I² × R</p>
            <p className="text-muted-foreground text-sm">
              Power dissipation: Power equals current squared times resistance. This determines resistor wattage requirements.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A copper wire 100 meters long with 1 mm² cross-section has R = 1.68 × 10⁻⁸ Ω·m × 100 m / 1 × 10⁻⁶ m² = 1.68 ohms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Resistance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Ohms (Ω)</th>
                  <th className="border border-border p-2 text-left">Milliohms (mΩ)</th>
                  <th className="border border-border p-2 text-left">Kilohms (kΩ)</th>
                  <th className="border border-border p-2 text-left">Megaohms (MΩ)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.000001</td>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.00001</td>
                  <td className="border border-border p-2">1 × 10⁻⁸</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">1 × 10⁻⁷</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wire Gauge and Resistance Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">AWG</th>
                  <th className="border border-border p-2 text-left">Diameter (mm)</th>
                  <th className="border border-border p-2 text-left">Resistance per 1000m (Ω)</th>
                  <th className="border border-border p-2 text-left">Max Current (A)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">2.59</td>
                  <td className="border border-border p-2">3.28</td>
                  <td className="border border-border p-2">30</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">12</td>
                  <td className="border border-border p-2">2.05</td>
                  <td className="border border-border p-2">5.21</td>
                  <td className="border border-border p-2">20</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">14</td>
                  <td className="border border-border p-2">1.63</td>
                  <td className="border border-border p-2">8.29</td>
                  <td className="border border-border p-2">15</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">16</td>
                  <td className="border border-border p-2">1.29</td>
                  <td className="border border-border p-2">13.2</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">18</td>
                  <td className="border border-border p-2">1.02</td>
                  <td className="border border-border p-2">21.0</td>
                  <td className="border border-border p-2">7</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">20</td>
                  <td className="border border-border p-2">0.81</td>
                  <td className="border border-border p-2">33.3</td>
                  <td className="border border-border p-2">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Resistor Selection</h3>
              <p className="text-muted-foreground text-sm">
                Standard resistor values follow E-series preferences. E12 series provides 12 values per decade: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 ohms.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Circuit Protection</h3>
              <p className="text-muted-foreground text-sm">
                Fuses and circuit breakers protect against overcurrent. A 15-amp breaker trips when current exceeds 15 amperes, preventing wire overheating.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Heating Elements</h3>
              <p className="text-muted-foreground text-sm">
                Electric heaters use high-resistance nichrome wire. A 1500-watt heater at 120 volts uses R = V²/P = 120²/1500 = 9.6 ohms of resistance.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Insulation Testing</h3>
              <p className="text-muted-foreground text-sm">
                Megohmmeters measure insulation resistance in megaohms. Good insulation shows values above 100 MΩ. Values below 1 MΩ indicate deteriorated insulation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How does temperature affect resistance?</h3>
              <p className="text-muted-foreground text-sm">
                Most conductors increase resistance with temperature. Copper resistance increases about 0.4 percent per degree Celsius. Semiconductors decrease resistance as temperature rises.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between resistance and resistivity?</h3>
              <p className="text-muted-foreground text-sm">
                Resistivity is a material property measured in ohm-meters. Resistance depends on resistivity plus the object's dimensions. Resistivity describes the material. Resistance describes a specific component.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do resistors have color bands?</h3>
              <p className="text-muted-foreground text-sm">
                Color codes indicate resistance value and tolerance. A 4-band resistor uses two digit bands, one multiplier band, and one tolerance band for quick identification.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure resistance?</h3>
              <p className="text-muted-foreground text-sm">
                Use an ohmmeter or multimeter on the resistance range. Disconnect power and isolate the component from the circuit for accurate measurements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
