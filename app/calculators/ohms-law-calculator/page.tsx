"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Info, Lightbulb } from "lucide-react";

interface OhmsLawResult {
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  unknown: string;
}

export default function OhmsLawCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"voltage" | "current" | "resistance" | "power">("voltage");
  
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");
  
  const [result, setResult] = useState<OhmsLawResult | null>(null);

  const calculateVoltage = () => {
    const curr = parseFloat(current);
    const res = parseFloat(resistance);
    if (isNaN(curr) || isNaN(res) || res === 0) return;
    
    const volt = curr * res;
    const pwr = curr * volt;
    
    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Voltage" });
  };

  const calculateCurrent = () => {
    const volt = parseFloat(voltage);
    const res = parseFloat(resistance);
    if (isNaN(volt) || isNaN(res) || res === 0) return;
    
    const curr = volt / res;
    const pwr = volt * curr;
    
    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Current" });
  };

  const calculateResistance = () => {
    const volt = parseFloat(voltage);
    const curr = parseFloat(current);
    if (isNaN(volt) || isNaN(curr) || curr === 0) return;
    
    const res = volt / curr;
    const pwr = volt * curr;
    
    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Resistance" });
  };

  const calculatePower = () => {
    const volt = parseFloat(voltage);
    const curr = parseFloat(current);
    if (isNaN(volt) || isNaN(curr)) return;
    
    const pwr = volt * curr;
    const res = volt / curr;
    
    setResult({ voltage: volt, current: curr, resistance: res, power: pwr, unknown: "Power" });
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setResult(null);
  };

  useEffect(() => {
    reset();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Ohm's Law Calculator – Calculate Voltage, Current, Resistance & Power</h1>
          <p className="text-muted-foreground">
            Calculate electrical parameters instantly with our Ohm's Law Calculator. Enter any two known values to find voltage, current, resistance, or power — essential for electronics, electrical engineering, and DIY projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="voltage">Find Voltage</TabsTrigger>
                  <TabsTrigger value="current">Find Current</TabsTrigger>
                  <TabsTrigger value="resistance">Find Resistance</TabsTrigger>
                  <TabsTrigger value="power">Find Power</TabsTrigger>
                </TabsList>

                <TabsContent value="voltage" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-v">Current (I)</Label>
                      <Input
                        id="current-v"
                        type="number"
                        placeholder="e.g., 2"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Amperes (A)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resistance-v">Resistance (R)</Label>
                      <Input
                        id="resistance-v"
                        type="number"
                        placeholder="e.g., 100"
                        value={resistance}
                        onChange={(e) => setResistance(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Ohms (Ω)</p>
                    </div>
                  </div>
                  <Button onClick={calculateVoltage} className="w-full">Calculate Voltage</Button>
                </TabsContent>

                <TabsContent value="current" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="voltage-i">Voltage (V)</Label>
                      <Input
                        id="voltage-i"
                        type="number"
                        placeholder="e.g., 12"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Volts (V)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resistance-i">Resistance (R)</Label>
                      <Input
                        id="resistance-i"
                        type="number"
                        placeholder="e.g., 100"
                        value={resistance}
                        onChange={(e) => setResistance(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Ohms (Ω)</p>
                    </div>
                  </div>
                  <Button onClick={calculateCurrent} className="w-full">Calculate Current</Button>
                </TabsContent>

                <TabsContent value="resistance" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="voltage-r">Voltage (V)</Label>
                      <Input
                        id="voltage-r"
                        type="number"
                        placeholder="e.g., 12"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Volts (V)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-r">Current (I)</Label>
                      <Input
                        id="current-r"
                        type="number"
                        placeholder="e.g., 0.5"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Amperes (A)</p>
                    </div>
                  </div>
                  <Button onClick={calculateResistance} className="w-full">Calculate Resistance</Button>
                </TabsContent>

                <TabsContent value="power" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="voltage-p">Voltage (V)</Label>
                      <Input
                        id="voltage-p"
                        type="number"
                        placeholder="e.g., 120"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Volts (V)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-p">Current (I)</Label>
                      <Input
                        id="current-p"
                        type="number"
                        placeholder="e.g., 5"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Amperes (A)</p>
                    </div>
                  </div>
                  <Button onClick={calculatePower} className="w-full">Calculate Power</Button>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={reset} className="flex-1">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">{result.unknown}</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.unknown === "Voltage" && `${result.voltage!.toFixed(2)} V`}
                      {result.unknown === "Current" && `${result.current!.toFixed(4)} A`}
                      {result.unknown === "Resistance" && `${result.resistance!.toFixed(2)} Ω`}
                      {result.unknown === "Power" && `${result.power!.toFixed(2)} W`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">All Values:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Voltage</p>
                        <p className="font-bold">{result.voltage!.toFixed(2)} V</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="font-bold">{result.current!.toFixed(4)} A</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Resistance</p>
                        <p className="font-bold">{result.resistance!.toFixed(2)} Ω</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Power</p>
                        <p className="font-bold">{result.power!.toFixed(2)} W</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Ohm's Law:</strong> V = I × R</p>
                    <p className="font-mono text-xs mt-1">Power: P = V × I</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Ohm's Law Formulas
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Basic Formulas:</h4>
                <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                  <p>V = I × R <span className="text-muted-foreground">(Voltage)</span></p>
                  <p>I = V / R <span className="text-muted-foreground">(Current)</span></p>
                  <p>R = V / I <span className="text-muted-foreground">(Resistance)</span></p>
                  <p>P = V × I <span className="text-muted-foreground">(Power)</span></p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Power Formulas:</h4>
                <div className="space-y-2 font-mono text-sm bg-muted p-3 rounded">
                  <p>P = V × I <span className="text-muted-foreground">(Basic)</span></p>
                  <p>P = I² × R <span className="text-muted-foreground">(Current known)</span></p>
                  <p>P = V² / R <span className="text-muted-foreground">(Voltage known)</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
