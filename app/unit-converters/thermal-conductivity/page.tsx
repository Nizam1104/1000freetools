"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThermalConductivityPage() {
  const config = converterMappings["Thermal Conductivity"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thermal Conductivity"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thermal Conductivity Converter</h1>
        <p className="text-muted-foreground">Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online thermal conductivity converter for insulation, materials, and heat transfer engineering.</p>
      </div>
      <UnitConverterBase
        title="Thermal Conductivity Converter"
        description="Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online thermal conductivity converter for insulation, materials, and heat transfer engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Thermal Conductivity</h2>
          <p className="text-muted-foreground mb-4">
            Thermal conductivity measures how well a material conducts heat. You express this property in watts per meter per kelvin (W/(m·K)) in SI units. High thermal conductivity materials like copper transfer heat quickly. Low thermal conductivity materials like foam insulate effectively.
          </p>
          <p className="text-muted-foreground">
            Building designers use thermal conductivity to select insulation materials. You calculate heat loss through walls and roofs using these values. Electronics engineers choose heat sink materials based on thermal conductivity for efficient cooling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Fourier Law of Heat Conduction</h2>
          <p className="text-muted-foreground mb-4">
            Calculate heat transfer rate using Fourier law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Q = k × A × ΔT / d</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where Q equals heat transfer rate in watts, k equals thermal conductivity, A equals cross-sectional area in square meters, ΔT equals temperature difference in kelvin, and d equals material thickness in meters.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A copper plate (k = 401 W/(m·K)) with area 0.5 m² and thickness 0.01 m has a 50°C temperature difference. The heat transfer equals:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Q = 401 × 0.5 × 50 / 0.01 = 1,002,500 W</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thermal Conductivity of Common Materials</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">W/(m·K)</th>
                  <th className="border border-border p-2 text-left">BTU/(h·ft·°F)</th>
                  <th className="border border-border p-2 text-left">Application</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Diamond</td>
                  <td className="border border-border p-2">2200</td>
                  <td className="border border-border p-2">1271</td>
                  <td className="border border-border p-2">Heat spreaders</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Silver</td>
                  <td className="border border-border p-2">429</td>
                  <td className="border border-border p-2">248</td>
                  <td className="border border-border p-2">Electronics</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Copper</td>
                  <td className="border border-border p-2">401</td>
                  <td className="border border-border p-2">232</td>
                  <td className="border border-border p-2">Heat exchangers</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">237</td>
                  <td className="border border-border p-2">137</td>
                  <td className="border border-border p-2">Heat sinks</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Steel</td>
                  <td className="border border-border p-2">50</td>
                  <td className="border border-border p-2">29</td>
                  <td className="border border-border p-2">Structural</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Glass</td>
                  <td className="border border-border p-2">1.0</td>
                  <td className="border border-border p-2">0.58</td>
                  <td className="border border-border p-2">Windows</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Water</td>
                  <td className="border border-border p-2">0.6</td>
                  <td className="border border-border p-2">0.35</td>
                  <td className="border border-border p-2">Coolant</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Wood</td>
                  <td className="border border-border p-2">0.15</td>
                  <td className="border border-border p-2">0.087</td>
                  <td className="border border-border p-2">Construction</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Fiberglass</td>
                  <td className="border border-border p-2">0.04</td>
                  <td className="border border-border p-2">0.023</td>
                  <td className="border border-border p-2">Insulation</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Polyurethane foam</td>
                  <td className="border border-border p-2">0.025</td>
                  <td className="border border-border p-2">0.014</td>
                  <td className="border border-border p-2">Insulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">R-Value and Thermal Resistance</h2>
          <p className="text-muted-foreground mb-4">
            R-value measures thermal resistance in building insulation. You calculate R-value from thermal conductivity using this formula:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">R = d / k</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where R equals thermal resistance in m²·K/W, d equals material thickness in meters, and k equals thermal conductivity in W/(m·K).
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A 0.1 m thick fiberglass insulation (k = 0.04 W/(m·K)) gives you:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">R = 0.1 / 0.04 = 2.5 m²·K/W</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Convert to imperial R-value by multiplying by 5.678. The example above equals R-14.2 in imperial units.
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
                  <td className="border border-border p-2">W/(m·K)</td>
                  <td className="border border-border p-2">0.5779</td>
                  <td className="border border-border p-2">BTU/(h·ft·°F)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">BTU/(h·ft·°F)</td>
                  <td className="border border-border p-2">1.7307</td>
                  <td className="border border-border p-2">W/(m·K)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">W/(m·K)</td>
                  <td className="border border-border p-2">0.00239</td>
                  <td className="border border-border p-2">cal/(s·cm·°C)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">cal/(s·cm·°C)</td>
                  <td className="border border-border p-2">418.68</td>
                  <td className="border border-border p-2">W/(m·K)</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">W/(cm·K)</td>
                  <td className="border border-border p-2">100</td>
                  <td className="border border-border p-2">W/(m·K)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">What material has the highest thermal conductivity</h3>
              <p className="text-muted-foreground">
                Diamond has the highest thermal conductivity at 2200 W/(m·K). This property makes diamond useful for high-performance heat spreaders in electronics. Graphene shows even higher values in laboratory settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does temperature affect thermal conductivity</h3>
              <p className="text-muted-foreground">
                Thermal conductivity changes with temperature. Metals decrease in conductivity as temperature rises. Insulation materials often increase in conductivity at higher temperatures. You should use values at your operating temperature for accurate calculations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why is air a good insulator</h3>
              <p className="text-muted-foreground">
                Air has very low thermal conductivity at 0.026 W/(m·K). Foam and fiberglass trap air in small pockets to prevent convection. This structure maximizes the insulating effect of air while minimizing heat transfer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between thermal conductivity and thermal diffusivity</h3>
              <p className="text-muted-foreground">
                Thermal conductivity measures steady-state heat transfer. Thermal diffusivity measures how quickly temperature changes propagate through a material. You calculate diffusivity by dividing conductivity by density and specific heat capacity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
