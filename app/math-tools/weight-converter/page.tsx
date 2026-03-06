"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  metricTon: 1000,
  pound: 0.453592,
  ounce: 0.0283495,
  stone: 6.35029,
  usTon: 907.185,
  imperialTon: 1016.05,
  carat: 0.0002,
};

const unitLabels: Record<string, string> = {
  kilogram: "Kilograms (kg)",
  gram: "Grams (g)",
  milligram: "Milligrams (mg)",
  metricTon: "Metric Tons (t)",
  pound: "Pounds (lbs)",
  ounce: "Ounces (oz)",
  stone: "Stone (st)",
  usTon: "US Tons",
  imperialTon: "Imperial Tons",
  carat: "Carats (ct)",
};

export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const kg = val * units[fromUnit];
    const converted = kg / units[toUnit];
    setResult(converted);
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const loadExample = () => {
    setValue("1");
    setFromUnit("kilogram");
    setToUnit("pound");
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(10)).toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Weight Converter – Convert kg, lbs, grams, oz Online</h1>
        <p className="text-muted-foreground">
          Convert between any weight or mass unit with our free online weight converter. Supports kilograms, pounds, grams, ounces, stones, metric tons, and more instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); setResult(null); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={swap} className="w-12 h-10 p-0">⇄</Button>
          </div>

          <div className="md:col-span-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-muted rounded-lg min-h-[42px] flex items-center">
                {result !== null ? round(result) : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {result !== null && value && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conversion Result</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {unitLabels[fromUnit].split(" ")[0]} = {round(result)} {unitLabels[toUnit].split(" ")[0]}
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Weight vs Mass</h2>
        <p className="text-muted-foreground">
          Technically, mass is the amount of matter in an object (measured in kilograms), while weight is the force of gravity on that mass (measured in newtons). However, in everyday use, "weight" commonly refers to mass, and this converter uses that convention.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Conversions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Metric System</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 kilogram = 1,000 grams</li>
              <li>• 1 gram = 1,000 milligrams</li>
              <li>• 1 metric ton = 1,000 kilograms</li>
              <li>• 1 carat = 0.2 grams</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Imperial/US System</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 pound = 16 ounces</li>
              <li>• 1 stone = 14 pounds</li>
              <li>• 1 US ton = 2,000 pounds</li>
              <li>• 1 imperial ton = 2,240 pounds</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Quick Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">From</th>
                <th className="text-left p-3">To</th>
                <th className="text-left p-3">Multiply by</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Kilograms</td>
                <td className="p-3">Pounds</td>
                <td className="p-3 font-mono">2.20462</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Pounds</td>
                <td className="p-3">Kilograms</td>
                <td className="p-3 font-mono">0.453592</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Grams</td>
                <td className="p-3">Ounces</td>
                <td className="p-3 font-mono">0.035274</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Ounces</td>
                <td className="p-3">Grams</td>
                <td className="p-3 font-mono">28.3495</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Stone</td>
                <td className="p-3">Pounds</td>
                <td className="p-3 font-mono">14</td>
              </tr>
              <tr>
                <td className="p-3">Metric Ton</td>
                <td className="p-3">Pounds</td>
                <td className="p-3 font-mono">2204.62</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Body Weight</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 150 pounds to kilograms
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              150 lbs × 0.453592 = 68.04 kg
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Recipe Ingredients</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 500 grams to ounces
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              500 g × 0.035274 = 17.64 oz
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Shipping Weight</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 2 metric tons to pounds
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              2 t × 2204.62 = 4,409.24 lbs
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many pounds in a kilogram?</h3>
            <p className="text-sm text-muted-foreground">
              1 kilogram equals approximately 2.2 pounds (exactly 2.20462 lbs).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a stone?</h3>
            <p className="text-sm text-muted-foreground">
              A stone is a British unit of weight equal to 14 pounds or about 6.35 kilograms. It's commonly used for body weight in the UK.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between US and Imperial tons?</h3>
            <p className="text-sm text-muted-foreground">
              A US ton (short ton) is 2,000 pounds. An Imperial ton (long ton) is 2,240 pounds. A metric ton is 1,000 kilograms or about 2,205 pounds.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a carat used for?</h3>
            <p className="text-sm text-muted-foreground">
              Carats are used to measure gemstones and pearls. 1 carat = 0.2 grams = 200 milligrams.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/length-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Length Converter</p>
            <p className="text-xs text-muted-foreground">m, ft, in, km, miles</p>
          </a>
          <a href="/math-tools/temperature-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Temperature Converter</p>
            <p className="text-xs text-muted-foreground">C, F, K</p>
          </a>
          <a href="/math-tools/volume-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Converter</p>
            <p className="text-xs text-muted-foreground">L, gal, ml, cups</p>
          </a>
        </div>
      </section>
    </div>
  );
}
