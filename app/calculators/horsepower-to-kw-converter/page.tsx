"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HorsepowerToKwConverterPage() {
  const [value, setValue] = useState<string>("");
  const [conversionType, setConversionType] = useState<"hp-to-kw" | "kw-to-hp">("hp-to-kw");
  const [hpType, setHpType] = useState<"mechanical" | "metric" | "electric">("mechanical");
  const [result, setResult] = useState<{
    input: number;
    output: number;
    formula: string;
  } | null>(null);

  const calculate = () => {
    const val = parseFloat(value);

    if (isNaN(val) || val <= 0) return;

    let output: number;
    let formula: string;

    if (conversionType === "hp-to-kw") {
      // Different HP types have different conversion factors
      const conversionFactors = {
        mechanical: 0.7457,  // Imperial HP to kW
        metric: 0.7355,      // Metric HP (PS) to kW
        electric: 0.746,     // Electric HP to kW
      };

      output = val * conversionFactors[hpType];
      
      const hpLabels = {
        mechanical: "HP (mechanical)",
        metric: "HP (metric/PS)",
        electric: "HP (electric)",
      };

      formula = `${val} ${hpLabels[hpType]} × 0.7457 = ${output.toFixed(2)} kW`;
      
      setResult({
        input: val,
        output: Math.round(output * 100) / 100,
        formula,
      });
    } else {
      // kW to HP
      const conversionFactors = {
        mechanical: 1.34102,
        metric: 1.35962,
        electric: 1.34048,
      };

      output = val * conversionFactors[hpType];
      
      const hpLabels = {
        mechanical: "HP (mechanical)",
        metric: "HP (metric/PS)",
        electric: "HP (electric)",
      };

      formula = `${val} kW × ${conversionFactors[hpType].toFixed(4)} = ${output.toFixed(2)} ${hpLabels[hpType]}`;
      
      setResult({
        input: val,
        output: Math.round(output * 100) / 100,
        formula,
      });
    }
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Horsepower to kW Converter – Instantly Convert HP to Kilowatts
          </h1>
          <p className="text-muted-foreground">
            Convert engine power between horsepower and kilowatts instantly with our free HP to kW
            Converter. Whether you're comparing cars or working with technical specs, get accurate
            conversions in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Conversion Type</Label>
                <Select value={conversionType} onValueChange={(v) => setConversionType(v as "hp-to-kw" | "kw-to-hp")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp-to-kw">HP to kW</SelectItem>
                    <SelectItem value="kw-to-hp">kW to HP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {conversionType === "hp-to-kw" && (
                <div className="space-y-2">
                  <Label htmlFor="hpType">Horsepower Type</Label>
                  <Select value={hpType} onValueChange={(v) => setHpType(v as "mechanical" | "metric" | "electric")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">Mechanical HP (Imperial)</SelectItem>
                      <SelectItem value="metric">Metric HP (PS)</SelectItem>
                      <SelectItem value="electric">Electric HP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="value">
                  {conversionType === "hp-to-kw" ? "Horsepower (HP)" : "Power (kW)"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder={conversionType === "hp-to-kw" ? "e.g., 300" : "e.g., 220"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Convert
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Conversion Result</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {conversionType === "hp-to-kw" ? `${result.input} HP equals` : `${result.input} kW equals`}
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {result.output} {conversionType === "hp-to-kw" ? "kW" : "HP"}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Conversion Formula</p>
                    <p className="font-mono text-sm">{result.formula}</p>
                  </div>

                  {conversionType === "hp-to-kw" && hpType === "metric" && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Note:</strong> Metric horsepower (PS) is commonly used in European
                        car specifications. 1 PS = 0.7355 kW
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter a value and click Convert to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Horsepower to Kilowatt Conversion Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">HP (mech)</th>
                  <th className="text-left py-2">kW</th>
                  <th className="text-left py-2">HP (metric)</th>
                  <th className="text-left py-2">kW</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">100 HP</td>
                  <td className="py-2">74.57 kW</td>
                  <td className="py-2">100 PS</td>
                  <td className="py-2">73.55 kW</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">200 HP</td>
                  <td className="py-2">149.14 kW</td>
                  <td className="py-2">200 PS</td>
                  <td className="py-2">147.10 kW</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">300 HP</td>
                  <td className="py-2">223.71 kW</td>
                  <td className="py-2">300 PS</td>
                  <td className="py-2">220.65 kW</td>
                </tr>
                <tr>
                  <td className="py-2">400 HP</td>
                  <td className="py-2">298.28 kW</td>
                  <td className="py-2">400 PS</td>
                  <td className="py-2">294.20 kW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Conversion factors:</strong><br />
            1 mechanical HP = 0.7457 kW | 1 metric HP (PS) = 0.7355 kW | 1 electric HP = 0.746 kW
          </p>
        </div>
      </div>
    </div>
  );
}
