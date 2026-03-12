"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function CupstomlPage() {
  const config = converterMappings["Cups to ml"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Cups to ml"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Cups to ml Converter</h1>
        <p className="text-muted-foreground">Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project.</p>
      </div>
      <UnitConverterBase
        title="Cups to ml Converter"
        description="Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Cup to Milliliter Conversions</h2>
          <p className="text-muted-foreground mb-4">Cups and milliliters both measure volume. The US customary cup equals 236.59 milliliters. Metric recipes use milliliters for precise liquid measurements.</p>
          <p className="text-muted-foreground mb-4">Different countries use different cup standards. The US cup differs from the UK imperial cup and the metric cup. This converter uses the US customary cup standard.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Volume Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Cups</th>
                  <th className="text-left py-3 px-4 font-medium">Milliliters</th>
                  <th className="text-left py-3 px-4 font-medium">Fluid Ounces</th>
                  <th className="text-left py-3 px-4 font-medium">Tablespoons</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1/4 cup</td>
                  <td className="py-3 px-4">59 ml</td>
                  <td className="py-3 px-4">2 fl oz</td>
                  <td className="py-3 px-4">4 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1/3 cup</td>
                  <td className="py-3 px-4">79 ml</td>
                  <td className="py-3 px-4">2.7 fl oz</td>
                  <td className="py-3 px-4">5.3 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1/2 cup</td>
                  <td className="py-3 px-4">118 ml</td>
                  <td className="py-3 px-4">4 fl oz</td>
                  <td className="py-3 px-4">8 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2/3 cup</td>
                  <td className="py-3 px-4">158 ml</td>
                  <td className="py-3 px-4">5.3 fl oz</td>
                  <td className="py-3 px-4">10.7 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3/4 cup</td>
                  <td className="py-3 px-4">177 ml</td>
                  <td className="py-3 px-4">6 fl oz</td>
                  <td className="py-3 px-4">12 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1 cup</td>
                  <td className="py-3 px-4">237 ml</td>
                  <td className="py-3 px-4">8 fl oz</td>
                  <td className="py-3 px-4">16 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2 cups</td>
                  <td className="py-3 px-4">473 ml</td>
                  <td className="py-3 px-4">16 fl oz</td>
                  <td className="py-3 px-4">32 tbsp</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4 cups (1 quart)</td>
                  <td className="py-3 px-4">946 ml</td>
                  <td className="py-3 px-4">32 fl oz</td>
                  <td className="py-3 px-4">64 tbsp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Use these formulas to convert between cups and other volume units.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>ml = cups × 236.59</div>
            <div>cups = ml ÷ 236.59</div>
            <div>fl oz = cups × 8</div>
            <div>tablespoons = cups × 16</div>
            <div>liters = cups × 0.23659</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 1.5 cups to milliliters</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            1.5 cups × 236.59 = 354.89 ml
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cup Standards Around the World</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Standard</th>
                  <th className="text-left py-3 px-4 font-medium">Volume (ml)</th>
                  <th className="text-left py-3 px-4 font-medium">Region</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">US Customary Cup</td>
                  <td className="py-3 px-4">236.59 ml</td>
                  <td className="py-3 px-4">United States</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">US Legal Cup</td>
                  <td className="py-3 px-4">240 ml</td>
                  <td className="py-3 px-4">US Nutrition Labeling</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Metric Cup</td>
                  <td className="py-3 px-4">250 ml</td>
                  <td className="py-3 px-4">Australia, Canada, NZ</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Imperial Cup</td>
                  <td className="py-3 px-4">284.13 ml</td>
                  <td className="py-3 px-4">United Kingdom (old)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Japanese Cup</td>
                  <td className="py-3 px-4">200 ml</td>
                  <td className="py-3 px-4">Japan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How many milliliters are in 1 cup?</h3>
              <p className="text-muted-foreground">One US customary cup equals 236.59 milliliters. For practical cooking purposes, you can round to 237 ml or 240 ml depending on your recipe precision needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is 250 ml equal to 1 cup?</h3>
              <p className="text-muted-foreground">In metric countries like Australia and Canada, 250 ml equals 1 metric cup. In the US, 1 cup equals 236.59 ml. Check your recipe origin to use the correct standard.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I measure ml without a measuring cup?</h3>
              <p className="text-muted-foreground">Use tablespoons as a reference. One tablespoon equals 14.79 ml. A standard teaspoon holds 4.93 ml. Kitchen scales can also measure water where 1 gram equals 1 ml.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Are liquid and dry cups the same?</h3>
              <p className="text-muted-foreground">Yes, the volume measurement is identical. One cup of water equals one cup of flour in volume. However, weight differs significantly between ingredients due to density variations.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
