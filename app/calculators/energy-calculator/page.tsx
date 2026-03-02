"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EnergyCalculator() {
  // Kinetic Energy
  const [keMass, setKeMass] = useState<string>("");
  const [keVelocity, setKeVelocity] = useState<string>("");
  const [kineticEnergy, setKineticEnergy] = useState<number | null>(null);

  // Potential Energy
  const [peMass, setPeMass] = useState<string>("");
  const [peHeight, setPeHeight] = useState<string>("");
  const [gravity, setGravity] = useState<string>("9.81");
  const [potentialEnergy, setPotentialEnergy] = useState<number | null>(null);

  const calculateKinetic = () => {
    const m = parseFloat(keMass);
    const v = parseFloat(keVelocity);

    if (isNaN(m) || isNaN(v) || m <= 0 || v <= 0) return;

    const KE = 0.5 * m * v * v;
    setKineticEnergy(Math.round(KE * 100) / 100);
  };

  const calculatePotential = () => {
    const m = parseFloat(peMass);
    const h = parseFloat(peHeight);
    const g = parseFloat(gravity);

    if (isNaN(m) || isNaN(h) || isNaN(g) || m <= 0 || h <= 0 || g <= 0) return;

    const PE = m * g * h;
    setPotentialEnergy(Math.round(PE * 100) / 100);
  };

  const resetKinetic = () => {
    setKeMass("");
    setKeVelocity("");
    setKineticEnergy(null);
  };

  const resetPotential = () => {
    setPeMass("");
    setPeHeight("");
    setGravity("9.81");
    setPotentialEnergy(null);
  };

  // Unit conversions
  const toKj = (joules: number) => joules / 1000;
  const toCal = (joules: number) => joules * 0.239006;
  const toKcal = (joules: number) => joules * 0.000239006;
  const toWh = (joules: number) => joules / 3600;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Energy Calculator</CardTitle>
          <CardDescription>
            Calculate kinetic energy (KE = ½mv²) and gravitational potential energy (PE = mgh).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="kinetic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="kinetic">Kinetic Energy</TabsTrigger>
              <TabsTrigger value="potential">Potential Energy</TabsTrigger>
            </TabsList>

            <TabsContent value="kinetic" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="keMass">Mass (kg)</Label>
                <Input
                  id="keMass"
                  type="number"
                  placeholder="e.g., 10"
                  value={keMass}
                  onChange={(e) => setKeMass(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="keVelocity">Velocity (m/s)</Label>
                <Input
                  id="keVelocity"
                  type="number"
                  placeholder="e.g., 20"
                  value={keVelocity}
                  onChange={(e) => setKeVelocity(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateKinetic}>Calculate KE</Button>
                <Button variant="outline" onClick={resetKinetic}>Reset</Button>
              </div>

              {kineticEnergy !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Kinetic Energy</p>
                    <p className="text-4xl font-bold mt-1">{kineticEnergy} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(kineticEnergy) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(kineticEnergy) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(kineticEnergy) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(kineticEnergy) * 100) / 100} Wh</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: KE = ½ × m × v²</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="potential" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="peMass">Mass (kg)</Label>
                <Input
                  id="peMass"
                  type="number"
                  placeholder="e.g., 5"
                  value={peMass}
                  onChange={(e) => setPeMass(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="peHeight">Height (m)</Label>
                <Input
                  id="peHeight"
                  type="number"
                  placeholder="e.g., 10"
                  value={peHeight}
                  onChange={(e) => setPeHeight(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="gravity">Gravitational Acceleration (m/s²)</Label>
                <Input
                  id="gravity"
                  type="number"
                  step="0.01"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default: 9.81 m/s² (Earth). Moon: 1.62 m/s², Mars: 3.71 m/s²
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculatePotential}>Calculate PE</Button>
                <Button variant="outline" onClick={resetPotential}>Reset</Button>
              </div>

              {potentialEnergy !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Potential Energy</p>
                    <p className="text-4xl font-bold mt-1">{potentialEnergy} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(potentialEnergy) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(potentialEnergy) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(potentialEnergy) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(potentialEnergy) * 100) / 100} Wh</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: PE = m × g × h</p>
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
