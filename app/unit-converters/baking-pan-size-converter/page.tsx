"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function BakingPanSizeConverterPage() {
  const config = converterMappings["Baking Pan Size Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Baking Pan Size Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Baking Pan Size Converter</h1>
        <p className="text-muted-foreground">Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins.</p>
      </div>
      <UnitConverterBase
        title="Baking Pan Size Converter"
        description="Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Baking Pan Conversions</h2>
          <p className="text-muted-foreground mb-4">Pan size affects baking time and texture. Using the wrong size causes overflow or dry results. Volume calculations help you find the right substitute pan.</p>
          <p className="text-muted-foreground mb-4">Calculate pan volume by multiplying length times width times depth for rectangular pans. For round pans, use pi times radius squared times depth.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Pan Size Equivalents</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Pan Type</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-left py-3 px-4 font-medium">Volume (cups)</th>
                  <th className="text-left py-3 px-4 font-medium">Volume (liters)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Square</td>
                  <td className="py-3 px-4">8 x 8 inch</td>
                  <td className="py-3 px-4">8 cups</td>
                  <td className="py-3 px-4">1.9 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Square</td>
                  <td className="py-3 px-4">9 x 9 inch</td>
                  <td className="py-3 px-4">10 cups</td>
                  <td className="py-3 px-4">2.4 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Square</td>
                  <td className="py-3 px-4">10 x 10 inch</td>
                  <td className="py-3 px-4">12 cups</td>
                  <td className="py-3 px-4">2.8 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Rectangular</td>
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">14-15 cups</td>
                  <td className="py-3 px-4">3.3-3.5 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Rectangular</td>
                  <td className="py-3 px-4">8 x 12 inch</td>
                  <td className="py-3 px-4">10 cups</td>
                  <td className="py-3 px-4">2.4 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Round</td>
                  <td className="py-3 px-4">8 inch</td>
                  <td className="py-3 px-4">6 cups</td>
                  <td className="py-3 px-4">1.4 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Round</td>
                  <td className="py-3 px-4">9 inch</td>
                  <td className="py-3 px-4">8 cups</td>
                  <td className="py-3 px-4">1.9 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Round</td>
                  <td className="py-3 px-4">10 inch</td>
                  <td className="py-3 px-4">10-11 cups</td>
                  <td className="py-3 px-4">2.4-2.6 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Springform</td>
                  <td className="py-3 px-4">9 inch</td>
                  <td className="py-3 px-4">10 cups</td>
                  <td className="py-3 px-4">2.4 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Springform</td>
                  <td className="py-3 px-4">10 inch</td>
                  <td className="py-3 px-4">12 cups</td>
                  <td className="py-3 px-4">2.8 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Loaf</td>
                  <td className="py-3 px-4">8 x 4 inch</td>
                  <td className="py-3 px-4">4 cups</td>
                  <td className="py-3 px-4">0.9 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Loaf</td>
                  <td className="py-3 px-4">9 x 5 inch</td>
                  <td className="py-3 px-4">6 cups</td>
                  <td className="py-3 px-4">1.4 L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Bundt</td>
                  <td className="py-3 px-4">Standard</td>
                  <td className="py-3 px-4">10-12 cups</td>
                  <td className="py-3 px-4">2.4-2.8 L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume Calculation Formulas</h2>
          <p className="text-muted-foreground mb-4">Calculate pan volume to find suitable substitutes.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Rectangular: Volume = Length × Width × Depth</div>
            <div>Round: Volume = π × Radius² × Depth</div>
            <div>Round: Volume = π × (Diameter/2)² × Depth</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating volume of a 9 x 13 inch pan with 2 inch depth</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            9 × 13 × 2 = 234 cubic inches = 15.3 cups
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recipe Scaling Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Original Pan</th>
                  <th className="text-left py-3 px-4 font-medium">New Pan</th>
                  <th className="text-left py-3 px-4 font-medium">Multiply Recipe By</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">8 inch round</td>
                  <td className="py-3 px-4">9 inch round</td>
                  <td className="py-3 px-4">1.3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8 inch round</td>
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">2.5</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9 inch round</td>
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">1.8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8 x 8 inch square</td>
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">1.8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9 x 9 inch square</td>
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">1.4</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9 x 13 inch</td>
                  <td className="py-3 px-4">8 x 8 inch square</td>
                  <td className="py-3 px-4">0.55</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Baking Time Adjustments</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Thinner batter layers bake faster. Reduce time by 5-10 minutes for larger pans.</li>
            <li>Deeper pans need longer baking. Add 5-15 minutes for smaller, deeper pans.</li>
            <li>Check doneness 5 minutes before the original recipe time.</li>
            <li>Use a toothpick or cake tester to check the center.</li>
            <li>Reduce oven temperature by 25°F when using darker metal pans.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I use a 9 x 13 pan instead of two 9 inch rounds?</h3>
              <p className="text-muted-foreground">Yes. A 9 x 13 pan has similar volume to two 9 inch round pans. Bake as a sheet cake and adjust time. Check for doneness 5-10 minutes earlier.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What if my pan is slightly larger than the recipe calls for?</h3>
              <p className="text-muted-foreground">Your baked goods will be thinner and bake faster. Reduce baking time by 5-10 minutes. Expect a slightly different texture with more surface browning.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I convert a recipe for a different pan shape?</h3>
              <p className="text-muted-foreground">Calculate both pan volumes. Divide new pan volume by original pan volume. Multiply all ingredients by this factor. Adjust baking time based on batter depth.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Does pan material affect baking?</h3>
              <p className="text-muted-foreground">Yes. Dark pans absorb more heat and brown faster. Glass pans retain heat longer. Light aluminum pans reflect heat. Reduce temperature 25°F for dark or glass pans.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
