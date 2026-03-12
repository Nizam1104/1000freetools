"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function SourdoughHydrationConverterPage() {
  const config = converterMappings["Sourdough Hydration Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Sourdough Hydration Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Sourdough Hydration Calculator</h1>
        <p className="text-muted-foreground">Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time.</p>
      </div>
      <UnitConverterBase
        title="Sourdough Hydration Calculator"
        description="Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Sourdough Hydration</h2>
          <p className="text-muted-foreground mb-4">Hydration percentage shows water content relative to flour weight. A 100 percent hydration dough has equal weights of flour and water. Lower hydration creates stiffer dough. Higher hydration creates wetter, more open crumb structure.</p>
          <p className="text-muted-foreground mb-4">Professional bakers use baker percentage to express recipes. All ingredients get expressed as a percentage of total flour weight. This system scales recipes easily and maintains consistent dough characteristics.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hydration Percentage Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Hydration</th>
                  <th className="text-left py-3 px-4 font-medium">Dough Consistency</th>
                  <th className="text-left py-3 px-4 font-medium">Best For</th>
                  <th className="text-left py-3 px-4 font-medium">Handling Difficulty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">50-60%</td>
                  <td className="py-3 px-4">Very stiff</td>
                  <td className="py-3 px-4">Bagels, pretzels</td>
                  <td className="py-3 px-4">Easy</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">60-65%</td>
                  <td className="py-3 px-4">Stiff</td>
                  <td className="py-3 px-4">Sandwich bread</td>
                  <td className="py-3 px-4">Easy</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">65-70%</td>
                  <td className="py-3 px-4">Standard</td>
                  <td className="py-3 px-4">Country loaves</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">70-75%</td>
                  <td className="py-3 px-4">Wet</td>
                  <td className="py-3 px-4">Artisan breads</td>
                  <td className="py-3 px-4">Moderate</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">75-80%</td>
                  <td className="py-3 px-4">Very wet</td>
                  <td className="py-3 px-4">Ciabatta, focaccia</td>
                  <td className="py-3 px-4">Challenging</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">80-85%</td>
                  <td className="py-3 px-4">Slack</td>
                  <td className="py-3 px-4">High-hydration sourdough</td>
                  <td className="py-3 px-4">Difficult</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">85%+</td>
                  <td className="py-3 px-4">Batter-like</td>
                  <td className="py-3 px-4">Experimental loaves</td>
                  <td className="py-3 px-4">Expert only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Hydration Calculation Formula</h2>
          <p className="text-muted-foreground mb-4">Calculate hydration percentage using flour and water weights.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Hydration % = (Water Weight ÷ Flour Weight) × 100</div>
            <div>Water Weight = Flour Weight × (Hydration % ÷ 100)</div>
            <div>Flour Weight = Water Weight ÷ (Hydration % ÷ 100)</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Calculating hydration for 500g flour and 375g water</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            (375 ÷ 500) × 100 = 75% hydration
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Sourdough Recipes by Hydration</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Bread Type</th>
                  <th className="text-left py-3 px-4 font-medium">Flour (g)</th>
                  <th className="text-left py-3 px-4 font-medium">Water (g)</th>
                  <th className="text-left py-3 px-4 font-medium">Hydration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Basic Sourdough</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">350</td>
                  <td className="py-3 px-4">70%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Country Loaf</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">375</td>
                  <td className="py-3 px-4">75%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Ciabatta</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">400</td>
                  <td className="py-3 px-4">80%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Baguette</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">350</td>
                  <td className="py-3 px-4">70%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Focaccia</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">425</td>
                  <td className="py-3 px-4">85%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sandwich Bread</td>
                  <td className="py-3 px-4">500</td>
                  <td className="py-3 px-4">325</td>
                  <td className="py-3 px-4">65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Starter Hydration Considerations</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Sourdough starter typically runs at 100 percent hydration (equal flour and water)</li>
            <li>Starter weight contributes both flour and water to total dough hydration</li>
            <li>Include starter flour and water in total hydration calculations</li>
            <li>Stiff starters (50-60 percent hydration) produce different flavor profiles</li>
            <li>Liquid starters (125 percent plus hydration) ferment faster</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What hydration is best for beginner sourdough?</h3>
              <p className="text-muted-foreground">Start with 65-70 percent hydration. This range produces manageable dough that still develops good oven spring. Higher hydration doughs require more skill to shape and handle.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I adjust hydration if my dough is too sticky?</h3>
              <p className="text-muted-foreground">Reduce water by 5-10 percent on your next bake. Alternatively, add small amounts of flour during mixing. Wet doughs improve with practice and proper technique.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Does flour type affect hydration?</h3>
              <p className="text-muted-foreground">Yes. Whole grain flours absorb more water than white flour. Bread flour handles higher hydration than all-purpose. Adjust hydration based on your specific flour blend.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I calculate total dough hydration with starter?</h3>
              <p className="text-muted-foreground">Add all flour sources including starter flour. Add all water sources including starter water. Divide total water by total flour and multiply by 100 for hydration percentage.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
