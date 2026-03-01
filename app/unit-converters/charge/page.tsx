"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ChargePage() {
  const config = converterMappings["Charge"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Charge"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Charge Converter</h1>
        <p className="text-muted-foreground">Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics.</p>
      </div>
      <UnitConverterBase
        title="Electric Charge Converter"
        description="Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Charge</h2>
          <p className="text-muted-foreground mb-4">
            Electric charge represents a fundamental property of matter. You measure charge in coulombs (C), where one coulomb equals the charge transported by a constant current of one ampere flowing for one second.
          </p>
          <p className="text-muted-foreground mb-4">
            The elementary charge of a single electron equals approximately 1.602 × 10⁻¹⁹ coulombs. Protons carry an equal but positive charge. All observable electric charge occurs as integer multiples of this elementary charge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Electric Charge Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Q = I × t</p>
            <p className="text-muted-foreground text-sm">
              Where Q equals charge in coulombs, I equals current in amperes, and t equals time in seconds.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Q = C × V</p>
            <p className="text-muted-foreground text-sm">
              Where Q equals charge stored in a capacitor, C equals capacitance in farads, and V equals voltage across the capacitor.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100 microfarad capacitor charged to 12 volts stores Q = 100 × 10⁻⁶ F × 12 V = 0.0012 coulombs or 1.2 millicoulombs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Electric Charge Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Coulombs (C)</th>
                  <th className="border border-border p-2 text-left">Millicoulombs (mC)</th>
                  <th className="border border-border p-2 text-left">Microcoulombs (μC)</th>
                  <th className="border border-border p-2 text-left">Ampere-hours (Ah)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">2.78 × 10⁻⁷</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">2.78 × 10⁻⁶</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">2.78 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">2.78 × 10⁻⁴</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">3,600</td>
                  <td className="border border-border p-2">3,600,000</td>
                  <td className="border border-border p-2">3.6 × 10⁹</td>
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
              <h3 className="font-semibold mb-2">Battery Capacity</h3>
              <p className="text-muted-foreground text-sm">
                Battery manufacturers specify capacity in ampere-hours or milliampere-hours. A 3000 mAh smartphone battery stores 3 Ah × 3600 s/h = 10,800 coulombs of charge.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Capacitor Energy Storage</h3>
              <p className="text-muted-foreground text-sm">
                Supercapacitors store charge for backup power systems. A 1 farad capacitor at 5 volts holds 5 coulombs, providing brief power during outages.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electroplating</h3>
              <p className="text-muted-foreground text-sm">
                Electroplating processes depend on precise charge delivery. Depositing 1 gram of copper requires approximately 3,030 coulombs based on Faraday's laws of electrolysis.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do you convert ampere-hours to coulombs?</h3>
              <p className="text-muted-foreground text-sm">
                Multiply ampere-hours by 3,600. One ampere-hour equals 3,600 coulombs because 1 hour contains 3,600 seconds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is the difference between charge and current?</h3>
              <p className="text-muted-foreground text-sm">
                Charge measures the total quantity of electricity in coulombs. Current measures the flow rate of charge in amperes (coulombs per second).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do capacitors use microfarads instead of farads?</h3>
              <p className="text-muted-foreground text-sm">
                One farad represents enormous capacitance. Most electronic circuits use capacitors in the microfarad (μF), nanofarad (nF), or picofarad (pF) range for practical values.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much charge does a lightning bolt carry?</h3>
              <p className="text-muted-foreground text-sm">
                A typical lightning bolt transfers 15 to 20 coulombs of charge during a discharge lasting milliseconds, producing currents of 30,000 amperes or more.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
