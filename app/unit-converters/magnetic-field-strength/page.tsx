"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MagneticFieldStrengthPage() {
  const config = converterMappings["Magnetic Field Strength"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Magnetic Field Strength"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Magnetic Field Strength Converter</h1>
        <p className="text-muted-foreground">Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics, motor design, and magnetic material characterization.</p>
      </div>
      <UnitConverterBase
        title="Magnetic Field Strength Converter"
        description="Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics, motor design, and magnetic material characterization."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Magnetic Field Strength</h2>
          <p className="text-muted-foreground mb-4">
            Magnetic field strength measures the magnetizing force produced by electric currents. You express it in amperes per meter (A/m). This quantity represents the H-field in electromagnetic theory.
          </p>
          <p className="text-muted-foreground mb-4">
            Field strength differs from flux density. H-field depends only on currents. B-field (flux density) includes material effects. They relate through permeability: B = μH.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Field Strength Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">H = N × I / l</p>
            <p className="text-muted-foreground text-sm">
              Solenoid field: Field strength equals turns times current divided by magnetic path length.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">H = I / (2 × π × r)</p>
            <p className="text-muted-foreground text-sm">
              Straight conductor: Field at distance r from wire equals current divided by 2πr.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">B = μ₀ × μᵣ × H</p>
            <p className="text-muted-foreground text-sm">
              Material relationship: Flux density equals permeability of free space times relative permeability times field strength.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A coil with 500 turns, 2 amperes current, and 0.5 m magnetic path produces H = 500 × 2 / 0.5 = 2,000 A/m.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Magnetic Field Strength Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">A/m</th>
                  <th className="border border-border p-2 text-left">kA/m</th>
                  <th className="border border-border p-2 text-left">Oersteds (Oe)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.01257</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.1257</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">79.58</td>
                  <td className="border border-border p-2">0.07958</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1.257</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">12.57</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">125.7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Material Properties</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">Relative Permeability (μᵣ)</th>
                  <th className="border border-border p-2 text-left">Saturation Flux Density (T)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Air/Vacuum</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">-</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Silicon Steel</td>
                  <td className="border border-border p-2">4,000</td>
                  <td className="border border-border p-2">1.8-2.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ferrite</td>
                  <td className="border border-border p-2">1,000-15,000</td>
                  <td className="border border-border p-2">0.3-0.5</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Permalloy</td>
                  <td className="border border-border p-2">100,000</td>
                  <td className="border border-border p-2">0.8-1.0</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Neodymium Magnet</td>
                  <td className="border border-border p-2">1.05</td>
                  <td className="border border-border p-2">1.0-1.4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electromagnet Design</h3>
              <p className="text-muted-foreground text-sm">
                Field strength determines lifting force. Industrial lifting magnets operate at 10-50 kA/m. Core material saturation limits maximum achievable flux density.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Magnetic Circuit Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Hopkinson's law relates MMF, reluctance, and flux. MMF equals H times path length. Reluctance calculations use field strength and material properties.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Transformer Core Design</h3>
              <p className="text-muted-foreground text-sm">
                Core magnetizing current creates H-field. Operating below saturation ensures linear behavior. Grain-oriented steel reduces required field strength.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Magnetic Recording</h3>
              <p className="text-muted-foreground text-sm">
                Write heads generate H-fields to magnetize media. Coercivity specifies required field strength. Modern media require 50-200 kA/m for writing.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between H-field and B-field?</h3>
              <p className="text-muted-foreground text-sm">
                H-field (A/m) represents magnetizing force from currents. B-field (T) represents actual magnetic flux including material effects. They relate through B = μH.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is an oersted?</h3>
              <p className="text-muted-foreground text-sm">
                Oersted is the CGS unit of magnetic field strength. One oersted equals 79.58 A/m. The unit honors physicist Hans Christian Ørsted who discovered electromagnetism.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate field strength in a solenoid?</h3>
              <p className="text-muted-foreground text-sm">
                Use H = NI/l where N is turns, I is current, and l is magnetic path length. For a long solenoid, this gives uniform field inside the coil.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is magnetic saturation?</h3>
              <p className="text-muted-foreground text-sm">
                Saturation occurs when increasing H-field no longer increases B-field proportionally. All magnetic domains align. Further H increase produces only air-core response.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
