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
      </section>
    </div>
  );
}
