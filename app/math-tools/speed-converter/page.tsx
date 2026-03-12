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

  const loadExample = (val: string, from: string, to: string) => {
    setValue(val);
    setFromUnit(from);
    setToUnit(to);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "kilometerPerHour", "milePerHour")}>100 km/h to mph</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("60", "milePerHour", "kilometerPerHour")}>60 mph to km/h</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("340", "meterPerSecond", "mach")}>340 m/s to Mach</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "speedOfLight", "kilometerPerHour")}>Speed of light to km/h</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10", "knot", "kilometerPerHour")}>10 knots to km/h</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("9.8", "meterPerSecond", "footPerSecond")}>9.8 m/s to ft/s</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "mach", "milePerHour")}>Mach 2 to mph</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Speed Units</h2>
          <p className="text-muted-foreground">
            Speed measures how fast something moves – the distance covered per unit of time. Different fields use different units. Scientists prefer meters per second (m/s). Drivers see kilometers per hour (km/h) or miles per hour (mph). Pilots and sailors use knots. Aerospace engineers talk about Mach numbers. This converter handles all of them.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The beauty of unit conversion is that the actual speed doesn't change – only how we express it. A car going 60 mph is the same as one going 96.56 km/h. The physics is identical; we're just using different measuring sticks.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Speed Units Explained</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Meters per second (m/s)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The SI (metric) standard unit for speed. Used in physics, engineering, and scientific research worldwide.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              1 m/s = 3.6 km/h = 2.237 mph
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Kilometers per hour (km/h)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Standard for road signs and vehicle speedometers in most countries. Used across Europe, Asia, Africa, and South America.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              100 km/h = 62.14 mph
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Miles per hour (mph)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Used primarily in the United States, United Kingdom, and a few other countries for road speeds and weather reports.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              60 mph = 96.56 km/h
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Knots (kn or kt)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              One nautical mile per hour. Standard in aviation and maritime navigation. One knot ≈ 1.15 mph.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              1 knot = 1.852 km/h = 1.151 mph
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Mach number</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Ratio of speed to the speed of sound. Mach 1 = speed of sound (~343 m/s at sea level). Used for aircraft and projectiles.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              Mach 1 ≈ 1,235 km/h ≈ 767 mph
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Speed of light (c)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The universal speed limit: 299,792,458 m/s. Used in physics and astronomy. Nothing with mass can reach this speed.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              c ≈ 1.08 billion km/h ≈ 671 million mph
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Highway speed conversion</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Convert 100 km/h to mph (European speed limit to US equivalent)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 100 km/h × (0.6214 mph/km/h) = 62.14 mph
            </p>
            <p className="text-sm text-muted-foreground">
              A 100 km/h highway sign in Europe equals about 62 mph in the US.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Aircraft speed</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A jet flies at Mach 2. What's its speed in km/h?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Mach 2 = 2 × 343 m/s = 686 m/s
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              686 m/s × 3.6 = 2,469.6 km/h
            </p>
            <p className="text-sm text-muted-foreground">
              That's about 2,470 km/h or roughly twice the speed of sound.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Sprinting speed</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Usain Bolt's top speed was about 12.4 m/s. Convert to km/h and mph.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 12.4 m/s × 3.6 = 44.64 km/h
            </p>
            <p className="text-sm text-muted-foreground">
              12.4 m/s × 2.237 = 27.74 mph. The fastest human runs at highway speeds!
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Maritime navigation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A ship cruises at 20 knots. What's that in km/h?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 20 knots × 1.852 km/h per knot = 37.04 km/h
            </p>
            <p className="text-sm text-muted-foreground">
              That's about 23 mph – a typical cargo ship speed.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Light travel time</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How fast is light in km/h?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: c = 299,792,458 m/s × 3.6 = 1,079,252,848.8 km/h
            </p>
            <p className="text-sm text-muted-foreground">
              Light travels over 1 billion kilometers per hour. It circles Earth 7.5 times in one second.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The knot as a speed unit comes from an old sailing method. Sailors threw a wooden board (the "chip") attached to a knotted rope overboard. They counted how many knots passed through their hands in 30 seconds. Each knot represented one nautical mile per hour. The term "log" for speed measurement comes from the "chip log" device used for this purpose.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Speed Conversion Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Speed</th>
                <th className="text-left p-2">m/s</th>
                <th className="text-left p-2">km/h</th>
                <th className="text-left p-2">mph</th>
                <th className="text-left p-2">knots</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">Walking pace</td>
                <td className="p-2 font-mono">1.4</td>
                <td className="p-2 font-mono">5</td>
                <td className="p-2 font-mono">3.1</td>
                <td className="p-2 font-mono">2.7</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">City driving</td>
                <td className="p-2 font-mono">13.9</td>
                <td className="p-2 font-mono">50</td>
                <td className="p-2 font-mono">31</td>
                <td className="p-2 font-mono">27</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Highway speed</td>
                <td className="p-2 font-mono">27.8</td>
                <td className="p-2 font-mono">100</td>
                <td className="p-2 font-mono">62</td>
                <td className="p-2 font-mono">54</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Commercial jet</td>
                <td className="p-2 font-mono">250</td>
                <td className="p-2 font-mono">900</td>
                <td className="p-2 font-mono">560</td>
                <td className="p-2 font-mono">486</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">Speed of sound</td>
                <td className="p-2 font-mono">343</td>
                <td className="p-2 font-mono">1,235</td>
                <td className="p-2 font-mono">767</td>
                <td className="p-2 font-mono">667</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Speed of light</td>
                <td className="p-2 font-mono">299,792,458</td>
                <td className="p-2 font-mono">1.08×10⁹</td>
                <td className="p-2 font-mono">6.71×10⁸</td>
                <td className="p-2 font-mono">5.83×10⁸</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I quickly convert km/h to mph in my head?</h4>
            <p className="text-sm text-muted-foreground">
              Divide by 8, then multiply by 5. For 100 km/h: 100÷8 = 12.5, then 12.5×5 = 62.5 mph. Close enough for quick estimates. Or just remember: 100 km/h ≈ 62 mph, 50 km/h ≈ 31 mph.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do airplanes use knots instead of mph?</h4>
            <p className="text-sm text-muted-foreground">
              Knots tie directly to nautical miles, which are based on Earth's geometry (1 nautical mile = 1 minute of latitude). This makes navigation calculations simpler. One knot = one nautical mile per hour.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does Mach number change with altitude?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The speed of sound varies with temperature, which changes with altitude. At sea level (15°C), Mach 1 ≈ 343 m/s. At 35,000 feet (-54°C), Mach 1 ≈ 295 m/s. Pilots must account for this.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good conversion factor to remember?</h4>
            <p className="text-sm text-muted-foreground">
              Key factors: 1 m/s = 3.6 km/h (exact). 1 km/h ≈ 0.62 mph. 1 mph ≈ 1.61 km/h. 1 knot ≈ 1.85 km/h. These cover most everyday conversions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the speed of light exact?</h4>
            <p className="text-sm text-muted-foreground">
              Since 1983, the meter has been defined by the speed of light. Light travels exactly 299,792,458 meters in one second – by definition. This makes c an exact value, not a measurement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How fast is Earth moving through space?</h4>
            <p className="text-sm text-muted-foreground">
              Earth orbits the Sun at about 30 km/s (107,000 km/h or 67,000 mph). The Solar System moves through the galaxy at about 220 km/s. And our galaxy moves through space at about 600 km/s relative to the cosmic microwave background.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
