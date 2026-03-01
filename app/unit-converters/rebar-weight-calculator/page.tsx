"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RebarWeightCalculatorPage() {
  const config = converterMappings["Rebar Weight Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Rebar Weight Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Rebar Weight Calculator</h1>
        <p className="text-muted-foreground">Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.</p>
      </div>
      <UnitConverterBase
        title="Rebar Weight Calculator"
        description="Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Rebar Weight Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Rebar weight calculations determine the total steel weight for reinforced concrete structures. Weight depends on bar diameter, length, and quantity. Accurate calculations ensure proper structural design and cost estimation.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Rebar Weight Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Weight per foot = D² / 162 (kg/m) or D² / 533 (lb/ft)</p>
            <p>Total Weight = Weight per unit × Length × Quantity</p>
            <p>D = bar diameter in mm</p>
          </div>

          <p className="text-muted-foreground">
            Steel density is 7850 kg/m³ (490 lb/ft³). The simplified formula D²/162 provides weight in kg per meter. Imperial formula D²/533 gives weight in pounds per foot.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rebar Sizes and Weights</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Bar Size</th>
                  <th className="border border-border p-3 text-left">Diameter (mm)</th>
                  <th className="border border-border p-3 text-left">Weight (kg/m)</th>
                  <th className="border border-border p-3 text-left">Weight (lb/ft)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">#3 (10M)</td>
                  <td className="border border-border p-3">9.5</td>
                  <td className="border border-border p-3">0.56</td>
                  <td className="border border-border p-3">0.376</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#4 (15M)</td>
                  <td className="border border-border p-3">12.7</td>
                  <td className="border border-border p-3">0.99</td>
                  <td className="border border-border p-3">0.668</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#5 (20M)</td>
                  <td className="border border-border p-3">15.9</td>
                  <td className="border border-border p-3">1.55</td>
                  <td className="border border-border p-3">1.043</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#6 (25M)</td>
                  <td className="border border-border p-3">19.1</td>
                  <td className="border border-border p-3">2.24</td>
                  <td className="border border-border p-3">1.502</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#7 (30M)</td>
                  <td className="border border-border p-3">22.2</td>
                  <td className="border border-border p-3">3.04</td>
                  <td className="border border-border p-3">2.044</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#8 (35M)</td>
                  <td className="border border-border p-3">25.4</td>
                  <td className="border border-border p-3">3.97</td>
                  <td className="border border-border p-3">2.670</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#9 (45M)</td>
                  <td className="border border-border p-3">28.7</td>
                  <td className="border border-border p-3">5.06</td>
                  <td className="border border-border p-3">3.400</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">#10 (55M)</td>
                  <td className="border border-border p-3">32.3</td>
                  <td className="border border-border p-3">6.40</td>
                  <td className="border border-border p-3">4.303</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reinforcement Calculations</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Slab Reinforcement</p>
              <p className="text-muted-foreground">
                Typical slab uses #3 or #4 bars at 12-18 inch spacing. Calculate bars per direction. Add top and bottom mats for two-way reinforcement. Include lap splices of 40 bar diameters.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Beam Reinforcement</p>
              <p className="text-muted-foreground">
                Bottom bars carry tension. Top bars resist negative moments. Stirrups provide shear resistance. Typical beam uses #6-#8 main bars with #3-#4 stirrups at 6-12 inch spacing.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Column Reinforcement</p>
              <p className="text-muted-foreground">
                Vertical bars carry axial load. Ties confine concrete and prevent buckling. Typical column uses 4-8 vertical bars (#6-#10) with ties at 12-16 inch spacing.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Footing Reinforcement</p>
              <p className="text-muted-foreground">
                Bottom mat resists bending from soil pressure. Use #4-#6 bars at 8-12 inch spacing. Add top mat for large footings. Include dowels for column connections.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rebar Weight Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Slab Reinforcement</p>
              <p className="text-muted-foreground">
                Slab: 20 ft × 30 ft<br/>
                #4 bars at 12 inch spacing<br/>
                Bars needed: 60 bars × 30 ft + 30 bars × 20 ft = 2,400 ft<br/>
                Weight: 2,400 × 0.668 = 1,603 lb (727 kg)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Column Reinforcement</p>
              <p className="text-muted-foreground">
                Column: 12 ft height, 8 columns<br/>
                8 × #8 bars per column<br/>
                Total bar length: 8 × 8 × 12 = 768 ft<br/>
                Weight: 768 × 2.670 = 2,051 lb (930 kg)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Beam Reinforcement</p>
              <p className="text-muted-foreground">
                Beam: 24 ft length, 4 beams<br/>
                4 × #7 bottom bars + 2 × #6 top bars<br/>
                Bottom: 4 × 4 × 24 × 2.044 = 785 lb<br/>
                Top: 2 × 4 × 24 × 1.502 = 288 lb<br/>
                Total: 1,073 lb (487 kg)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What does the rebar number mean?</h3>
              <p className="text-muted-foreground">
                Rebar numbers represent eighths of an inch in diameter. #4 rebar is 4/8 = 1/2 inch. #8 rebar is 8/8 = 1 inch. Metric designations show diameter in millimeters directly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How long is a standard rebar?</h3>
              <p className="text-muted-foreground">
                Standard rebar length is 20 feet (6 meters) in the US. Some suppliers stock 40-foot and 60-foot lengths. Custom lengths available for large projects. Shorter pieces sold as remnants.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the lap splice length?</p>
              <p className="text-muted-foreground">
                Lap splice typically equals 40-50 bar diameters. #4 bar needs 20-25 inches of overlap. #8 bar needs 40-50 inches. Engineering specifications determine exact requirements based on concrete strength and bar grade.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate rebar for a foundation?</h3>
              <p className="text-muted-foreground">
                Measure perimeter and add interior footings. Determine bar size and spacing from plans. Calculate total linear feet. Multiply by weight per foot. Add 10% for lap splices and waste.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
