"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MagneticFluxPage() {
  const config = converterMappings["Magnetic Flux"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Magnetic Flux"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Magnetic Flux Converter</h1>
        <p className="text-muted-foreground">Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis.</p>
      </div>
      <UnitConverterBase
        title="Magnetic Flux Converter"
        description="Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Magnetic Flux</h2>
          <p className="text-muted-foreground mb-4">
            Magnetic flux measures the total magnetic field passing through a surface. You express flux in webers (Wb), named after physicist Wilhelm Weber. One weber equals one tesla-square meter.
          </p>
          <p className="text-muted-foreground mb-4">
            Magnetic flux represents the quantity of magnetism. Flux linkage in coils induces voltage according to Faraday's law. Transformers and motors rely on changing flux for operation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Flux Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Φ = B × A × cos(θ)</p>
            <p className="text-muted-foreground text-sm">
              Flux definition: Flux equals magnetic field times area times cosine of angle between field and surface normal.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">V = -N × dΦ/dt</p>
            <p className="text-muted-foreground text-sm">
              Faraday's Law: Induced voltage equals negative turns times rate of flux change. This governs transformer and generator operation.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Φ = L × I</p>
            <p className="text-muted-foreground text-sm">
              Inductor flux: Flux equals inductance times current for a coil.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A transformer with 100 turns experiencing flux change of 0.01 Wb/s induces V = 100 × 0.01 = 1 volt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Magnetic Flux Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Webers (Wb)</th>
                  <th className="border border-border p-2 text-left">Milliwebers (mWb)</th>
                  <th className="border border-border p-2 text-left">Maxwells (Mx)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.00001</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁵</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">100,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Transformer Design</h3>
              <p className="text-muted-foreground text-sm">
                Core flux determines transformer size and performance. A 1 kVA 50 Hz transformer with 1 T core flux density needs about 0.0045 Wb flux. Core area and turns set flux levels.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electric Motors</h3>
              <p className="text-muted-foreground text-sm">
                Motor torque depends on flux and current. Permanent magnet motors have fixed flux. Wound field motors adjust flux for speed control. Typical motor flux ranges 0.01-1 Wb.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Magnetic Sensors</h3>
              <p className="text-muted-foreground text-sm">
                Fluxgate magnetometers measure magnetic flux. Hall sensors detect flux density. These sensors enable current measurement and position sensing.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Inductive Charging</h3>
              <p className="text-muted-foreground text-sm">
                Wireless chargers couple flux between coils. Alignment affects flux linkage and efficiency. Qi chargers operate at 100-200 kHz with flux around 1-10 μWb.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between flux and flux density?</h3>
              <p className="text-muted-foreground text-sm">
                Magnetic flux (Wb) measures total field through a surface. Flux density (T) measures field strength per unit area. Flux equals density times area for uniform fields.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a maxwell?</h3>
              <p className="text-muted-foreground text-sm">
                Maxwell is the CGS unit of magnetic flux. One maxwell equals 10⁻⁸ webers. The unit honors physicist James Clerk Maxwell. Older texts use maxwells extensively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does flux relate to inductance?</h3>
              <p className="text-muted-foreground text-sm">
                Inductance equals flux per ampere. L = Φ/I defines inductance. Higher inductance stores more flux for given current.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why does changing flux induce voltage?</h3>
              <p className="text-muted-foreground text-sm">
                Faraday's law describes this fundamental electromagnetic phenomenon. Changing flux creates electric field that drives current. This principle enables generators and transformers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
