"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function WorkCalculator() {
  const [force, setForce] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [useAngle, setUseAngle] = useState<boolean>(false);
  const [angle, setAngle] = useState<string>("");
  const [work, setWork] = useState<number | null>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const d = parseFloat(distance);

    if (isNaN(F) || isNaN(d) || F <= 0 || d <= 0) return;

    let W: number;
    if (useAngle) {
      const theta = parseFloat(angle);
      if (isNaN(theta)) return;
      const thetaRad = (theta * Math.PI) / 180;
      W = F * d * Math.cos(thetaRad);
    } else {
      W = F * d;
    }

    setWork(Math.round(W * 100) / 100);
  };

  const reset = () => {
    setForce("");
    setDistance("");
    setUseAngle(false);
    setAngle("");
    setWork(null);
  };

  // Unit conversions
  const toKj = (joules: number) => joules / 1000;
  const toFtLb = (joules: number) => joules * 0.737562;
  const toCal = (joules: number) => joules * 0.239006;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Work Calculator</CardTitle>
          <CardDescription>
            Calculate mechanical work done. Enter force and distance, with an optional angle for W = Fd cos(θ).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              <Label htmlFor="distance">Distance (m)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="e.g., 10"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="useAngle"
                checked={useAngle}
                onCheckedChange={(checked) => setUseAngle(checked as boolean)}
              />
              <Label htmlFor="useAngle" className="cursor-pointer">Include angle (θ)</Label>
            </div>

            {useAngle && (
              <div>
                <Label htmlFor="angle">Angle (degrees)</Label>
                <Input
                  id="angle"
                  type="number"
                  placeholder="e.g., 30"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  0° = force in direction of motion, 90° = perpendicular (no work)
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Work</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {work !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Work Done</p>
                  <p className="text-4xl font-bold mt-1">{work} J</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Kilojoules</p>
                    <p className="text-lg font-medium">{Math.round(toKj(work) * 100) / 100} kJ</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Foot-pounds</p>
                    <p className="text-lg font-medium">{Math.round(toFtLb(work) * 10) / 10} ft-lb</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Calories</p>
                    <p className="text-lg font-medium">{Math.round(toCal(work) * 10) / 10} cal</p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Formula: W = F × d {useAngle ? "× cos(θ)" : ""}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
