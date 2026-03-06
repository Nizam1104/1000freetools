"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units: Record<string, number> = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3600000,
  btu: 1055.06,
  footPound: 1.35582,
};

const unitLabels: Record<string, string> = {
  joule: "Joules (J)",
  kilojoule: "Kilojoules (kJ)",
  calorie: "Calories (cal)",
  kilocalorie: "Kilocalories (kcal)",
  wattHour: "Watt-hours (Wh)",
  kilowattHour: "Kilowatt-hours (kWh)",
  btu: "British Thermal Units (BTU)",
  footPound: "Foot-pounds (ft-lb)",
};

export default function EnergyConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("joule");
  const [toUnit, setToUnit] = useState("kilojoule");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const joules = val * units[fromUnit];
    const converted = joules / units[toUnit];
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
    setFromUnit("kilowattHour");
    setToUnit("joule");
    setResult(null);
  };

  const round = (n: number): string => {
    if (n === 0) return "0";
    if (Math.abs(n) >= 1000000 || Math.abs(n) < 0.0001) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(8)).toString();
  };

  const getUnitSymbol = (unit: string): string => {
    const symbols: Record<string, string> = {
      joule: "J",
      kilojoule: "kJ",
      calorie: "cal",
      kilocalorie: "kcal",
      wattHour: "Wh",
      kilowattHour: "kWh",
      btu: "BTU",
      footPound: "ft-lb",
    };
    return symbols[unit] || "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Energy Converter – Convert Joules, Calories, kWh Online</h1>
        <p className="text-muted-foreground">
          Convert between any energy unit with our free online energy converter. Supports joules, calories, kilocalories, kilowatt-hours, BTU, and more for science and engineering.
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
                <SelectTrigger className="w-44">
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
                <SelectTrigger className="w-44">
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
        <h2 className="text-2xl font-semibold">Energy Units Explained</h2>
        <p className="text-muted-foreground">
          Energy can be measured in various units depending on the context. Joules are the SI unit used in physics. Calories are commonly used in nutrition. Kilowatt-hours are used for electricity billing. BTUs are used in heating and cooling systems. Understanding these conversions is essential for science, engineering, and everyday applications.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Energy Unit Reference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">SI Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Joule (J) = Base SI unit</li>
              <li>• 1 Kilojoule (kJ) = 1,000 J</li>
              <li>• 1 Watt-hour (Wh) = 3,600 J</li>
              <li>• 1 Kilowatt-hour (kWh) = 3,600,000 J</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Other Common Units</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 Calorie (cal) = 4.184 J</li>
              <li>• 1 Kilocalorie (kcal) = 4,184 J</li>
              <li>• 1 BTU = 1,055.06 J</li>
              <li>• 1 Foot-pound (ft-lb) = 1.356 J</li>
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
                <td className="p-3">1 kWh</td>
                <td className="p-3">Joules</td>
                <td className="p-3 font-mono">3,600,000 J</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 kcal</td>
                <td className="p-3">Joules</td>
                <td className="p-3 font-mono">4,184 J</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 BTU</td>
                <td className="p-3">Joules</td>
                <td className="p-3 font-mono">1,055 J</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 kWh</td>
                <td className="p-3">BTU</td>
                <td className="p-3 font-mono">3,412 BTU</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">1 kcal</td>
                <td className="p-3">Calories</td>
                <td className="p-3 font-mono">1,000 cal</td>
              </tr>
              <tr>
                <td className="p-3">1 J</td>
                <td className="p-3">Foot-pounds</td>
                <td className="p-3 font-mono">0.738 ft-lb</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Energy Conversions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Food Energy</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 500 food Calories (kcal) to joules
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              500 kcal × 4,184 = 2,092,000 J = 2,092 kJ
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Electricity Usage</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 15 kWh to joules
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              15 kWh × 3,600,000 = 54,000,000 J = 54 MJ
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Heating/Cooling</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Converting 10,000 BTU to kWh
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              10,000 BTU ÷ 3,412 = 2.93 kWh
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between cal and kcal?</h3>
            <p className="text-sm text-muted-foreground">
              1 kcal (kilocalorie) = 1,000 cal (calories). Food labels use "Calories" with a capital C, which actually means kilocalories. So 200 Calories = 200 kcal = 200,000 cal.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many joules in 1 kWh?</h3>
            <p className="text-sm text-muted-foreground">
              1 kWh equals exactly 3,600,000 joules (3.6 megajoules). This is because 1 watt = 1 joule/second, and there are 3,600 seconds in an hour.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a BTU?</h3>
            <p className="text-sm text-muted-foreground">
              BTU stands for British Thermal Unit. It's the energy needed to heat 1 pound of water by 1°F. Commonly used for air conditioners, heaters, and gas appliances.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I convert electricity usage to cost?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply kWh by your electricity rate. For example, 100 kWh at $0.12/kWh = $12. Check your utility bill for your exact rate per kWh.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/power-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Power Converter</p>
            <p className="text-xs text-muted-foreground">Watts, horsepower</p>
          </a>
          <a href="/math-tools/temperature-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Temperature Converter</p>
            <p className="text-xs text-muted-foreground">Celsius, Fahrenheit, Kelvin</p>
          </a>
          <a href="/math-tools/pressure-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pressure Converter</p>
            <p className="text-xs text-muted-foreground">Pa, bar, psi, atm</p>
          </a>
        </div>
      </section>
    </div>
  );
}
