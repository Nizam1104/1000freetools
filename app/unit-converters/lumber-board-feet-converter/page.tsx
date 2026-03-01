"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function LumberBoardFeetConverterPage() {
  const config = converterMappings["Lumber Board Feet Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Lumber Board Feet Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Lumber Board Feet Calculator</h1>
        <p className="text-muted-foreground">Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.</p>
      </div>
      <UnitConverterBase
        title="Lumber Board Feet Calculator"
        description="Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Board Foot Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Board feet measure lumber volume in the hardwood industry. One board foot equals a board 1 inch thick, 12 inches wide, and 12 inches long (144 cubic inches). This standard unit enables fair pricing across different lumber dimensions.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Board Foot Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Board Feet = (Thickness × Width × Length) / 144</p>
            <p>Dimensions in inches</p>
            <p>Or: BF = (T × W × L) / 12 (L in feet)</p>
          </div>

          <p className="text-muted-foreground">
            Thickness and width use nominal dimensions, not actual. A 2×4 measures 1.5×3.5 inches actual but calculates as 2×4 for board feet. Length uses actual measurement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Nominal vs Actual Dimensions</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Nominal Size</th>
                  <th className="border border-border p-3 text-left">Actual Size (in)</th>
                  <th className="border border-border p-3 text-left">Actual Size (mm)</th>
                  <th className="border border-border p-3 text-left">BF per Foot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1×4</td>
                  <td className="border border-border p-3">0.75 × 3.5</td>
                  <td className="border border-border p-3">19 × 89</td>
                  <td className="border border-border p-3">0.29</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1×6</td>
                  <td className="border border-border p-3">0.75 × 5.5</td>
                  <td className="border border-border p-3">19 × 140</td>
                  <td className="border border-border p-3">0.46</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2×4</td>
                  <td className="border border-border p-3">1.5 × 3.5</td>
                  <td className="border border-border p-3">38 × 89</td>
                  <td className="border border-border p-3">0.58</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2×6</td>
                  <td className="border border-border p-3">1.5 × 5.5</td>
                  <td className="border border-border p-3">38 × 140</td>
                  <td className="border border-border p-3">0.92</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2×8</td>
                  <td className="border border-border p-3">1.5 × 7.25</td>
                  <td className="border border-border p-3">38 × 184</td>
                  <td className="border border-border p-3">1.21</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2×10</td>
                  <td className="border border-border p-3">1.5 × 9.25</td>
                  <td className="border border-border p-3">38 × 235</td>
                  <td className="border border-border p-3">1.54</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2×12</td>
                  <td className="border border-border p-3">1.5 × 11.25</td>
                  <td className="border border-border p-3">38 × 286</td>
                  <td className="border border-border p-3">1.88</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4×4</td>
                  <td className="border border-border p-3">3.5 × 3.5</td>
                  <td className="border border-border p-3">89 × 89</td>
                  <td className="border border-border p-3">1.02</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hardwood Pricing</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Price per Board Foot</p>
              <p className="text-muted-foreground">
                Common hardwoods (oak, maple): $3-8 per BF<br/>
                Premium hardwoods (walnut, cherry): $8-15 per BF<br/>
                Exotic woods: $15-50+ per BF<br/>
                Softwoods typically sold by linear foot
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Volume Discounts</p>
              <p className="text-muted-foreground">
                Retail (under 100 BF): Full price<br/>
                Small wholesale (100-500 BF): 10-15% discount<br/>
                Large wholesale (500+ BF): 20-30% discount<br/>
                Full bundle pricing varies by species
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Grade Impact on Price</p>
              <p className="text-muted-foreground">
                FAS (Firsts and Seconds): Highest price, minimal defects<br/>
                Select: Good quality, small defects allowed<br/>
                #1 Common: Utility grade, more defects<br/>
                #2 Common: Economy grade, significant defects
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Board Foot Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Single Board</p>
              <p className="text-muted-foreground">
                Dimensions: 2×6×8 feet<br/>
                Board feet: (2 × 6 × 8) / 12 = 8 BF<br/>
                At $5/BF: 8 × $5 = $40
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Multiple Boards</p>
              <p className="text-muted-foreground">
                10 boards of 1×8×6 feet<br/>
                Per board: (1 × 8 × 6) / 12 = 4 BF<br/>
                Total: 10 × 4 = 40 BF<br/>
                At $6/BF: 40 × $6 = $240
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Mixed Lumber Order</p>
              <p className="text-muted-foreground">
                20 pieces 2×4×10: 20 × 6.67 = 133.4 BF<br/>
                15 pieces 2×6×8: 15 × 8 = 120 BF<br/>
                10 pieces 1×12×6: 10 × 6 = 60 BF<br/>
                Total: 313.4 board feet
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Metric Conversion</p>
              <p className="text-muted-foreground">
                Board: 50 mm × 150 mm × 3 m<br/>
                Convert to inches: 2×6×10 feet<br/>
                Board feet: (2 × 6 × 10) / 12 = 10 BF<br/>
                1 BF = 0.00236 m³
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Lumber Volume Conversions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Board Foot Equivalents</p>
              <p className="text-muted-foreground">
                1 BF = 144 cubic inches<br/>
                1 BF = 2,360 cubic cm<br/>
                1 BF = 0.00236 cubic meters<br/>
                1 cubic meter = 423.7 BF
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Thousand Board Feet</p>
              <p className="text-muted-foreground">
                1 MBF = 1,000 board feet<br/>
                Used for large commercial orders<br/>
                1 MBF ≈ 2.36 cubic meters<br/>
                Common in wholesale trading
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Cord Measurement</p>
              <p className="text-muted-foreground">
                1 cord = 128 cubic feet<br/>
                Firewood measurement<br/>
                Approximately 800-900 BF<br/>
                Varies by wood species
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Shipping Weight</p>
              <p className="text-muted-foreground">
                Oak: 4-5 lb per BF (green)<br/>
                Maple: 3-4 lb per BF (green)<br/>
                Pine: 2-3 lb per BF (green)<br/>
                Kiln-dried weighs 30-40% less
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Why use nominal instead of actual dimensions?</h3>
              <p className="text-muted-foreground">
                Board foot calculations use nominal dimensions by industry standard. This accounts for material lost during planing and drying. Pricing remains consistent regardless of actual dimensions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert board feet to linear feet?</h3>
              <p className="text-muted-foreground">
                Linear feet = (Board Feet × 12) / (Thickness × Width). For a 2×6: Linear feet = (BF × 12) / (2 × 6) = BF. One board foot of 2×6 equals one linear foot.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between hardwood and softwood measurement?</h3>
              <p className="text-muted-foreground">
                Hardwoods sell by board foot. Softwoods typically sell by linear foot or piece. Construction lumber (2×4, etc.) prices per linear foot. Hardwood pricing reflects grading and quality variations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much waste should I allow for?</h3>
              <p className="text-muted-foreground">
                Add 15-25% for waste depending on project complexity. Straight cuts need less. Complex joinery needs more. Factor in defects, grain matching, and milling losses.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
