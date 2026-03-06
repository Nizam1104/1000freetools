"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeriesParallelCapacitorCalculator() {
  const [config, setConfig] = useState<"series" | "parallel">("parallel");
  const [capacitors, setCapacitors] = useState<{ value: string; unit: string }[]>([{ value: "", unit: "µF" }]);
  const [results, setResults] = useState<{ total: number; unit: string } | null>(null);

  const addCapacitor = () => {
    if (capacitors.length < 10) setCapacitors([...capacitors, { value: "", unit: "µF" }]);
  };

  const removeCapacitor = (index: number) => {
    if (capacitors.length > 2) {
      setCapacitors(capacitors.filter((_, i) => i !== index));
    }
  };

  const updateCapacitor = (index: number, field: "value" | "unit", val: string) => {
    const newCaps = [...capacitors];
    newCaps[index] = { ...newCaps[index], [field]: val };
    setCapacitors(newCaps);
  };

  const toMicrofarads = (value: number, unit: string): number => {
    if (unit === "mF") return value * 1000;
    if (unit === "µF") return value;
    if (unit === "nF") return value / 1000;
    if (unit === "pF") return value / 1000000;
    return value;
  };

  const calculate = () => {
    const values = capacitors
      .map((c) => toMicrofarads(parseFloat(c.value), c.unit))
      .filter((v) => !isNaN(v) && v > 0);

    if (values.length === 0) return;

    let total = 0;
    if (config === "parallel") {
      total = values.reduce((sum, v) => sum + v, 0);
    } else {
      total = 1 / values.reduce((sum, v) => sum + 1 / v, 0);
    }

    const unit = total >= 1000 ? "mF" : total >= 1 ? "µF" : total >= 0.001 ? "nF" : "pF";
    const displayValue = total >= 1000 ? total / 1000 : total >= 1 ? total : total >= 0.001 ? total * 1000 : total * 1000000;
    setResults({ total: Math.round(displayValue * 1000) / 1000, unit });
  };

  const reset = () => {
    setCapacitors([{ value: "", unit: "µF" }]);
    setConfig("parallel");
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
                  <SelectItem value="parallel">Parallel (C_total = C1 + C2 + ...)</SelectItem>
                  <SelectItem value="series">Series (1/C_total = 1/C1 + 1/C2 + ...)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Capacitor Values</Label>
              {capacitors.map((cap, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={`C${index + 1}`}
                    value={cap.value}
                    onChange={(e) => updateCapacitor(index, "value", e.target.value)}
                  />
                  <Select value={cap.unit} onValueChange={(v) => updateCapacitor(index, "unit", v)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mF">mF</SelectItem>
                      <SelectItem value="µF">µF</SelectItem>
                      <SelectItem value="nF">nF</SelectItem>
                      <SelectItem value="pF">pF</SelectItem>
                    </SelectContent>
                  </Select>
                  {capacitors.length > 2 && (
                    <Button variant="outline" size="sm" onClick={() => removeCapacitor(index)}>×</Button>
                  )}
                </div>
              ))}
              {capacitors.length < 10 && (
                <Button variant="outline" size="sm" onClick={addCapacitor}>+ Add Capacitor</Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Total</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Total Capacitance ({config})</p>
                <p className="text-4xl font-bold">{results.total} {results.unit}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
