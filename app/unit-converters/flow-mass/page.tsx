"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FlowMassPage() {
  const config = converterMappings["Flow - Mass"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Flow - Mass"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Mass Flow Rate Converter</h1>
        <p className="text-muted-foreground">Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing, aerospace, and industrial fluid systems.</p>
      </div>
      <UnitConverterBase
        title="Mass Flow Rate Converter"
        description="Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing, aerospace, and industrial fluid systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Mass Flow Rate</h2>
          <p className="text-muted-foreground mb-4">
            Mass flow rate measures mass passing through a cross-section per unit time. You express this property in kilograms per second (kg/s) in SI units. Common units include kg/h, lb/min, and ton/hour.
          </p>
          <p className="text-muted-foreground">
            Mass flow remains constant in steady flow regardless of temperature or pressure changes. This property makes mass flow essential for chemical reactions and combustion calculations. Process control systems use mass flow for precise material balance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mass Flow Rate Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Calculate mass flow rate from volumetric flow and density:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ṁ = ρ × Q</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where ṁ equals mass flow rate, ρ equals fluid density, and Q equals volumetric flow rate.
          </p>
          <p className="text-muted-foreground mb-4">
            Calculate from velocity and area:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ṁ = ρ × v × A</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Water (ρ = 1000 kg/m³) flows at 0.01 m³/s:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ṁ = 1000 × 0.01 = 10 kg/s = 36,000 kg/h</p>
          </div>
          <p className="text-muted-foreground mt-4">
            For gases, use ideal gas law to find density: ρ = P / (R × T). Where P equals pressure, R equals gas constant, and T equals absolute temperature.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Mass Flow Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Application</th>
                  <th className="border border-border p-2 text-left">Typical Range</th>
                  <th className="border border-border p-2 text-left">Common Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Jet engine fuel</td>
                  <td className="border border-border p-2">0.5-5 kg/s</td>
                  <td className="border border-border p-2">kg/s, lb/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Industrial boiler</td>
                  <td className="border border-border p-2">10-500 t/h</td>
                  <td className="border border-border p-2">t/h, kg/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Chemical reactor</td>
                  <td className="border border-border p-2">100-10000 kg/h</td>
                  <td className="border border-border p-2">kg/h, lb/min</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Natural gas pipeline</td>
                  <td className="border border-border p-2">10-100 kg/s</td>
                  <td className="border border-border p-2">kg/s, MMSCFD</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">HVAC refrigerant</td>
                  <td className="border border-border p-2">0.01-1 kg/s</td>
                  <td className="border border-border p-2">kg/h, lb/min</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Rocket engine</td>
                  <td className="border border-border p-2">100-3000 kg/s</td>
                  <td className="border border-border p-2">kg/s, lb/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mass Flow Measurement</h2>
          <p className="text-muted-foreground mb-4">
            Coriolis flow meters measure mass flow directly using fluid inertia effects. These meters achieve high accuracy independent of fluid properties. You find Coriolis meters in custody transfer and batching applications.
          </p>
          <p className="text-muted-foreground mb-4">
            Thermal mass flow meters measure heat transfer from heated elements. Gas flow carries away heat proportional to mass flow rate. These meters work well for low flow gas applications.
          </p>
          <p className="text-muted-foreground">
            Differential pressure meters calculate mass flow from pressure drop across restrictions. You multiply volumetric flow by measured density. Orifice plates, venturi tubes, and flow nozzles use this principle.
          </p>
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
                  <td className="border border-border p-2">kg/s</td>
                  <td className="border border-border p-2">3600</td>
                  <td className="border border-border p-2">kg/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">kg/s</td>
                  <td className="border border-border p-2">2.205</td>
                  <td className="border border-border p-2">lb/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kg/h</td>
                  <td className="border border-border p-2">0.0367</td>
                  <td className="border border-border p-2">lb/min</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">lb/min</td>
                  <td className="border border-border p-2">27.22</td>
                  <td className="border border-border p-2">kg/h</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">t/h</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">kg/h</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">g/s</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">kg/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why use mass flow instead of volumetric flow</h3>
              <p className="text-muted-foreground">
                Mass flow accounts for density changes with temperature and pressure. Chemical reactions depend on mass, not volume. Gas compressibility makes volumetric flow unreliable for process control.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert standard flow to mass flow</h3>
              <p className="text-muted-foreground">
                Multiply standard volumetric flow by density at standard conditions. For natural gas at standard conditions, use 0.717 kg/m³. Adjust for actual gas composition using specific gravity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is MMSCFD in gas flow measurement</h3>
              <p className="text-muted-foreground">
                MMSCFD means million standard cubic feet per day. This unit measures large gas flows in pipelines. Convert to mass flow using gas density at standard conditions (typically 0.045 lb/ft³ for natural gas).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does temperature affect mass flow measurement</h3>
              <p className="text-muted-foreground">
                True mass flow meters are unaffected by temperature. Volumetric meters require temperature compensation. Density decreases with temperature, so same mass flow gives higher volumetric reading at higher temperature.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
