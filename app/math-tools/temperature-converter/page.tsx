"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TemperatureConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<"celsius" | "fahrenheit" | "kelvin">("celsius");
  const [toUnit, setToUnit] = useState<"celsius" | "fahrenheit" | "kelvin">("fahrenheit");
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState("");

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      setFormula("");
      return;
    }

    // Validate absolute zero
    if (fromUnit === "celsius" && val < -273.15) {
      setResult(null);
      setFormula("Temperature cannot be below absolute zero (-273.15°C)");
      return;
    }
    if (fromUnit === "fahrenheit" && val < -459.67) {
      setResult(null);
      setFormula("Temperature cannot be below absolute zero (-459.67°F)");
      return;
    }
    if (fromUnit === "kelvin" && val < 0) {
      setResult(null);
      setFormula("Temperature cannot be below absolute zero (0 K)");
      return;
    }

    let converted: number;
    let formulaStr: string;

    if (fromUnit === toUnit) {
      converted = val;
      formulaStr = `No conversion needed: ${val}°${fromUnit.charAt(0).toUpperCase()} = ${val}°${toUnit.charAt(0).toUpperCase()}`;
    } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      converted = (val * 9/5) + 32;
      formulaStr = `°F = (°C × 9/5) + 32 = (${val} × 9/5) + 32 = ${converted.toFixed(2)}°F`;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      converted = val + 273.15;
      formulaStr = `K = °C + 273.15 = ${val} + 273.15 = ${converted.toFixed(2)} K`;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      converted = (val - 32) * 5/9;
      formulaStr = `°C = (°F - 32) × 5/9 = (${val} - 32) × 5/9 = ${converted.toFixed(2)}°C`;
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      converted = (val - 32) * 5/9 + 273.15;
      formulaStr = `K = (°F - 32) × 5/9 + 273.15 = (${val} - 32) × 5/9 + 273.15 = ${converted.toFixed(2)} K`;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      converted = val - 273.15;
      formulaStr = `°C = K - 273.15 = ${val} - 273.15 = ${converted.toFixed(2)}°C`;
    } else { // kelvin to fahrenheit
      converted = (val - 273.15) * 9/5 + 32;
      formulaStr = `°F = (K - 273.15) × 9/5 + 32 = (${val} - 273.15) × 9/5 + 32 = ${converted.toFixed(2)}°F`;
    }

    setResult(parseFloat(converted.toFixed(2)));
    setFormula(formulaStr);
  };

  const reset = () => {
    setValue("");
    setResult(null);
    setFormula("");
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
    setFormula("");
  };

  const loadExample = () => {
    setValue("37");
    setFromUnit("celsius");
    setToUnit("fahrenheit");
    setResult(null);
    setFormula("");
  };

  const getUnitSymbol = (unit: string) => {
    switch (unit) {
      case "celsius": return "°C";
      case "fahrenheit": return "°F";
      case "kelvin": return "K";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Temperature Converter – Celsius to Fahrenheit & Kelvin</h1>
        <p className="text-muted-foreground">
          Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly with our free online temperature converter. Get accurate conversions with the formula used shown clearly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter temperature"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v as typeof fromUnit); setResult(null); setFormula(""); }}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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
                {result !== null ? `${result}${getUnitSymbol(toUnit)}` : "—"}
              </div>
              <Select value={toUnit} onValueChange={(v) => { setToUnit(v as typeof toUnit); if (value) convert(); }}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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

        {formula && !result && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{formula}</p>
          </div>
        )}

        {result !== null && value && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Conversion Formula</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {formula}
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">All Equivalent Values</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Celsius</p>
                  <p className="text-xl font-semibold">
                    {fromUnit === "celsius" ? value : toUnit === "celsius" ? result : ((fromUnit === "fahrenheit" ? (parseFloat(value) - 32) * 5/9 : (parseFloat(value) - 273.15)).toFixed(2))}°C
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fahrenheit</p>
                  <p className="text-xl font-semibold">
                    {fromUnit === "fahrenheit" ? value : toUnit === "fahrenheit" ? result : ((fromUnit === "celsius" ? (parseFloat(value) * 9/5) + 32 : (parseFloat(value) - 273.15) * 9/5 + 32).toFixed(2))}°F
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Kelvin</p>
                  <p className="text-xl font-semibold">
                    {fromUnit === "kelvin" ? value : toUnit === "kelvin" ? result : ((fromUnit === "celsius" ? parseFloat(value) + 273.15 : (parseFloat(value) - 32) * 5/9 + 273.15).toFixed(2))} K
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Temperature Scales</h2>
        <p className="text-muted-foreground">
          There are three main temperature scales in use today. Celsius is used worldwide for most applications. Fahrenheit is primarily used in the United States. Kelvin is the scientific standard used in physics and chemistry.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Temperature Scale Reference</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Celsius (°C)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Water freezes: 0°C</li>
              <li>• Water boils: 100°C</li>
              <li>• Body temperature: 37°C</li>
              <li>• Absolute zero: -273.15°C</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Fahrenheit (°F)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Water freezes: 32°F</li>
              <li>• Water boils: 212°F</li>
              <li>• Body temperature: 98.6°F</li>
              <li>• Absolute zero: -459.67°F</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Kelvin (K)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Water freezes: 273.15 K</li>
              <li>• Water boils: 373.15 K</li>
              <li>• Body temperature: 310.15 K</li>
              <li>• Absolute zero: 0 K</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Conversion Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Celsius ↔ Fahrenheit</h3>
            <code className="text-sm font-mono bg-background px-3 py-2 rounded block">
              °F = (°C × 9/5) + 32<br />
              °C = (°F - 32) × 5/9
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Celsius ↔ Kelvin</h3>
            <code className="text-sm font-mono bg-background px-3 py-2 rounded block">
              K = °C + 273.15<br />
              °C = K - 273.15
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Fahrenheit ↔ Kelvin</h3>
            <code className="text-sm font-mono bg-background px-3 py-2 rounded block">
              K = (°F - 32) × 5/9 + 273.15<br />
              °F = (K - 273.15) × 9/5 + 32
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Quick Approximations</h3>
            <code className="text-sm font-mono bg-background px-3 py-2 rounded block">
              °F ≈ °C × 2 + 30 (rough)<br />
              °C ≈ (°F - 30) / 2 (rough)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Temperature Conversions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Celsius</th>
                <th className="text-left p-3">Fahrenheit</th>
                <th className="text-left p-3">Kelvin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Absolute Zero</td>
                <td className="p-3 font-mono">-273.15°C</td>
                <td className="p-3 font-mono">-459.67°F</td>
                <td className="p-3 font-mono">0 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Water Freezes</td>
                <td className="p-3 font-mono">0°C</td>
                <td className="p-3 font-mono">32°F</td>
                <td className="p-3 font-mono">273.15 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Room Temperature</td>
                <td className="p-3 font-mono">20-22°C</td>
                <td className="p-3 font-mono">68-72°F</td>
                <td className="p-3 font-mono">293-295 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Body Temperature</td>
                <td className="p-3 font-mono">37°C</td>
                <td className="p-3 font-mono">98.6°F</td>
                <td className="p-3 font-mono">310.15 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Water Boils</td>
                <td className="p-3 font-mono">100°C</td>
                <td className="p-3 font-mono">212°F</td>
                <td className="p-3 font-mono">373.15 K</td>
              </tr>
              <tr>
                <td className="p-3">Oven (Moderate)</td>
                <td className="p-3 font-mono">180°C</td>
                <td className="p-3 font-mono">356°F</td>
                <td className="p-3 font-mono">453.15 K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why does Fahrenheit seem so strange?</h3>
            <p className="text-sm text-muted-foreground">
              Fahrenheit was designed so 0°F was the coldest temperature achievable with a salt-ice mixture, and 100°F was roughly body temperature. The scale was later adjusted, making water freeze at 32°F and boil at 212°F.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why use Kelvin in science?</h3>
            <p className="text-sm text-muted-foreground">
              Kelvin starts at absolute zero (0 K), making it ideal for scientific calculations. Unlike Celsius and Fahrenheit, Kelvin has no negative values and directly relates to thermal energy.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">At what temperature are Celsius and Fahrenheit equal?</h3>
            <p className="text-sm text-muted-foreground">
              Celsius and Fahrenheit are equal at -40 degrees. -40°C = -40°F. This is the only point where the two scales intersect.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I quickly estimate Celsius to Fahrenheit?</h3>
            <p className="text-sm text-muted-foreground">
              For a rough estimate: double the Celsius value and add 30. For 20°C: 20×2+30 = 70°F (actual is 68°F). Close enough for everyday use!
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
          <a href="/math-tools/weight-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Weight Converter</p>
            <p className="text-xs text-muted-foreground">kg, lbs, g, oz</p>
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
