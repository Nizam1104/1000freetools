"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareMillimeter: 0.000001,
  squareFoot: 0.092903,
  squareYard: 0.836127,
  squareInch: 0.00064516,
  squareMile: 2589988.11,
  acre: 4046.86,
  hectare: 10000,
};

const unitLabels: Record<string, string> = {
  squareMeter: "Square meters (m²)",
  squareKilometer: "Square kilometers (km²)",
  squareCentimeter: "Square centimeters (cm²)",
  squareMillimeter: "Square millimeters (mm²)",
  squareFoot: "Square feet (ft²)",
  squareYard: "Square yards (yd²)",
  squareInch: "Square inches (in²)",
  squareMile: "Square miles (mi²)",
  acre: "Acres",
  hectare: "Hectares (ha)",
};

export default function AreaConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("squareMeter");
  const [toUnit, setToUnit] = useState("squareFoot");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const sqm = val * units[fromUnit];
    const converted = sqm / units[toUnit];
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
    setFromUnit("acre");
    setToUnit("hectare");
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
      squareMeter: "m²",
      squareKilometer: "km²",
      squareCentimeter: "cm²",
      squareMillimeter: "mm²",
      squareFoot: "ft²",
      squareYard: "yd²",
      squareInch: "in²",
      squareMile: "mi²",
      acre: "ac",
      hectare: "ha",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Area Converter – Convert sq ft, sq m, Acres, Hectares Online</h1>
        <p className="text-muted-foreground">
          Convert between any area unit with our free online area converter. Supports square meters, square feet, acres, hectares, and many more area measurement units.
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
