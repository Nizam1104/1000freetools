"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CupstoGramsPage() {
  const config = converterMappings["Cups to Grams"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Cups to Grams"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Cups to Grams Converter</h1>
        <p className="text-muted-foreground">Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.</p>
      </div>
      <UnitConverterBase
        title="Cups to Grams Converter"
        description="Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Cup to Gram Conversions</h2>
          <p className="text-muted-foreground mb-4">Cups measure volume while grams measure weight. The conversion between them depends on ingredient density. One cup of flour weighs less than one cup of sugar because flour is less dense.</p>
          <p className="text-muted-foreground mb-4">Professional bakers use weight measurements for accuracy. Volume measurements vary based on how you pack ingredients. Weight measurements stay consistent every time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Ingredient Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Ingredient</th>
                  <th className="text-left py-3 px-4 font-medium">1 Cup (grams)</th>
                  <th className="text-left py-3 px-4 font-medium">1/2 Cup (grams)</th>
                  <th className="text-left py-3 px-4 font-medium">1/4 Cup (grams)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">All-purpose flour</td>
                  <td className="py-3 px-4">120g</td>
                  <td className="py-3 px-4">60g</td>
                  <td className="py-3 px-4">30g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Bread flour</td>
                  <td className="py-3 px-4">127g</td>
                  <td className="py-3 px-4">64g</td>
                  <td className="py-3 px-4">32g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cake flour</td>
                  <td className="py-3 px-4">115g</td>
                  <td className="py-3 px-4">58g</td>
                  <td className="py-3 px-4">29g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Granulated sugar</td>
                  <td className="py-3 px-4">200g</td>
                  <td className="py-3 px-4">100g</td>
                  <td className="py-3 px-4">50g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Brown sugar (packed)</td>
                  <td className="py-3 px-4">220g</td>
                  <td className="py-3 px-4">110g</td>
                  <td className="py-3 px-4">55g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Powdered sugar</td>
                  <td className="py-3 px-4">125g</td>
                  <td className="py-3 px-4">63g</td>
                  <td className="py-3 px-4">31g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Butter</td>
                  <td className="py-3 px-4">227g</td>
                  <td className="py-3 px-4">114g</td>
                  <td className="py-3 px-4">57g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">White rice (uncooked)</td>
                  <td className="py-3 px-4">185g</td>
                  <td className="py-3 px-4">93g</td>
                  <td className="py-3 px-4">46g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Rolled oats</td>
                  <td className="py-3 px-4">90g</td>
                  <td className="py-3 px-4">45g</td>
                  <td className="py-3 px-4">23g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cocoa powder</td>
                  <td className="py-3 px-4">85g</td>
                  <td className="py-3 px-4">43g</td>
                  <td className="py-3 px-4">21g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Honey</td>
                  <td className="py-3 px-4">340g</td>
                  <td className="py-3 px-4">170g</td>
                  <td className="py-3 px-4">85g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Milk</td>
                  <td className="py-3 px-4">245g</td>
                  <td className="py-3 px-4">123g</td>
                  <td className="py-3 px-4">61g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conversion Formula</h2>
          <p className="text-muted-foreground mb-4">To convert cups to grams, multiply the cup measurement by the ingredient density in grams per cup.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            Grams = Cups × Density (g/cup)
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 2 cups of all-purpose flour to grams</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            2 cups × 120 g/cup = 240 grams
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Use Weight Measurements in Baking</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Weight measurements eliminate packing inconsistencies</li>
            <li>Professional recipes use grams for precision</li>
            <li>Scaling recipes becomes simple multiplication</li>
            <li>Results stay consistent across different kitchens</li>
            <li>Digital scales provide accuracy to the gram</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How many grams is 1 cup of flour?</h3>
              <p className="text-muted-foreground">One cup of all-purpose flour equals 120 grams. Bread flour weighs slightly more at 127 grams per cup. Cake flour weighs less at 115 grams per cup due to its finer texture.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is 1 cup always 240 grams?</h3>
              <p className="text-muted-foreground">No. One cup of water equals approximately 240 grams. Other ingredients vary based on density. Sugar weighs 200 grams per cup while flour weighs only 120 grams per cup.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why do cup to gram conversions differ between sources?</h3>
              <p className="text-muted-foreground">Different sources use varying density values. Some measure sifted flour while others measure spooned and leveled flour. Settling during storage also affects density. Use consistent sources for best results.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Can I convert any ingredient from cups to grams?</h3>
              <p className="text-muted-foreground">Yes, you can convert any ingredient if you know its density. Dry ingredients, liquids, and semi-solids all have measurable densities. This converter includes 50+ common baking ingredients.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
