"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function VolumeDryPage() {
  const config = converterMappings["Volume - Dry"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Volume - Dry"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Dry Volume Converter</h1>
        <p className="text-muted-foreground">Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading.</p>
      </div>
      <UnitConverterBase
        title="Dry Volume Converter"
        description="Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Dry Volume Measurements</h2>
          <p className="text-muted-foreground mb-4">Dry volume measures commodities like grain, produce, and bulk goods. The US dry system differs from liquid measurements. One dry gallon equals 268.8 cubic inches while liquid gallons equal 231 cubic inches.</p>
          <p className="text-muted-foreground mb-4">Farmers and commodity traders use bushels and pecks. Home cooks rarely encounter dry gallons but may see dry pints for berries. Understanding these units helps with agricultural planning and recipe conversion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">US Dry Volume Units</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Unit</th>
                  <th className="text-left py-3 px-4 font-medium">Abbreviation</th>
                  <th className="text-left py-3 px-4 font-medium">Cubic Inches</th>
                  <th className="text-left py-3 px-4 font-medium">Liters</th>
                  <th className="text-left py-3 px-4 font-medium">Dry Pints</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Dry Pint</td>
                  <td className="py-3 px-4">pt</td>
                  <td className="py-3 px-4">33.6</td>
                  <td className="py-3 px-4">0.55</td>
                  <td className="py-3 px-4">1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Dry Quart</td>
                  <td className="py-3 px-4">qt</td>
                  <td className="py-3 px-4">67.2</td>
                  <td className="py-3 px-4">1.10</td>
                  <td className="py-3 px-4">2</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Dry Gallon</td>
                  <td className="py-3 px-4">gal</td>
                  <td className="py-3 px-4">268.8</td>
                  <td className="py-3 px-4">4.40</td>
                  <td className="py-3 px-4">8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Peck</td>
                  <td className="py-3 px-4">pk</td>
                  <td className="py-3 px-4">537.6</td>
                  <td className="py-3 px-4">8.81</td>
                  <td className="py-3 px-4">16</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Bushel</td>
                  <td className="py-3 px-4">bu</td>
                  <td className="py-3 px-4">2,150.4</td>
                  <td className="py-3 px-4">35.24</td>
                  <td className="py-3 px-4">64</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Strike</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">1,075.2</td>
                  <td className="py-3 px-4">17.62</td>
                  <td className="py-3 px-4">32</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Quarter</td>
                  <td className="py-3 px-4">qr</td>
                  <td className="py-3 px-4">8,601.6</td>
                  <td className="py-3 px-4">140.96</td>
                  <td className="py-3 px-4">256</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dry Volume Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between dry volume units using these relationships.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>2 dry pints = 1 dry quart</div>
            <div>8 dry quarts = 1 peck</div>
            <div>4 pecks = 1 bushel</div>
            <div>32 dry quarts = 1 bushel</div>
            <div>1 bushel = 2,150.42 cubic inches</div>
            <div>1 bushel = 35.24 liters</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 3 bushels to pecks and dry gallons</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Pecks: 3 bushels × 4 = 12 pecks
            Dry Gallons: 3 bushels × 8 = 24 dry gallons
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Bushel Weight Equivalents for Common Crops</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Commodity</th>
                  <th className="text-left py-3 px-4 font-medium">Pounds per Bushel</th>
                  <th className="text-left py-3 px-4 font-medium">Kilograms per Bushel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Wheat</td>
                  <td className="py-3 px-4">60 lb</td>
                  <td className="py-3 px-4">27.2 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Corn (shelled)</td>
                  <td className="py-3 px-4">56 lb</td>
                  <td className="py-3 px-4">25.4 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Soybeans</td>
                  <td className="py-3 px-4">60 lb</td>
                  <td className="py-3 px-4">27.2 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Oats</td>
                  <td className="py-3 px-4">32 lb</td>
                  <td className="py-3 px-4">14.5 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Barley</td>
                  <td className="py-3 px-4">48 lb</td>
                  <td className="py-3 px-4">21.8 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Rye</td>
                  <td className="py-3 px-4">56 lb</td>
                  <td className="py-3 px-4">25.4 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Apples</td>
                  <td className="py-3 px-4">42 lb</td>
                  <td className="py-3 px-4">19.1 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Potatoes</td>
                  <td className="py-3 px-4">60 lb</td>
                  <td className="py-3 px-4">27.2 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Tomatoes</td>
                  <td className="py-3 px-4">53 lb</td>
                  <td className="py-3 px-4">24.0 kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Peaches</td>
                  <td className="py-3 px-4">48 lb</td>
                  <td className="py-3 px-4">21.8 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dry vs Liquid Volume Comparison</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>1 US dry gallon = 4.40 liters (vs 3.79 liters for liquid gallon)</li>
            <li>1 US dry pint = 0.55 liters (vs 0.47 liters for liquid pint)</li>
            <li>Dry gallons are about 16 percent larger than liquid gallons</li>
            <li>Never substitute dry measures for liquid measures in recipes</li>
            <li>UK imperial gallons differ from both US dry and liquid gallons</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is a peck?</h3>
              <p className="text-muted-foreground">A peck equals 2 dry gallons or 8 dry quarts. The phrase "a peck of pickled peppers" comes from this unit. Pecks measure produce at farmers markets and orchards.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How many pounds are in a bushel?</h3>
              <p className="text-muted-foreground">Weight varies by commodity. Wheat and soybeans weigh 60 pounds per bushel. Corn weighs 56 pounds. Oats weigh 32 pounds. Bushel weights are standardized for grain trading.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why are dry and liquid measurements different?</h3>
              <p className="text-muted-foreground">Dry and liquid gallons originated from different historical standards. Dry measures evolved from grain trading needs. Liquid measures developed for wine and beer. The systems remained separate even after standardization.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Is a bushel the same in all countries?</h3>
              <p className="text-muted-foreground">No. The US bushel equals 2,150.42 cubic inches. The UK imperial bushel equals 2,219.36 cubic inches. Canada uses the imperial bushel for some commodities. Always verify which standard applies.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
