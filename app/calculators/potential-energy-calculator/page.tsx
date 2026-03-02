"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PotentialEnergyCalculator() {
  // Gravitational PE
  const [gravMass, setGravMass] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gravity, setGravity] = useState<string>("9.81");
  const [gravitationalPE, setGravitationalPE] = useState<number | null>(null);

  // Elastic PE
  const [springConstant, setSpringConstant] = useState<string>("");
  const [displacement, setDisplacement] = useState<string>("");
  const [elasticPE, setElasticPE] = useState<number | null>(null);

  const calculateGravitational = () => {
    const m = parseFloat(gravMass);
    const h = parseFloat(height);
    const g = parseFloat(gravity);

    if (isNaN(m) || isNaN(h) || isNaN(g) || m <= 0 || h <= 0 || g <= 0) return;

    const PE = m * g * h;
    setGravitationalPE(Math.round(PE * 100) / 100);
  };

  const calculateElastic = () => {
    const k = parseFloat(springConstant);
    const x = parseFloat(displacement);

    if (isNaN(k) || isNaN(x) || k <= 0 || x <= 0) return;

    const PE = 0.5 * k * x * x;
    setElasticPE(Math.round(PE * 100) / 100);
  };

  const resetGravitational = () => {
    setGravMass("");
    setHeight("");
    setGravity("9.81");
    setGravitationalPE(null);
  };

  const resetElastic = () => {
    setSpringConstant("");
    setDisplacement("");
    setElasticPE(null);
  };

  // Unit conversions
  const toKj = (joules: number) => joules / 1000;
  const toCal = (joules: number) => joules * 0.239006;
  const toKcal = (joules: number) => joules * 0.000239006;
  const toWh = (joules: number) => joules / 3600;
  const toFtLb = (joules: number) => joules * 0.737562;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Potential Energy Calculator</CardTitle>
          <CardDescription>
            Calculate gravitational potential energy (PE = mgh) or elastic potential energy (PE = ½kx²).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gravitational" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gravitational">Gravitational PE</TabsTrigger>
              <TabsTrigger value="elastic">Elastic PE</TabsTrigger>
            </TabsList>

            <TabsContent value="gravitational" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="gravMass">Mass (kg)</Label>
                <Input
                  id="gravMass"
                  type="number"
                  placeholder="e.g., 5"
                  value={gravMass}
                  onChange={(e) => setGravMass(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="height">Height (m)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 10"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
                  Default: 9.81 m/s² (Earth). Moon: 1.62 m/s², Mars: 3.71 m/s², Jupiter: 24.79 m/s²
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateGravitational}>Calculate PE</Button>
                <Button variant="outline" onClick={resetGravitational}>Reset</Button>
              </div>

              {gravitationalPE !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Gravitational Potential Energy</p>
                    <p className="text-4xl font-bold mt-1">{gravitationalPE} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(gravitationalPE) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(gravitationalPE) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(gravitationalPE) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(gravitationalPE) * 100) / 100} Wh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Foot-pounds</p>
                      <p className="text-lg font-medium">{Math.round(toFtLb(gravitationalPE) * 10) / 10} ft-lb</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: PE = m × g × h</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="elastic" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="springConstant">Spring Constant (N/m)</Label>
                <Input
                  id="springConstant"
                  type="number"
                  placeholder="e.g., 100"
                  value={springConstant}
                  onChange={(e) => setSpringConstant(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Also known as stiffness constant or force constant
                </p>
              </div>

              <div>
                <Label htmlFor="displacement">Displacement from Equilibrium (m)</Label>
                <Input
                  id="displacement"
                  type="number"
                  placeholder="e.g., 0.5"
                  value={displacement}
                  onChange={(e) => setDisplacement(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The distance the spring is compressed or stretched
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateElastic}>Calculate PE</Button>
                <Button variant="outline" onClick={resetElastic}>Reset</Button>
              </div>

              {elasticPE !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Elastic Potential Energy</p>
                    <p className="text-4xl font-bold mt-1">{elasticPE} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(elasticPE) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(elasticPE) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(elasticPE) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(elasticPE) * 100) / 100} Wh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Foot-pounds</p>
                      <p className="text-lg font-medium">{Math.round(toFtLb(elasticPE) * 10) / 10} ft-lb</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: PE = ½ × k × x²</p>
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
