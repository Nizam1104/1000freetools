"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ElectricFieldStrengthPage() {
  const config = converterMappings["Electric Field Strength"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Electric Field Strength"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Electric Field Strength Converter</h1>
        <p className="text-muted-foreground">Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility.</p>
      </div>
      <UnitConverterBase
        title="Electric Field Strength Converter"
        description="Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Electric Field Strength</h2>
          <p className="text-muted-foreground mb-4">
            Electric field strength measures the force per unit charge at a point in space. You express field strength in volts per meter (V/m) or newtons per coulomb (N/C). These units are equivalent.
          </p>
          <p className="text-muted-foreground mb-4">
            Electric fields surround charged objects and exert forces on other charges. Field strength indicates how strongly a charge would experience force at that location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Electric Field Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = F / q</p>
            <p className="text-muted-foreground text-sm">
              Definition: Field strength equals force divided by test charge. One V/m equals one N/C.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = V / d</p>
            <p className="text-muted-foreground text-sm">
              Uniform field: Field strength equals voltage divided by distance between plates.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = k × Q / r²</p>
            <p className="text-muted-foreground text-sm">
              Point charge: Field equals Coulomb constant times charge divided by distance squared.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Parallel plates with 1000 V across 1 cm produce E = 1000 V / 0.01 m = 100,000 V/m or 100 kV/m.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Electric Field Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">V/m</th>
                  <th className="border border-border p-2 text-left">kV/m</th>
                  <th className="border border-border p-2 text-left">V/cm</th>
                  <th className="border border-border p-2 text-left">N/C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dielectric Strength Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">Dielectric Strength (kV/mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Air (dry)</td>
                  <td className="border border-border p-2">3</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Paper</td>
                  <td className="border border-border p-2">16</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Transformer Oil</td>
                  <td className="border border-border p-2">24</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Glass</td>
                  <td className="border border-border p-2">30</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Mica</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ceramic</td>
                  <td className="border border-border p-2">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Capacitor Design</h3>
              <p className="text-muted-foreground text-sm">
                Dielectric thickness must withstand operating voltage. A 500 V capacitor with paper dielectric needs at least 500 V / 16 kV/mm = 0.031 mm thickness.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">EMC Testing</h3>
              <p className="text-muted-foreground text-sm">
                Electromagnetic compatibility standards specify field immunity levels. Consumer electronics must withstand 3 V/m. Industrial equipment faces 10 V/m requirements.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">High Voltage Engineering</h3>
              <p className="text-muted-foreground text-sm">
                Transmission line design considers corona discharge thresholds. Air breaks down at 3 kV/mm under standard conditions. Humidity and pressure affect breakdown voltage.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Antenna Field Measurements</h3>
              <p className="text-muted-foreground text-sm">
                Field strength meters measure radiation from transmitters. Broadcast stations monitor fields to ensure regulatory compliance. Safety zones protect workers from high fields.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Are V/m and N/C the same?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, volts per meter and newtons per coulomb are equivalent units. Both describe electric field strength. V/m is more common in engineering. N/C appears in physics contexts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What field strength is dangerous?</h3>
              <p className="text-muted-foreground text-sm">
                Fields above 10 kV/m cause noticeable effects on humans. Occupational limits range from 5-25 kV/m depending on exposure duration. Air breakdown occurs at 3,000 kV/m.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure electric field strength?</h3>
              <p className="text-muted-foreground text-sm">
                Use a field mill or electrostatic fieldmeter for DC fields. RF field strength meters measure AC fields from antennas. Probes connect to spectrum analyzers for frequency analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What affects dielectric breakdown?</h3>
              <p className="text-muted-foreground text-sm">
                Temperature, humidity, pressure, and material purity affect breakdown strength. Sharp edges concentrate fields. Voids in insulation create weak points. Contamination reduces breakdown voltage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
