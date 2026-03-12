"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HorsepowertoAnimalsConverterPage() {
  const config = converterMappings["Horsepower to Animals Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Horsepower to Animals Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Horsepower to Animals Converter</h1>
        <p className="text-muted-foreground">How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds.</p>
      </div>
      <UnitConverterBase
        title="Horsepower to Animals Converter"
        description="How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Horsepower</h2>
          <p className="text-muted-foreground mb-4">Horsepower measures power output. James Watt coined the term in the 18th century to compare steam engines to draft horses. One horsepower equals 745.7 watts or 550 foot-pounds per second.</p>
          <p className="text-muted-foreground mb-4">A single horse cannot actually produce one full horsepower continuously. The unit represents sustained work output. Peak horse power output reaches about 15 horsepower for brief bursts.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Animal Power Equivalents</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Animal</th>
                  <th className="text-left py-3 px-4 font-medium">Power Output</th>
                  <th className="text-left py-3 px-4 font-medium">Animals per 1 HP</th>
                  <th className="text-left py-3 px-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Horse (sustained)</td>
                  <td className="py-3 px-4">1 HP</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Original definition</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Horse (peak)</td>
                  <td className="py-3 px-4">15 HP</td>
                  <td className="py-3 px-4">0.067</td>
                  <td className="py-3 px-4">Brief burst output</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Human (athlete)</td>
                  <td className="py-3 px-4">0.25 HP</td>
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">Sustained cycling output</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Human (peak)</td>
                  <td className="py-3 px-4">1.2 HP</td>
                  <td className="py-3 px-4">0.83</td>
                  <td className="py-3 px-4">Brief sprint output</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Dog (large)</td>
                  <td className="py-3 px-4">0.1 HP</td>
                  <td className="py-3 px-4">10</td>
                  <td className="py-3 px-4">Working dog pulling</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Ox</td>
                  <td className="py-3 px-4">1.5 HP</td>
                  <td className="py-3 px-4">0.67</td>
                  <td className="py-3 px-4">Draft animal</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Elephant</td>
                  <td className="py-3 px-4">6 HP</td>
                  <td className="py-3 px-4">0.17</td>
                  <td className="py-3 px-4">Large African elephant</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Hamster</td>
                  <td className="py-3 px-4">0.0015 HP</td>
                  <td className="py-3 px-4">667</td>
                  <td className="py-3 px-4">On exercise wheel</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Chicken</td>
                  <td className="py-3 px-4">0.003 HP</td>
                  <td className="py-3 px-4">333</td>
                  <td className="py-3 px-4">Peak flapping output</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cat</td>
                  <td className="py-3 px-4">0.02 HP</td>
                  <td className="py-3 px-4">50</td>
                  <td className="py-3 px-4">Brief burst</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Blue Whale</td>
                  <td className="py-3 px-4">500 HP</td>
                  <td className="py-3 px-4">0.002</td>
                  <td className="py-3 px-4">Estimated swimming power</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Ant</td>
                  <td className="py-3 px-4">0.0000001 HP</td>
                  <td className="py-3 px-4">10,000,000</td>
                  <td className="py-3 px-4">Per worker ant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Horsepower Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between horsepower and animal equivalents.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>Animals = Horsepower ÷ Animal Power (HP)</div>
            <div>Horsepower = Animals × Animal Power (HP)</div>
            <div>1 HP = 745.7 watts</div>
            <div>1 HP = 550 ft-lb/second</div>
            <div>1 HP = 0.7457 kilowatts</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 300 HP car to hamster equivalents</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            Hamsters = 300 HP ÷ 0.0015 HP per hamster = 200,000 hamsters
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Vehicle Horsepower</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Vehicle Type</th>
                  <th className="text-left py-3 px-4 font-medium">Typical HP</th>
                  <th className="text-left py-3 px-4 font-medium">Horse Equivalent</th>
                  <th className="text-left py-3 px-4 font-medium">Human Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Compact car</td>
                  <td className="py-3 px-4">100-150 HP</td>
                  <td className="py-3 px-4">100-150 horses</td>
                  <td className="py-3 px-4">400-600 humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sedan</td>
                  <td className="py-3 px-4">150-250 HP</td>
                  <td className="py-3 px-4">150-250 horses</td>
                  <td className="py-3 px-4">600-1,000 humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sports car</td>
                  <td className="py-3 px-4">300-500 HP</td>
                  <td className="py-3 px-4">300-500 horses</td>
                  <td className="py-3 px-4">1,200-2,000 humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Supercar</td>
                  <td className="py-3 px-4">600-1,000 HP</td>
                  <td className="py-3 px-4">600-1,000 horses</td>
                  <td className="py-3 px-4">2,400-4,000 humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Motorcycle</td>
                  <td className="py-3 px-4">50-200 HP</td>
                  <td className="py-3 px-4">50-200 horses</td>
                  <td className="py-3 px-4">200-800 humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">F1 Car</td>
                  <td className="py-3 px-4">1,000+ HP</td>
                  <td className="py-3 px-4">1,000+ horses</td>
                  <td className="py-3 px-4">4,000+ humans</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Locomotive</td>
                  <td className="py-3 px-4">4,000 HP</td>
                  <td className="py-3 px-4">4,000 horses</td>
                  <td className="py-3 px-4">16,000 humans</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Horsepower History</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>James Watt defined horsepower in 1782 during steam engine development</li>
            <li>He observed horses lifting coal at mines for his calculations</li>
            <li>Watt wanted to show steam engines could replace multiple horses</li>
            <li>The term stuck and became the standard power measurement</li>
            <li>Electric motors now use kilowatts but horsepower remains common for vehicles</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Can one horse actually produce one horsepower?</h3>
              <p className="text-muted-foreground">Not continuously. A horse can produce about 1 HP sustained over a workday. Peak output reaches 12-15 HP for brief moments. Watt conservative estimate ensured his engines would exceed expectations.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How many hamsters equal one horsepower?</h3>
              <p className="text-muted-foreground">Approximately 667 hamsters running on wheels equal one horsepower. Each hamster produces about 0.0015 HP. A 300 HP car would need 200,000 hamsters.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What animal produces the most power?</h3>
              <p className="text-muted-foreground">Blue whales generate an estimated 500 HP when swimming at speed. On land, elephants produce about 6 HP. Horses remain the standard reference at 1 HP sustained output.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How much horsepower does a human produce?</h3>
              <p className="text-muted-foreground">Average humans sustain 0.1 HP during daily activities. Athletes maintain 0.25-0.35 HP during cycling. Peak output reaches 1.2 HP for trained sprinters over a few seconds.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
