"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CementSandAggregateConverterPage() {
  const config = converterMappings["Cement-Sand-Aggregate Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Cement-Sand-Aggregate Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Cement, Sand & Aggregate Calculator</h1>
        <p className="text-muted-foreground">Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.</p>
      </div>
      <UnitConverterBase
        title="Cement, Sand & Aggregate Calculator"
        description="Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Quantity Calculations</h2>
          <p className="text-muted-foreground mb-4">
            Cement, sand, and aggregate calculations determine exact material quantities for concrete and mortar. Accurate calculations prevent material waste and ensure consistent mix quality throughout your project.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Calculation Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Dry Volume = Wet Volume × 1.54</p>
            <p>Total Parts = Cement + Sand + Aggregate</p>
            <p>Cement = (Cement Part / Total) × Dry Volume</p>
            <p>Sand = (Sand Part / Total) × Dry Volume</p>
            <p>Aggregate = (Aggregate Part / Total) × Dry Volume</p>
          </div>

          <p className="text-muted-foreground">
            Multiply wet volume by 1.54 to account for voids and shrinkage. Cement density is 1440 kg/m³. Sand density ranges from 1600-1800 kg/m³. Aggregate density is 1500-1700 kg/m³.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Densities and Conversions</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Material</th>
                  <th className="border border-border p-3 text-left">Density (kg/m³)</th>
                  <th className="border border-border p-3 text-left">Density (lb/ft³)</th>
                  <th className="border border-border p-3 text-left">Unit Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Cement (OPC)</td>
                  <td className="border border-border p-3">1440</td>
                  <td className="border border-border p-3">90</td>
                  <td className="border border-border p-3">50 kg/bag</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Sand (dry)</td>
                  <td className="border border-border p-3">1600</td>
                  <td className="border border-border p-3">100</td>
                  <td className="border border-border p-3">Variable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Sand (wet)</td>
                  <td className="border border-border p-3">1800</td>
                  <td className="border border-border p-3">112</td>
                  <td className="border border-border p-3">Variable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Aggregate (10mm)</td>
                  <td className="border border-border p-3">1500</td>
                  <td className="border border-border p-3">94</td>
                  <td className="border border-border p-3">Variable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Aggregate (20mm)</td>
                  <td className="border border-border p-3">1600</td>
                  <td className="border border-border p-3">100</td>
                  <td className="border border-border p-3">Variable</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Water</td>
                  <td className="border border-border p-3">1000</td>
                  <td className="border border-border p-3">62.4</td>
                  <td className="border border-border p-3">1 kg = 1 liter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mix Proportion Guidelines</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Concrete Mixes</p>
              <p className="text-muted-foreground">
                M10: 1:3:6 (cement:sand:aggregate)<br/>
                M15: 1:2:4 for foundations and floors<br/>
                M20: 1:1.5:3 for structural elements<br/>
                M25: 1:1:2 for heavy-duty applications
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Mortar Mixes</p>
              <p className="text-muted-foreground">
                Brick mortar: 1:4 to 1:6 (cement:sand)<br/>
                Plaster mortar: 1:3 to 1:4 (cement:sand)<br/>
                Pointing mortar: 1:2 to 1:3 (cement:sand)<br/>
                Add lime for workability
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Material Ordering</p>
              <p className="text-muted-foreground">
                Cement: Order in 50 kg bags<br/>
                Sand: Order by cubic meter or truck load<br/>
                Aggregate: Order by cubic meter or ton<br/>
                Add 10% for waste and spillage
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quantity Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: M20 Concrete (1 m³)</p>
              <p className="text-muted-foreground">
                Mix ratio: 1:1.5:3<br/>
                Dry volume: 1 × 1.54 = 1.54 m³<br/>
                Total parts: 5.5<br/>
                Cement: (1/5.5) × 1.54 × 1440 = 403 kg (8 bags)<br/>
                Sand: (1.5/5.5) × 1.54 = 0.42 m³ (672 kg)<br/>
                Aggregate: (3/5.5) × 1.54 = 0.84 m³ (1344 kg)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Brick Mortar (1 m³)</p>
              <p className="text-muted-foreground">
                Mix ratio: 1:4 (cement:sand)<br/>
                Dry volume: 1 × 1.33 = 1.33 m³<br/>
                Total parts: 5<br/>
                Cement: (1/5) × 1.33 × 1440 = 383 kg (7.7 bags)<br/>
                Sand: (4/5) × 1.33 = 1.06 m³ (1700 kg)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Floor Slab (100 sq ft × 4 inch)</p>
              <p className="text-muted-foreground">
                Wet volume: 100 × 0.33 = 33 cu ft = 0.93 m³<br/>
                Dry volume: 0.93 × 1.54 = 1.43 m³<br/>
                M15 mix (1:2:4): Cement = 5.8 bags<br/>
                Sand: 0.38 m³, Aggregate: 0.76 m³
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Quality Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Cement Selection</p>
              <p className="text-muted-foreground">
                OPC 43: General construction<br/>
                OPC 53: High strength work<br/>
                PPC: Mass concrete, marine work<br/>
                Check manufacturing date, use within 3 months
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Sand Quality</p>
              <p className="text-muted-foreground">
                Use river sand or manufactured sand<br/>
                Avoid clay and silt content<br/>
                Fineness modulus: 2.5-3.5<br/>
                Wash if salt or organic content present
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Aggregate Quality</p>
              <p className="text-muted-foreground">
                Use crushed stone or gravel<br/>
                Size: 10mm for slabs, 20mm for beams<br/>
                Clean, hard, angular particles<br/>
                Avoid flaky or elongated pieces
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Water Quality</p>
              <p className="text-muted-foreground">
                Use potable water for mixing<br/>
                pH: 6-8<br/>
                Avoid seawater for reinforced concrete<br/>
                Test if using non-potable sources
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate cement bags needed?</h3>
              <p className="text-muted-foreground">
                Calculate cement volume from mix ratio and dry volume. Divide by 0.035 m³ (volume of one 50 kg bag). Round up to nearest whole bag. Example: 0.28 m³ cement needs 8 bags.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between fine and coarse aggregate?</h3>
              <p className="text-muted-foreground">
                Fine aggregate (sand) passes 4.75 mm sieve. Coarse aggregate is retained on 4.75 mm sieve. Sand fills voids between coarse aggregate. Both are essential for strong concrete.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much sand do I need for 1 bag of cement?</h3>
              <p className="text-muted-foreground">
                For M20 (1:1.5:3): 0.053 m³ sand per bag. For M15 (1:2:4): 0.07 m³ sand per bag. For mortar (1:4): 0.14 m³ sand per bag. Adjust based on your mix ratio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why multiply volume by 1.54?</h3>
              <p className="text-muted-foreground">
                Dry materials contain voids that fill during mixing. Concrete shrinks as it sets. The 1.54 factor accounts for 54% volume increase from wet to dry state, ensuring adequate material quantities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
