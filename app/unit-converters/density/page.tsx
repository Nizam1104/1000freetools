"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function DensityPage() {
  const config = converterMappings["Density"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Density"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Density Converter</h1>
        <p className="text-muted-foreground">Convert density units instantly — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.</p>
      </div>
      <UnitConverterBase
        title="Density Converter"
        description="Convert density units instantly — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Is Density</h2>
          <p className="text-muted-foreground mb-4">
            Density measures mass per unit volume. You express this property in kilograms per cubic meter (kg/m³) in SI units. Common units include g/cm³, lb/ft³, and kg/L.
          </p>
          <p className="text-muted-foreground">
            Density determines whether objects float or sink. Materials less dense than water (1000 kg/m³) float. Engineers use density for weight calculations and material selection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Density Formula</h2>
          <p className="text-muted-foreground mb-4">
            Calculate density from mass and volume:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ρ = m / V</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Where ρ equals density, m equals mass, and V equals volume.
          </p>
          <p className="text-muted-foreground mb-4">
            Example: A metal block weighs 5.4 kg and occupies 2 liters:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ρ = 5.4 kg / 0.002 m³ = 2700 kg/m³</p>
          </div>
          <p className="text-muted-foreground mt-4">
            This density matches aluminum. You identify materials by comparing measured density to known values.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Density of Common Materials</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Material</th>
                  <th className="border border-border p-2 text-left">kg/m³</th>
                  <th className="border border-border p-2 text-left">g/cm³</th>
                  <th className="border border-border p-2 text-left">lb/ft³</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Air (STP)</td>
                  <td className="border border-border p-2">1.225</td>
                  <td className="border border-border p-2">0.001225</td>
                  <td className="border border-border p-2">0.0765</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Wood (pine)</td>
                  <td className="border border-border p-2">500</td>
                  <td className="border border-border p-2">0.5</td>
                  <td className="border border-border p-2">31</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Water (4°C)</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">1.0</td>
                  <td className="border border-border p-2">62.4</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Concrete</td>
                  <td className="border border-border p-2">2400</td>
                  <td className="border border-border p-2">2.4</td>
                  <td className="border border-border p-2">150</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Aluminum</td>
                  <td className="border border-border p-2">2700</td>
                  <td className="border border-border p-2">2.7</td>
                  <td className="border border-border p-2">169</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Steel</td>
                  <td className="border border-border p-2">7850</td>
                  <td className="border border-border p-2">7.85</td>
                  <td className="border border-border p-2">490</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Copper</td>
                  <td className="border border-border p-2">8960</td>
                  <td className="border border-border p-2">8.96</td>
                  <td className="border border-border p-2">559</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">Lead</td>
                  <td className="border border-border p-2">11340</td>
                  <td className="border border-border p-2">11.34</td>
                  <td className="border border-border p-2">708</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Gold</td>
                  <td className="border border-border p-2">19300</td>
                  <td className="border border-border p-2">19.3</td>
                  <td className="border border-border p-2">1205</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Specific Gravity</h2>
          <p className="text-muted-foreground mb-4">
            Specific gravity compares material density to water density. You calculate it as a dimensionless ratio:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">SG = ρmaterial / ρwater</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Specific gravity equals density in g/cm³ numerically. Aluminum with density 2.7 g/cm³ has specific gravity 2.7. Materials with SG less than 1 float in water.
          </p>
          <p className="text-muted-foreground">
            Hydrometers measure specific gravity of liquids. Battery acid SG indicates charge state. Urine SG helps diagnose medical conditions. Brewing uses SG to track fermentation.
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
                  <td className="border border-border p-2">kg/m³</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">g/cm³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">g/cm³</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">kg/m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kg/m³</td>
                  <td className="border border-border p-2">0.0624</td>
                  <td className="border border-border p-2">lb/ft³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">lb/ft³</td>
                  <td className="border border-border p-2">16.02</td>
                  <td className="border border-border p-2">kg/m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">kg/L</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">kg/m³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2">g/mL</td>
                  <td className="border border-border p-2">1000</td>
                  <td className="border border-border p-2">kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How does temperature affect density</h3>
              <p className="text-muted-foreground">
                Most materials expand when heated, decreasing density. Water reaches maximum density at 4°C. Gases show large density changes with temperature according to ideal gas law.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why does ice float on water</h3>
              <p className="text-muted-foreground">
                Water expands when freezing due to hydrogen bond crystal structure. Ice density (917 kg/m³) is less than liquid water (1000 kg/m³). This unique property protects aquatic life in winter.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I measure density of irregular objects</h3>
              <p className="text-muted-foreground">
                Weigh the object in air, then submerged in water. Volume equals displaced water volume. Divide mass by volume to get density. This is Archimedes principle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the densest natural element</h3>
              <p className="text-muted-foreground">
                Osmium has the highest natural density at 22,590 kg/m³. Iridium follows at 22,560 kg/m³. These metals are about twice as dense as lead.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
