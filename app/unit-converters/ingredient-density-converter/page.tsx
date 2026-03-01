"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function IngredientDensityConverterPage() {
  const config = converterMappings["Ingredient Density Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Ingredient Density Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Ingredient Density Converter</h1>
        <p className="text-muted-foreground">Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.</p>
      </div>
      <UnitConverterBase
        title="Ingredient Density Converter"
        description="Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Ingredient Density</h2>
          <p className="text-muted-foreground mb-4">Density measures how much mass fits in a given volume. Different ingredients have different densities. One cup of lead weighs more than one cup of feathers.</p>
          <p className="text-muted-foreground mb-4">Cooking density values help convert between volume and weight measurements. Professional kitchens use weight for consistency. Home cooks often use volume cups and spoons.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Ingredient Density Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Ingredient</th>
                  <th className="text-left py-3 px-4 font-medium">Density (g/ml)</th>
                  <th className="text-left py-3 px-4 font-medium">1 Cup (grams)</th>
                  <th className="text-left py-3 px-4 font-medium">1 Tablespoon (grams)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Water</td>
                  <td className="py-3 px-4">1.00</td>
                  <td className="py-3 px-4">237g</td>
                  <td className="py-3 px-4">14.8g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">All-purpose flour</td>
                  <td className="py-3 px-4">0.51</td>
                  <td className="py-3 px-4">120g</td>
                  <td className="py-3 px-4">7.5g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Bread flour</td>
                  <td className="py-3 px-4">0.54</td>
                  <td className="py-3 px-4">127g</td>
                  <td className="py-3 px-4">7.9g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cake flour</td>
                  <td className="py-3 px-4">0.49</td>
                  <td className="py-3 px-4">115g</td>
                  <td className="py-3 px-4">7.2g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Granulated sugar</td>
                  <td className="py-3 px-4">0.85</td>
                  <td className="py-3 px-4">200g</td>
                  <td className="py-3 px-4">12.5g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Brown sugar (packed)</td>
                  <td className="py-3 px-4">0.93</td>
                  <td className="py-3 px-4">220g</td>
                  <td className="py-3 px-4">13.8g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Powdered sugar</td>
                  <td className="py-3 px-4">0.53</td>
                  <td className="py-3 px-4">125g</td>
                  <td className="py-3 px-4">7.8g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Butter (melted)</td>
                  <td className="py-3 px-4">0.96</td>
                  <td className="py-3 px-4">227g</td>
                  <td className="py-3 px-4">14.2g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Vegetable oil</td>
                  <td className="py-3 px-4">0.92</td>
                  <td className="py-3 px-4">218g</td>
                  <td className="py-3 px-4">13.6g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Honey</td>
                  <td className="py-3 px-4">1.44</td>
                  <td className="py-3 px-4">340g</td>
                  <td className="py-3 px-4">21.2g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Milk (whole)</td>
                  <td className="py-3 px-4">1.03</td>
                  <td className="py-3 px-4">245g</td>
                  <td className="py-3 px-4">15.3g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Heavy cream</td>
                  <td className="py-3 px-4">0.99</td>
                  <td className="py-3 px-4">235g</td>
                  <td className="py-3 px-4">14.7g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cocoa powder</td>
                  <td className="py-3 px-4">0.36</td>
                  <td className="py-3 px-4">85g</td>
                  <td className="py-3 px-4">5.3g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Rolled oats</td>
                  <td className="py-3 px-4">0.38</td>
                  <td className="py-3 px-4">90g</td>
                  <td className="py-3 px-4">5.6g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">White rice (uncooked)</td>
                  <td className="py-3 px-4">0.78</td>
                  <td className="py-3 px-4">185g</td>
                  <td className="py-3 px-4">11.6g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Salt (table)</td>
                  <td className="py-3 px-4">1.20</td>
                  <td className="py-3 px-4">284g</td>
                  <td className="py-3 px-4">17.8g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Volume to Weight Conversion Formula</h2>
          <p className="text-muted-foreground mb-4">Convert volume measurements to weight using ingredient density.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Weight (g) = Volume (ml) × Density (g/ml)</div>
            <div>Volume (ml) = Weight (g) ÷ Density (g/ml)</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 250 ml of honey to grams</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            250 ml × 1.44 g/ml = 360 grams
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Density Matters in Cooking</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Accurate scaling requires weight measurements based on density</li>
            <li>Different flour types have different densities affecting recipe outcomes</li>
            <li>Liquids vary in density from water to oil to honey</li>
            <li>Packed ingredients like brown sugar have higher density than loose ingredients</li>
            <li>Temperature affects density of liquids and fats</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Why does flour density vary?</h3>
              <p className="text-muted-foreground">Flour density changes with settling, humidity, and how you measure it. Sifted flour has lower density than spooned and leveled flour. Scooping directly from the bag packs flour and increases density.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is 1 ml always equal to 1 gram?</h3>
              <p className="text-muted-foreground">Only for water at 4°C. Other ingredients have different densities. Oil weighs about 0.92 grams per ml. Honey weighs 1.44 grams per ml. Always check ingredient density for accurate conversions.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I find the density of an ingredient?</h3>
              <p className="text-muted-foreground">Measure a known volume and weigh it. Divide weight by volume to get density. Reference tables provide density values for common ingredients. This converter includes density data for 50+ ingredients.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Should I use volume or weight for baking?</h3>
              <p className="text-muted-foreground">Weight gives more consistent results. Volume measurements vary with packing and settling. Professional bakers use weight exclusively. Invest in a digital scale for best baking results.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
