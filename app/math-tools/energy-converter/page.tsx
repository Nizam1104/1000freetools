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

    </div>
  );
}
