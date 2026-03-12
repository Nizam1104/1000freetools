"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  pascal: 1,
  kilopascal: 1000,
  megapascal: 1000000,
  bar: 100000,
  psi: 6894.76,
  atm: 101325,
  mmHg: 133.322,
  torr: 133.322,
};

const unitLabels: Record<string, string> = {
  pascal: "Pascals (Pa)",
  kilopascal: "Kilopascals (kPa)",
  megapascal: "Megapascals (MPa)",
  bar: "Bar",
  psi: "PSI (lb/in²)",
  atm: "Atmospheres (atm)",
  mmHg: "Millimeters of Mercury (mmHg)",
  torr: "Torr",
};

export default function PressureConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("bar");
  const [toUnit, setToUnit] = useState("psi");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const pascals = val * units[fromUnit];
    const converted = pascals / units[toUnit];
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
      pascal: "Pa",
      kilopascal: "kPa",
      megapascal: "MPa",
      bar: "bar",
      psi: "psi",
      atm: "atm",
      mmHg: "mmHg",
      torr: "Torr",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pressure Converter - Convert Pascal, Bar, PSI, ATM Online</h1>
        <p className="text-muted-foreground">
          Convert between any pressure unit with our free online pressure converter. Covers pascals, bar, PSI, atmospheres, mmHg, and more for science, engineering, and weather applications.
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "atm", "psi")}>1 atm to psi</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "bar", "psi")}>1 bar to psi</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("14.7", "psi", "atm")}>14.7 psi to atm</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("760", "mmHg", "atm")}>760 mmHg to atm</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("101.325", "kPa", "atm")}>101.325 kPa to atm</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3", "bar", "psi")}>3 bar to psi</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "MPa", "bar")}>1 MPa to bar</Button>
        </div>

        {result !== null && value && (
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Conversion Formula</h4>
            <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
              {value} {getUnitSymbol(fromUnit)} = {round(result)} {getUnitSymbol(toUnit)}
            </code>
          </div>
        )}

        {result !== null && value && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-3">All Unit Conversions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {Object.entries(unitLabels).map(([key, label]) => {
                const pascals = parseFloat(value) * units[fromUnit];
                const converted = pascals / units[key];
                return (
                  <div key={key} className="p-2 bg-background rounded">
                    <span className="text-muted-foreground">{getUnitSymbol(key)}:</span>
                    <span className="font-mono ml-2">{round(converted)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Pressure Units</h2>
        <p className="text-muted-foreground">
          Pressure measures force applied over an area. Different fields use different units: scientists prefer pascals (the SI unit), engineers often use PSI or bar, meteorologists use millibars or inches of mercury, and medical professionals use mmHg for blood pressure.
        </p>
        <p className="text-muted-foreground">
          Understanding how to convert between these units is essential for reading international specifications, comparing equipment ratings, and interpreting scientific data from different sources.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Pressure Units Explained</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Pascal (Pa)</h4>
            <p className="text-sm text-muted-foreground mb-2">The SI unit of pressure, named after Blaise Pascal.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 Pa = 1 N/m² (one newton per square meter)</div>
            <p className="text-xs text-muted-foreground mt-2">Very small unit - atmospheric pressure is ~101,325 Pa</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Bar</h4>
            <p className="text-sm text-muted-foreground mb-2">Metric unit, convenient for atmospheric pressures.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 bar = 100,000 Pa = 0.9869 atm</div>
            <p className="text-xs text-muted-foreground mt-2">Common in Europe for tire pressure and weather</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">PSI (lb/in²)</h4>
            <p className="text-sm text-muted-foreground mb-2">Pounds per square inch - Imperial/US unit.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 psi = 6,894.76 Pa</div>
            <p className="text-xs text-muted-foreground mt-2">Used for tire pressure, scuba tanks, hydraulic systems</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Atmosphere (atm)</h4>
            <p className="text-sm text-muted-foreground mb-2">Based on average sea-level atmospheric pressure.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 atm = 101,325 Pa = 14.696 psi</div>
            <p className="text-xs text-muted-foreground mt-2">Convenient reference point for many applications</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">mmHg / Torr</h4>
            <p className="text-sm text-muted-foreground mb-2">Millimeters of mercury - based on mercury column height.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 mmHg = 1 Torr = 133.322 Pa</div>
            <p className="text-xs text-muted-foreground mt-2">Used for blood pressure and vacuum measurements</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Kilopascal (kPa)</h4>
            <p className="text-sm text-muted-foreground mb-2">1,000 pascals - more practical than Pa alone.</p>
            <div className="font-mono text-xs bg-muted p-2 rounded">1 kPa = 1,000 Pa = 0.145 psi</div>
            <p className="text-xs text-muted-foreground mt-2">Common in automotive and HVAC applications</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Tire Pressure Conversion</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your car manual specifies 32 PSI, but your gauge reads in bar. What should you set?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>32 PSI to bar</div>
              <div>32 psi × 0.0689476 bar/psi = 2.206 bar</div>
              <div className="text-green-600 font-semibold">Set your tires to 2.21 bar</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Blood Pressure Reading</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A blood pressure of 120/80 mmHg - what is this in other units?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Systolic (120 mmHg):</div>
              <div>120 mmHg = 120 Torr = 15,999 Pa = 15.999 kPa = 2.32 psi</div>
              <div>Diastolic (80 mmHg):</div>
              <div>80 mmHg = 80 Torr = 10,666 Pa = 10.666 kPa = 1.55 psi</div>
              <div className="text-muted-foreground">Normal blood pressure is about 0.16/0.11 atm</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Scuba Diving</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A scuba tank is filled to 200 bar. What's this in PSI?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>200 bar to psi</div>
              <div>200 bar × 14.5038 psi/bar = 2,900.76 psi</div>
              <div className="text-green-600 font-semibold">The tank pressure is about 2,901 PSI</div>
              <div className="text-muted-foreground">At 30m depth (4 atm), you'd have ~50x that pressure outside!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Weather Pressure</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A weather report shows 1013.25 millibars. Convert to inches of mercury.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>1013.25 mbar = 101.325 kPa = 1 atm</div>
              <div>1 atm = 760 mmHg = 29.92 inches Hg</div>
              <div className="text-green-600 font-semibold">Standard atmospheric pressure: 29.92 inHg</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Evangelista Torricelli invented the barometer in 1643 by filling a glass tube with mercury and inverting it into a dish. He noticed the mercury column height changed with weather, proving air has weight and exerts pressure. The unit "torr" honors him. At sea level, mercury rises to about 760mm - this became the standard "atmosphere" of pressure.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between gauge and absolute pressure?</h4>
            <p className="text-sm text-muted-foreground">
              Gauge pressure measures relative to atmospheric pressure (what most gauges show). Absolute pressure includes atmospheric pressure. To convert: Absolute = Gauge + 1 atm. A tire gauge reading 32 PSI (gauge) is actually 32 + 14.7 = 46.7 PSI absolute.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are there so many pressure units?</h4>
            <p className="text-sm text-muted-foreground">
              Historical reasons and practical convenience. PSI works well for Imperial measurements, bar is close to atmospheric pressure, mmHg was natural for mercury barometers, and pascal is the coherent SI unit. Each stuck in its domain - changing would cause confusion and errors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What pressure unit should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Follow your field's convention: kPa or bar for automotive (tires), PSI for US equipment, mmHg for medical (blood pressure), atm or torr for chemistry, pascals for scientific papers. For international work, SI units (pascals) are preferred.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does altitude affect atmospheric pressure?</h4>
            <p className="text-sm text-muted-foreground">
              Pressure decreases with altitude. At sea level: 1 atm (101.3 kPa). At 5,000 ft: ~0.83 atm. At 10,000 ft: ~0.69 atm. At Mount Everest summit: ~0.33 atm. This is why airplanes must be pressurized and why cooking times increase at high altitude.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a vacuum in pressure terms?</h4>
            <p className="text-sm text-muted-foreground">
              A vacuum is pressure below atmospheric. "Perfect vacuum" = 0 absolute pressure (impossible to achieve). Industrial vacuums are measured in torr or mbar. A "good" vacuum might be 0.001 torr. Outer space has about 10⁻¹⁴ torr - extremely close to perfect vacuum.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert pressure to force?</h4>
            <p className="text-sm text-muted-foreground">
              Force = Pressure × Area. If you have 100 PSI acting on a 2 square inch piston: Force = 100 psi × 2 in² = 200 pounds of force. This is how hydraulic systems multiply force - small pressure on large area creates big force.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
