"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function KineticEnergyCalculator() {
  const [mass, setMass] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [useRelativistic, setUseRelativistic] = useState<boolean>(false);
  const [kineticEnergy, setKineticEnergy] = useState<number | null>(null);
  const [relativisticKE, setRelativisticKE] = useState<number | null>(null);

  const speedOfLight = 299792458; // m/s

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);

    if (isNaN(m) || isNaN(v) || m <= 0 || v < 0) return;

    // Classical KE = ½mv²
    const classicalKE = 0.5 * m * v * v;
    setKineticEnergy(Math.round(classicalKE * 100) / 100);

    // Relativistic KE = (γ - 1)mc² where γ = 1/√(1 - v²/c²)
    if (useRelativistic && v > 0) {
      const vSquaredOverC2 = (v * v) / (speedOfLight * speedOfLight);
      if (vSquaredOverC2 < 1) {
        const gamma = 1 / Math.sqrt(1 - vSquaredOverC2);
        const relKE = (gamma - 1) * m * speedOfLight * speedOfLight;
        setRelativisticKE(Math.round(relKE * 100) / 100);
      } else {
        setRelativisticKE(null);
      }
    } else {
      setRelativisticKE(null);
    }
  };

  const reset = () => {
    setMass("");
    setVelocity("");
    setUseRelativistic(false);
    setKineticEnergy(null);
    setRelativisticKE(null);
  };

  // Unit conversions
  const toKj = (joules: number) => joules / 1000;
  const toCal = (joules: number) => joules * 0.239006;
  const toKcal = (joules: number) => joules * 0.000239006;
  const toWh = (joules: number) => joules / 3600;
  const toKwh = (joules: number) => joules / 3600000;
  const toEv = (joules: number) => joules / 1.60218e-19;
  const toBtu = (joules: number) => joules * 0.000947817;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Kinetic Energy Calculator</CardTitle>
          <CardDescription>
            Calculate kinetic energy from mass and velocity. Includes classical and relativistic calculations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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

            <div className="flex items-center gap-2">
              <Checkbox
                id="useRelativistic"
                checked={useRelativistic}
                onCheckedChange={(checked) => setUseRelativistic(checked as boolean)}
              />
              <Label htmlFor="useRelativistic" className="cursor-pointer">
                Include relativistic calculation
              </Label>
            </div>

            {useRelativistic && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  Relativistic effects become significant at velocities approaching the speed of light 
                  (299,792,458 m/s). The relativistic formula accounts for the increase in effective mass 
                  at high velocities.
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Kinetic Energy</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {kineticEnergy !== null && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Classical Kinetic Energy</p>
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
                  <div>
                    <p className="text-xs text-muted-foreground">Kilowatt-hours</p>
                    <p className="text-lg font-medium">{toKwh(kineticEnergy).toExponential(4)} kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">BTU</p>
                    <p className="text-lg font-medium">{Math.round(toBtu(kineticEnergy) * 1000) / 1000} BTU</p>
                  </div>
                </div>

                {relativisticKE !== null && (
                  <div className="pt-2 border-t space-y-2">
                    <p className="text-sm font-medium">Relativistic Kinetic Energy</p>
                    <p className="text-3xl font-bold">{relativisticKE} J</p>
                    <p className="text-xs text-muted-foreground">
                      Using KE = (γ - 1)mc² where γ = 1/√(1 - v²/c²)
                    </p>
                    {kineticEnergy > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Difference from classical: {Math.round((relativisticKE - kineticEnergy) * 100) / 100} J 
                        ({((relativisticKE - kineticEnergy) / kineticEnergy * 100).toFixed(4)}%)
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Formula: KE = ½ × m × v²</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
