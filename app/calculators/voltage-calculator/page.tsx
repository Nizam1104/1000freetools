"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VoltageCalculator() {
  // Mode 1: V = IR
  const [current1, setCurrent1] = useState<string>("");
  const [resistance1, setResistance1] = useState<string>("");
  const [voltage1, setVoltage1] = useState<number | null>(null);
  const [power1, setPower1] = useState<number | null>(null);

  // Mode 2: V = P/I
  const [power2, setPower2] = useState<string>("");
  const [current2, setCurrent2] = useState<string>("");
  const [voltage2, setVoltage2] = useState<number | null>(null);
  const [resistance2, setResistance2] = useState<number | null>(null);

  // Mode 3: V = sqrt(PR)
  const [power3, setPower3] = useState<string>("");
  const [resistance3, setResistance3] = useState<string>("");
  const [voltage3, setVoltage3] = useState<number | null>(null);
  const [current3, setCurrent3] = useState<number | null>(null);

  // Output unit
  const [outputUnit, setOutputUnit] = useState<"V" | "mV" | "kV">("V");

  const calculateVIR = () => {
    const I = parseFloat(current1);
    const R = parseFloat(resistance1);

    if (isNaN(I) || isNaN(R) || I <= 0 || R <= 0) return;

    const V = I * R;
    const P = V * I;
    setVoltage1(V);
    setPower1(Math.round(P * 100) / 100);
  };

  const calculateVPI = () => {
    const P = parseFloat(power2);
    const I = parseFloat(current2);

    if (isNaN(P) || isNaN(I) || P <= 0 || I <= 0) return;

    const V = P / I;
    const R = V / I;
    setVoltage2(V);
    setResistance2(Math.round(R * 100) / 100);
  };

  const calculateVPR = () => {
    const P = parseFloat(power3);
    const R = parseFloat(resistance3);

    if (isNaN(P) || isNaN(R) || P <= 0 || R <= 0) return;

    const V = Math.sqrt(P * R);
    const I = V / R;
    setVoltage3(V);
    setCurrent3(Math.round(I * 1000) / 1000);
  };

  const resetVIR = () => {
    setCurrent1("");
    setResistance1("");
    setVoltage1(null);
    setPower1(null);
  };

  const resetVPI = () => {
    setPower2("");
    setCurrent2("");
    setVoltage2(null);
    setResistance2(null);
  };

  const resetVPR = () => {
    setPower3("");
    setResistance3("");
    setVoltage3(null);
    setCurrent3(null);
  };

  // Convert voltage to output unit
  const convertVoltage = (v: number): number => {
    switch (outputUnit) {
      case "mV":
        return v * 1000;
      case "kV":
        return v / 1000;
      default:
        return v;
    }
  };

  const getUnitLabel = () => {
    switch (outputUnit) {
      case "mV":
        return "mV";
      case "kV":
        return "kV";
      default:
        return "V";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Voltage Calculator</CardTitle>
          <CardDescription>
            Calculate voltage using Ohm's Law (V = IR), from power and current (V = P/I), or from power and resistance (V = √(PR)).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vir" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vir">V = IR</TabsTrigger>
              <TabsTrigger value="vpi">V = P/I</TabsTrigger>
              <TabsTrigger value="vpr">V = √(PR)</TabsTrigger>
            </TabsList>

            <TabsContent value="vir" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="current1">Current (A)</Label>
                <Input
                  id="current1"
                  type="number"
                  placeholder="e.g., 2"
                  value={current1}
                  onChange={(e) => setCurrent1(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance1">Resistance (Ω)</Label>
                <Input
                  id="resistance1"
                  type="number"
                  placeholder="e.g., 60"
                  value={resistance1}
                  onChange={(e) => setResistance1(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateVIR}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVIR}>Reset</Button>
              </div>

              {voltage1 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage1) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Power</p>
                    <p className="text-lg font-medium">{power1} W</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = I × R</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vpi" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="power2">Power (W)</Label>
                <Input
                  id="power2"
                  type="number"
                  placeholder="e.g., 240"
                  value={power2}
                  onChange={(e) => setPower2(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="current2">Current (A)</Label>
                <Input
                  id="current2"
                  type="number"
                  placeholder="e.g., 2"
                  value={current2}
                  onChange={(e) => setCurrent2(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateVPI}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVPI}>Reset</Button>
              </div>

              {voltage2 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage2) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Resistance</p>
                    <p className="text-lg font-medium">{resistance2} Ω</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = P / I</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vpr" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="power3">Power (W)</Label>
                <Input
                  id="power3"
                  type="number"
                  placeholder="e.g., 60"
                  value={power3}
                  onChange={(e) => setPower3(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance3">Resistance (Ω)</Label>
                <Input
                  id="resistance3"
                  type="number"
                  placeholder="e.g., 240"
                  value={resistance3}
                  onChange={(e) => setResistance3(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateVPR}>Calculate Voltage</Button>
                <Button variant="outline" onClick={resetVPR}>Reset</Button>
              </div>

              {voltage3 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Voltage</p>
                    <p className="text-4xl font-bold mt-1">
                      {Math.round(convertVoltage(voltage3) * 100) / 100} {getUnitLabel()}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Secondary Result - Current</p>
                    <p className="text-lg font-medium">{current3} A</p>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: V = √(P × R)</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-4 pt-4 border-t">
            <Label>Output Unit</Label>
            <Select value={outputUnit} onValueChange={(v) => setOutputUnit(v as "V" | "mV" | "kV")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="V">Volts (V)</SelectItem>
                <SelectItem value="mV">Millivolts (mV)</SelectItem>
                <SelectItem value="kV">Kilovolts (kV)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
