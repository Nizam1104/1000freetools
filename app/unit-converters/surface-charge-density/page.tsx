"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SurfaceChargeDensityPage() {
  const config = converterMappings["Surface Charge Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Surface Charge Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Surface Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics.</p>
      </div>
      <UnitConverterBase
        title="Surface Charge Density Converter"
        description="Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Surface Charge Density</h2>
          <p className="text-muted-foreground mb-4">
            Surface charge density measures electric charge per unit area on a surface. You express it in coulombs per square meter (C/m²). This quantity describes charge distribution on plates, shells, and planar conductors.
          </p>
          <p className="text-muted-foreground mb-4">
            Surface charge density applies when charge distributes on a two-dimensional surface. The total charge equals density multiplied by area.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Surface Charge Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">σ = Q / A</p>
            <p className="text-muted-foreground text-sm">
              Definition: Surface density equals total charge divided by area. Sigma (σ) represents surface charge density.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = σ / ε₀</p>
            <p className="text-muted-foreground text-sm">
              Electric field: Field near conducting surface equals density divided by permittivity of free space.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">C = ε × A / d</p>
            <p className="text-muted-foreground text-sm">
              Capacitance: Parallel plate capacitance equals permittivity times area divided by separation.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A capacitor plate with 10 cm² area carrying 5 microcoulombs has σ = 5 × 10⁻⁶ C / 0.001 m² = 0.005 C/m² or 5 mC/m².
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Surface Charge Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">C/m²</th>
                  <th className="border border-border p-2 text-left">mC/cm²</th>
                  <th className="border border-border p-2 text-left">μC/mm²</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10</td>
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
                Parallel plate capacitors store charge on opposing surfaces. Surface density determines electric field strength. Dielectric breakdown limits maximum density to prevent failure.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electrostatic Shielding</h3>
              <p className="text-muted-foreground text-sm">
                Faraday cages redistribute surface charge to cancel external fields. Surface density varies with geometry. Sharp points concentrate charge and increase local density.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Semiconductor Devices</h3>
              <p className="text-muted-foreground text-sm">
                MOS capacitors accumulate charge at oxide interfaces. Surface density controls threshold voltage. Gate oxide thickness and permittivity affect charge storage.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Photocopiers and Laser Printers</h3>
              <p className="text-muted-foreground text-sm">
                Photoconductor drums hold surface charge patterns. Toner adheres to charged areas. Typical densities range from 10-100 μC/m² for imaging.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Why does charge concentrate on sharp points?</h3>
              <p className="text-muted-foreground text-sm">
                Surface charge density increases with curvature. Sharp points have small radius of curvature, concentrating charge. This creates high electric fields that can cause corona discharge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does surface density relate to capacitance?</h3>
              <p className="text-muted-foreground text-sm">
                For parallel plates, σ = C × V / A. Higher capacitance allows more charge storage at given voltage. Larger area reduces density for same total charge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What limits surface charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Dielectric breakdown of surrounding medium sets the limit. Air breaks down at fields around 3 MV/m, corresponding to surface density of about 27 μC/m².
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure surface charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Electrostatic voltmeters measure surface potential. Calculate density using σ = ε × E. Kelvin probes provide non-contact measurement for research applications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
