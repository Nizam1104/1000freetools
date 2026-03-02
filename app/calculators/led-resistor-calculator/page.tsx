"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LedResistorCalculator() {
  const [supplyVoltage, setSupplyVoltage] = useState<string>("");
  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connection, setConnection] = useState<"series" | "parallel">("series");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const Vs = parseFloat(supplyVoltage);
    const Vf = parseFloat(ledVoltage);
    const If = parseFloat(ledCurrent) / 1000; // Convert to Amps
    const n = parseInt(numLeds);

    if (Vs > 0 && Vf > 0 && If > 0 && n > 0) {
      let totalVf = Vf;
      let totalIf = If;

      if (connection === "series") {
        totalVf = Vf * n;
        if (totalVf >= Vs) {
          setResults({ error: "LED forward voltage exceeds supply voltage in series!" });
          return;
        }
      } else {
        totalIf = If * n;
      }

      const R = (Vs - totalVf) / totalIf;
      const power = totalIf * totalIf * R;
      const recommendedPower = power * 1.5; // 50% safety margin

      // Find standard resistor value
      const standardValues = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000];
      const standardR = standardValues.find(v => v >= R) || R;

      const actualCurrent = (Vs - totalVf) / standardR;

      setResults({
        resistance: R,
        standardResistance: standardR,
        power: power,
        recommendedPower: recommendedPower,
        actualCurrent: actualCurrent * 1000,
      });
    }
  };

  const reset = () => {
    setSupplyVoltage(""); setLedVoltage(""); setLedCurrent(""); setNumLeds("1"); setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>LED Resistor Calculator – Calculate Current Limiting Resistor</CardTitle>
          <CardDescription>
            Calculate the correct resistor value for your LED circuit. Enter supply voltage, LED forward voltage and current to get the required resistance and power rating.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Supply Voltage (V)</Label><Input value={supplyVoltage} onChange={e => setSupplyVoltage(e.target.value)} /></div>
              <div><Label>LED Forward Voltage (V)</Label><Input value={ledVoltage} onChange={e => setLedVoltage(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>LED Current (mA)</Label><Input value={ledCurrent} onChange={e => setLedCurrent(e.target.value)} placeholder="e.g., 20" /></div>
              <div><Label>Number of LEDs</Label><Input type="number" value={numLeds} onChange={e => setNumLeds(e.target.value)} /></div>
            </div>
            <div>
              <Label>LED Connection</Label>
              <Select value={connection} onValueChange={(v) => setConnection(v as typeof connection)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Resistor</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results?.error ? (
              <div className="p-4 bg-destructive/10 rounded-md text-destructive">
                {results.error}
              </div>
            ) : results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Calculated Resistance</p>
                    <p className="text-3xl font-bold">{Math.round(results.resistance)} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Standard Resistor</p>
                    <p className="text-3xl font-bold">{results.standardResistance} Ω</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Power Dissipation</p>
                    <p className="text-xl font-bold">{Math.round(results.power * 1000) / 1000} W</p>
                    <p className="text-xs text-muted-foreground">Use {Math.round(results.recommendedPower * 2) / 2}W resistor</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Current</p>
                    <p className="text-xl font-bold">{Math.round(results.actualCurrent * 10) / 10} mA</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
