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
    } else {
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

  const loadExample = (val: string, from: "celsius" | "fahrenheit" | "kelvin", to: "celsius" | "fahrenheit" | "kelvin") => {
    setValue(val);
    setFromUnit(from);
    setToUnit(to);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("37", "celsius", "fahrenheit")}>37°C (body temp)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("0", "celsius", "fahrenheit")}>0°C (freezing)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "celsius", "fahrenheit")}>100°C (boiling)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("98.6", "fahrenheit", "celsius")}>98.6°F (body temp)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("32", "fahrenheit", "celsius")}>32°F (freezing)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("273.15", "kelvin", "celsius")}>273.15K (0°C)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("-40", "celsius", "fahrenheit")}>-40° (same both)</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Temperature Scales</h2>
          <p className="text-muted-foreground">
            Temperature measures how hot or cold something is, but different scales use different reference points. Celsius sets 0° at water's freezing point and 100° at boiling. Fahrenheit uses 32° for freezing and 212° for boiling. Kelvin starts at absolute zero – the coldest possible temperature where molecular motion stops.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Scientists use Kelvin because it's an absolute scale with no negative values. Weather forecasters use Celsius or Fahrenheit depending on the country. Cooking recipes might use any of the three. This converter handles all the math so you can focus on what matters.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Temperature Conversion Formulas</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Celsius to Fahrenheit</h4>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              °F = (°C × 9/5) + 32
            </code>
            <p className="text-xs text-muted-foreground">
              Example: 20°C = (20 × 1.8) + 32 = 68°F
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Fahrenheit to Celsius</h4>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              °C = (°F - 32) × 5/9
            </code>
            <p className="text-xs text-muted-foreground">
              Example: 68°F = (68 - 32) × 5/9 = 20°C
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Celsius to Kelvin</h4>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              K = °C + 273.15
            </code>
            <p className="text-xs text-muted-foreground">
              Example: 25°C = 25 + 273.15 = 298.15 K
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Kelvin to Celsius</h4>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block mb-2">
              °C = K - 273.15
            </code>
            <p className="text-xs text-muted-foreground">
              Example: 300 K = 300 - 273.15 = 26.85°C
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Body temperature</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Convert normal body temperature 98.6°F to Celsius
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: °C = (98.6 - 32) × 5/9 = 66.6 × 5/9
            </p>
            <p className="text-sm text-muted-foreground">
              °C = 333/9 = 37°C. Normal body temperature is 37°C.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Oven temperature</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A recipe calls for 180°C. What's that in Fahrenheit?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: °F = (180 × 9/5) + 32 = 324 + 32
            </p>
            <p className="text-sm text-muted-foreground">
              °F = 356°F. Set your oven to 350-360°F.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Absolute zero</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: What is absolute zero (0 K) in Celsius and Fahrenheit?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: °C = 0 - 273.15 = -273.15°C
            </p>
            <p className="text-sm text-muted-foreground">
              °F = (-273.15 × 9/5) + 32 = -459.67°F. The coldest possible temperature.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Room temperature</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Convert comfortable room temperature 20°C to all scales
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: °F = (20 × 9/5) + 32 = 36 + 32 = 68°F
            </p>
            <p className="text-sm text-muted-foreground">
              K = 20 + 273.15 = 293.15 K. Room temperature is 20°C / 68°F / 293.15 K.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: The -40 coincidence</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: At what temperature are Celsius and Fahrenheit equal?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Set °C = °F = x. Then x = (x × 9/5) + 32
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              x - 9x/5 = 32 → -4x/5 = 32 → x = -40
            </p>
            <p className="text-sm text-muted-foreground">
              -40°C = -40°F. The only temperature where both scales read the same!
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            Daniel Fahrenheit originally defined 0°F as the temperature of a brine solution (ice, water, and ammonium chloride). He set 96°F as human body temperature (later adjusted to 98.6°F). Anders Celsius originally defined 0° as boiling and 100° as freezing – the reverse of today's scale! It was flipped after his death for intuitive sense.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Temperature Reference Points</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Phenomenon</th>
                <th className="text-left p-2">Celsius</th>
                <th className="text-left p-2">Fahrenheit</th>
                <th className="text-left p-2">Kelvin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Absolute zero</td>
                <td className="p-2 font-mono">-273.15°C</td>
                <td className="p-2 font-mono">-459.67°F</td>
                <td className="p-2 font-mono">0 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Water freezes</td>
                <td className="p-2 font-mono">0°C</td>
                <td className="p-2 font-mono">32°F</td>
                <td className="p-2 font-mono">273.15 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Room temperature</td>
                <td className="p-2 font-mono">20°C</td>
                <td className="p-2 font-mono">68°F</td>
                <td className="p-2 font-mono">293.15 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Body temperature</td>
                <td className="p-2 font-mono">37°C</td>
                <td className="p-2 font-mono">98.6°F</td>
                <td className="p-2 font-mono">310.15 K</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Water boils</td>
                <td className="p-2 font-mono">100°C</td>
                <td className="p-2 font-mono">212°F</td>
                <td className="p-2 font-mono">373.15 K</td>
              </tr>
              <tr>
                <td className="p-2">Surface of Sun</td>
                <td className="p-2 font-mono">5,500°C</td>
                <td className="p-2 font-mono">9,932°F</td>
                <td className="p-2 font-mono">5,773 K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does Fahrenheit seem so arbitrary?</h4>
            <p className="text-sm text-muted-foreground">
              Fahrenheit's scale was based on practical reference points available in 1724: 0°F was the coldest temperature he could reliably reproduce (brine solution), 32°F was water's freezing point, and 96°F was body temperature. The scale was designed for everyday use, not scientific elegance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is Kelvin used in science?</h4>
            <p className="text-sm text-muted-foreground">
              Kelvin is an absolute scale starting at absolute zero. This makes equations simpler – no negative temperatures to worry about. Gas laws, thermodynamics, and quantum mechanics all work more cleanly with Kelvin. One Kelvin degree equals one Celsius degree.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert quickly without a calculator?</h4>
            <p className="text-sm text-muted-foreground">
              For °C to °F: Double the Celsius, subtract 10%, add 32. For 20°C: 20×2=40, 40-4=36, 36+32=68°F. For °F to °C: Subtract 32, halve, add 10%. For 68°F: 68-32=36, 36/2=18, 18+2=20°C. Close enough for weather!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the coldest temperature possible?</h4>
            <p className="text-sm text-muted-foreground">
              Absolute zero: 0 K, -273.15°C, or -459.67°F. At this temperature, all molecular motion stops (classically). Quantum mechanics says there's still zero-point energy, but you can't get colder. Scientists have reached within billionths of a degree of absolute zero in labs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why 273.15 specifically?</h4>
            <p className="text-sm text-muted-foreground">
              The value comes from the triple point of water – where ice, liquid, and vapor coexist. This occurs at exactly 0.01°C or 273.16 K. The offset is defined so that absolute zero is exactly -273.15°C. It's a measured physical constant, not an arbitrary number.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Which countries use Fahrenheit?</h4>
            <p className="text-sm text-muted-foreground">
              Only the United States, its territories, and a few Caribbean nations (Bahamas, Cayman Islands) use Fahrenheit for everyday temperatures. Everyone else uses Celsius. Scientists worldwide use Kelvin for research and Celsius for most applications.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/unit-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Unit Converter</p>
            <p className="text-xs text-muted-foreground">All unit conversions</p>
          </a>
          <a href="/math-tools/speed-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Speed Converter</p>
            <p className="text-xs text-muted-foreground">Speed units</p>
          </a>
          <a href="/math-tools/energy-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Energy Converter</p>
            <p className="text-xs text-muted-foreground">Energy units</p>
          </a>
        </div>
      </section>
    </div>
  );
}
