"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HeatDensityPage() {
  const config = converterMappings["Heat Density"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Heat Density"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Heat Density Converter</h1>
        <p className="text-muted-foreground">Convert heat density units including J/m³, BTU/ft³, and cal/cm³. Free online heat density converter for combustion engineering, fuel analysis, and thermodynamic systems.</p>
      </div>
      <UnitConverterBase
        title="Heat Density Converter"
        description="Convert heat density units including J/m³, BTU/ft³, and cal/cm³. Free online heat density converter for combustion engineering, fuel analysis, and thermodynamic systems."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Heat Density</h2>
          <p className="text-muted-foreground mb-4">
            Heat density measures energy content per unit volume. You express this property in joules per cubic meter (J/m³) in SI units. Engineers use heat density to compare fuel energy storage and combustion system design.
          </p>
          <p className="text-muted-foreground">
            Heat density differs from specific energy which uses mass basis. Volume-based measurements matter for storage tank sizing and pipeline capacity. Gas utilities bill customers using heat density calculations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Heat Density Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate heat density from total energy and volume:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">u = Q / V</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where u equals heat density, Q equals total heat energy in joules, and V equals volume in cubic meters.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A natural gas sample contains 37 megajoules in one cubic meter. The heat density equals:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">u = 37,000,000 J / 1 m³ = 37 MJ/m³</p>
          </div>
          <p className="text-muted-foreground mt-4">
            Convert to mass-based specific energy using density: e = u / ρ. Where e equals specific energy and ρ equals mass density.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Heat Density of Common Fuels</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Fuel</th>
                  <th className="border border-border p-2 text-left">MJ/m³</th>
                  <th className="border border-border p-2 text-left">BTU/ft³</th>
                  <th className="border border-border p-2 text-left">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Gasoline</td>
                  <td className="border border-border p-2">34,200</td>
                  <td className="border border-border p-2">917,000</td>
                  <td className="border border-border p-2">Liquid</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Diesel</td>
                  <td className="border border-border p-2">38,600</td>
                  <td className="border border-border p-2">1,035,000</td>
                  <td className="border border-border p-2">Liquid</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Natural gas</td>
                  <td className="border border-border p-2">37</td>
                  <td className="border border-border p-2">990</td>
                  <td className="border border-border p-2">Gas (STP)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Propane (liquid)</td>
                  <td className="border border-border p-2">25,300</td>
                  <td className="border border-border p-2">678,000</td>
                  <td className="border border-border p-2">Liquid</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Hydrogen (gas)</td>
                  <td className="border border-border p-2">12</td>
                  <td className="border border-border p-2">320</td>
                  <td className="border border-border p-2">Gas (STP)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Hydrogen (liquid)</td>
                  <td className="border border-border p-2">8,500</td>
                  <td className="border border-border p-2">228,000</td>
                  <td className="border border-border p-2">Liquid</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Coal (anthracite)</td>
                  <td className="border border-border p-2">27,000,000</td>
                  <td className="border border-border p-2">724,000,000</td>
                  <td className="border border-border p-2">Solid</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Wood (dry)</td>
                  <td className="border border-border p-2">6,000,000</td>
                  <td className="border border-border p-2">161,000,000</td>
                  <td className="border border-border p-2">Solid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications in Engineering</h2>
          <p className="text-muted-foreground mb-4">
            Combustion engineers use heat density to size fuel storage tanks. You calculate required volume from energy demand and fuel heat density. Pipeline designers determine flow rates using heat density and energy transport requirements.
          </p>
          <p className="text-muted-foreground mb-4">
            HVAC professionals calculate heating capacity from gas flow rate and heat density. Building codes specify minimum heat density for natural gas distribution. You verify fuel quality using heat density measurements.
          </p>
          <p className="text-muted-foreground">
            Battery designers compare volumetric energy density for electric vehicles. Higher heat density enables longer range in limited space. You balance energy density with safety and cost requirements.
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
                  <td className="border border-border p-2">J/m³</td>
                  <td className="border border-border p-2">2.684×10⁻⁵</td>
                  <td className="border border-border p-2">BTU/ft³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">BTU/ft³</td>
                  <td className="border border-border p-2">37,259</td>
                  <td className="border border-border p-2">J/m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">J/m³</td>
                  <td className="border border-border p-2">2.39×10⁻⁷</td>
                  <td className="border border-border p-2">cal/cm³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">cal/cm³</td>
                  <td className="border border-border p-2">4,184,000</td>
                  <td className="border border-border p-2">J/m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">MJ/m³</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">J/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How does heat density differ from calorific value</h3>
              <p className="text-muted-foreground">
                Heat density uses volume basis while calorific value typically uses mass basis. Both measure energy content. You select the appropriate measure based on whether volume or mass constraints dominate your application.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why does natural gas heat density vary</h3>
              <p className="text-muted-foreground">
                Natural gas composition varies by source. Methane content ranges from 70 to 95 percent. Higher hydrocarbons increase heat density. Utilities adjust billing factors based on measured heat density.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What affects liquid fuel heat density</h3>
              <p className="text-muted-foreground">
                Temperature changes liquid fuel density and heat density. Additives and blending components alter energy content. You measure heat density at standard temperature for consistent comparisons.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert between volumetric and gravimetric energy density</h3>
              <p className="text-muted-foreground">
                Multiply volumetric density by specific volume or divide by mass density. For gasoline at 750 kg/m³, divide 34,200 MJ/m³ by 750 to get 45.6 MJ/kg specific energy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
