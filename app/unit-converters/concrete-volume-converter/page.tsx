"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ConcreteVolumeConverterPage() {
  const config = converterMappings["Concrete Volume Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Concrete Volume Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Concrete Volume Calculator & Converter</h1>
        <p className="text-muted-foreground">Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.</p>
      </div>
      <UnitConverterBase
        title="Concrete Volume Calculator & Converter"
        description="Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Concrete Volume Formulas</h2>
          <p className="text-muted-foreground mb-4">
            Concrete volume calculations determine the amount of concrete needed for various structural elements. Accurate calculations prevent material shortages and reduce waste on construction projects.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Volume Calculation Formulas</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Slab: Volume = Length × Width × Thickness</p>
            <p>Column: Volume = π × radius² × height</p>
            <p>Beam: Volume = Length × Width × Depth</p>
            <p>Footing: Volume = Length × Width × Depth</p>
            <p>Cylinder: Volume = π × r² × h</p>
          </div>

          <p className="text-muted-foreground">
            Always add 5-10% extra for waste, spillage, and over-excavation. Round up to nearest quarter yard when ordering ready-mix concrete.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Cubic Meters</th>
                  <th className="border border-border p-3 text-left">Cubic Feet</th>
                  <th className="border border-border p-3 text-left">Cubic Yards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 Cubic Meter</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">35.31</td>
                  <td className="border border-border p-3">1.31</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Cubic Foot</td>
                  <td className="border border-border p-3">0.0283</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">0.037</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Cubic Yard</td>
                  <td className="border border-border p-3">0.765</td>
                  <td className="border border-border p-3">27</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Liter</td>
                  <td className="border border-border p-3">0.001</td>
                  <td className="border border-border p-3">0.0353</td>
                  <td className="border border-border p-3">0.0013</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Slab Calculations</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">4-Inch Thick Slab</p>
              <p className="text-muted-foreground">
                Coverage per cubic yard: 81 sq ft<br />
                Coverage per cubic meter: 24.4 sq m<br />
                Formula: Area (sq ft) × 0.33 ft / 27 = cubic yards
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">6-Inch Thick Slab</p>
              <p className="text-muted-foreground">
                Coverage per cubic yard: 54 sq ft<br />
                Coverage per cubic meter: 16.3 sq m<br />
                Formula: Area (sq ft) × 0.5 ft / 27 = cubic yards
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Driveway Slab (5-inch)</p>
              <p className="text-muted-foreground">
                Coverage per cubic yard: 65 sq ft<br />
                Typical 2-car driveway (20×24 ft): 1.85 cubic yards<br />
                Order 2-2.5 yards with waste factor
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Concrete Volume Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Garage Slab</p>
              <p className="text-muted-foreground">
                Dimensions: 24 ft × 24 ft × 6 inches<br />
                Volume: 24 × 24 × 0.5 = 288 cubic feet<br />
                Cubic yards: 288 / 27 = 10.67<br />
                Order: 11 cubic yards (add 5% waste)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Concrete Columns</p>
              <p className="text-muted-foreground">
                4 columns, 12 inch diameter, 10 ft height<br />
                Radius: 0.5 ft<br />
                Volume per column: π × 0.5² × 10 = 7.85 cu ft<br />
                Total: 4 × 7.85 = 31.4 cu ft = 1.16 cubic yards
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Footings</p>
              <p className="text-muted-foreground">
                Perimeter footing: 120 ft × 2 ft × 1 ft<br />
                Volume: 120 × 2 × 1 = 240 cubic feet<br />
                Cubic yards: 240 / 27 = 8.89<br />
                Order: 9.5 cubic yards with waste
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Metric Slab</p>
              <p className="text-muted-foreground">
                Slab: 5 m × 4 m × 150 mm<br />
                Volume: 5 × 4 × 0.15 = 3 cubic meters<br />
                Ready-mix bags: 3 / 0.02 = 150 bags (20kg each)<br />
                Or order 3 m³ ready-mix concrete
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Order Quantities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Ready-Mix Concrete</p>
              <p className="text-muted-foreground">
                Minimum order: 1 cubic yard<br />
                Truck capacity: 8-12 cubic yards<br />
                Short load fee: applies under minimum<br />
                Delivery time: 90 minutes after batching
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Pre-Mix Bags</p>
              <p className="text-muted-foreground">
                80 lb bag: 0.6 cubic feet<br />
                60 lb bag: 0.45 cubic feet<br />
                40 lb bag: 0.3 cubic feet<br />
                50 bags = 1 cubic yard (80 lb bags)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Waste Factors</p>
              <p className="text-muted-foreground">
                Simple slabs: 5%<br />
                Complex forms: 10%<br />
                Irregular shapes: 15%<br />
                Pumped concrete: add 5%
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Concrete Strength</p>
              <p className="text-muted-foreground">
                Residential slabs: 3,000-4,000 psi<br />
                Driveways: 4,000-5,000 psi<br />
                Structural: 4,000-6,000 psi<br />
                High strength: 8,000+ psi
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate cubic yards of concrete?</h3>
              <p className="text-muted-foreground">
                Multiply length × width × thickness in feet. Divide by 27 to get cubic yards. For thickness in inches, divide by 12 first. Example: 10×10×4 inches = 10×10×0.33/27 = 1.23 cubic yards.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much concrete do I need for a 10×10 slab?</h3>
              <p className="text-muted-foreground">
                For 4-inch thickness: 10×10×0.33/27 = 1.23 cubic yards. For 6-inch thickness: 10×10×0.5/27 = 1.85 cubic yards. Order 1.5 or 2 yards respectively with waste factor.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the difference between cubic yards and cubic meters?</h3>
              <p className="text-muted-foreground">
                1 cubic yard equals 0.765 cubic meters. 1 cubic meter equals 1.31 cubic yards. US uses cubic yards for concrete orders. Most other countries use cubic meters.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many bags of concrete make a yard?</h3>
              <p className="text-muted-foreground">
                80 lb bags: 45 bags per cubic yard. 60 lb bags: 60 bags per cubic yard. 40 lb bags: 90 bags per cubic yard. Consider mixing service for large quantities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
