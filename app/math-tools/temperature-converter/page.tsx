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

    </div>
  );
}
