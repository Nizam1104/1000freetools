"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectrostaticCapacitancePage() {
  const config = converterMappings["Electrostatic Capacitance"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electrostatic Capacitance"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Capacitance Converter</h1>
        <p className="text-muted-foreground">Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Capacitance Converter"
        description="Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Capacitance</h2>
          <p className="text-muted-foreground mb-4">
            Capacitance measures a component's ability to store electric charge. You express capacitance in farads (F), named after physicist Michael Faraday. One farad stores one coulomb of charge at one volt potential difference.
          </p>
          <p className="text-muted-foreground mb-4">
            Capacitors consist of two conductive plates separated by a dielectric material. The dielectric constant, plate area, and separation distance determine capacitance value.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Capacitance Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">C = Q / V</p>
            <p className="text-muted-foreground text-sm">
              Definition: Capacitance equals stored charge divided by voltage. One farad equals one coulomb per volt.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">C = ε × A / d</p>
            <p className="text-muted-foreground text-sm">
              Parallel plate formula: Capacitance equals permittivity times plate area divided by plate separation.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = ½ × C × V²</p>
            <p className="text-muted-foreground text-sm">
              Energy storage: Energy equals one-half times capacitance times voltage squared.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100 microfarad capacitor charged to 25 volts stores E = 0.5 × 100 × 10⁻⁶ F × 25² V² = 0.03125 joules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Capacitance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Farads (F)</th>
                  <th className="border border-border p-2 text-left">Millifarads (mF)</th>
                  <th className="border border-border p-2 text-left">Microfarads (μF)</th>
                  <th className="border border-border p-2 text-left">Nanofarads (nF)</th>
                  <th className="border border-border p-2 text-left">Picofarads (pF)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻¹²</td>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
                  <td className="border border-border p-2">1 × 10¹²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Capacitor Types and Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ceramic Capacitors</h3>
              <p className="text-muted-foreground text-sm">
                Range from 1 pF to 10 μF. Used for high-frequency decoupling and RF applications. Low cost and small size make them ideal for surface-mount designs.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electrolytic Capacitors</h3>
              <p className="text-muted-foreground text-sm">
                Provide 1 μF to several farads. Polarized construction requires correct orientation. Common in power supply filtering and audio coupling applications.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Film Capacitors</h3>
              <p className="text-muted-foreground text-sm">
                Range from 100 pF to 100 μF. Excellent stability and low losses. Used in timing circuits, motor run applications, and audio crossovers.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Supercapacitors</h3>
              <p className="text-muted-foreground text-sm">
                Store 0.1 to 5,000 farads. Bridge the gap between capacitors and batteries. Used for memory backup, energy harvesting, and pulse power applications.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">RC Circuit Time Constant</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">τ = R × C</p>
            <p className="text-muted-foreground text-sm">
              Time constant equals resistance times capacitance. After one time constant, a capacitor charges to 63.2 percent of applied voltage.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 10 kΩ resistor with a 100 μF capacitor produces τ = 10,000 Ω × 0.0001 F = 1 second. The capacitor reaches full charge in approximately 5 seconds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Why are capacitor values in microfarads instead of farads?</h3>
              <p className="text-muted-foreground text-sm">
                One farad represents enormous capacitance. Most electronic circuits use values between picofarads and millifarads. Using prefixes provides convenient numbers without excessive zeros.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you read capacitor markings?</h3>
              <p className="text-muted-foreground text-sm">
                Three-digit codes indicate picofarads. The first two digits are significant figures. The third digit is the multiplier. Code 104 means 10 × 10⁴ = 100,000 pF = 100 nF.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens when capacitors connect in parallel?</h3>
              <p className="text-muted-foreground text-sm">
                Parallel capacitors add directly. Total capacitance equals C1 + C2 + C3. Voltage rating equals the lowest individual rating.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you discharge a capacitor safely?</h3>
              <p className="text-muted-foreground text-sm">
                Use a resistor rated for the voltage. A 1 kΩ per volt rule works well. Never short large capacitors directly. High-voltage capacitors require proper discharge tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
