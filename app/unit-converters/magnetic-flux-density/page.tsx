"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MagneticFluxDensityPage() {
  const config = converterMappings["Magnetic Flux Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Magnetic Flux Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Magnetic Flux Density Converter</h1>
        <p className="text-muted-foreground">Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI, motor design, and electromagnetic engineering.</p>
      </div>
      <UnitConverterBase
        title="Magnetic Flux Density Converter"
        description="Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI, motor design, and electromagnetic engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Magnetic Flux Density</h2>
          <p className="text-muted-foreground mb-4">
            Magnetic flux density measures magnetic field strength at a point. You express it in tesla (T), named after inventor Nikola Tesla. One tesla equals one weber per square meter.
          </p>
          <p className="text-muted-foreground mb-4">
            Flux density indicates how concentrated magnetic field lines are. Higher density means stronger magnetic force. Earth's magnetic field measures about 50 microtesla at the surface.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Flux Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">B = Φ / A</p>
            <p className="text-muted-foreground text-sm">
              Definition: Flux density equals flux divided by area perpendicular to field.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">F = B × I × L</p>
            <p className="text-muted-foreground text-sm">
              Force on conductor: Force equals flux density times current times conductor length.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">B = μ × H</p>
            <p className="text-muted-foreground text-sm">
              Material relationship: Flux density equals permeability times magnetic field strength.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A motor conductor 10 cm long carrying 5 amperes in 1 tesla field experiences F = 1 T × 5 A × 0.1 m = 0.5 newtons force.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Magnetic Flux Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Tesla (T)</th>
                  <th className="border border-border p-2 text-left">Millitesla (mT)</th>
                  <th className="border border-border p-2 text-left">Gauss (G)</th>
                  <th className="border border-border p-2 text-left">Microtesla (μT)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁸</td>
                  <td className="border border-border p-2">0.00001</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">1,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10,000</td>
                  <td className="border border-border p-2">1,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Magnetic Field Strength Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Source</th>
                  <th className="border border-border p-2 text-left">Flux Density</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Earth's Magnetic Field</td>
                  <td className="border border-border p-2">25-65 μT</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Refrigerator Magnet</td>
                  <td className="border border-border p-2">5-10 mT</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Loudspeaker Magnet</td>
                  <td className="border border-border p-2">0.1-1 T</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Motor/Generator</td>
                  <td className="border border-border p-2">0.5-1.5 T</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">MRI Scanner</td>
                  <td className="border border-border p-2">1.5-7 T</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Neutron Star</td>
                  <td className="border border-border p-2">10⁸ T</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Medical Imaging (MRI)</h3>
              <p className="text-muted-foreground text-sm">
                MRI scanners use 1.5-7 tesla superconducting magnets. Higher field strength improves image resolution. Safety zones protect against projectile effects from the strong field.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electric Motor Design</h3>
              <p className="text-muted-foreground text-sm">
                Motor torque depends on air gap flux density. Modern motors achieve 0.8-1.2 T in the air gap. Rare-earth magnets enable higher density in permanent magnet motors.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Magnetic Separation</h3>
              <p className="text-muted-foreground text-sm">
                Industrial separators remove ferrous contaminants. High-gradient separators use 1-2 T fields. Mining operations separate magnetic ores from gangue.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Hall Effect Sensors</h3>
              <p className="text-muted-foreground text-sm">
                Hall sensors measure flux density for position and current sensing. Typical sensitivity ranges 10-100 mV/mT. Applications include brushless motor commutation and current monitoring.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between tesla and gauss?</h3>
              <p className="text-muted-foreground text-sm">
                Tesla is the SI unit. Gauss is the CGS unit. One tesla equals 10,000 gauss. Gauss remains common in older literature and some industries.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How strong is Earth's magnetic field?</h3>
              <p className="text-muted-foreground text-sm">
                Earth's field ranges from 25 to 65 microtesla depending on location. The field is strongest near the poles. Compasses align with this field for navigation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What magnetic field levels are safe for humans?</h3>
              <p className="text-muted-foreground text-sm">
                Static fields below 2 tesla show no proven health effects. MRI patients experience 1.5-7 T safely. Time-varying fields have stricter limits due to induced currents.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure magnetic flux density?</h3>
              <p className="text-muted-foreground text-sm">
                Use a gaussmeter or teslameter with Hall probe. Fluxgate magnetometers provide higher sensitivity. NMR probes offer highest accuracy for calibration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
