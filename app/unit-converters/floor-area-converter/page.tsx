"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FloorAreaConverterPage() {
  const config = converterMappings["Floor Area Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Floor Area Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Floor Area Converter</h1>
        <p className="text-muted-foreground">Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.</p>
      </div>
      <UnitConverterBase
        title="Floor Area Converter"
        description="Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Floor Area Measurement</h2>
          <p className="text-muted-foreground mb-4">
            Floor area measurements determine the size of rooms, buildings, and properties. Different countries use different units. The US uses square feet while most other countries use square meters. Accurate conversions enable international real estate comparisons.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Area Calculation Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Rectangle: Area = Length × Width</p>
            <p>Square: Area = Side²</p>
            <p>Triangle: Area = 0.5 × Base × Height</p>
            <p>Circle: Area = π × radius²</p>
          </div>

          <p className="text-muted-foreground">
            Measure length and width at the longest points. For irregular rooms, divide into rectangles and calculate separately. Add all areas for total floor space.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Area Unit Conversion Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Unit</th>
                  <th className="border border-border p-3 text-left">Square Meters</th>
                  <th className="border border-border p-3 text-left">Square Feet</th>
                  <th className="border border-border p-3 text-left">Square Yards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1 Square Meter</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">10.764</td>
                  <td className="border border-border p-3">1.196</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Square Foot</td>
                  <td className="border border-border p-3">0.0929</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">0.111</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Square Yard</td>
                  <td className="border border-border p-3">0.836</td>
                  <td className="border border-border p-3">9</td>
                  <td className="border border-border p-3">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Acre</td>
                  <td className="border border-border p-3">4,047</td>
                  <td className="border border-border p-3">43,560</td>
                  <td className="border border-border p-3">4,840</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1 Hectare</td>
                  <td className="border border-border p-3">10,000</td>
                  <td className="border border-border p-3">107,639</td>
                  <td className="border border-border p-3">11,960</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Flooring Material Estimates</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Hardwood Flooring</p>
              <p className="text-muted-foreground">
                Coverage: Sold by square foot or square meter<br/>
                Waste factor: 5-10% for simple rooms<br/>
                Installation: 2-3 days for average home<br/>
                Cost: $8-15 per sq ft installed
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Tile Flooring</p>
              <p className="text-muted-foreground">
                Coverage: Boxes show sq ft coverage<br/>
                Waste factor: 10-15% for cuts<br/>
                Thin-set mortar: 1 gallon per 50-75 sq ft<br/>
                Grout: 1 lb per 50-100 sq ft
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Carpet</p>
              <p className="text-muted-foreground">
                Sold by square yard (9 sq ft = 1 sq yd)<br/>
                Standard roll width: 12 feet<br/>
                Padding: Same area as carpet<br/>
                Waste factor: 10% for seaming
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Laminate/Vinyl</p>
              <p className="text-muted-foreground">
                Coverage: Boxes show sq ft coverage<br/>
                Waste factor: 5-10%<br/>
                Underlayment: Same area as flooring<br/>
                Installation: 1-2 days for average room
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Room Size Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Standard Bedroom</p>
              <p className="text-muted-foreground">
                Dimensions: 12 ft × 14 ft<br/>
                Area: 168 sq ft<br/>
                Square meters: 168 × 0.0929 = 15.6 m²<br/>
                Square yards: 168 / 9 = 18.7 yd²
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Living Room</p>
              <p className="text-muted-foreground">
                Dimensions: 5 m × 6 m<br/>
                Area: 30 m²<br/>
                Square feet: 30 × 10.764 = 323 sq ft<br/>
                Square yards: 30 / 0.836 = 35.9 yd²
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Whole House</p>
              <p className="text-muted-foreground">
                Total: 2,500 sq ft<br/>
                Square meters: 2,500 × 0.0929 = 232 m²<br/>
                Acres: 2,500 / 43,560 = 0.057 acres<br/>
                Typical 3-4 bedroom home
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Apartment</p>
              <p className="text-muted-foreground">
                Total: 85 m²<br/>
                Square feet: 85 × 10.764 = 915 sq ft<br/>
                Typical 2-bedroom apartment<br/>
                Common in European cities
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Real Estate Conventions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">US Measurements</p>
              <p className="text-muted-foreground">
                Residential: Square feet<br/>
                Land: Acres or square feet<br/>
                Commercial: Square feet<br/>
                Apartments: Square feet
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">International Measurements</p>
              <p className="text-muted-foreground">
                Most countries: Square meters<br/>
                UK: Square meters (feet also used)<br/>
                India: Square feet (metric official)<br/>
                Japan: Tsubo (3.3 m²)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Measurement Standards</p>
              <p className="text-muted-foreground">
                ANSI Z765: US standard<br/>
                Include finished areas only<br/>
                Measure from exterior walls<br/>
                Exclude garages, porches
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Price per Area</p>
              <p className="text-muted-foreground">
                US: Price per sq ft<br/>
                International: Price per m²<br/>
                Compare: $/sq ft × 10.764 = $/m²<br/>
                Location affects price more than size
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert square feet to square meters?</h3>
              <p className="text-muted-foreground">
                Multiply square feet by 0.0929. For quick estimation, divide by 10 and add 7%. Example: 1,000 sq ft × 0.0929 = 92.9 m². Or 1,000 / 10 = 100, minus 7% = 93 m².
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert square meters to square feet?</h3>
              <p className="text-muted-foreground">
                Multiply square meters by 10.764. For quick estimation, multiply by 10 and add 8%. Example: 50 m² × 10.764 = 538 sq ft. Or 50 × 10 = 500, plus 8% = 540 sq ft.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do I include wall thickness in measurements?</h3>
              <p className="text-muted-foreground">
                Standard practice measures from exterior wall surfaces. This includes interior wall thickness in room dimensions. Some standards measure from interior surfaces. Check local conventions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much flooring should I order?</h3>
              <p className="text-muted-foreground">
                Order 5-10% extra for simple rooms. Add 10-15% for complex layouts. Diagonal patterns need 15-20% extra. Keep extras for future repairs. Different dye lots may not match.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
