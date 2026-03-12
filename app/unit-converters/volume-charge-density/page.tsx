"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VolumeChargeDensityPage() {
  const config = converterMappings["Volume Charge Density"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume Charge Density"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volume Charge Density Converter</h1>
        <p className="text-muted-foreground">Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Volume Charge Density Converter"
        description="Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Volume Charge Density</h2>
          <p className="text-muted-foreground mb-4">
            Volume charge density measures electric charge per unit volume in a three-dimensional region. You express it in coulombs per cubic meter (C/m³). This quantity describes charge distribution in space, plasmas, and charged materials.
          </p>
          <p className="text-muted-foreground mb-4">
            Volume charge density applies when charge distributes throughout a three-dimensional volume. The total charge equals density integrated over the volume.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume Charge Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">ρ = Q / V</p>
            <p className="text-muted-foreground text-sm">
              Definition: Volume density equals total charge divided by volume. Rho (ρ) represents volume charge density.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">∇ · E = ρ / ε₀</p>
            <p className="text-muted-foreground text-sm">
              Gauss's Law: Electric field divergence equals density divided by permittivity. This is Maxwell's first equation.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">Q = ∫ ρ dV</p>
            <p className="text-muted-foreground text-sm">
              Total charge: Integrate density over volume for non-uniform distributions.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A sphere with 1 cm³ volume containing 2 microcoulombs has ρ = 2 × 10⁻⁶ C / 1 × 10⁻⁶ m³ = 2 C/m³.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Volume Charge Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">C/m³</th>
                  <th className="border border-border p-2 text-left">mC/cm³</th>
                  <th className="border border-border p-2 text-left">μC/mm³</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1 × 10⁻⁸</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1 × 10⁻⁷</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Plasma Physics</h3>
              <p className="text-muted-foreground text-sm">
                Plasmas contain charged particles with volume density. Fusion reactors maintain densities around 10²⁰ particles/m³. Charge density affects plasma behavior and confinement.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Semiconductor Physics</h3>
              <p className="text-muted-foreground text-sm">
                Doping creates volume charge density in semiconductors. Carrier densities range from 10¹⁵ to 10²⁰ cm⁻³. Density gradients drive diffusion currents.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Space Charge Regions</h3>
              <p className="text-muted-foreground text-sm">
                Vacuum tubes and cathode ray tubes contain space charge. Electron clouds create negative volume density. Space charge limits current in vacuum devices.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Atmospheric Electricity</h3>
              <p className="text-muted-foreground text-sm">
                Thunderstorms contain volume charge regions. Positive and negative charge centers separate vertically. Typical densities reach 1-10 nC/m³ in storm clouds.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">When do you use volume charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Use volume density for three-dimensional charge distributions. Plasmas, doped semiconductors, and charged clouds require volume treatment. Thin layers use surface density instead.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does volume density relate to current density?</h3>
              <p className="text-muted-foreground text-sm">
                Current density equals charge density times velocity. J = ρ × v for moving charges. This relationship connects static and dynamic charge distributions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is space charge?</h3>
              <p className="text-muted-foreground text-sm">
                Space charge refers to volume charge density in vacuum or gas. It creates electric fields that affect particle motion. Space charge limits current in vacuum tubes and accelerators.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you measure volume charge density?</h3>
              <p className="text-muted-foreground text-sm">
                Langmuir probes measure plasma density. Capacitance-voltage profiling determines semiconductor doping. Field measurements with Gauss's law calculate density from field gradients.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
