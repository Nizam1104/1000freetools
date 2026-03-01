"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function InductancePage() {
  const config = converterMappings["Inductance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Inductance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Inductance Converter</h1>
        <p className="text-muted-foreground">Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design.</p>
      </div>
      <UnitConverterBase
        title="Inductance Converter"
        description="Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Inductance</h2>
          <p className="text-muted-foreground mb-4">
            Inductance measures a conductor's ability to store energy in a magnetic field. You express inductance in henries (H), named after physicist Joseph Henry. One henry produces one volt of induced EMF when current changes at one ampere per second.
          </p>
          <p className="text-muted-foreground mb-4">
            Inductors consist of wire coils, often wound around a magnetic core. The number of turns, core material, and coil geometry determine inductance value.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Inductance Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">V = L × di/dt</p>
            <p className="text-muted-foreground text-sm">
              Induced voltage equals inductance times rate of current change. This defines inductance in terms of opposing voltage.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = ½ × L × I²</p>
            <p className="text-muted-foreground text-sm">
              Energy storage: Energy equals one-half times inductance times current squared.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">XL = 2 × π × f × L</p>
            <p className="text-muted-foreground text-sm">
              Inductive reactance equals 2π times frequency times inductance. Reactance increases with frequency.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 10 millihenry inductor carrying 2 amperes stores E = 0.5 × 0.01 H × 2² A² = 0.02 joules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Inductance Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Henries (H)</th>
                  <th className="border border-border p-2 text-left">Millihenries (mH)</th>
                  <th className="border border-border p-2 text-left">Microhenries (μH)</th>
                  <th className="border border-border p-2 text-left">Nanohenries (nH)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Inductor Types and Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Air Core Inductors</h3>
              <p className="text-muted-foreground text-sm">
                Provide 10 nH to 100 μH. No core losses make them ideal for RF applications. Used in antenna matching networks and high-frequency filters.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ferrite Core Inductors</h3>
              <p className="text-muted-foreground text-sm">
                Range from 1 μH to 100 mH. High permeability increases inductance. Common in switch-mode power supplies and EMI filtering.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Iron Core Inductors</h3>
              <p className="text-muted-foreground text-sm">
                Provide 1 mH to several henries. Used in audio applications and power line filtering. Laminated cores reduce eddy current losses.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Toroidal Inductors</h3>
              <p className="text-muted-foreground text-sm">
                Doughnut-shaped cores confine magnetic flux. Low electromagnetic interference suits them for sensitive circuits. Available in various core materials.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">RL Circuit Time Constant</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">τ = L / R</p>
            <p className="text-muted-foreground text-sm">
              Time constant equals inductance divided by resistance. After one time constant, current reaches 63.2 percent of final value.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 100 mH inductor with 50 Ω series resistance produces τ = 0.1 H / 50 Ω = 0.002 seconds or 2 milliseconds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How does an inductor differ from a capacitor?</h3>
              <p className="text-muted-foreground text-sm">
                Inductors store energy in magnetic fields. Capacitors store energy in electric fields. Inductors oppose current changes. Capacitors oppose voltage changes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why do inductors have core materials?</h3>
              <p className="text-muted-foreground text-sm">
                Magnetic cores increase permeability, boosting inductance for a given number of turns. Core material selection affects frequency response and power handling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is inductive reactance?</h3>
              <p className="text-muted-foreground text-sm">
                Inductive reactance represents opposition to AC current flow. Reactance increases proportionally with frequency. DC sees zero reactance from an ideal inductor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure inductance?</h3>
              <p className="text-muted-foreground text-sm">
                Use an LCR meter or inductance meter. Some multimeters include inductance measurement. Apply known frequency AC and measure impedance for manual calculation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
