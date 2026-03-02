"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function TorqueCalculator() {
  const [force, setForce] = useState<string>("");
  const [leverArm, setLeverArm] = useState<string>("");
  const [useAngle, setUseAngle] = useState<boolean>(false);
  const [angle, setAngle] = useState<string>("90");
  const [torque, setTorque] = useState<number | null>(null);

  const calculate = () => {
    const F = parseFloat(force);
    const r = parseFloat(leverArm);

    if (isNaN(F) || isNaN(r) || F <= 0 || r <= 0) return;

    let T: number;
    if (useAngle) {
      const theta = parseFloat(angle);
      if (isNaN(theta)) return;
      const thetaRad = (theta * Math.PI) / 180;
      T = F * r * Math.sin(thetaRad);
    } else {
      // Default: angle = 90°, sin(90°) = 1
      T = F * r;
    }

    setTorque(Math.round(T * 100) / 100);
  };

  const reset = () => {
    setForce("");
    setLeverArm("");
    setUseAngle(false);
    setAngle("90");
    setTorque(null);
  };

  // Unit conversion: Nm to ft-lb
  const toFtLb = (nm: number) => nm * 0.737562;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Torque Calculator</CardTitle>
          <CardDescription>
            Calculate torque from force and lever arm length. τ = F × r × sin(θ)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              <Label htmlFor="leverArm">Lever Arm Length (m)</Label>
              <Input
                id="leverArm"
                type="number"
                placeholder="e.g., 0.5"
                value={leverArm}
                onChange={(e) => setLeverArm(e.target.value)}
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
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  90° = maximum torque, 0° = no torque (force parallel to lever)
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Torque</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {torque !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Torque</p>
                  <p className="text-4xl font-bold mt-1">{torque} N·m</p>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Foot-pounds</p>
                  <p className="text-lg font-medium">{Math.round(toFtLb(torque) * 10) / 10} ft-lb</p>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Formula: τ = F × r {useAngle ? "× sin(θ)" : "(θ = 90°)"}
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
