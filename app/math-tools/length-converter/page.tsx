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

const examples = [
  { value: "1", from: "kilometer", to: "mile", label: "1 km to miles" },
  { value: "5280", from: "foot", to: "mile", label: "5280 ft to miles" },
  { value: "100", from: "centimeter", to: "inch", label: "100 cm to inches" },
  { value: "2.54", from: "inch", to: "centimeter", label: "2.54 in to cm" },
  { value: "1", from: "nauticalMile", to: "kilometer", label: "1 nautical mile to km" },
  { value: "1000", from: "nanometer", to: "micrometer", label: "1000 nm to μm" },
  { value: "1760", from: "yard", to: "mile", label: "1760 yd to miles" },
];

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

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setValue(ex.value);
    setFromUnit(ex.from);
    setToUnit(ex.to);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.label}
            </Button>
          ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Length Conversion</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Length conversion is the process of changing a measurement from one unit to another while keeping the same actual distance. Whether you're working with the metric system (meters, centimeters, kilometers) or the imperial system (feet, inches, miles), the underlying principle remains the same: multiply by a conversion factor.
          </p>
          <p className="text-muted-foreground">
            This converter handles eleven different length units, from nanometers (one billionth of a meter) to nautical miles (used in aviation and maritime navigation). The tool converts through meters as an intermediate step, ensuring accurate results across all unit combinations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Conversion Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            To convert from one unit to another, we use this two-step process:
          </p>
          <div className="font-mono text-sm space-y-2">
            <div><strong>Step 1:</strong> Convert to meters: meters = value × fromUnit_factor</div>
            <div><strong>Step 2:</strong> Convert to target: result = meters ÷ toUnit_factor</div>
            <div className="pt-2 border-t"><strong>Combined:</strong> result = value × (fromUnit_factor ÷ toUnit_factor)</div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            For example, to convert 5 kilometers to feet: 5 × (1000 ÷ 0.3048) = 5 × 3280.84 = 16,404.2 feet
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Kilometers to Miles</h4>
            <p className="text-sm text-muted-foreground mb-3">Convert 10 kilometers to miles</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>10 km × (1000 m/km) = 10,000 meters</div>
              <div>10,000 m ÷ 1609.344 m/mi = 6.2137 miles</div>
              <div className="pt-2 font-semibold">Answer: 10 km = 6.21 miles</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Feet to Centimeters</h4>
            <p className="text-sm text-muted-foreground mb-3">Convert 6 feet to centimeters</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>6 ft × 0.3048 m/ft = 1.8288 meters</div>
              <div>1.8288 m ÷ 0.01 m/cm = 182.88 cm</div>
              <div className="pt-2 font-semibold">Answer: 6 ft = 182.88 cm</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Inches to Millimeters</h4>
            <p className="text-sm text-muted-foreground mb-3">Convert 12 inches to millimeters</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>12 in × 0.0254 m/in = 0.3048 meters</div>
              <div>0.3048 m ÷ 0.001 m/mm = 304.8 mm</div>
              <div className="pt-2 font-semibold">Answer: 12 in = 304.8 mm</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Meters to Yards</h4>
            <p className="text-sm text-muted-foreground mb-3">Convert 100 meters to yards</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>100 m ÷ 0.9144 m/yd = 109.36 yards</div>
              <div className="pt-2 font-semibold">Answer: 100 m = 109.36 yd</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole along a meridian through Paris. Today, it's defined by the distance light travels in a vacuum in 1/299,792,458 of a second – making it one of the most precisely defined units in science.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert meters to feet manually?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply meters by 3.28084. For example, 5 meters × 3.28084 = 16.4042 feet. To go the other way, divide feet by 3.28084 or multiply by 0.3048.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a nautical mile and a regular mile?</h4>
            <p className="text-sm text-muted-foreground">
              A nautical mile equals 1,852 meters (about 1.15 statute miles). It's based on one minute of latitude and is used in aviation and maritime navigation because it relates directly to Earth's geometry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many centimeters are in an inch?</h4>
            <p className="text-sm text-muted-foreground">
              Exactly 2.54 centimeters make one inch. This conversion factor is defined by international agreement and is used worldwide for precise conversions between metric and imperial systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are there 5,280 feet in a mile?</h4>
            <p className="text-sm text-muted-foreground">
              The number comes from the Roman mille passus (thousand paces), which was 5,000 Roman feet. When the British standardized the mile in 1593, they adjusted it to 5,280 feet to make it divisible by 8 (for furlongs) and other common measurements.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a micrometer used for?</h4>
            <p className="text-sm text-muted-foreground">
              A micrometer (μm) is one millionth of a meter. It's commonly used to measure microscopic objects like bacteria (1-10 μm), human hair diameter (50-100 μm), and wavelengths of infrared light.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is this converter?</h4>
            <p className="text-sm text-muted-foreground">
              The converter uses exact conversion factors defined by international standards. Results are accurate to at least 10 significant figures, which is more than sufficient for any practical application.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/area-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Converter</p>
            <p className="text-xs text-muted-foreground">Convert square units</p>
          </a>
          <a href="/math-tools/volume-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Converter</p>
            <p className="text-xs text-muted-foreground">Convert cubic units</p>
          </a>
          <a href="/math-tools/weight-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Weight Converter</p>
            <p className="text-xs text-muted-foreground">Convert mass units</p>
          </a>
        </div>
      </section>
    </div>
  );
}
