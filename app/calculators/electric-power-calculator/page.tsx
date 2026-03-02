"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ElectricPowerCalculator() {
  // Mode 1: P = VI
  const [voltage1, setVoltage1] = useState<string>("");
  const [current1, setCurrent1] = useState<string>("");
  const [power1, setPower1] = useState<number | null>(null);

  // Mode 2: P = I²R
  const [current2, setCurrent2] = useState<string>("");
  const [resistance2, setResistance2] = useState<string>("");
  const [power2, setPower2] = useState<number | null>(null);

  // Mode 3: P = V²/R
  const [voltage3, setVoltage3] = useState<string>("");
  const [resistance3, setResistance3] = useState<string>("");
  const [power3, setPower3] = useState<number | null>(null);

  // Energy consumption
  const [timeHours, setTimeHours] = useState<string>("");
  const [energyConsumption, setEnergyConsumption] = useState<number | null>(null);

  const calculatePVI = () => {
    const V = parseFloat(voltage1);
    const I = parseFloat(current1);

    if (isNaN(V) || isNaN(I) || V <= 0 || I <= 0) return;

    const P = V * I;
    setPower1(Math.round(P * 100) / 100);
  };

  const calculatePI2R = () => {
    const I = parseFloat(current2);
    const R = parseFloat(resistance2);

    if (isNaN(I) || isNaN(R) || I <= 0 || R <= 0) return;

    const P = I * I * R;
    setPower2(Math.round(P * 100) / 100);
  };

  const calculatePV2R = () => {
    const V = parseFloat(voltage3);
    const R = parseFloat(resistance3);

    if (isNaN(V) || isNaN(R) || V <= 0 || R <= 0) return;

    const P = (V * V) / R;
    setPower3(Math.round(P * 100) / 100);
  };

  const calculateEnergy = (power: number) => {
    const t = parseFloat(timeHours);
    if (isNaN(t) || t <= 0) return;

    const energy = power * t; // Wh
    setEnergyConsumption(Math.round(energy * 100) / 100);
  };

  const resetPVI = () => {
    setVoltage1("");
    setCurrent1("");
    setPower1(null);
    setEnergyConsumption(null);
  };

  const resetPI2R = () => {
    setCurrent2("");
    setResistance2("");
    setPower2(null);
    setEnergyConsumption(null);
  };

  const resetPV2R = () => {
    setVoltage3("");
    setResistance3("");
    setPower3(null);
    setEnergyConsumption(null);
  };

  // Unit conversions
  const toKw = (watts: number) => watts / 1000;
  const toHp = (watts: number) => watts * 0.00134102;
  const toBtuPerHour = (watts: number) => watts * 3.41214;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Electric Power Calculator</CardTitle>
          <CardDescription>
            Calculate electrical power using P = VI, P = I²R, or P = V²/R. Also calculate energy consumption over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pvi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pvi">P = VI</TabsTrigger>
              <TabsTrigger value="pi2r">P = I²R</TabsTrigger>
              <TabsTrigger value="pv2r">P = V²/R</TabsTrigger>
            </TabsList>

            <TabsContent value="pvi" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="voltage1">Voltage (V)</Label>
                <Input
                  id="voltage1"
                  type="number"
                  placeholder="e.g., 120"
                  value={voltage1}
                  onChange={(e) => setVoltage1(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="current1">Current (A)</Label>
                <Input
                  id="current1"
                  type="number"
                  placeholder="e.g., 5"
                  value={current1}
                  onChange={(e) => setCurrent1(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePVI}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPVI}>Reset</Button>
              </div>

              {power1 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power1} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power1) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power1) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power1))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours1">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours1"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power1)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = V × I</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pi2r" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="current2">Current (A)</Label>
                <Input
                  id="current2"
                  type="number"
                  placeholder="e.g., 5"
                  value={current2}
                  onChange={(e) => setCurrent2(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resistance2">Resistance (Ω)</Label>
                <Input
                  id="resistance2"
                  type="number"
                  placeholder="e.g., 10"
                  value={resistance2}
                  onChange={(e) => setResistance2(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePI2R}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPI2R}>Reset</Button>
              </div>

              {power2 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power2} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power2) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power2) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power2))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours2">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours2"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power2)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = I² × R</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pv2r" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="voltage3">Voltage (V)</Label>
                <Input
                  id="voltage3"
                  type="number"
                  placeholder="e.g., 120"
                  value={voltage3}
                  onChange={(e) => setVoltage3(e.target.value)}
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
                <Button onClick={calculatePV2R}>Calculate Power</Button>
                <Button variant="outline" onClick={resetPV2R}>Reset</Button>
              </div>

              {power3 !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="text-4xl font-bold mt-1">{power3} W</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilowatts</p>
                      <p className="text-lg font-medium">{Math.round(toKw(power3) * 100) / 100} kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Horsepower</p>
                      <p className="text-lg font-medium">{Math.round(toHp(power3) * 1000) / 1000} HP</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">BTU/hour</p>
                      <p className="text-lg font-medium">{Math.round(toBtuPerHour(power3))} BTU/h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <Label htmlFor="timeHours3">Time (hours) - for energy consumption</Label>
                    <Input
                      id="timeHours3"
                      type="number"
                      placeholder="e.g., 2"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                    />
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => calculateEnergy(power3)}
                    >
                      Calculate Energy
                    </Button>
                    {energyConsumption !== null && (
                      <div className="mt-2 p-2 bg-background rounded">
                        <p className="text-sm">Energy: {energyConsumption} Wh ({Math.round(energyConsumption / 1000 * 100) / 100} kWh)</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: P = V² / R</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
