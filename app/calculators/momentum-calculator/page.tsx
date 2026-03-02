"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MomentumCalculator() {
  // Mode 1: p = mv
  const [mass, setMass] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [momentum, setMomentum] = useState<number | null>(null);

  // Mode 2: p = F × t
  const [force, setForce] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [momentumFromForce, setMomentumFromForce] = useState<number | null>(null);

  const calculateMomentum = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);

    if (isNaN(m) || isNaN(v) || m <= 0) return;

    const p = m * v;
    setMomentum(Math.round(p * 100) / 100);
  };

  const calculateFromForce = () => {
    const F = parseFloat(force);
    const t = parseFloat(time);

    if (isNaN(F) || isNaN(t) || t <= 0) return;

    const p = F * t;
    setMomentumFromForce(Math.round(p * 100) / 100);
  };

  const resetMomentumMode = () => {
    setMass("");
    setVelocity("");
    setMomentum(null);
  };

  const resetForceMode = () => {
    setForce("");
    setTime("");
    setMomentumFromForce(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Momentum Calculator</CardTitle>
          <CardDescription>
            Calculate linear momentum from mass and velocity (p = mv), or from force and time (p = F × t).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mass" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mass">p = mv</TabsTrigger>
              <TabsTrigger value="force">p = F × t</TabsTrigger>
            </TabsList>

            <TabsContent value="mass" className="space-y-4 mt-4">
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

              <div>
                <Label htmlFor="velocity">Velocity (m/s)</Label>
                <Input
                  id="velocity"
                  type="number"
                  placeholder="e.g., 20"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateMomentum}>Calculate Momentum</Button>
                <Button variant="outline" onClick={resetMomentumMode}>Reset</Button>
              </div>

              {momentum !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Momentum</p>
                    <p className="text-4xl font-bold mt-1">{momentum} kg·m/s</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: p = m × v</p>
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
                  placeholder="e.g., 50"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
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
                <Button onClick={calculateFromForce}>Calculate Momentum</Button>
                <Button variant="outline" onClick={resetForceMode}>Reset</Button>
              </div>

              {momentumFromForce !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Momentum (Impulse)</p>
                    <p className="text-4xl font-bold mt-1">{momentumFromForce} kg·m/s</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: p = F × t</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This represents the impulse (change in momentum) from applying force over time.
                    </p>
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
