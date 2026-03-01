"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricPotentialPage() {
  const config = converterMappings["Electric Potential"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Potential"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Potential Converter</h1>
        <p className="text-muted-foreground">Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics, power systems, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Electric Potential Converter"
        description="Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics, power systems, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Potential</h2>
          <p className="text-muted-foreground mb-4">
            Electric potential, commonly called voltage, represents the electric potential energy per unit charge. You measure voltage in volts (V), where one volt equals one joule of energy per coulomb of charge.
          </p>
          <p className="text-muted-foreground mb-4">
            Voltage drives current through circuits. A potential difference between two points causes charges to flow from higher to lower potential, creating electric current.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Voltage Formulas and Ohm's Law</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">V = I × R</p>
            <p className="text-muted-foreground text-sm">
              Ohm's Law: Voltage equals current multiplied by resistance. This fundamental equation applies to resistive DC circuits.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">V = P / I</p>
            <p className="text-muted-foreground text-sm">
              Power relationship: Voltage equals power divided by current. Use this to find voltage from power ratings.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">V = W / Q</p>
            <p className="text-muted-foreground text-sm">
              Definition: Voltage equals work done per unit charge. One volt equals one joule per coulomb.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A resistor with 0.5 amperes flowing through 100 ohms develops V = 0.5 A × 100 Ω = 50 volts across it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Voltage Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Volts (V)</th>
                  <th className="border border-border p-2 text-left">Millivolts (mV)</th>
                  <th className="border border-border p-2 text-left">Kilovolts (kV)</th>
                  <th className="border border-border p-2 text-left">Megavolts (MV)</th>
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
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Consumer Electronics</h3>
              <p className="text-muted-foreground text-sm">
                USB ports provide 5 volts DC. Laptop chargers output 19-20 volts. Smartphone batteries operate at 3.7-4.2 volts. Audio line-level signals range from 0.3 to 2 volts.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Household Power Systems</h3>
              <p className="text-muted-foreground text-sm">
                North American homes use 120/240 volt split-phase systems. European homes operate at 230 volts. Three-phase industrial power uses 400-480 volts between phases.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Power Transmission</h3>
              <p className="text-muted-foreground text-sm">
                High-voltage transmission lines operate at 115-765 kilovolts to minimize losses over long distances. Substations step down voltage to distribution levels of 4-35 kilovolts.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Automotive Systems</h3>
              <p className="text-muted-foreground text-sm">
                Standard vehicles use 12-volt electrical systems. Electric vehicles operate at 400-800 volts for their traction motors. Alternators charge at 13.5-14.5 volts.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between voltage and current?</h3>
              <p className="text-muted-foreground text-sm">
                Voltage represents electrical pressure or potential difference. Current represents the actual flow of charge. Voltage causes current to flow through a conductor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do power lines use high voltage?</h3>
              <p className="text-muted-foreground text-sm">
                Higher voltage reduces current for the same power level. Lower current means less resistive loss in transmission lines, improving efficiency over long distances.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What voltage levels are dangerous?</h3>
              <p className="text-muted-foreground text-sm">
                Voltages above 50 volts AC or 120 volts DC present shock hazards. Always de-energize circuits before working on them and use proper protective equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure voltage?</h3>
              <p className="text-muted-foreground text-sm">
                Use a voltmeter or multimeter connected in parallel across the component or points you want to measure. Digital multimeters provide accurate readings for most applications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
