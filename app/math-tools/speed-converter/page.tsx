"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  meterPerSecond: 1,
  kilometerPerHour: 0.277778,
  milePerHour: 0.44704,
  footPerSecond: 0.3048,
  knot: 0.514444,
  mach: 343,
  speedOfLight: 299792458,
};

const unitLabels: Record<string, string> = {
  meterPerSecond: "Meters/second (m/s)",
  kilometerPerHour: "Kilometers/hour (km/h)",
  milePerHour: "Miles/hour (mph)",
  footPerSecond: "Feet/second (ft/s)",
  knot: "Knots (kn)",
  mach: "Mach",
  speedOfLight: "Speed of light (c)",
};

export default function SpeedConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilometerPerHour");
  const [toUnit, setToUnit] = useState("milePerHour");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const mps = val * units[fromUnit];
    const converted = mps / units[toUnit];
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
    setValue("100");
    setFromUnit("kilometerPerHour");
    setToUnit("milePerHour");
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
      meterPerSecond: "m/s",
      kilometerPerHour: "km/h",
      milePerHour: "mph",
      footPerSecond: "ft/s",
      knot: "kn",
      mach: "Mach",
      speedOfLight: "c",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Speed Converter – Convert mph, km/h, m/s Online</h1>
        <p className="text-muted-foreground">
          Convert between any speed unit with our free online speed converter. Covers mph, km/h, m/s, knots, and more for travel, physics, and engineering applications.
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
        <h2 className="text-2xl font-semibold">Speed Units Explained</h2>
        <p className="text-muted-foreground">
          Speed measures how fast an object moves – the distance traveled per unit of time. Different fields use different units: km/h for road speeds in most countries, mph in the US and UK, m/s in science, knots in aviation and maritime, and Mach for aircraft speeds relative to sound.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Speed Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Common Speed Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 m/s = 3.6 km/h = 2.237 mph</li>
              <li>• 1 km/h = 0.278 m/s = 0.621 mph</li>
              <li>• 1 mph = 1.609 km/h = 0.447 m/s</li>
              <li>• 1 knot = 1.852 km/h = 1.151 mph</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Special Speed Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 ft/s = 0.305 m/s = 1.097 km/h</li>
              <li>• Mach 1 = 343 m/s (speed of sound at sea level)</li>
              <li>• Speed of light (c) = 299,792,458 m/s</li>
              <li>• 1 km/h = 0.540 knots</li>
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
                <td className="p-3">1 km/h</td>
                <td className="p-3">mph</td>
                <td className="p-3 font-mono">0.621 mph</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 mph</td>
                <td className="p-3">km/h</td>
                <td className="p-3 font-mono">1.609 km/h</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 m/s</td>
                <td className="p-3">km/h</td>
                <td className="p-3 font-mono">3.6 km/h</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 knot</td>
                <td className="p-3">km/h</td>
                <td className="p-3 font-mono">1.852 km/h</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 knot</td>
                <td className="p-3">mph</td>
                <td className="p-3 font-mono">1.151 mph</td>
              </tr>
              <tr>
                <td className="p-3">Mach 1</td>
                <td className="p-3">km/h</td>
                <td className="p-3 font-mono">1,235 km/h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Speed Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Highway Speed</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 65 mph to km/h
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              65 mph × 1.609 = 104.6 km/h
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Running Pace</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 10 km/h to mph
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              10 km/h × 0.621 = 6.21 mph
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Aviation Speed</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 500 knots to km/h
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              500 knots × 1.852 = 926 km/h
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I quickly convert km/h to mph?</h3>
            <p className="text-sm text-muted-foreground">
              For a rough estimate, divide km/h by 1.6 or multiply by 0.6. For example, 100 km/h ÷ 1.6 ≈ 62.5 mph (actual: 62.1 mph).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a knot?</h3>
            <p className="text-sm text-muted-foreground">
              A knot equals one nautical mile per hour. One nautical mile = 1.852 km = 1.151 statute miles. Knots are used in aviation and maritime because they relate to latitude/longitude measurements.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does Mach number mean?</h3>
            <p className="text-sm text-muted-foreground">
              Mach number is the ratio of an object's speed to the speed of sound. Mach 1 = speed of sound (about 1,235 km/h at sea level). Mach 2 = twice the speed of sound.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why do different countries use different speed units?</h3>
            <p className="text-sm text-muted-foreground">
              Most countries use km/h as part of the metric system. The US, UK, and some others use mph due to historical use of imperial units. Scientific work universally uses m/s.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/distance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Distance Calculator</p>
            <p className="text-xs text-muted-foreground">Distance, rate, time</p>
          </a>
          <a href="/math-tools/length-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Length Converter</p>
            <p className="text-xs text-muted-foreground">Meters, feet, miles</p>
          </a>
          <a href="/math-tools/time-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Time Converter</p>
            <p className="text-xs text-muted-foreground">Seconds, minutes, hours</p>
          </a>
        </div>
      </section>
    </div>
  );
}
