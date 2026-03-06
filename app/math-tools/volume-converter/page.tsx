"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  liter: 1,
  milliliter: 0.001,
  cubicMeter: 1000,
  cubicCentimeter: 0.001,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  cup: 0.236588,
  fluidOunce: 0.0295735,
  tablespoon: 0.0147868,
  teaspoon: 0.00492892,
  cubicFoot: 28.3168,
  cubicInch: 0.0163871,
};

const unitLabels: Record<string, string> = {
  liter: "Liters (L)",
  milliliter: "Milliliters (mL)",
  cubicMeter: "Cubic meters (m³)",
  cubicCentimeter: "Cubic centimeters (cm³)",
  gallon: "Gallons (gal)",
  quart: "Quarts (qt)",
  pint: "Pints (pt)",
  cup: "Cups",
  fluidOunce: "Fluid ounces (fl oz)",
  tablespoon: "Tablespoons (tbsp)",
  teaspoon: "Teaspoons (tsp)",
  cubicFoot: "Cubic feet (ft³)",
  cubicInch: "Cubic inches (in³)",
};

export default function VolumeConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("liter");
  const [toUnit, setToUnit] = useState("gallon");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const liters = val * units[fromUnit];
    const converted = liters / units[toUnit];
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
    setFromUnit("liter");
    setToUnit("gallon");
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(6)).toString();
  };

  const getUnitSymbol = (unit: string): string => {
    const symbols: Record<string, string> = {
      liter: "L",
      milliliter: "mL",
      cubicMeter: "m³",
      cubicCentimeter: "cm³",
      gallon: "gal",
      quart: "qt",
      pint: "pt",
      cup: "cup",
      fluidOunce: "fl oz",
      tablespoon: "tbsp",
      teaspoon: "tsp",
      cubicFoot: "ft³",
      cubicInch: "in³",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Volume Converter – Convert Liters, Gallons, Cubic Meters</h1>
        <p className="text-muted-foreground">
          Convert between any volume or capacity unit with our free online volume converter. Covers liters, gallons, milliliters, cubic meters, fluid ounces, and more.
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
                <SelectTrigger className="w-48">
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
                {result !== null ? `${round(result)} ${getUnitSymbol(toUnit)}` : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
                <SelectTrigger className="w-48">
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
              {value} {getUnitSymbol(fromUnit)} = {round(result)} {getUnitSymbol(toUnit)}
            </code>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Volume Units Explained</h2>
        <p className="text-muted-foreground">
          Volume measures the amount of three-dimensional space occupied by a substance. The metric system uses liters and cubic meters. The US customary system uses gallons, quarts, pints, and fluid ounces. Cooking often uses cups, tablespoons, and teaspoons. Understanding these conversions helps in cooking, science, and everyday measurements.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Volume Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Metric Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Liter (L) = 1,000 mL</li>
              <li>• 1 Milliliter (mL) = 1 cm³</li>
              <li>• 1 Cubic meter (m³) = 1,000 L</li>
              <li>• 1 Cubic centimeter (cm³) = 1 mL</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">US Customary Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Gallon = 4 Quarts = 8 Pints</li>
              <li>• 1 Quart = 2 Pints = 4 Cups</li>
              <li>• 1 Pint = 2 Cups = 16 fl oz</li>
              <li>• 1 Cup = 8 fl oz = 16 tbsp</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Quick Reference Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">From</th>
                <th className="text-left p-3">To</th>
                <th className="text-left p-3">Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">1 Liter</td>
                <td className="p-3">Gallons</td>
                <td className="p-3 font-mono">0.264 gal</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Gallon</td>
                <td className="p-3">Liters</td>
                <td className="p-3 font-mono">3.785 L</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Cup</td>
                <td className="p-3">Milliliters</td>
                <td className="p-3 font-mono">236.6 mL</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Tablespoon</td>
                <td className="p-3">Milliliters</td>
                <td className="p-3 font-mono">14.79 mL</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Fluid ounce</td>
                <td className="p-3">Milliliters</td>
                <td className="p-3 font-mono">29.57 mL</td>
              </tr>
              <tr>
                <td className="p-3">1 Cubic foot</td>
                <td className="p-3">Liters</td>
                <td className="p-3 font-mono">28.32 L</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Volume Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Cooking Measurement</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 2 cups to milliliters
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              2 cups × 236.6 = 473.2 mL
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Fuel Capacity</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 15 gallons to liters
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              15 gal × 3.785 = 56.78 L
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Beverage Size</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 500 mL to fluid ounces
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              500 mL ÷ 29.57 = 16.9 fl oz
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many cups in a liter?</h3>
            <p className="text-sm text-muted-foreground">
              1 liter equals approximately 4.23 US cups. For cooking, you can round to 4 cups for most recipes.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between US and UK gallons?</h3>
            <p className="text-sm text-muted-foreground">
              US gallon = 3.785 liters. UK (Imperial) gallon = 4.546 liters. The UK gallon is about 20% larger than the US gallon.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is 1 mL equal to 1 gram?</h3>
            <p className="text-sm text-muted-foreground">
              For water at 4°C, yes: 1 mL = 1 gram. For other substances, it depends on density. Oil is lighter (about 0.9 g/mL), while honey is heavier (about 1.4 g/mL).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I convert tablespoons to cups?</h3>
            <p className="text-sm text-muted-foreground">
              16 tablespoons = 1 cup. So divide tablespoons by 16 to get cups. For example, 8 tbsp = 0.5 cup.
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
          <a href="/math-tools/volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Calculator</p>
            <p className="text-xs text-muted-foreground">3D shape volumes</p>
          </a>
        </div>
      </section>
    </div>
  );
}
