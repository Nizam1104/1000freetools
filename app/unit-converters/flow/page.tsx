"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FlowPage() {
  const config = converterMappings["Flow"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Flow"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Volumetric Flow Rate Converter</h1>
        <p className="text-muted-foreground">Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering.</p>
      </div>
      <UnitConverterBase
        title="Volumetric Flow Rate Converter"
        description="Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Volumetric Flow Rate</h2>
          <p className="text-muted-foreground mb-4">
            Volumetric flow rate measures fluid volume passing through a cross-section per unit time. You express this property in cubic meters per second (m³/s) in SI units. Common units include liters per minute, gallons per minute (GPM), and cubic feet per minute (CFM).
          </p>
          <p className="text-muted-foreground">
            Engineers use flow rate to size pipes, pumps, and valves. HVAC professionals calculate air flow for ventilation systems. Process engineers monitor flow rates for quality control and efficiency optimization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Flow Rate Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Calculate volumetric flow rate from velocity and area:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q = v × A</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where Q equals volumetric flow rate, v equals fluid velocity, and A equals cross-sectional area.
          </p>
          <p className="text-muted-foreground mb-4">
            For a circular pipe:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q = v × π × D² / 4</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Water flows at 2 m/s through a 50 mm diameter pipe:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Q = 2 × π × (0.05)² / 4 = 0.00393 m³/s = 3.93 L/s</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Convert to mass flow rate using density: ṁ = ρ × Q. Where ṁ equals mass flow rate and ρ equals fluid density.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Flow Rate Values</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">L/min</th>
                  <th className="border border-border p-2 text-left">GPM</th>
                  <th className="border border-border p-2 text-left">m³/h</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Household faucet</td>
                  <td className="border border-border p-2">8-15</td>
                  <td className="border border-border p-2">2-4</td>
                  <td className="border border-border p-2">0.5-0.9</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Shower head</td>
                  <td className="border border-border p-2">9-19</td>
                  <td className="border border-border p-2">2.5-5</td>
                  <td className="border border-border p-2">0.5-1.1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Garden hose</td>
                  <td className="border border-border p-2">30-60</td>
                  <td className="border border-border p-2">8-16</td>
                  <td className="border border-border p-2">1.8-3.6</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Fire hydrant</td>
                  <td className="border border-border p-2">1900-3800</td>
                  <td className="border border-border p-2">500-1000</td>
                  <td className="border border-border p-2">114-228</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">HVAC air handler</td>
                  <td className="border border-border p-2">N/A</td>
                  <td className="border border-border p-2">N/A</td>
                  <td className="border border-border p-2">1700-17000 CFM</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Industrial pump</td>
                  <td className="border border-border p-2">1000-50000</td>
                  <td className="border border-border p-2">264-13200</td>
                  <td className="border border-border p-2">60-3000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Continuity Equation</h2>
          <p className="text-muted-foreground mb-4">
            For incompressible flow, mass conservation gives the continuity equation:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q1 = Q2 or v1 × A1 = v2 × A2</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Flow rate remains constant through pipe size changes. Velocity increases when area decreases. This principle governs nozzle and venturi design.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A pipe reduces from 100 mm to 50 mm diameter. If upstream velocity is 1 m/s:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">v2 = v1 × (D1/D2)² = 1 × (100/50)² = 4 m/s</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversion Factors</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">From Unit</th>
                  <th className="border border-border p-2 text-left">Multiply By</th>
                  <th className="border border-border p-2 text-left">To Get</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">m³/s</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">L/s</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">m³/s</td>
                  <td className="border border-border p-2">60000</td>
                  <td className="border border-border p-2">L/min</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">m³/h</td>
                  <td className="border border-border p-2">4.403</td>
                  <td className="border border-border p-2">GPM (US)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">GPM (US)</td>
                  <td className="border border-border p-2">0.227</td>
                  <td className="border border-border p-2">m³/h</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">CFM</td>
                  <td className="border border-border p-2">1.699</td>
                  <td className="border border-border p-2">m³/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">L/min</td>
                  <td className="border border-border p-2">0.264</td>
                  <td className="border border-border p-2">GPM (US)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I measure flow rate in a pipe</h3>
              <p className="text-muted-foreground">
                Use flow meters like orifice plates, venturi tubes, or ultrasonic sensors. Positive displacement meters work for liquids. Turbine meters suit clean fluids. Magnetic meters handle conductive liquids.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between GPM and GPM-UK</h3>
              <p className="text-muted-foreground">
                US gallon equals 3.785 liters while UK gallon equals 4.546 liters. UK GPM values are about 20 percent higher for the same flow. Always specify which gallon standard you use.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does pressure affect flow rate</h3>
              <p className="text-muted-foreground">
                Pressure difference drives flow through pipes. For laminar flow, flow rate is proportional to pressure drop. For turbulent flow, flow rate varies with square root of pressure drop.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is CFM and when is it used</h3>
              <p className="text-muted-foreground">
                CFM means cubic feet per minute. HVAC professionals use CFM for air flow rates. One CFM equals 1.699 m³/h or 0.472 L/s. Standard CFM references air at standard temperature and pressure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
