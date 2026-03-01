"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HeightConverterPage() {
  const config = converterMappings["Height Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Height Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Height Converter — cm to ft & in</h1>
        <p className="text-muted-foreground">Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.</p>
      </div>
      <UnitConverterBase
        title="Height Converter — cm to ft & in"
        description="Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Height Conversions</h2>
          <p className="text-muted-foreground mb-4">Height measurements use different systems worldwide. The metric system uses centimeters and meters. The imperial system uses feet and inches. Converting between systems helps with international communication, medical records, and travel documentation.</p>
          <p className="text-muted-foreground mb-4">One foot equals 12 inches. One inch equals 2.54 centimeters exactly. These conversion factors enable precise height translation between measurement systems.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Height Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Feet & Inches</th>
                  <th className="text-left py-3 px-4 font-medium">Inches (total)</th>
                  <th className="text-left py-3 px-4 font-medium">Centimeters</th>
                  <th className="text-left py-3 px-4 font-medium">Meters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">4 ft 0 in</td>
                  <td className="py-3 px-4">48</td>
                  <td className="py-3 px-4">121.9 cm</td>
                  <td className="py-3 px-4">1.22 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4 ft 6 in</td>
                  <td className="py-3 px-4">54</td>
                  <td className="py-3 px-4">137.2 cm</td>
                  <td className="py-3 px-4">1.37 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 ft 0 in</td>
                  <td className="py-3 px-4">60</td>
                  <td className="py-3 px-4">152.4 cm</td>
                  <td className="py-3 px-4">1.52 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 ft 3 in</td>
                  <td className="py-3 px-4">63</td>
                  <td className="py-3 px-4">160.0 cm</td>
                  <td className="py-3 px-4">1.60 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 ft 6 in</td>
                  <td className="py-3 px-4">66</td>
                  <td className="py-3 px-4">167.6 cm</td>
                  <td className="py-3 px-4">1.68 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 ft 9 in</td>
                  <td className="py-3 px-4">69</td>
                  <td className="py-3 px-4">175.3 cm</td>
                  <td className="py-3 px-4">1.75 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6 ft 0 in</td>
                  <td className="py-3 px-4">72</td>
                  <td className="py-3 px-4">182.9 cm</td>
                  <td className="py-3 px-4">1.83 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6 ft 3 in</td>
                  <td className="py-3 px-4">75</td>
                  <td className="py-3 px-4">190.5 cm</td>
                  <td className="py-3 px-4">1.91 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6 ft 6 in</td>
                  <td className="py-3 px-4">78</td>
                  <td className="py-3 px-4">198.1 cm</td>
                  <td className="py-3 px-4">1.98 m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">7 ft 0 in</td>
                  <td className="py-3 px-4">84</td>
                  <td className="py-3 px-4">213.4 cm</td>
                  <td className="py-3 px-4">2.13 m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Height Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between height units using these formulas.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>cm = (feet × 12 + inches) × 2.54</div>
            <div>feet = cm ÷ 2.54 ÷ 12 (whole number)</div>
            <div>inches = (cm ÷ 2.54) mod 12 (remainder)</div>
            <div>meters = cm ÷ 100</div>
            <div>inches (total) = cm ÷ 2.54</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 175 cm to feet and inches</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Total inches: 175 ÷ 2.54 = 68.9 inches
            Feet: 68.9 ÷ 12 = 5 feet (whole number)
            Remaining inches: 68.9 - (5 × 12) = 8.9 inches
            Result: 5 ft 9 in (rounded)
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Average Adult Height by Country</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Country</th>
                  <th className="text-left py-3 px-4 font-medium">Men (avg)</th>
                  <th className="text-left py-3 px-4 font-medium">Women (avg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Netherlands</td>
                  <td className="py-3 px-4">184 cm (6 ft 0 in)</td>
                  <td className="py-3 px-4">170 cm (5 ft 7 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">United States</td>
                  <td className="py-3 px-4">177 cm (5 ft 10 in)</td>
                  <td className="py-3 px-4">164 cm (5 ft 4 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">United Kingdom</td>
                  <td className="py-3 px-4">178 cm (5 ft 10 in)</td>
                  <td className="py-3 px-4">164 cm (5 ft 4 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Germany</td>
                  <td className="py-3 px-4">180 cm (5 ft 11 in)</td>
                  <td className="py-3 px-4">166 cm (5 ft 5 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Japan</td>
                  <td className="py-3 px-4">172 cm (5 ft 8 in)</td>
                  <td className="py-3 px-4">158 cm (5 ft 2 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">India</td>
                  <td className="py-3 px-4">165 cm (5 ft 5 in)</td>
                  <td className="py-3 px-4">153 cm (5 ft 0 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Brazil</td>
                  <td className="py-3 px-4">174 cm (5 ft 8 in)</td>
                  <td className="py-3 px-4">161 cm (5 ft 3 in)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Australia</td>
                  <td className="py-3 px-4">179 cm (5 ft 10 in)</td>
                  <td className="py-3 px-4">165 cm (5 ft 5 in)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Height Percentile Reference (US Adults)</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>5th percentile women: 152 cm (5 ft 0 in)</li>
            <li>50th percentile women: 164 cm (5 ft 4 in)</li>
            <li>95th percentile women: 175 cm (5 ft 9 in)</li>
            <li>5th percentile men: 165 cm (5 ft 5 in)</li>
            <li>50th percentile men: 177 cm (5 ft 10 in)</li>
            <li>95th percentile men: 189 cm (6 ft 2 in)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How do I write height correctly?</h3>
              <p className="text-muted-foreground">Use the format 5 ft 10 in or 510. Metric format uses 178 cm or 1.78 m. Medical records often use inches only (70 inches). Be consistent within documents.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why do some countries use feet and others use centimeters?</h3>
              <p className="text-muted-foreground">The imperial system (feet and inches) originated in Britain and spread through the British Empire. The metric system developed in France and became the international standard. The US primarily uses imperial while most other countries use metric.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How accurate are height conversions?</h3>
              <p className="text-muted-foreground">Conversions using 2.54 cm per inch are exact. Rounding to whole inches or centimeters introduces small differences. Medical measurements should use precise values without rounding.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the tallest and shortest recorded human height?</h3>
              <p className="text-muted-foreground">Robert Wadlow holds the record at 272 cm (8 ft 11 in). Chandra Bahadur Dangi was the shortest at 54.6 cm (1 ft 9.5 in). Average heights vary significantly by country and generation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
