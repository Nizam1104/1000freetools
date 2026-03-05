"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Energy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Choose kinetic energy for moving objects or potential energy for raised objects.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter mass and either velocity (for kinetic) or height (for potential).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see energy in joules plus conversions to kJ, calories, and watt-hours.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Kinetic and Potential Energy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is Energy</h4>
            <p className="text-sm text-muted-foreground">
              Energy is the ability to do work. It comes in many forms - motion, height, heat, electricity - but they all measure in joules. Kinetic energy is what moving objects have. Potential energy is stored energy from position. A roller coaster at the top of a hill has potential energy. As it drops, that becomes kinetic energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Kinetic Energy Explained</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Kinetic energy depends on two things:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Mass</p>
                <p className="text-xs text-muted-foreground">
                  Double the mass, double the energy. A 2,000 kg car at 60 mph has twice the kinetic energy of a 1,000 kg car at the same speed.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-semibold text-sm mb-2">Velocity (squared)</p>
                <p className="text-xs text-muted-foreground">
                  Double the speed, quadruple the energy. That's why high-speed crashes are so much worse. A car at 60 mph has 4x the energy of the same car at 30 mph.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Potential Energy Explained</h4>
            <p className="text-sm text-muted-foreground">
              Gravitational potential energy is simple: lift something up, it gains energy. The formula PE = mgh means mass times gravity times height. On Earth, gravity is 9.81 m/s². On the Moon it's 1.62 m/s² - you'd need to lift something 6 times higher to store the same energy.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Energy Unit Conversions Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Equals 1 Joule</TableHead>
                <TableHead>Common Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Joule (J)</TableCell>
                <TableCell className="font-mono">1 J</TableCell>
                <TableCell>Physics, engineering</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kilojoule (kJ)</TableCell>
                <TableCell className="font-mono">0.001 kJ</TableCell>
                <TableCell>Food energy (outside US)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Calorie (cal)</TableCell>
                <TableCell className="font-mono">0.239 cal</TableCell>
                <TableCell>Chemistry, heat</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kilocalorie (kcal)</TableCell>
                <TableCell className="font-mono">0.000239 kcal</TableCell>
                <TableCell>Food energy (Calories)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Watt-hour (Wh)</TableCell>
                <TableCell className="font-mono">0.000278 Wh</TableCell>
                <TableCell>Electricity, batteries</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kilowatt-hour (kWh)</TableCell>
                <TableCell className="font-mono">2.78e-7 kWh</TableCell>
                <TableCell>Electric bills</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            1 food Calorie (capital C) = 1 kilocalorie = 1,000 calories = 4,184 joules.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-World Energy Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Kinetic Energy Examples</h4>
            <ul className="text-xs text-muted-foreground space-y-2 ml-4">
              <li><strong>Baseball pitch (100 mph):</strong> ~130 J - about the energy in a small bite of food</li>
              <li><strong>Car at 60 mph (1,500 kg):</strong> ~340,000 J - enough to power a 100W bulb for 56 minutes</li>
              <li><strong>Bullet (9mm, 350 m/s):</strong> ~500 J - concentrated in a tiny area, which is why it's destructive</li>
              <li><strong>Person running (70 kg, 5 m/s):</strong> ~875 J - what your body burns in about 10 seconds of sprinting</li>
            </ul>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">Potential Energy Examples</h4>
            <ul className="text-xs text-muted-foreground space-y-2 ml-4">
              <li><strong>Phone dropped from 1m:</strong> ~1.5 J - not much, but enough to crack a screen</li>
              <li><strong>Elevator (1,000 kg) at 10 floors:</strong> ~300,000 J - regenerated by modern elevators going down</li>
              <li><strong>Water behind 100m dam (1 kg):</strong> ~981 J - hydroelectric plants convert this to electricity</li>
              <li><strong>Book on 2m shelf (1 kg):</strong> ~20 J - harmless until it falls on your foot</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the formula for kinetic energy?</h4>
            <p className="text-sm text-muted-foreground">
              KE = ½mv². Mass in kg, velocity in m/s, result in joules. The velocity is squared, so speed matters more than mass. A small object moving fast can have more energy than a large object moving slow.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate potential energy?</h4>
            <p className="text-sm text-muted-foreground">
              PE = mgh. Mass in kg, gravity is 9.81 m/s² on Earth, height in meters. A 1 kg object lifted 1 meter gains about 9.8 joules of potential energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between joules and calories?</h4>
            <p className="text-sm text-muted-foreground">
              Both measure energy. 1 calorie = 4.184 joules. Food "Calories" (capital C) are actually kilocalories - 1 Calorie = 1,000 calories = 4,184 joules. A 200 Calorie snack bar has 836,800 joules of chemical energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Can energy be negative?</h4>
            <p className="text-sm text-muted-foreground">
              Kinetic energy is always positive - you can't have negative motion. Potential energy can be negative depending on your reference point. If ground level is zero, a basement has negative potential energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Why does velocity get squared in kinetic energy?</h4>
            <p className="text-sm text-muted-foreground">
              It comes from the work-energy theorem. To accelerate something, you apply force over distance. The faster it's already going, the more distance it covers while you're accelerating it, so more work gets done. The math works out to v².
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/kinetic-energy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Kinetic Energy Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate energy of moving objects</p>
            </a>
            <a href="/calculators/velocity-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Velocity Calculator</p>
              <p className="text-xs text-muted-foreground">Find speed and acceleration</p>
            </a>
            <a href="/calculators/force-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Force Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate force from mass and acceleration</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
