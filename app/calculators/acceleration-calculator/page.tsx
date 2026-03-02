"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccelerationCalculator() {
  // Mode 1: a = (v_f - v_i) / t
  const [initialVelocity, setInitialVelocity] = useState<string>("");
  const [finalVelocity, setFinalVelocity] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [acceleration, setAcceleration] = useState<number | null>(null);

  // Mode 2: F = ma
  const [force, setForce] = useState<string>("");
  const [mass, setMass] = useState<string>("");
  const [accelerationFromForce, setAccelerationFromForce] = useState<number | null>(null);

  const calculateAcceleration = () => {
    const vi = parseFloat(initialVelocity);
    const vf = parseFloat(finalVelocity);
    const t = parseFloat(time);

    if (isNaN(vi) || isNaN(vf) || isNaN(t) || t <= 0) return;

    const a = (vf - vi) / t;
    setAcceleration(Math.round(a * 100) / 100);
  };

  const calculateFromForce = () => {
    const F = parseFloat(force);
    const m = parseFloat(mass);

    if (isNaN(F) || isNaN(m) || m <= 0) return;

    const a = F / m;
    setAccelerationFromForce(Math.round(a * 100) / 100);
  };

  const resetVelocityMode = () => {
    setInitialVelocity("");
    setFinalVelocity("");
    setTime("");
    setAcceleration(null);
  };

  const resetForceMode = () => {
    setForce("");
    setMass("");
    setAccelerationFromForce(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Acceleration Calculator</CardTitle>
          <CardDescription>
            Calculate acceleration from change in velocity over time, or use Newton's second law (F = ma).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="velocity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="velocity">Change in Velocity</TabsTrigger>
              <TabsTrigger value="force">F = ma Mode</TabsTrigger>
            </TabsList>

            <TabsContent value="velocity" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="initialVelocity">Initial Velocity (m/s)</Label>
                <Input
                  id="initialVelocity"
                  type="number"
                  placeholder="e.g., 0"
                  value={initialVelocity}
                  onChange={(e) => setInitialVelocity(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="finalVelocity">Final Velocity (m/s)</Label>
                <Input
                  id="finalVelocity"
                  type="number"
                  placeholder="e.g., 20"
                  value={finalVelocity}
                  onChange={(e) => setFinalVelocity(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="time">Time (s)</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="e.g., 5"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateAcceleration}>Calculate Acceleration</Button>
                <Button variant="outline" onClick={resetVelocityMode}>Reset</Button>
              </div>

              {acceleration !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Acceleration</p>
                    <p className="text-4xl font-bold mt-1">{acceleration} m/s²</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: a = (v_f - v_i) / t</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="force" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="force">Force (N)</Label>
                <Input
                  id="force"
                  type="number"
                  placeholder="e.g., 100"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mass">Mass (kg)</Label>
                <Input
                  id="mass"
                  type="number"
                  placeholder="e.g., 10"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateFromForce}>Calculate Acceleration</Button>
                <Button variant="outline" onClick={resetForceMode}>Reset</Button>
              </div>

              {accelerationFromForce !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Acceleration</p>
                    <p className="text-4xl font-bold mt-1">{accelerationFromForce} m/s²</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: a = F / m</p>
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
