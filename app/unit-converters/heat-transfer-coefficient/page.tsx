"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HeatTransferCoefficientPage() {
  const config = converterMappings["Heat Transfer Coefficient"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Heat Transfer Coefficient"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Heat Transfer Coefficient Converter</h1>
        <p className="text-muted-foreground">Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection, conduction, and HVAC engineering calculations.</p>
      </div>
      <UnitConverterBase
        title="Heat Transfer Coefficient Converter"
        description="Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection, conduction, and HVAC engineering calculations."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Heat Transfer Coefficient</h2>
          <p className="text-muted-foreground mb-4">
            Heat transfer coefficient measures convective heat transfer efficiency between a surface and fluid. You express this property in watts per square meter per kelvin (W/(m²·K)) in SI units. Higher coefficients indicate more effective heat transfer.
          </p>
          <p className="text-muted-foreground">
            HVAC engineers use heat transfer coefficients to size heat exchangers and calculate building loads. Electronics designers select cooling solutions based on achievable coefficients. Process engineers optimize fluid flow to maximize heat transfer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Newton Law of Cooling</h2>
          <p className="text-muted-foreground mb-4">
            Calculate convective heat transfer using Newton law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q = h × A × (Ts - T∞)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where Q equals heat transfer rate in watts, h equals heat transfer coefficient, A equals surface area, Ts equals surface temperature, and T∞ equals fluid temperature.
          </p>
          <p className="text-muted-foreground mb-4">
            Rearrange to solve for heat transfer coefficient:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">h = Q / (A × ΔT)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A surface transfers 500 W over 2 m² with 25°C temperature difference:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">h = 500 / (2 × 25) = 10 W/(m²·K)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typical Heat Transfer Coefficients</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Condition</th>
                  <th className="border border-border p-2 text-left">W/(m²·K)</th>
                  <th className="border border-border p-2 text-left">BTU/(h·ft²·°F)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Free convection, air</td>
                  <td className="border border-border p-2">5-25</td>
                  <td className="border border-border p-2">1-5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Forced convection, air</td>
                  <td className="border border-border p-2">10-200</td>
                  <td className="border border-border p-2">2-35</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Free convection, water</td>
                  <td className="border border-border p-2">50-1000</td>
                  <td className="border border-border p-2">10-175</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Forced convection, water</td>
                  <td className="border border-border p-2">500-10,000</td>
                  <td className="border border-border p-2">90-1750</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Boiling, water</td>
                  <td className="border border-border p-2">2,500-100,000</td>
                  <td className="border border-border p-2">440-17,500</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Condensation, steam</td>
                  <td className="border border-border p-2">5,000-100,000</td>
                  <td className="border border-border p-2">880-17,500</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Dropwise condensation</td>
                  <td className="border border-border p-2">30,000-300,000</td>
                  <td className="border border-border p-2">5,300-52,800</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Overall Heat Transfer Coefficient</h2>
          <p className="text-muted-foreground mb-4">
            Calculate overall coefficient for composite walls and heat exchangers:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">1/U = 1/hi + Σ(d/k) + 1/ho</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where U equals overall coefficient, hi equals inside convection coefficient, d equals layer thickness, k equals layer conductivity, and ho equals outside convection coefficient.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A wall with inside film (hi = 10), insulation (d = 0.1 m, k = 0.04), and outside film (ho = 25):
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">1/U = 1/10 + 0.1/0.04 + 1/25 = 0.1 + 2.5 + 0.04 = 2.64</p>
            <p className="font-mono text-sm">U = 0.38 W/(m²·K)</p>
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
                  <td className="border border-border p-2">W/(m²·K)</td>
                  <td className="border border-border p-2">0.1761</td>
                  <td className="border border-border p-2">BTU/(h·ft²·°F)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">BTU/(h·ft²·°F)</td>
                  <td className="border border-border p-2">5.678</td>
                  <td className="border border-border p-2">W/(m²·K)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">W/(m²·K)</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">W/(m²·°C)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">kW/(m²·K)</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">W/(m²·K)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">cal/(s·cm²·°C)</td>
                  <td className="border border-border p-2">41,840</td>
                  <td className="border border-border p-2">W/(m²·K)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I increase heat transfer coefficient</h3>
              <p className="text-muted-foreground">
                Increase fluid velocity to enhance forced convection. Add surface fins to increase area. Use fluids with higher thermal conductivity. Induce turbulence with rough surfaces or flow disruptors.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between h and U values</h3>
              <p className="text-muted-foreground">
                h represents single-mode convection coefficient at one surface. U represents overall coefficient including all resistances in a composite system. U values are always lower than individual h values.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why are boiling coefficients so high</h3>
              <p className="text-muted-foreground">
                Phase change absorbs large amounts of energy at constant temperature. Bubble formation creates intense fluid mixing. This combination produces coefficients orders of magnitude higher than single-phase convection.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does surface roughness affect heat transfer</h3>
              <p className="text-muted-foreground">
                Rough surfaces promote turbulence and increase heat transfer coefficient. The effect depends on flow regime and roughness scale. Excessive roughness increases pressure drop without proportional heat transfer gain.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
