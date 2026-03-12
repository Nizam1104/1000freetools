"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LinearCurrentDensityPage() {
  const config = converterMappings["Linear Current Density"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Linear Current Density"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Linear Current Density Converter</h1>
        <p className="text-muted-foreground">Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering.</p>
      </div>
      <UnitConverterBase
        title="Linear Current Density Converter"
        description="Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Linear Current Density</h2>
          <p className="text-muted-foreground mb-4">
            Linear current density measures electric current per unit width across a surface or along a boundary. You express it in amperes per meter (A/m). This quantity describes current sheet distributions and surface current flow.
          </p>
          <p className="text-muted-foreground mb-4">
            Linear current density applies to thin conductors, current sheets, and boundary conditions in electromagnetic analysis. It represents current flowing per unit transverse length.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Linear Current Density Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">K = I / w</p>
            <p className="text-muted-foreground text-sm">
              Definition: Linear current density equals total current divided by width. K represents surface current density in A/m.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">B = μ₀ × K / 2</p>
            <p className="text-muted-foreground text-sm">
              Magnetic field: Field from infinite current sheet equals permeability times density divided by 2.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">n × (H₁ - H₂) = K</p>
            <p className="text-muted-foreground text-sm">
              Boundary condition: Surface current equals discontinuity in tangential magnetic field.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 10 cm wide conductor carrying 5 amperes has K = 5 A / 0.1 m = 50 A/m linear current density.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Linear Current Density Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">A/m</th>
                  <th className="border border-border p-2 text-left">mA/cm</th>
                  <th className="border border-border p-2 text-left">kA/m</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.0001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">0.001</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">10</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">0.01</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">0.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10,000</td>
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
              <h3 className="font-semibold mb-2">Electric Machine Windings</h3>
              <p className="text-muted-foreground text-sm">
                Motor and generator windings have linear current density along the air gap. Values range from 20-100 kA/m for industrial machines. Higher density increases torque but raises losses.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Busbar Design</h3>
              <p className="text-muted-foreground text-sm">
                Wide busbars distribute current across their width. Linear density determines magnetic forces between parallel bars. Proper spacing prevents excessive mechanical stress.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Printed Circuit Boards</h3>
              <p className="text-muted-foreground text-sm">
                PCB traces carry current with finite width. Linear density affects trace heating and voltage drop. Wide traces reduce density and improve current handling.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Electromagnetic Shielding</h3>
              <p className="text-muted-foreground text-sm">
                Surface currents flow on shield boundaries. Linear density determines shielding effectiveness. Apertures disrupt current flow and reduce performance.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How does linear current density differ from current density?</h3>
              <p className="text-muted-foreground text-sm">
                Linear current density has units A/m and applies to surfaces. Current density has units A/m² and applies to volumes. Linear density integrates current density through thickness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What limits linear current density in conductors?</h3>
              <p className="text-muted-foreground text-sm">
                Heating limits current density. Higher density increases resistive losses. Cooling methods and conductor material determine maximum sustainable density.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate magnetic field from current sheet?</h3>
              <p className="text-muted-foreground text-sm">
                For infinite sheet, B = μ₀K/2 on each side. Field direction follows right-hand rule. Finite sheets require integration or numerical methods.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why use linear current density in machine design?</h3>
              <p className="text-muted-foreground text-sm">
                Electric machines have windings distributed around circumference. Linear density describes ampere-conductors per meter of air gap circumference. This simplifies magnetic circuit analysis.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
