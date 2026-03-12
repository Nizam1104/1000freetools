"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TorquePage() {
  const config = converterMappings["Torque"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Torque"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Torque Converter</h1>
        <p className="text-muted-foreground">Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering.</p>
      </div>
      <UnitConverterBase
        title="Torque Converter"
        description="Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Torque</h2>
          <p className="text-muted-foreground mb-4">
            Torque measures the rotational force that causes angular acceleration. You express torque in newton-meters (N·m) or pound-feet (lbf·ft). Torque equals force multiplied by the perpendicular distance from the rotation axis.
          </p>
          <p className="text-muted-foreground mb-4">
            Torque is a vector quantity with direction along the rotation axis. Right-hand rule determines direction: curl fingers from force toward axis, thumb points along torque vector.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Torque Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">τ = F × r × sin(θ)</p>
            <p className="text-muted-foreground text-sm">
              Definition: Torque equals force times lever arm times sine of angle between them. Maximum torque occurs at 90 degrees.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">τ = I × α</p>
            <p className="text-muted-foreground text-sm">
              Rotational dynamics: Torque equals moment of inertia times angular acceleration. Rotational equivalent of F = m × a.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">P = τ × ω</p>
            <p className="text-muted-foreground text-sm">
              Power relationship: Power equals torque times angular velocity. Use rad/s for angular velocity.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Applying 100 N force at end of 0.5 m wrench produces τ = 100 × 0.5 = 50 N·m torque.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Torque Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">N·m</th>
                  <th className="border border-border p-2 text-left">lbf·ft</th>
                  <th className="border border-border p-2 text-left">lbf·in</th>
                  <th className="border border-border p-2 text-left">kgf·m</th>
                  <th className="border border-border p-2 text-left">kgf·cm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">0.01356</td>
                  <td className="border border-border p-2">0.01</td>
                  <td className="border border-border p-2">0.12</td>
                  <td className="border border-border p-2">0.00138</td>
                  <td className="border border-border p-2">0.138</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.113</td>
                  <td className="border border-border p-2">0.0833</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.0115</td>
                  <td className="border border-border p-2">1.15</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.738</td>
                  <td className="border border-border p-2">8.85</td>
                  <td className="border border-border p-2">0.102</td>
                  <td className="border border-border p-2">10.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1.356</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">12</td>
                  <td className="border border-border p-2">0.138</td>
                  <td className="border border-border p-2">13.8</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">9.807</td>
                  <td className="border border-border p-2">7.23</td>
                  <td className="border border-border p-2">86.8</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Automotive Torque Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">Torque (N·m)</th>
                  <th className="border border-border p-2 text-left">Torque (lbf·ft)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Spark Plugs</td>
                  <td className="border border-border p-2">20-30</td>
                  <td className="border border-border p-2">15-22</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Wheel Lug Nuts</td>
                  <td className="border border-border p-2">80-150</td>
                  <td className="border border-border p-2">60-110</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Cylinder Head Bolts</td>
                  <td className="border border-border p-2">60-120</td>
                  <td className="border border-border p-2">45-90</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Small Car Engine</td>
                  <td className="border border-border p-2">100-200</td>
                  <td className="border border-border p-2">75-150</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">V8 Engine</td>
                  <td className="border border-border p-2">400-600</td>
                  <td className="border border-border p-2">300-450</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Heavy Duty Truck</td>
                  <td className="border border-border p-2">2,000-3,000</td>
                  <td className="border border-border p-2">1,500-2,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Engine Performance</h3>
              <p className="text-muted-foreground text-sm">
                Engine torque determines acceleration capability. Peak torque occurs at mid-RPM range. Electric motors produce maximum torque from zero RPM.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Fastener Tightening</h3>
              <p className="text-muted-foreground text-sm">
                Torque wrenches ensure proper bolt tension. Under-tightening causes loosening. Over-tightening stretches or breaks fasteners. Follow manufacturer specifications.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Industrial Machinery</h3>
              <p className="text-muted-foreground text-sm">
                Gearboxes multiply torque while reducing speed. Conveyor systems require high starting torque. Servo motors provide precise torque control.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Power Tools</h3>
              <p className="text-muted-foreground text-sm">
                Impact wrenches deliver high torque pulses. Drill torque settings prevent over-tightening. Cordless tools specify torque in inch-pounds or N·m.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between torque and horsepower?</h3>
              <p className="text-muted-foreground text-sm">
                Torque measures rotational force. Horsepower measures work rate. Horsepower equals torque times RPM divided by constant. High torque at low RPM provides strong acceleration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you convert N·m to lbf·ft?</h3>
              <p className="text-muted-foreground text-sm">
                Multiply N·m by 0.7376 to get lbf·ft. One N·m equals 0.7376 lbf·ft. Conversely, multiply lbf·ft by 1.356 to get N·m.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why use a torque wrench?</h3>
              <p className="text-muted-foreground text-sm">
                Torque wrenches apply precise tightening force. Critical fasteners require specific torque for proper clamping. Prevents damage from over-tightening and failure from under-tightening.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is breakaway torque?</h3>
              <p className="text-muted-foreground text-sm">
                Breakaway torque is the torque needed to start rotation from rest. It exceeds running torque due to static friction. Important for motor sizing and clutch design.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
