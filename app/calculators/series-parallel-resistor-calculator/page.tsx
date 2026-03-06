"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeriesParallelResistorCalculator() {
  const [config, setConfig] = useState<"series" | "parallel">("series");
  const [resistors, setResistors] = useState<string[]>(["", ""]);
  const [results, setResults] = useState<{ total: number; unit: string } | null>(null);

  const addResistor = () => {
    if (resistors.length < 10) setResistors([...resistors, ""]);
  };

  const removeResistor = (index: number) => {
    if (resistors.length > 2) {
      const newResistors = resistors.filter((_, i) => i !== index);
      setResistors(newResistors);
    }
  };

  const updateResistor = (index: number, value: string) => {
    const newResistors = [...resistors];
    newResistors[index] = value;
    setResistors(newResistors);
  };

  const calculate = () => {
    const values = resistors.map((r) => parseFloat(r)).filter((v) => !isNaN(v) && v > 0);
    if (values.length === 0) return;

    let total = 0;
    if (config === "series") {
      total = values.reduce((sum, v) => sum + v, 0);
    } else {
      total = 1 / values.reduce((sum, v) => sum + 1 / v, 0);
    }

    const unit = total >= 1000000 ? "MΩ" : total >= 1000 ? "kΩ" : "Ω";
    const displayValue = total >= 1000000 ? total / 1000000 : total >= 1000 ? total / 1000 : total;
    setResults({ total: Math.round(displayValue * 1000) / 1000, unit });
  };

  const reset = () => {
    setResistors(["", ""]);
    setConfig("series");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Configuration</Label>
              <Select value={config} onValueChange={(v) => setConfig(v as typeof config)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="series">Series (R_total = R1 + R2 + ...)</SelectItem>
                  <SelectItem value="parallel">Parallel (1/R_total = 1/R1 + 1/R2 + ...)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Resistor Values (Ω)</Label>
              {resistors.map((value, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={`R${index + 1}`}
                    value={value}
                    onChange={(e) => updateResistor(index, e.target.value)}
                  />
                  {resistors.length > 2 && (
                    <Button variant="outline" size="sm" onClick={() => removeResistor(index)}>×</Button>
                  )}
                </div>
              ))}
              {resistors.length < 10 && (
                <Button variant="outline" size="sm" onClick={addResistor}>+ Add Resistor</Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Total</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Total Resistance ({config})</p>
                <p className="text-4xl font-bold">{results.total} {results.unit}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {config === "series" ? "R_total = " + resistors.filter(r => r).join(" + ") : "1/R_total = 1/" + resistors.filter(r => r).join(" + 1/")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
