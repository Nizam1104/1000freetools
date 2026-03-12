"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RoofingSheetCoverageConverterPage() {
  const config = converterMappings["Roofing Sheet Coverage Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Roofing Sheet Coverage Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Roofing Sheet Coverage Calculator</h1>
        <p className="text-muted-foreground">Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.</p>
      </div>
      <UnitConverterBase
        title="Roofing Sheet Coverage Calculator"
        description="Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Roofing Sheet Coverage Calculation</h2>
          <p className="text-muted-foreground mb-4">
            Roofing sheet calculations determine the number of metal or corrugated sheets needed to cover a roof area. Calculations account for sheet dimensions, side laps, end laps, and roof pitch for accurate material estimates.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Coverage Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Effective Width = Sheet Width - Side Lap</p>
            <p>Effective Length = Sheet Length - End Lap</p>
            <p>Effective Area = Effective Width × Effective Length</p>
            <p>Sheets Needed = Roof Area / Effective Area</p>
          </div>

          <p className="text-muted-foreground">
            Side lap is typically 1-2 corrugations. End lap ranges from 4-12 inches depending on roof pitch. Steeper roofs require smaller end laps.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Roof Pitch Calculations</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Pitch</th>
                  <th className="border border-border p-3 text-left">Angle</th>
                  <th className="border border-border p-3 text-left">Multiplier</th>
                  <th className="border border-border p-3 text-left">Min End Lap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">2/12</td>
                  <td className="border border-border p-3">9.5°</td>
                  <td className="border border-border p-3">1.014</td>
                  <td className="border border-border p-3">12 inches</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4/12</td>
                  <td className="border border-border p-3">18.4°</td>
                  <td className="border border-border p-3">1.054</td>
                  <td className="border border-border p-3">8 inches</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">6/12</td>
                  <td className="border border-border p-3">26.6°</td>
                  <td className="border border-border p-3">1.118</td>
                  <td className="border border-border p-3">6 inches</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">8/12</td>
                  <td className="border border-border p-3">33.7°</td>
                  <td className="border border-border p-3">1.202</td>
                  <td className="border border-border p-3">4 inches</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10/12</td>
                  <td className="border border-border p-3">39.8°</td>
                  <td className="border border-border p-3">1.302</td>
                  <td className="border border-border p-3">4 inches</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12/12</td>
                  <td className="border border-border p-3">45°</td>
                  <td className="border border-border p-3">1.414</td>
                  <td className="border border-border p-3">4 inches</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mt-4">
            Roof pitch multiplier converts horizontal footprint to actual roof surface area. Steeper roofs have more surface area than their footprint suggests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Standard Sheet Sizes</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Corrugated Metal Sheets</p>
              <p className="text-muted-foreground">
                Standard width: 26-36 inches (660-914 mm)<br />
                Coverage width: 24-34 inches (after lap)<br />
                Lengths: 6, 8, 10, 12, 14, 16 feet<br />
                Thickness: 26-29 gauge
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Standing Seam Panels</p>
              <p className="text-muted-foreground">
                Width: 12-18 inches<br />
                Coverage: 12-16 inches<br />
                Lengths: Custom cut to roof length<br />
                Thickness: 22-26 gauge
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Corrugated Plastic/FRP</p>
              <p className="text-muted-foreground">
                Width: 26-50 inches<br />
                Coverage: 24-48 inches<br />
                Lengths: 8, 10, 12, 16 feet<br />
                Thickness: 0.03-0.05 inches
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Overlap Requirements</p>
              <p className="text-muted-foreground">
                Side lap: 1-2 corrugations (2-4 inches)<br />
                End lap (low slope): 8-12 inches<br />
                End lap (steep): 4-6 inches<br />
                Sealant required for laps under 6/12 pitch
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Roofing Sheet Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Simple Gable Roof</p>
              <p className="text-muted-foreground">
                Building: 30 ft × 40 ft<br />
                Roof pitch: 4/12<br />
                Sheet: 3 ft × 10 ft, 3 inch side lap<br />
                Effective width: 33 inches<br />
                Sheets per row: 40 ft / 2.75 ft = 15 sheets<br />
                Rows: 2 (both sides)<br />
                Total: 30 sheets
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Long Roof with End Lap</p>
              <p className="text-muted-foreground">
                Roof length: 50 ft<br />
                Sheet length: 12 ft<br />
                End lap: 6 inches<br />
                Effective length: 11.5 ft<br />
                Sheets per column: 50 / 11.5 = 4.35<br />
                Round up: 5 sheets per column
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Hip Roof Calculation</p>
              <p className="text-muted-foreground">
                Building: 40 ft × 40 ft square<br />
                Hip roof, 6/12 pitch<br />
                Roof area: 40 × 40 × 1.118 = 1,789 sq ft<br />
                Sheet coverage: 25 sq ft each<br />
                Sheets needed: 1,789 / 25 = 72 sheets<br />
                Add 10% waste: 79 sheets
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 4: Metric Calculation</p>
              <p className="text-muted-foreground">
                Roof: 10 m × 15 m<br />
                Sheet: 1 m × 3 m<br />
                Side lap: 80 mm<br />
                Effective width: 0.92 m<br />
                Sheets across: 10 / 0.92 = 11 sheets<br />
                Sheets down: 15 / 3 = 5 sheets<br />
                Total: 55 sheets
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Accessories and Fasteners</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Fastener Requirements</p>
              <p className="text-muted-foreground">
                Screws per sheet: 8-12<br />
                Spacing: 12-24 inches on center<br />
                Edge fastening: Closer spacing<br />
                Include 10% extra screws
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Ridge Cap</p>
              <p className="text-muted-foreground">
                Length = ridge length<br />
                Standard: 10 ft sections<br />
                Overlap: 4-6 inches<br />
                Include closure strips
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Flashing</p>
              <p className="text-muted-foreground">
                Drip edge: Perimeter length<br />
                Valley flashing: Valley length + 10%<br />
                Wall flashing: Wall intersection length<br />
                Pipe boots: Count each penetration
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Underlayment</p>
              <p className="text-muted-foreground">
                Coverage: Roof area + 10%<br />
                Rolls: 10 squares (1,000 sq ft)<br />
                Overlap: 2-4 inches<br />
                Required by most building codes
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I measure my roof for sheets?</h3>
              <p className="text-muted-foreground">
                Measure building length and width. Determine roof pitch. Calculate roof area using pitch multiplier. Divide by effective sheet coverage. Add 10% for waste and trim pieces.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the minimum roof pitch for metal roofing?</h3>
              <p className="text-muted-foreground">
                Minimum pitch is 2/12 (2 inches rise per 12 inches run) with sealed seams. 3/12 pitch recommended for standard installations. Lower pitches require special underlayment and sealing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How much overlap do roofing sheets need?</h3>
              <p className="text-muted-foreground">
                Side lap: 1-2 corrugations (2-4 inches). End lap: 4 inches for steep roofs, 6-8 inches for moderate slopes, 12 inches for low slopes. Follow manufacturer specifications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Should I order extra roofing sheets?</h3>
              <p className="text-muted-foreground">
                Order 10-15% extra for waste, trim, and mistakes. Complex roofs need more. Keep extras for future repairs. Color matching becomes difficult with different production batches.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
