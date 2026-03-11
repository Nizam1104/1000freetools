"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberUnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("bytes");
  const [toUnit, setToUnit] = useState("kb");
  const [result, setResult] = useState("");
  const [category, setCategory] = useState<"bytes" | "length" | "weight" | "time">("bytes");

  const conversions: Record<string, Record<string, number>> = {
    // Digital Storage (bytes base)
    bytes: { bytes: 1, kb: 1/1024, mb: 1/(1024*1024), gb: 1/(1024*1024*1024), tb: 1/(1024*1024*1024*1024) },
    kb: { bytes: 1024, kb: 1, mb: 1/1024, gb: 1/(1024*1024), tb: 1/(1024*1024*1024) },
    mb: { bytes: 1024*1024, kb: 1024, mb: 1, gb: 1/1024, tb: 1/(1024*1024) },
    gb: { bytes: 1024*1024*1024, kb: 1024*1024, mb: 1024, gb: 1, tb: 1/1024 },
    tb: { bytes: 1024*1024*1024*1024, kb: 1024*1024*1024, mb: 1024*1024, gb: 1024, tb: 1 },
    
    // Length (meters base)
    m: { m: 1, km: 1/1000, cm: 100, mm: 1000, ft: 3.28084, in: 39.3701, mi: 0.000621371 },
    km: { m: 1000, km: 1, cm: 100000, mm: 1000000, ft: 3280.84, in: 39370.1, mi: 0.621371 },
    cm: { m: 0.01, km: 0.00001, cm: 1, mm: 10, ft: 0.0328084, in: 0.393701, mi: 0.00000621371 },
    mm: { m: 0.001, km: 0.000001, cm: 0.1, mm: 1, ft: 0.00328084, in: 0.0393701, mi: 0.000000621371 },
    ft: { m: 0.3048, km: 0.0003048, cm: 30.48, mm: 304.8, ft: 1, in: 12, mi: 0.000189394 },
    in: { m: 0.0254, km: 0.0000254, cm: 2.54, mm: 25.4, ft: 0.0833333, in: 1, mi: 0.0000157828 },
    mi: { m: 1609.34, km: 1.60934, cm: 160934, mm: 1609340, ft: 5280, in: 63360, mi: 1 },
    
    // Weight (grams base)
    g: { g: 1, kg: 0.001, mg: 1000, lb: 0.00220462, oz: 0.035274 },
    kg: { g: 1000, kg: 1, mg: 1000000, lb: 2.20462, oz: 35.274 },
    mg: { g: 0.001, kg: 0.000001, mg: 1, lb: 0.00000220462, oz: 0.000035274 },
    lb: { g: 453.592, kg: 0.453592, mg: 453592, lb: 1, oz: 16 },
    oz: { g: 28.3495, kg: 0.0283495, mg: 28349.5, lb: 0.0625, oz: 1 },
    
    // Time (seconds base)
    s: { s: 1, ms: 1000, us: 1000000, ns: 1000000000, min: 1/60, h: 1/3600, d: 1/86400 },
    ms: { s: 0.001, ms: 1, us: 1000, ns: 1000000, min: 1/60000, h: 1/3600000, d: 1/86400000 },
    us: { s: 0.000001, ms: 0.001, us: 1, ns: 1000, min: 1/60000000, h: 1/3600000000, d: 1/86400000000 },
    ns: { s: 0.000000001, ms: 0.000001, us: 0.001, ns: 1, min: 1/60000000000, h: 1/3600000000000, d: 1/86400000000000 },
    min: { s: 60, ms: 60000, us: 60000000, ns: 60000000000, min: 1, h: 1/60, d: 1/1440 },
    h: { s: 3600, ms: 3600000, us: 3600000000, ns: 3600000000000, min: 60, h: 1, d: 1/24 },
    d: { s: 86400, ms: 86400000, us: 86400000000, ns: 86400000000000, min: 1440, h: 24, d: 1 },
  };

  const unitLabels: Record<string, string> = {
    bytes: "Bytes", kb: "Kilobytes", mb: "Megabytes", gb: "Gigabytes", tb: "Terabytes",
    m: "Meters", km: "Kilometers", cm: "Centimeters", mm: "Millimeters", ft: "Feet", in: "Inches", mi: "Miles",
    g: "Grams", kg: "Kilograms", mg: "Milligrams", lb: "Pounds", oz: "Ounces",
    s: "Seconds", ms: "Milliseconds", us: "Microseconds", ns: "Nanoseconds", min: "Minutes", h: "Hours", d: "Days",
  };

  const handleConvert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult("Error: Invalid number");
      return;
    }

    const fromRates = conversions[fromUnit];
    if (!fromRates) {
      setResult("Error: Invalid unit");
      return;
    }

    // Convert to base unit first, then to target unit
    const baseValue = numValue * fromRates[fromUnit];
    const convertedValue = baseValue / conversions[toUnit][fromUnit];
    
    // Format result
    let formattedResult: string;
    if (Math.abs(convertedValue) < 0.000001 || Math.abs(convertedValue) > 1000000) {
      formattedResult = convertedValue.toExponential(6);
    } else {
      formattedResult = convertedValue.toPrecision(10).replace(/\.?0+$/, "");
    }
    
    setResult(`${formattedResult} ${unitLabels[toUnit]}`);
  };

  const handleClear = () => {
    setValue("");
    setResult("");
  };

  const [copied, setCopied] = useState(false);

  const unitsByCategory = {
    bytes: ["bytes", "kb", "mb", "gb", "tb"],
    length: ["m", "km", "cm", "mm", "ft", "in", "mi"],
    weight: ["g", "kg", "mg", "lb", "oz"],
    time: ["s", "ms", "us", "ns", "min", "h", "d"],
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Unit Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {([
            { value: "bytes", label: "Digital Storage" },
            { value: "length", label: "Length" },
            { value: "weight", label: "Weight" },
            { value: "time", label: "Time" },
          ] as const).map((c) => (
            <Button
              key={c.value}
              variant={category === c.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCategory(c.value);
                setFromUnit(unitsByCategory[c.value][0]);
                setToUnit(unitsByCategory[c.value][1] || unitsByCategory[c.value][0]);
              }}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-5 items-end">
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="100"
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label>From</Label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
            >
              {unitsByCategory[category].map((u) => (
                <option key={u} value={u}>{unitLabels[u]}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-center pt-6">
            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <Label>To</Label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-2 rounded-md border border-input bg-background"
            >
              {unitsByCategory[category].map((u) => (
                <option key={u} value={u}>{unitLabels[u]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleConvert} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Convert
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">Result</Label>
                <div className="text-2xl font-bold mt-1">{result}</div>
              </div>
              {!result.startsWith("Error") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(result.split(" ")[0]);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
