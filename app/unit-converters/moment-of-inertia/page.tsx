"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function MomentofInertiaPage() {
  const config = converterMappings["Moment of Inertia"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Moment of Inertia"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Moment of Inertia Converter</h1>
        <p className="text-muted-foreground">Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics.</p>
      </div>
      <UnitConverterBase
        title="Moment of Inertia Converter"
        description="Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Moment of Inertia</h2>
          <p className="text-muted-foreground mb-4">
            Moment of inertia measures an object's resistance to angular acceleration. You express it in kilogram-square meters (kg·m²). Moment of inertia depends on mass distribution relative to the rotation axis.
          </p>
          <p className="text-muted-foreground mb-4">
            Moment of inertia is the rotational equivalent of mass. Larger moment of inertia requires more torque to achieve the same angular acceleration. Mass farther from the axis contributes more to moment of inertia.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Moment of Inertia Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = Σ mᵢ × rᵢ²</p>
            <p className="text-muted-foreground text-sm">
              Definition: Moment of inertia equals sum of mass elements times squared distance from axis.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = (1/2) × m × r²</p>
            <p className="text-muted-foreground text-sm">
              Solid cylinder: Moment of inertia for solid cylinder rotating about central axis.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = (2/5) × m × r²</p>
            <p className="text-muted-foreground text-sm">
              Solid sphere: Moment of inertia for solid sphere rotating about diameter.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">I = I_cm + m × d²</p>
            <p className="text-muted-foreground text-sm">
              Parallel axis theorem: Moment about any axis equals moment about center of mass plus mass times distance squared.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 10 kg solid cylinder with 0.2 m radius has I = 0.5 × 10 × 0.2² = 0.2 kg·m².
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Moment of Inertia Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">kg·m²</th>
                  <th className="border border-border p-2 text-left">g·cm²</th>
                  <th className="border border-border p-2 text-left">lb·ft²</th>
                  <th className="border border-border p-2 text-left">lb·in²</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁷</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">2.37 × 10⁻⁶</td>
                  <td className="border border-border p-2">0.00034</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.000293</td>
                  <td className="border border-border p-2">2,926</td>
                  <td className="border border-border p-2">0.00694</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">0.0421</td>
                  <td className="border border-border p-2">421,401</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">144</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10,000,000</td>
                  <td className="border border-border p-2">23.73</td>
                  <td className="border border-border p-2">3,417</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Shapes Moment of Inertia</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Shape</th>
                  <th className="border border-border p-2 text-left">Axis</th>
                  <th className="border border-border p-2 text-left">Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Solid Cylinder</td>
                  <td className="border border-border p-2">Central</td>
                  <td className="border border-border p-2">(1/2)mr²</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hollow Cylinder</td>
                  <td className="border border-border p-2">Central</td>
                  <td className="border border-border p-2">(1/2)m(r₁² + r₂²)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Solid Sphere</td>
                  <td className="border border-border p-2">Diameter</td>
                  <td className="border border-border p-2">(2/5)mr²</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hollow Sphere</td>
                  <td className="border border-border p-2">Diameter</td>
                  <td className="border border-border p-2">(2/3)mr²</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Rectangular Plate</td>
                  <td className="border border-border p-2">Center, perpendicular</td>
                  <td className="border border-border p-2">(1/12)m(a² + b²)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Thin Rod</td>
                  <td className="border border-border p-2">Center, perpendicular</td>
                  <td className="border border-border p-2">(1/12)mL²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Flywheel Design</h3>
              <p className="text-muted-foreground text-sm">
                Flywheels store rotational energy proportional to moment of inertia. Heavy rims increase inertia for energy storage. Engine flywheels smooth power delivery.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Motor Sizing</h3>
              <p className="text-muted-foreground text-sm">
                Load inertia affects motor selection. High inertia requires more torque for acceleration. Inertia mismatch between motor and load causes control issues.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Vehicle Dynamics</h3>
              <p className="text-muted-foreground text-sm">
                Wheel inertia affects acceleration and braking. Lighter wheels improve performance. Rotating mass has greater effect than static mass.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Robotics</h3>
              <p className="text-muted-foreground text-sm">
                Robot arm inertia varies with configuration. Control systems compensate for changing inertia. Lightweight materials reduce inertia and improve response.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Why does mass distribution affect moment of inertia?</h3>
              <p className="text-muted-foreground text-sm">
                Moment of inertia depends on distance squared from axis. Mass at twice the distance contributes four times more. Concentrating mass near axis reduces inertia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do you reduce moment of inertia?</h3>
              <p className="text-muted-foreground text-sm">
                Remove mass far from the axis. Use lighter materials at outer radius. Concentrate mass near rotation center. Hollow structures often have lower inertia than solid.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is inertia ratio in motor systems?</h3>
              <p className="text-muted-foreground text-sm">
                Inertia ratio equals load inertia divided by motor inertia. Ratios below 10:1 provide good control. High ratios require gearboxes or specialized drives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does moment of inertia affect rotational energy?</h3>
              <p className="text-muted-foreground text-sm">
                Rotational kinetic energy equals (1/2) × I × ω². Higher inertia stores more energy at same speed. Flywheels maximize inertia for energy storage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
