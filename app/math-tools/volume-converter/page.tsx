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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Volume Converter Works</h2>
          <p className="text-muted-foreground mb-4">
            Volume measures the amount of three-dimensional space an object or substance occupies. This converter handles both metric units (liters, milliliters, cubic meters) and imperial/US customary units (gallons, quarts, fluid ounces), making it easy to convert between any volume measurements.
          </p>
          <p className="text-muted-foreground mb-4">
            The converter uses liters as the base unit internally. When you convert from one unit to another, it first converts your input to liters, then converts from liters to your target unit. This two-step approach ensures accuracy across all unit combinations.
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Common conversion factors:</p>
            <p>• 1 gallon = 3.785 liters</p>
            <p>• 1 liter = 1000 milliliters</p>
            <p>• 1 cubic meter = 1000 liters</p>
            <p>• 1 fluid ounce = 29.57 mL</p>
            <p>• 1 cup = 236.6 mL</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Volume Conversions</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Cooking: Cups to Milliliters</h3>
          <p className="text-muted-foreground mb-2">
            Converting a recipe from US to metric measurements:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>2 cups = 473.18 mL</p>
            <p>1.5 cups = 354.88 mL</p>
            <p>3/4 cup = 177.44 mL</p>
            <p className="mt-2 text-muted-foreground">Useful for international recipes</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Automotive: Gallons to Liters</h3>
          <p className="text-muted-foreground mb-2">
            Converting fuel tank capacity:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>15 gallons = 56.78 liters</p>
            <p>20 gallons = 75.71 liters</p>
            <p>12 gallons = 45.42 liters</p>
            <p className="mt-2 text-muted-foreground">US gallon differs from UK gallon (4.546 L)</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Science: Cubic Meters to Liters</h3>
          <p className="text-muted-foreground mb-2">
            Laboratory volume conversions:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>0.5 m³ = 500 L</p>
            <p>0.001 m³ = 1 L</p>
            <p>2.5 m³ = 2500 L</p>
            <p className="mt-2 text-muted-foreground">1 m³ = 1000 L exactly</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Beverages: Fluid Ounces to Milliliters</h3>
          <p className="text-muted-foreground mb-2">
            Drink container sizes:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>12 fl oz (soda can) = 354.88 mL</p>
            <p>16 fl oz (pint) = 473.18 mL</p>
            <p>20 fl oz (bottle) = 591.47 mL</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: The Metric System's Birth</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              The liter was defined during the French Revolution in 1795 as part of the new metric system. It was originally defined as the volume of 1 kilogram of water at 4°C (water's maximum density). The metric system was created to replace the chaotic patchwork of local measurement units—before the revolution, France had over 250,000 different units! The word "liter" comes from the French "litron," an old unit of capacity. Interestingly, from 1901 to 1964, the liter was defined as the volume of 1 kg of water, but it's now defined as exactly 1 cubic decimeter (1000 cm³) for precision.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between US and UK gallons?</h3>
              <p className="text-muted-foreground">
                A US gallon equals 3.785 liters, while a UK (imperial) gallon equals 4.546 liters—about 20% larger. This difference dates back to different historical standards. Always check which gallon is being used, especially for fuel economy comparisons between American and British vehicles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert cubic inches to liters?</h3>
              <p className="text-muted-foreground">
                1 cubic inch = 0.016387 liters (or about 16.39 mL). To convert, multiply cubic inches by 0.016387. For example, a 350 cubic inch engine = 350 × 0.016387 = 5.74 liters. Engine displacement is often given in both units.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Is a milliliter the same as a cubic centimeter?</h3>
              <p className="text-muted-foreground">
                Yes! 1 mL = 1 cm³ (also written as 1 cc). These are exactly equivalent. Medical syringes often use "cc" while cooking uses "mL," but they measure the same volume. This equivalence makes metric conversions straightforward.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How many cups are in a gallon?</h3>
              <p className="text-muted-foreground">
                In US measurements: 1 gallon = 16 cups. The breakdown is: 1 gallon = 4 quarts = 8 pints = 16 cups = 128 fluid ounces. This hierarchy makes it easy to scale recipes up or down.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What volume unit should I use for cooking?</h3>
              <p className="text-muted-foreground">
                For precision baking, use weight (grams) rather than volume. For general cooking: US recipes use cups/tablespoons/teaspoons, while international recipes use milliliters. A kitchen scale is more accurate than measuring cups, especially for flour.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert between metric prefixes?</h3>
              <p className="text-muted-foreground">
                Metric prefixes are powers of 10: kilo (1000×), centi (1/100), milli (1/1000), micro (1/1,000,000). To convert: 1 L = 1000 mL = 1,000,000 μL. Just move the decimal point: 2.5 L = 2500 mL (move 3 places right).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why are there so many volume units?</h3>
              <p className="text-muted-foreground">
                Different units evolved for different purposes: gallons for liquids, bushels for grain, cubic feet for lumber, etc. The metric system simplified this with a single base unit (liter) and prefixes. However, traditional units persist in cooking, automotive, and certain industries due to convention.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/weight-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Weight Converter</h3>
              <p className="text-sm text-muted-foreground">Convert between kilograms, pounds, grams, ounces, and other mass units.</p>
            </a>
            <a href="/math-tools/length-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Length Converter</h3>
              <p className="text-sm text-muted-foreground">Convert between meters, feet, inches, kilometers, miles, and more.</p>
            </a>
            <a href="/math-tools/temperature-converter" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Temperature Converter</h3>
              <p className="text-sm text-muted-foreground">Convert between Celsius, Fahrenheit, and Kelvin scales.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
