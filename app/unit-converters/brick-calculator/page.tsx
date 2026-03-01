"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function BrickCalculatorPage() {
  const config = converterMappings["Brick Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Brick Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Brick Calculator</h1>
        <p className="text-muted-foreground">Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator.</p>
      </div>
      <UnitConverterBase
        title="Brick Calculator"
        description="Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Brick Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">
            Brick calculations determine the quantity of bricks needed for walls, considering brick dimensions, mortar joints, and wall thickness. Accurate calculations prevent material shortages and reduce waste.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Wall Area Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Wall Area = Length × Height</p>
            <p>Brick Area (with mortar) = (L + mortar) × (H + mortar)</p>
            <p>Bricks per sq ft = 144 / Brick Area (in inches)</p>
            <p>Total Bricks = Wall Area × Bricks per sq ft</p>
          </div>

          <p className="text-muted-foreground">
            Standard mortar joint is 3/8 inch (10 mm). Add 5-10% for waste and breakage. Double walls require twice the brick quantity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Standard Brick Sizes</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Brick Type</th>
                  <th className="border border-border p-3 text-left">Size (inches)</th>
                  <th className="border border-border p-3 text-left">Size (mm)</th>
                  <th className="border border-border p-3 text-left">Bricks/sq ft</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Modular</td>
                  <td className="border border-border p-3">3-5/8 × 2-1/4 × 7-5/8</td>
                  <td className="border border-border p-3">92 × 57 × 194</td>
                  <td className="border border-border p-3">6.55</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Standard</td>
                  <td className="border border-border p-3">3-5/8 × 2-1/4 × 8</td>
                  <td className="border border-border p-3">92 × 57 × 203</td>
                  <td className="border border-border p-3">6.26</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Jumbo Modular</td>
                  <td className="border border-border p-3">3-5/8 × 2-3/4 × 7-5/8</td>
                  <td className="border border-border p-3">92 × 70 × 194</td>
                  <td className="border border-border p-3">5.43</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Engineer</td>
                  <td className="border border-border p-3">3-5/8 × 3-5/8 × 7-5/8</td>
                  <td className="border border-border p-3">92 × 92 × 194</td>
                  <td className="border border-border p-3">4.85</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Norman</td>
                  <td className="border border-border p-3">3-5/8 × 2-1/4 × 11-5/8</td>
                  <td className="border border-border p-3">92 × 57 × 295</td>
                  <td className="border border-border p-3">4.26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mortar Calculations</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Mortar Volume Formula</p>
              <p className="text-muted-foreground">
                Mortar fills joints between bricks. Calculate volume based on joint thickness and total joint length. Typical mortar joint is 3/8 inch thick.
              </p>
              <p className="text-muted-foreground font-mono text-sm mt-2">
                Mortar per 1000 bricks ≈ 7-8 cubic feet<br/>
                Mortar per 100 bricks ≈ 0.7-0.8 cubic feet
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Mortar Mix Ratios</p>
              <p className="text-muted-foreground">
                Type M: 1 cement : 1/4 lime : 3 sand (high strength)<br/>
                Type S: 1 cement : 1/2 lime : 4.5 sand (general purpose)<br/>
                Type N: 1 cement : 1 lime : 6 sand (standard walls)<br/>
                Type O: 1 cement : 2 lime : 9 sand (interior non-load bearing)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Cement Bags Required</p>
              <p className="text-muted-foreground">
                1 cubic foot mortar requires approximately 0.5 bags cement<br/>
                1000 bricks need about 3-4 bags cement<br/>
                Add 10% extra for waste and variations
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Brick Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Garden Wall</p>
              <p className="text-muted-foreground">
                Wall: 20 ft long × 6 ft high = 120 sq ft<br/>
                Modular bricks: 6.55 bricks/sq ft<br/>
                Base quantity: 786 bricks<br/>
                With 10% waste: 865 bricks
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: House Exterior</p>
              <p className="text-muted-foreground">
                Perimeter: 120 ft × 10 ft height = 1,200 sq ft<br/>
                Subtract openings (doors/windows): 200 sq ft<br/>
                Net area: 1,000 sq ft<br/>
                Standard bricks: 6,260 + 10% waste = 6,886 bricks
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Double Brick Wall</p>
              <p className="text-muted-foreground">
                Wall: 30 ft × 8 ft = 240 sq ft<br/>
                Double wythe (two layers): 240 × 2 = 480 sq ft<br/>
                Engineer bricks: 4.85/sq ft<br/>
                Total: 2,328 + 10% = 2,561 bricks
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How many bricks do I need for a 10×10 room?</h3>
              <p className="text-muted-foreground">
                For a 10×10 room with 10 ft ceiling: Perimeter = 40 ft. Wall area = 40 × 10 = 400 sq ft. Subtract doors and windows. Using modular bricks at 6.55/sq ft, you need approximately 2,620 bricks plus 10% waste.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the standard mortar joint thickness?</h3>
              <p className="text-muted-foreground">
                Standard mortar joint is 3/8 inch (10 mm). Some applications use 1/2 inch joints. Thinner joints require more precision but use less mortar. Thicker joints accommodate size variations in handmade bricks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much does a brick weigh?</h3>
              <p className="text-muted-foreground">
                Standard modular bricks weigh 4-5 pounds each. Larger engineering bricks weigh 5-6 pounds. Weight affects shipping costs and structural load calculations. Pallets typically hold 500-600 bricks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Should I order extra bricks?</h3>
              <p className="text-muted-foreground">
                Always order 10-15% extra for cuts, breakage, and future repairs. Bricks from different batches may vary in color. Keep extras for matching repairs. Store under cover to prevent moisture damage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
