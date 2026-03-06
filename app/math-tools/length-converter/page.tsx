"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
  nauticalMile: 1852,
  micrometer: 0.000001,
  nanometer: 0.000000001,
};

const unitLabels: Record<string, string> = {
  meter: "Meters (m)",
  kilometer: "Kilometers (km)",
  centimeter: "Centimeters (cm)",
  millimeter: "Millimeters (mm)",
  mile: "Miles (mi)",
  yard: "Yards (yd)",
  foot: "Feet (ft)",
  inch: "Inches (in)",
  nauticalMile: "Nautical Miles",
  micrometer: "Micrometers (μm)",
  nanometer: "Nanometers (nm)",
};

export default function LengthConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const meters = val * units[fromUnit];
    const converted = meters / units[toUnit];
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
    setFromUnit("kilometer");
    setToUnit("mile");
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
        <h1 className="text-3xl font-semibold mb-2">Length Converter – Convert Meters, Feet, Inches, Miles Online</h1>
        <p className="text-muted-foreground">
          Convert between any length or distance units with our free online length converter. Covers metric and imperial systems including meters, feet, inches, kilometers, and miles.
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
            <h4 className="font-semibold text-sm mb-2">Conversion Formula</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {unitLabels[fromUnit].split(" ")[0]} = {round(result)} {unitLabels[toUnit].split(" ")[0]}
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Length Unit Systems</h2>
        <p className="text-muted-foreground">
          Length measurements use two main systems: the metric system (used worldwide) and the imperial/US customary system (used primarily in the United States). Understanding both systems is essential for international communication, science, engineering, and travel.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Conversions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Metric System</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 kilometer = 1,000 meters</li>
              <li>• 1 meter = 100 centimeters</li>
              <li>• 1 centimeter = 10 millimeters</li>
              <li>• 1 meter = 1,000 millimeters</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Imperial System</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 mile = 1,760 yards = 5,280 feet</li>
              <li>• 1 yard = 3 feet = 36 inches</li>
              <li>• 1 foot = 12 inches</li>
              <li>• 1 inch = 2.54 centimeters</li>
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
                <td className="p-3">Meters</td>
                <td className="p-3">Feet</td>
                <td className="p-3 font-mono">3.28084</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Kilometers</td>
                <td className="p-3">Miles</td>
                <td className="p-3 font-mono">0.621371</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Centimeters</td>
                <td className="p-3">Inches</td>
                <td className="p-3 font-mono">0.393701</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Inches</td>
                <td className="p-3">Centimeters</td>
                <td className="p-3 font-mono">2.54</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Miles</td>
                <td className="p-3">Kilometers</td>
                <td className="p-3 font-mono">1.60934</td>
              </tr>
              <tr>
                <td className="p-3">Feet</td>
                <td className="p-3">Meters</td>
                <td className="p-3 font-mono">0.3048</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Height Conversion</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 6 feet to centimeters
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              6 ft × 30.48 = 182.88 cm
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Running Distance</h3>
            <p className="text-sm text-muted-foreground mb-2">
              A 5K race in miles
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              5 km × 0.621371 = 3.11 miles
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Room Dimensions</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 12 feet to meters
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              12 ft × 0.3048 = 3.66 meters
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many feet in a meter?</h3>
            <p className="text-sm text-muted-foreground">
              1 meter equals approximately 3.28 feet (exactly 3.28084 feet).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I convert inches to centimeters?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply inches by 2.54 to get centimeters. For example, 10 inches = 25.4 cm.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between a mile and a kilometer?</h3>
            <p className="text-sm text-muted-foreground">
              A mile is longer than a kilometer. 1 mile = 1.609 kilometers, or 1 kilometer = 0.621 miles.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why are there two measurement systems?</h3>
            <p className="text-sm text-muted-foreground">
              The metric system was developed during the French Revolution for standardization. The imperial system evolved from older English units. Most countries use metric, but the US primarily uses imperial.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/weight-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Weight Converter</p>
            <p className="text-xs text-muted-foreground">kg, lbs, grams, oz</p>
          </a>
          <a href="/math-tools/temperature-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Temperature Converter</p>
            <p className="text-xs text-muted-foreground">Celsius, Fahrenheit, Kelvin</p>
          </a>
          <a href="/math-tools/area-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Converter</p>
            <p className="text-xs text-muted-foreground">sq ft, sq m, acres</p>
          </a>
        </div>
      </section>
    </div>
  );
}
