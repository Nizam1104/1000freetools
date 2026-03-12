"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MomentofForcePage() {
  const config = converterMappings["Moment of Force"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Moment of Force"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Moment of Force Converter</h1>
        <p className="text-muted-foreground">Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations.</p>
      </div>
      <UnitConverterBase
        title="Moment of Force Converter"
        description="Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Moment of Force</h2>
          <p className="text-muted-foreground mb-4">
            Moment of force measures the bending or turning effect of a force about a point or axis. You express it in newton-meters (N·m). Moment of force equals force multiplied by the perpendicular distance from the point to the line of action.
          </p>
          <p className="text-muted-foreground mb-4">
            Moment of force is synonymous with torque in many contexts. In structural engineering, moment typically refers to bending moment in beams. In mechanics, moment and torque are often used interchangeably.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Moment of Force Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">M = F × d</p>
            <p className="text-muted-foreground text-sm">
              Definition: Moment equals force times perpendicular distance (moment arm). Units are N·m or lbf·ft.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">M = w × L² / 8</p>
            <p className="text-muted-foreground text-sm">
              Simply supported beam: Maximum bending moment for uniformly distributed load w over span L.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">M = P × L</p>
            <p className="text-muted-foreground text-sm">
              Cantilever beam: Maximum moment for point load P at end of cantilever length L.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">σ = M × y / I</p>
            <p className="text-muted-foreground text-sm">
              Bending stress: Stress equals moment times distance from neutral axis divided by moment of inertia.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 500 N force applied 2 m from a pivot produces M = 500 × 2 = 1,000 N·m moment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Moment Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">N·m</th>
                  <th className="border border-border p-2 text-left">lbf·ft</th>
                  <th className="border border-border p-2 text-left">kgf·m</th>
                  <th className="border border-border p-2 text-left">kgf·cm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.138</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.0141</td>
                  <td className="border border-border p-2">1.41</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1.356</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.138</td>
                  <td className="border border-border p-2">13.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.738</td>
                  <td className="border border-border p-2">0.102</td>
                  <td className="border border-border p-2">10.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">9.807</td>
                  <td className="border border-border p-2">7.23</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.0981</td>
                  <td className="border border-border p-2">0.0723</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Beam Moment Formulas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Beam Type</th>
                  <th className="border border-border p-2 text-left">Loading</th>
                  <th className="border border-border p-2 text-left">Max Moment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Simply Supported</td>
                  <td className="border border-border p-2">Center Point Load P</td>
                  <td className="border border-border p-2">PL/4</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Simply Supported</td>
                  <td className="border border-border p-2">Uniform Load w</td>
                  <td className="border border-border p-2">wL²/8</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Cantilever</td>
                  <td className="border border-border p-2">End Point Load P</td>
                  <td className="border border-border p-2">PL</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Cantilever</td>
                  <td className="border border-border p-2">Uniform Load w</td>
                  <td className="border border-border p-2">wL²/2</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Fixed-Fixed</td>
                  <td className="border border-border p-2">Center Point Load P</td>
                  <td className="border border-border p-2">PL/8</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Fixed-Fixed</td>
                  <td className="border border-border p-2">Uniform Load w</td>
                  <td className="border border-border p-2">wL²/12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Structural Beam Design</h3>
              <p className="text-muted-foreground text-sm">
                Beams resist bending moments from loads. Steel I-beams efficiently resist bending. Concrete beams require reinforcement in tension zone. Moment diagrams show variation along beam length.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Shaft Design</h3>
              <p className="text-muted-foreground text-sm">
                Rotating shafts experience bending moments from gears and pulleys. Combined with torsion, this creates complex stress states. Shaft diameter depends on allowable stress and applied moments.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Lever Systems</h3>
              <p className="text-muted-foreground text-sm">
                Levers multiply force using moment principles. Mechanical advantage equals effort arm divided by load arm. Crowbars, pliers, and seesaws all use moment principles.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Crane and Hoist Design</h3>
              <p className="text-muted-foreground text-sm">
                Crane booms experience large bending moments. Load moment equals weight times radius. Load charts specify capacity at each radius. Overloading causes structural failure.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between moment and torque?</h3>
              <p className="text-muted-foreground text-sm">
                Moment and torque are mathematically identical. Torque typically refers to twisting about an axis. Moment often refers to bending. Both use same units and formulas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is a bending moment diagram?</h3>
              <p className="text-muted-foreground text-sm">
                Bending moment diagram shows moment variation along a beam. Plot moment values at each point. Maximum moment occurs where shear force equals zero. Used for beam design.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you calculate moment arm?</h3>
              <p className="text-muted-foreground text-sm">
                Moment arm is perpendicular distance from pivot to force line of action. For angled forces, use d = r × sin(θ) where r is distance to force application point.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What causes beam failure?</h3>
              <p className="text-muted-foreground text-sm">
                Excessive bending moment causes failure. Tension side cracks in concrete. Compression side buckles in thin sections. Shear failure occurs near supports. Proper sizing prevents failure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
