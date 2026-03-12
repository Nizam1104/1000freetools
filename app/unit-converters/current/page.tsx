"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CurrentPage() {
  const config = converterMappings["Current"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Current"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Current Converter</h1>
        <p className="text-muted-foreground">Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design.</p>
      </div>
      <UnitConverterBase
        title="Electric Current Converter"
        description="Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Current</h2>
          <p className="text-muted-foreground mb-4">
            Electric current measures the flow rate of electric charge through a conductor. You express current in amperes (A), where one ampere equals one coulomb of charge passing a point per second.
          </p>
          <p className="text-muted-foreground mb-4">
            Current flows from higher potential to lower potential in conventional notation. Electron flow moves in the opposite direction, from negative to positive terminals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Electric Current Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = V / R</p>
            <p className="text-muted-foreground text-sm">
              Ohm's Law: Current equals voltage divided by resistance. This fundamental relationship governs most DC circuit analysis.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = P / V</p>
            <p className="text-muted-foreground text-sm">
              Power formula: Current equals power divided by voltage. Use this to determine current draw from power ratings.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = Q / t</p>
            <p className="text-muted-foreground text-sm">
              Definition: Current equals charge flow per unit time. One ampere equals one coulomb per second.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100-watt light bulb operating at 120 volts draws I = 100 W / 120 V = 0.833 amperes or 833 milliamperes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Current Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Amperes (A)</th>
                  <th className="border border-border p-2 text-left">Milliamperes (mA)</th>
                  <th className="border border-border p-2 text-left">Microamperes (μA)</th>
                  <th className="border border-border p-2 text-left">Kiloamperes (kA)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.000001</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">1 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">1 × 10⁻⁴</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
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
              <h3 className="font-semibold mb-2">Electronic Circuit Design</h3>
              <p className="text-muted-foreground text-sm">
                Microcontrollers operate at milliamp levels. An Arduino Uno draws approximately 50 mA during normal operation. Battery-powered devices require current management for extended runtime.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Household Electrical Systems</h3>
              <p className="text-muted-foreground text-sm">
                Standard US household circuits use 15 or 20 ampere breakers. A typical refrigerator draws 3-6 amperes at 120 volts. Electric ranges require 40-50 amperes at 240 volts.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Industrial Power Systems</h3>
              <p className="text-muted-foreground text-sm">
                Large motors and welding equipment operate at kiloampere levels. A 100 kW motor at 480 volts draws approximately 208 amperes per phase in a three-phase system.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Biomedical Measurements</h3>
              <p className="text-muted-foreground text-sm">
                Nerve impulses involve microampere currents. ECG and EEG sensors detect currents in the microampere range for medical diagnostics.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do you measure electric current?</h3>
              <p className="text-muted-foreground text-sm">
                Use an ammeter connected in series with the circuit. Clamp meters measure current without breaking the circuit by detecting the magnetic field around the conductor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What determines how much current flows in a circuit?</h3>
              <p className="text-muted-foreground text-sm">
                Voltage and resistance determine current according to Ohm's Law. Higher voltage increases current. Higher resistance decreases current.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why use milliamperes instead of amperes?</h3>
              <p className="text-muted-foreground text-sm">
                Most electronic circuits operate below one ampere. Expressing values in milliamperes provides clearer numbers without excessive decimal places.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a safe current level for humans?</h3>
              <p className="text-muted-foreground text-sm">
                Currents above 10 milliamperes cause painful shocks. Currents exceeding 100 milliamperes through the heart prove fatal. Always use proper safety equipment when working with electrical systems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
