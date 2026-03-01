"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function TileCalculatorPage() {
  const config = converterMappings["Tile Calculator"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Tile Calculator"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Tile Calculator</h1>
        <p className="text-muted-foreground">Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator.</p>
      </div>
      <UnitConverterBase
        title="Tile Calculator"
        description="Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tile Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">
            Tile calculations determine the number of tiles needed to cover a specific area. The calculation accounts for room dimensions, tile size, grout lines, and waste factor for cuts and breakage.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Tile Formula</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <p>Room Area = Length × Width</p>
            <p>Tile Area = Tile Length × Tile Width</p>
            <p>Tiles Needed = Room Area / Tile Area</p>
            <p>Total Tiles = Tiles Needed × (1 + Waste Factor)</p>
          </div>

          <p className="text-muted-foreground">
            Always round up to the nearest whole tile. Add 10-15% for waste on simple layouts, 15-20% for diagonal patterns or complex rooms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tile Layout Patterns</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Straight Lay Pattern</p>
              <p className="text-muted-foreground">
                Tiles align in parallel rows. Simplest pattern with least waste. Works well in rectangular rooms. Waste factor: 10%. Best for large format tiles and minimalist designs.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Diagonal Pattern</p>
              <p className="text-muted-foreground">
                Tiles set at 45-degree angle to walls. Creates visual interest and makes rooms appear larger. Requires more cuts at edges. Waste factor: 15-20%.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Running Bond Pattern</p>
              <p className="text-muted-foreground">
                Each row offset by half a tile. Common for subway tiles and brick patterns. Hides minor alignment issues. Waste factor: 10-15%. Popular for kitchen backsplashes.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Herringbone Pattern</p>
              <p className="text-muted-foreground">
                Tiles arranged in V-shaped zigzag. Elegant appearance with high visual impact. Requires precise cutting. Waste factor: 20-25%. Best for accent areas and smaller spaces.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Grout Calculation</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Tile Size</th>
                  <th className="border border-border p-3 text-left">Grout Width</th>
                  <th className="border border-border p-3 text-left">Grout per sq ft</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">1×1 inch mosaic</td>
                  <td className="border border-border p-3">1/16 inch</td>
                  <td className="border border-border p-3">0.025 lbs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">4×4 inch</td>
                  <td className="border border-border p-3">1/8 inch</td>
                  <td className="border border-border p-3">0.015 lbs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">12×12 inch</td>
                  <td className="border border-border p-3">1/8 inch</td>
                  <td className="border border-border p-3">0.008 lbs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">24×24 inch</td>
                  <td className="border border-border p-3">3/16 inch</td>
                  <td className="border border-border p-3">0.005 lbs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mt-4">
            Grout quantity depends on tile size, grout width, and tile thickness. Larger tiles require less grout per square foot. Always purchase extra grout for repairs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Waste Factor Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Simple Rooms (10% waste)</p>
              <p className="text-muted-foreground">
                Rectangular shape, no obstacles. Straight lay pattern. Standard tile sizes. Minimal cutting required.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Moderate Complexity (15% waste)</p>
              <p className="text-muted-foreground">
                Some corners or alcoves. Diagonal pattern. Multiple doorways. Medium tile sizes with some cuts.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Complex Rooms (20% waste)</p>
              <p className="text-muted-foreground">
                Many obstacles, pipes, fixtures. Herringbone or custom patterns. Irregular room shape. Large format tiles.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">High Complexity (25%+ waste)</p>
              <p className="text-muted-foreground">
                Curved walls, multiple angles. Intricate patterns. Expensive natural stone. First-time DIY installation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tile Calculation Examples</h2>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 1: Simple Floor</p>
              <p className="text-muted-foreground">
                Room: 10 ft × 12 ft = 120 sq ft<br/>
                Tile: 12×12 inch (1 sq ft each)<br/>
                Base tiles: 120 tiles<br/>
                With 10% waste: 132 tiles
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 2: Bathroom Wall</p>
              <p className="text-muted-foreground">
                Wall: 8 ft × 10 ft = 80 sq ft<br/>
                Subtract window: 3×4 ft = 12 sq ft<br/>
                Net area: 68 sq ft<br/>
                Subway tile 3×6 inch: 646 tiles + 15% waste = 743 tiles
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example 3: Diagonal Kitchen</p>
              <p className="text-muted-foreground">
                Kitchen: 15 ft × 12 ft = 180 sq ft<br/>
                Tile: 18×18 inch (2.25 sq ft)<br/>
                Base tiles: 80 tiles<br/>
                Diagonal pattern 20% waste: 96 tiles
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I measure for tiles?</h3>
              <p className="text-muted-foreground">
                Measure length and width of each area at the longest points. Multiply to get square footage. Add areas together for total. Subtract openings like windows only if they are large enough to save significant tiles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Should I buy extra tiles?</h3>
              <p className="text-muted-foreground">
                Always purchase 10-25% extra for waste and future repairs. Discontinued tiles become unavailable. Keep leftover tiles for replacing damaged ones. Store in a dry location.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What size grout lines should I use?</h3>
              <p className="text-muted-foreground">
                Rectified tiles allow 1/16 inch grout lines. Standard tiles need 1/8 inch or more. Large format tiles often require 3/16 inch. Natural stone typically needs 1/4 inch for movement accommodation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many tiles come in a box?</h3>
              <p className="text-muted-foreground">
                Box coverage varies by tile size. 12×12 inch tiles typically cover 10-15 sq ft per box. 24×24 inch tiles cover 8-12 sq ft per box. Check manufacturer specifications for exact coverage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
