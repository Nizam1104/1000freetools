"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TorqueToPowerConverterPage() {
  const [torque, setTorque] = useState<string>("");
  const [rpm, setRpm] = useState<string>("");
  const [torqueUnit, setTorqueUnit] = useState<"nm" | "lbft">("nm");
  const [outputUnit, setOutputUnit] = useState<"hp" | "kw">("hp");
  const [result, setResult] = useState<{
    power: number;
    torqueNm: number;
    rpm: number;
    formula: string;
  } | null>(null);

  const calculate = () => {
    const torqueVal = parseFloat(torque);
    const rpmVal = parseFloat(rpm);

    if (isNaN(torqueVal) || isNaN(rpmVal) || torqueVal <= 0 || rpmVal <= 0) return;

    // Convert torque to Nm if in lb-ft
    const torqueInNm = torqueUnit === "lbft" ? torqueVal * 1.35582 : torqueVal;

    // Power calculation formulas:
    // kW = (Torque (Nm) × RPM) / 9549.3
    // HP = (Torque (lb-ft) × RPM) / 5252
    // Or: HP = kW × 1.34102

    let power: number;
    let formula: string;

    if (outputUnit === "kw") {
      power = (torqueInNm * rpmVal) / 9549.3;
      formula = `Power (kW) = (Torque (Nm) × RPM) / 9549.3`;
    } else {
      // HP from Nm and RPM: HP = (Nm × RPM) / 7127
      power = (torqueInNm * rpmVal) / 7127;
      formula = `Power (HP) = (Torque (Nm) × RPM) / 7127`;
    }

    setResult({
      power: Math.round(power * 100) / 100,
      torqueNm: Math.round(torqueInNm * 100) / 100,
      rpm: rpmVal,
      formula,
    });
  };

  const reset = () => {
    setTorque("");
    setRpm("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Torque to Power Converter – Convert Engine Torque & RPM to HP or kW
          </h1>
          <p className="text-muted-foreground">
            Calculate your engine's power output from torque and RPM with our Torque-to-Power
            Converter. Enter torque in Nm or lb-ft along with RPM to get horsepower or kilowatts
            instantly — perfect for automotive enthusiasts and engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="torque">Torque</Label>
                <div className="flex gap-2">
                  <Input
                    id="torque"
                    type="number"
                    placeholder="e.g., 400"
                    value={torque}
                    onChange={(e) => setTorque(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={torqueUnit} onValueChange={(v) => setTorqueUnit(v as "nm" | "lbft")}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nm">Nm</SelectItem>
                      <SelectItem value="lbft">lb-ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rpm">Engine Speed (RPM)</Label>
                <Input
                  id="rpm"
                  type="number"
                  placeholder="e.g., 5000"
                  value={rpm}
                  onChange={(e) => setRpm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outputUnit">Output Unit</Label>
                <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "hp" | "kw")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hp">Horsepower (HP)</SelectItem>
                    <SelectItem value="kw">Kilowatts (kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Power Calculation Result</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Power Output</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.power} {outputUnit === "hp" ? "HP" : "kW"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Torque</p>
                      <p className="text-lg font-bold">{result.torqueNm} Nm</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Engine Speed</p>
                      <p className="text-lg font-bold">{result.rpm} RPM</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Formula Used</p>
                    <p className="font-mono text-sm">{result.formula}</p>
                  </div>

                  {outputUnit === "hp" && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Note:</strong> Peak power occurs at a specific RPM. This calculation
                        shows power at the entered torque and RPM point.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Understanding Torque and Power</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Torque is the rotational force an engine produces, while power (HP or kW) is the rate at
            which work is done. They're related through engine speed (RPM):
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>kW = (Torque (Nm) × RPM) / 9549.3</div>
            <div>HP = (Torque (Nm) × RPM) / 7127</div>
            <div>HP = (Torque (lb-ft) × RPM) / 5252</div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Key insight:</strong> At 5252 RPM, torque (lb-ft) and horsepower are always equal.
            This is why dyno charts always cross at this point.
          </p>
        </div>
      </div>
    </div>
  );
}
