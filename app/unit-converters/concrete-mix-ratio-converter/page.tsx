"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcreteMixRatioConverterPage() {
  const config = converterMappings["Concrete Mix Ratio Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concrete Mix Ratio Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Concrete Mix Ratio Calculator</h1>
        <p className="text-muted-foreground">Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs.</p>
      </div>
      <UnitConverterBase
        title="Concrete Mix Ratio Calculator"
        description="Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Concrete Mix Ratios</h2>
          <p className="text-muted-foreground mb-4">
            Concrete mix ratios define the proportions of cement, sand, and aggregate. Different grades suit different applications. M-grade designations indicate compressive strength in MPa after 28 days of curing.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Mix Ratio Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Total Parts = Cement + Sand + Aggregate</p>
            <p>Cement Volume = (Ratio Part / Total) × Dry Volume</p>
            <p>Dry Volume = Wet Volume × 1.54</p>
            <p>Cement Bags = Cement Volume / 0.035 (m³ per bag)</p>
          </div>

          <p className="text-muted-foreground">
            Dry volume is 54% more than wet volume due to voids and shrinkage. One cement bag (50 kg) equals 0.035 cubic meters or 1.25 cubic feet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Standard Mix Designs</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Grade</th>
                  <th className="border border-border p-3 text-left">Ratio</th>
                  <th className="border border-border p-3 text-left">Strength (MPa)</th>
                  <th className="border border-border p-3 text-left">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">M5</td>
                  <td className="border border-border p-3">1:5:10</td>
                  <td className="border border-border p-3">5 MPa</td>
                  <td className="border border-border p-3">Mass concrete, foundations</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M7.5</td>
                  <td className="border border-border p-3">1:4:8</td>
                  <td className="border border-border p-3">7.5 MPa</td>
                  <td className="border border-border p-3">Footings, floor bases</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M10</td>
                  <td className="border border-border p-3">1:3:6</td>
                  <td className="border border-border p-3">10 MPa</td>
                  <td className="border border-border p-3">Paths, non-structural</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M15</td>
                  <td className="border border-border p-3">1:2:4</td>
                  <td className="border border-border p-3">15 MPa</td>
                  <td className="border border-border p-3">Residential slabs, walls</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M20</td>
                  <td className="border border-border p-3">1:1.5:3</td>
                  <td className="border border-border p-3">20 MPa</td>
                  <td className="border border-border p-3">Beams, columns, slabs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M25</td>
                  <td className="border border-border p-3">1:1:2</td>
                  <td className="border border-border p-3">25 MPa</td>
                  <td className="border border-border p-3">Heavy structures, bridges</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M30</td>
                  <td className="border border-border p-3">Design Mix</td>
                  <td className="border border-border p-3">30 MPa</td>
                  <td className="border border-border p-3">High-rise, prestressed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cement Bags Calculation</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">M15 Mix (1:2:4) per Cubic Meter</p>
              <p className="text-muted-foreground">
                Total parts: 1+2+4 = 7<br/>
                Cement: 1/7 × 1.54 = 0.22 m³<br/>
                Cement bags: 0.22 / 0.035 = 6.3 bags<br/>
                Sand: 0.22 × 2 = 0.44 m³<br/>
                Aggregate: 0.22 × 4 = 0.88 m³
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">M20 Mix (1:1.5:3) per Cubic Meter</p>
              <p className="text-muted-foreground">
                Total parts: 1+1.5+3 = 5.5<br/>
                Cement: 1/5.5 × 1.54 = 0.28 m³<br/>
                Cement bags: 0.28 / 0.035 = 8 bags<br/>
                Sand: 0.28 × 1.5 = 0.42 m³<br/>
                Aggregate: 0.28 × 3 = 0.84 m³
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">M25 Mix (1:1:2) per Cubic Meter</p>
              <p className="text-muted-foreground">
                Total parts: 1+1+2 = 4<br/>
                Cement: 1/4 × 1.54 = 0.385 m³<br/>
                Cement bags: 0.385 / 0.035 = 11 bags<br/>
                Sand: 0.385 × 1 = 0.385 m³<br/>
                Aggregate: 0.385 × 2 = 0.77 m³
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Material Quantities per 50 kg Bag</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Mix Grade</th>
                  <th className="border border-border p-3 text-left">Concrete Volume</th>
                  <th className="border border-border p-3 text-left">Sand Required</th>
                  <th className="border border-border p-3 text-left">Aggregate Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">M10 (1:3:6)</td>
                  <td className="border border-border p-3">0.27 m³</td>
                  <td className="border border-border p-3">0.08 m³</td>
                  <td className="border border-border p-3">0.16 m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M15 (1:2:4)</td>
                  <td className="border border-border p-3">0.16 m³</td>
                  <td className="border border-border p-3">0.07 m³</td>
                  <td className="border border-border p-3">0.14 m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M20 (1:1.5:3)</td>
                  <td className="border border-border p-3">0.125 m³</td>
                  <td className="border border-border p-3">0.053 m³</td>
                  <td className="border border-border p-3">0.105 m³</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">M25 (1:1:2)</td>
                  <td className="border border-border p-3">0.09 m³</td>
                  <td className="border border-border p-3">0.035 m³</td>
                  <td className="border border-border p-3">0.07 m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Water-Cement Ratio</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Recommended W/C Ratios</p>
              <p className="text-muted-foreground">
                M10: 0.50-0.55<br/>
                M15: 0.45-0.50<br/>
                M20: 0.40-0.45<br/>
                M25: 0.35-0.40<br/>
                M30+: 0.30-0.35
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Water per Bag (50 kg)</p>
              <p className="text-muted-foreground">
                W/C 0.40: 20 liters<br/>
                W/C 0.45: 22.5 liters<br/>
                W/C 0.50: 25 liters<br/>
                W/C 0.55: 27.5 liters
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Workability Guidelines</p>
              <p className="text-muted-foreground">
                Low slump (25-50 mm): Foundations<br/>
                Medium slump (50-100 mm): Slabs, beams<br/>
                High slump (100-150 mm): Pumped concrete<br/>
                Add plasticizers for high workability
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Curing Requirements</p>
              <p className="text-muted-foreground">
                Minimum curing: 7 days<br/>
                Recommended: 14 days<br/>
                Optimal: 28 days<br/>
                Keep moist, protect from sun and wind
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the best mix ratio for a driveway?</h3>
              <p className="text-muted-foreground">
                Use M20 (1:1.5:3) or M25 (1:1:2) for driveways. These mixes provide 20-25 MPa strength for vehicle loads. Add fiber reinforcement for crack resistance. Minimum thickness is 4 inches for cars, 6 inches for trucks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many cement bags for 1 cubic meter of M20 concrete?</h3>
              <p className="text-muted-foreground">
                M20 concrete requires approximately 8 bags of 50 kg cement per cubic meter. This equals 400 kg of cement. Sand requirement is 0.42 m³ and aggregate is 0.84 m³.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What does M20 mean in concrete?</h3>
              <p className="text-muted-foreground">
                M20 indicates 20 MPa (2900 psi) compressive strength after 28 days of curing. The M stands for mix. M20 is standard for residential construction including slabs, beams, and columns.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much water should I add to concrete mix?</h3>
              <p className="text-muted-foreground">
                Water-cement ratio should be 0.40-0.50 for most applications. For 50 kg cement, add 20-25 liters of water. Too much water weakens concrete. Too little makes it unworkable.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
