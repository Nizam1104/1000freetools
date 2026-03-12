"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function OvenTemperatureConverterPage() {
  const config = converterMappings["Oven Temperature Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Oven Temperature Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Oven Temperature Converter</h1>
        <p className="text-muted-foreground">Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.</p>
      </div>
      <UnitConverterBase
        title="Oven Temperature Converter"
        description="Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Oven Temperature Conversions</h2>
          <p className="text-muted-foreground mb-4">Oven temperatures use different scales worldwide. The US uses Fahrenheit while Europe uses Celsius. UK recipes reference gas marks. Converting between these scales ensures your baked goods turn out correctly.</p>
          <p className="text-muted-foreground mb-4">Temperature accuracy affects baking results. Too hot and your food burns outside while staying raw inside. Too cool and your baked goods fail to rise properly.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Temperature Conversion Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Gas Mark</th>
                  <th className="text-left py-3 px-4 font-medium">Fahrenheit</th>
                  <th className="text-left py-3 px-4 font-medium">Celsius</th>
                  <th className="text-left py-3 px-4 font-medium">Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1/4</td>
                  <td className="py-3 px-4">225°F</td>
                  <td className="py-3 px-4">110°C</td>
                  <td className="py-3 px-4">Proofing bread</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1/2</td>
                  <td className="py-3 px-4">250°F</td>
                  <td className="py-3 px-4">120°C</td>
                  <td className="py-3 px-4">Slow roasting</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">275°F</td>
                  <td className="py-3 px-4">140°C</td>
                  <td className="py-3 px-4">Keeping warm</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">300°F</td>
                  <td className="py-3 px-4">150°C</td>
                  <td className="py-3 px-4">Slow baking</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">325°F</td>
                  <td className="py-3 px-4">170°C</td>
                  <td className="py-3 px-4">Cakes, cookies</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">350°F</td>
                  <td className="py-3 px-4">180°C</td>
                  <td className="py-3 px-4">Standard baking</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4">375°F</td>
                  <td className="py-3 px-4">190°C</td>
                  <td className="py-3 px-4">Roasting vegetables</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6</td>
                  <td className="py-3 px-4">400°F</td>
                  <td className="py-3 px-4">200°C</td>
                  <td className="py-3 px-4">Roasting meat</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">7</td>
                  <td className="py-3 px-4">425°F</td>
                  <td className="py-3 px-4">220°C</td>
                  <td className="py-3 px-4">Pizza, bread</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4">450°F</td>
                  <td className="py-3 px-4">230°C</td>
                  <td className="py-3 px-4">High-heat roasting</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9</td>
                  <td className="py-3 px-4">475°F</td>
                  <td className="py-3 px-4">245°C</td>
                  <td className="py-3 px-4">Searing, broiling</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10</td>
                  <td className="py-3 px-4">500°F</td>
                  <td className="py-3 px-4">260°C</td>
                  <td className="py-3 px-4">Maximum heat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Use these formulas to convert between temperature scales.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Celsius = (Fahrenheit - 32) × 5/9</div>
            <div>Fahrenheit = (Celsius × 9/5) + 32</div>
            <div>Gas Mark = (Fahrenheit - 250) / 25 + 1</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 350°F to Celsius</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            (350 - 32) × 5/9 = 177.78°C (round to 180°C)
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Food Safety Temperatures</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Food</th>
                  <th className="text-left py-3 px-4 font-medium">Minimum Internal Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Chicken, turkey (whole)</td>
                  <td className="py-3 px-4">165°F (74°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Chicken breasts</td>
                  <td className="py-3 px-4">165°F (74°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Ground beef, pork</td>
                  <td className="py-3 px-4">160°F (71°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Beef steaks, chops</td>
                  <td className="py-3 px-4">145°F (63°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Pork chops, loin</td>
                  <td className="py-3 px-4">145°F (63°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Fish</td>
                  <td className="py-3 px-4">145°F (63°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Egg dishes</td>
                  <td className="py-3 px-4">160°F (71°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Leftovers (reheat)</td>
                  <td className="py-3 px-4">165°F (74°C)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is gas mark 4 in Celsius?</h3>
              <p className="text-muted-foreground">Gas mark 4 equals 350°F or 180°C. This is the standard baking temperature for most cakes, cookies, and roasted vegetables.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I convert Fahrenheit to Celsius quickly?</h3>
              <p className="text-muted-foreground">Subtract 30 from Fahrenheit then divide by 2 for a rough estimate. For exact conversion, subtract 32, multiply by 5, then divide by 9.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why do UK recipes use gas marks?</h3>
              <p className="text-muted-foreground">Gas marks originated in the UK when gas ovens became common. The system numbers heat levels from 1 to 9. Modern UK recipes now use Celsius alongside gas marks.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Should I adjust temperature for convection ovens?</h3>
              <p className="text-muted-foreground">Yes. Reduce temperature by 25°F (15°C) for convection ovens. Fan circulation cooks food faster and more evenly. Check food 5-10 minutes earlier than recipe times.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
