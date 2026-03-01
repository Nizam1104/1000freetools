"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ThermalResistancePage() {
  const config = converterMappings["Thermal Resistance"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Thermal Resistance"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Thermal Resistance Converter</h1>
        <p className="text-muted-foreground">Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design.</p>
      </div>
      <UnitConverterBase
        title="Thermal Resistance Converter"
        description="Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Thermal Resistance</h2>
          <p className="text-muted-foreground mb-4">
            Thermal resistance measures how much a material resists heat flow. You express this property in kelvin per watt (K/W) or degrees Celsius per watt (°C/W). Higher thermal resistance means better insulation. Lower thermal resistance means better heat conduction.
          </p>
          <p className="text-muted-foreground">
            Electronics engineers use thermal resistance to design heat sinks and cooling systems. You calculate junction temperatures using thermal resistance values. Building professionals specify insulation R-values which represent thermal resistance per unit area.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thermal Resistance Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate thermal resistance for conduction using this formula:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">R = d / (k × A)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where R equals thermal resistance in K/W, d equals material thickness in meters, k equals thermal conductivity in W/(m·K), and A equals cross-sectional area in square meters.
          </p>
          <p className="text-muted-foreground mb-4">
            You can also calculate thermal resistance from temperature difference and heat flow:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">R = ΔT / Q</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where ΔT equals temperature difference in kelvin and Q equals heat flow in watts.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A component generates 50 W and operates 40°C above ambient. The thermal resistance equals:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">R = 40 K / 50 W = 0.8 K/W</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Thermal Resistance in Electronics Cooling</h2>
          <p className="text-muted-foreground mb-4">
            Electronics datasheets specify junction-to-case and junction-to-ambient thermal resistance. You use these values to calculate maximum operating temperatures.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Component Type</th>
                  <th className="border border-border p-2 text-left">Rθj-c (K/W)</th>
                  <th className="border border-border p-2 text-left">Rθj-a (K/W)</th>
                  <th className="border border-border p-2 text-left">Max Junction Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">TO-220 Transistor</td>
                  <td className="border border-border p-2">1.5</td>
                  <td className="border border-border p-2">62</td>
                  <td className="border border-border p-2">150°C</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">TO-247 IGBT</td>
                  <td className="border border-border p-2">0.5</td>
                  <td className="border border-border p-2">40</td>
                  <td className="border border-border p-2">175°C</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">CPU Package</td>
                  <td className="border border-border p-2">0.15</td>
                  <td className="border border-border p-2">N/A</td>
                  <td className="border border-border p-2">100°C</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">LED Module</td>
                  <td className="border border-border p-2">3.0</td>
                  <td className="border border-border p-2">N/A</td>
                  <td className="border border-border p-2">125°C</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Power MOSFET</td>
                  <td className="border border-border p-2">0.8</td>
                  <td className="border border-border p-2">50</td>
                  <td className="border border-border p-2">175°C</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            Calculate junction temperature using: Tj = Ta + (Q × Rθj-a). Where Tj equals junction temperature, Ta equals ambient temperature, Q equals power dissipation, and Rθj-a equals junction-to-ambient thermal resistance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">R-Value for Building Insulation</h2>
          <p className="text-muted-foreground mb-4">
            R-value measures thermal resistance per unit area in building construction. You calculate total wall resistance by adding individual layer R-values.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Rtotal = R1 + R2 + R3 + ...</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">Thickness</th>
                  <th className="border border-border p-2 text-left">R-value (m²·K/W)</th>
                  <th className="border border-border p-2 text-left">R-value (ft²·°F·h/BTU)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Fiberglass batt</td>
                  <td className="border border-border p-2">100 mm</td>
                  <td className="border border-border p-2">2.5</td>
                  <td className="border border-border p-2">14.2</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Polyurethane foam</td>
                  <td className="border border-border p-2">50 mm</td>
                  <td className="border border-border p-2">2.0</td>
                  <td className="border border-border p-2">11.4</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Brick</td>
                  <td className="border border-border p-2">100 mm</td>
                  <td className="border border-border p-2">0.12</td>
                  <td className="border border-border p-2">0.68</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Concrete</td>
                  <td className="border border-border p-2">150 mm</td>
                  <td className="border border-border p-2">0.09</td>
                  <td className="border border-border p-2">0.51</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Drywall</td>
                  <td className="border border-border p-2">12.5 mm</td>
                  <td className="border border-border p-2">0.08</td>
                  <td className="border border-border p-2">0.45</td>
                </tr>
              </tbody>
            </table>
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
                  <td className="border border-border p-2">K/W</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">°C/W</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">K/W</td>
                  <td className="border border-border p-2">0.527</td>
                  <td className="border border-border p-2">°F·h/BTU</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">°F·h/BTU</td>
                  <td className="border border-border p-2">1.896</td>
                  <td className="border border-border p-2">K/W</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">°F·s/BTU</td>
                  <td className="border border-border p-2">0.000527</td>
                  <td className="border border-border p-2">K/W</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate total thermal resistance for multiple layers</h3>
              <p className="text-muted-foreground">
                Add the thermal resistance of each layer in series. For a wall with insulation, sheathing, and siding, you sum all individual R-values. Parallel paths like studs require weighted averaging based on area fractions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is a good thermal resistance for a CPU heat sink</h3>
              <p className="text-muted-foreground">
                Quality CPU heat sinks achieve 0.1 to 0.3 K/W thermal resistance. High-end liquid cooling systems reach below 0.1 K/W. Stock coolers typically range from 0.3 to 0.5 K/W.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why are K/W and °C/W numerically equal</h3>
              <p className="text-muted-foreground">
                A temperature difference of 1 kelvin equals a temperature difference of 1 degree Celsius. The scales have different zero points but identical step sizes. Thermal resistance uses temperature differences, so the units are interchangeable.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How does contact resistance affect thermal performance</h3>
              <p className="text-muted-foreground">
                Contact resistance occurs at interfaces between materials. Surface roughness creates air gaps that increase thermal resistance. Thermal paste and pads fill these gaps to reduce contact resistance by 10 to 100 times.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
