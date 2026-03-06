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
        <h2 className="text-2xl font-semibold">Area Units Explained</h2>
        <p className="text-muted-foreground">
          Area measures the size of a two-dimensional surface. The metric system uses square meters and hectares. The imperial system uses square feet, acres, and square miles. Real estate often uses acres or hectares for land, and square feet or meters for buildings. Understanding these conversions is essential for property, construction, and land management.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Area Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Metric Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Square meter (m²) = Base unit</li>
              <li>• 1 Hectare (ha) = 10,000 m²</li>
              <li>• 1 Square kilometer (km²) = 1,000,000 m²</li>
              <li>• 1 Are = 100 m²</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Imperial/US Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Acre = 43,560 ft² = 4,047 m²</li>
              <li>• 1 Square mile = 640 acres</li>
              <li>• 1 Square yard = 9 ft²</li>
              <li>• 1 Square foot = 144 in²</li>
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
                <td className="p-3">1 Acre</td>
                <td className="p-3">Hectares</td>
                <td className="p-3 font-mono">0.405 ha</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Hectare</td>
                <td className="p-3">Acres</td>
                <td className="p-3 font-mono">2.471 ac</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Square meter</td>
                <td className="p-3">Square feet</td>
                <td className="p-3 font-mono">10.764 ft²</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Square foot</td>
                <td className="p-3">Square meters</td>
                <td className="p-3 font-mono">0.093 m²</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 Square mile</td>
                <td className="p-3">Acres</td>
                <td className="p-3 font-mono">640 ac</td>
              </tr>
              <tr>
                <td className="p-3">1 Acre</td>
                <td className="p-3">Square feet</td>
                <td className="p-3 font-mono">43,560 ft²</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Area Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Room Size</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 200 square feet to square meters
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              200 ft² × 0.093 = 18.58 m²
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Land Area</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 5 acres to hectares
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              5 ac × 0.405 = 2.02 hectares
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Property Size</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 1,500 m² to square feet
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              1,500 m² × 10.764 = 16,146 ft²
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How big is an acre?</h3>
            <p className="text-sm text-muted-foreground">
              An acre equals 43,560 square feet or about 4,047 square meters. It's roughly the size of an American football field without the end zones.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between hectare and acre?</h3>
            <p className="text-sm text-muted-foreground">
              A hectare (10,000 m²) is larger than an acre (4,047 m²). 1 hectare = 2.47 acres. Hectares are used worldwide; acres are common in the US and UK.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I calculate room area?</h3>
            <p className="text-sm text-muted-foreground">
              For a rectangle, multiply length × width. A 12 ft × 15 ft room = 180 ft². For irregular shapes, divide into rectangles and add the areas.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many square feet in a square yard?</h3>
            <p className="text-sm text-muted-foreground">
              1 square yard = 9 square feet (3 ft × 3 ft). This is useful for carpet and flooring calculations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">2D shape areas</p>
          </a>
          <a href="/math-tools/length-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Length Converter</p>
            <p className="text-xs text-muted-foreground">Meters, feet, inches</p>
          </a>
          <a href="/math-tools/volume-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Converter</p>
            <p className="text-xs text-muted-foreground">Liters, gallons, m³</p>
          </a>
        </div>
      </section>
    </div>
  );
}
