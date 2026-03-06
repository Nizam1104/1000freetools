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

  const loadExample = () => {
    setValue("1");
    setFromUnit("atm");
    setToUnit("psi");
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pressure Converter – Convert Pascal, Bar, PSI, ATM Online</h1>
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
        <h2 className="text-2xl font-semibold">Pressure Units Explained</h2>
        <p className="text-muted-foreground">
          Pressure is force applied per unit area. The SI unit is the pascal (Pa), but many other units are used in different fields. PSI is common in automotive and industrial applications. Bar is used in meteorology and diving. Atmospheres (atm) represents standard atmospheric pressure at sea level. mmHg and torr are used in medicine and vacuum systems.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Pressure Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">SI Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Pascal (Pa) = 1 N/m² (base unit)</li>
              <li>• 1 Kilopascal (kPa) = 1,000 Pa</li>
              <li>• 1 Megapascal (MPa) = 1,000,000 Pa</li>
              <li>• 1 Bar = 100,000 Pa = 100 kPa</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Other Common Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 PSI = 6,894.76 Pa</li>
              <li>• 1 atm = 101,325 Pa (standard atmospheric)</li>
              <li>• 1 mmHg = 133.322 Pa</li>
              <li>• 1 Torr = 133.322 Pa (≈ 1 mmHg)</li>
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
                <td className="p-3">1 atm</td>
                <td className="p-3">PSI</td>
                <td className="p-3 font-mono">14.696 psi</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 bar</td>
                <td className="p-3">PSI</td>
                <td className="p-3 font-mono">14.504 psi</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 atm</td>
                <td className="p-3">mmHg</td>
                <td className="p-3 font-mono">760 mmHg</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 bar</td>
                <td className="p-3">atm</td>
                <td className="p-3 font-mono">0.987 atm</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 kPa</td>
                <td className="p-3">PSI</td>
                <td className="p-3 font-mono">0.145 psi</td>
              </tr>
              <tr>
                <td className="p-3">1 PSI</td>
                <td className="p-3">kPa</td>
                <td className="p-3 font-mono">6.895 kPa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Pressure Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Tire Pressure</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 32 PSI to bar
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              32 PSI ÷ 14.504 = 2.21 bar
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Atmospheric Pressure</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Standard atmosphere to kPa
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              1 atm = 101.325 kPa = 14.696 PSI
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Blood Pressure</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 120 mmHg to kPa
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              120 mmHg × 0.133 = 16.0 kPa
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is standard atmospheric pressure?</h3>
            <p className="text-sm text-muted-foreground">
              Standard atmospheric pressure at sea level is 1 atm = 101,325 Pa = 14.696 PSI = 760 mmHg = 1.013 bar. This varies with altitude and weather conditions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What PSI should car tires be?</h3>
            <p className="text-sm text-muted-foreground">
              Most passenger cars recommend 30-35 PSI when cold. Check your vehicle's door jamb or owner's manual for the exact specification. Never exceed the maximum PSI on the tire sidewall.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between bar and atm?</h3>
            <p className="text-sm text-muted-foreground">
              1 bar = 100,000 Pa exactly, while 1 atm = 101,325 Pa (standard atmospheric pressure). They're close: 1 bar = 0.987 atm. Bar is more commonly used in Europe and in diving.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is blood pressure measured in mmHg?</h3>
            <p className="text-sm text-muted-foreground">
              Blood pressure was originally measured using mercury (Hg) manometers. The height of the mercury column in millimeters gave the pressure reading. The tradition continues even with digital monitors.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/temperature-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Temperature Converter</p>
            <p className="text-xs text-muted-foreground">Celsius, Fahrenheit, Kelvin</p>
          </a>
          <a href="/math-tools/energy-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Energy Converter</p>
            <p className="text-xs text-muted-foreground">Joules, calories, kWh</p>
          </a>
          <a href="/math-tools/force-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Force Converter</p>
            <p className="text-xs text-muted-foreground">Newtons, pounds-force</p>
          </a>
        </div>
      </section>
    </div>
  );
}
