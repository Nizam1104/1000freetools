"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

export default function KineticEnergyCalculator() {
  const [mass, setMass] = useState<string>("");
  const [velocity, setVelocity] = useState<string>("");
  const [useRelativistic, setUseRelativistic] = useState<boolean>(false);
  const [kineticEnergy, setKineticEnergy] = useState<number | null>(null);
  const [relativisticKE, setRelativisticKE] = useState<number | null>(null);
  const [graphData, setGraphData] = useState<any[]>([]);

  const speedOfLight = 299792458;

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);

    if (isNaN(m) || isNaN(v) || m <= 0 || v < 0) return;

    const classicalKE = 0.5 * m * v * v;
    setKineticEnergy(Math.round(classicalKE * 100) / 100);

    if (useRelativistic && v > 0) {
      const vSquaredOverC2 = (v * v) / (speedOfLight * speedOfLight);
      if (vSquaredOverC2 < 1) {
        const gamma = 1 / Math.sqrt(1 - vSquaredOverC2);
        const relKE = (gamma - 1) * m * speedOfLight * speedOfLight;
        setRelativisticKE(Math.round(relKE * 100) / 100);
        generateKEGraph(m, v);
      } else {
        setRelativisticKE(null);
      }
    } else {
      setRelativisticKE(null);
      generateKEGraph(m, v);
    }
  };

  const generateKEGraph = (m: number, v: number) => {
    const data = [];
    const maxV = Math.min(v * 1.5, speedOfLight * 0.99);
    const step = maxV / 20;
    for (let vel = 0; vel <= maxV; vel += step) {
      const classical = 0.5 * m * vel * vel;
      const v2c2 = (vel * vel) / (speedOfLight * speedOfLight);
      const gamma = v2c2 < 1 ? 1 / Math.sqrt(1 - v2c2) : 1;
      const relativistic = (gamma - 1) * m * speedOfLight * speedOfLight;
      data.push({
        velocity: Math.round(vel / 1000 * 100) / 100,
        classical: Math.round(classical / 1000 * 100) / 100,
        relativistic: Math.round(relativistic / 1000 * 100) / 100,
      });
    }
    setGraphData(data);
  };

  const reset = () => {
    setMass("");
    setVelocity("");
    setUseRelativistic(false);
    setKineticEnergy(null);
    setRelativisticKE(null);
    setGraphData([]);
  };

  const toKj = (joules: number) => joules / 1000;
  const toCal = (joules: number) => joules * 0.239006;
  const toKcal = (joules: number) => joules * 0.000239006;
  const toWh = (joules: number) => joules / 3600;
  const toKwh = (joules: number) => joules / 3600000;
  const toEv = (joules: number) => joules / 1.60218e-19;
  const toBtu = (joules: number) => joules * 0.000947817;
  const toFtLb = (joules: number) => joules * 0.737562;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
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
                  Relativistic effects become significant above 10% of light speed (30,000 km/s). 
                  At everyday speeds, classical and relativistic results are identical.
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
                  <p className="text-4xl font-bold mt-1">{kineticEnergy.toLocaleString()} J</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
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
                  <div>
                    <p className="text-xs text-muted-foreground">Foot-pounds</p>
                    <p className="text-lg font-medium">{Math.round(toFtLb(kineticEnergy) * 10) / 10} ft·lb</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Electron volts</p>
                    <p className="text-lg font-medium">{toEv(kineticEnergy).toExponential(2)} eV</p>
                  </div>
                </div>

                {relativisticKE !== null && (
                  <div className="pt-2 border-t space-y-2">
                    <p className="text-sm font-medium">Relativistic Kinetic Energy</p>
                    <p className="text-3xl font-bold">{relativisticKE.toLocaleString()} J</p>
                    {kineticEnergy > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Difference: {Math.round((relativisticKE - kineticEnergy) * 100) / 100} J ({((relativisticKE - kineticEnergy) / kineticEnergy * 100).toFixed(4)}%)
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground font-mono">Formula: KE = ½ × m × v²</p>
                </div>
              </div>
            )}
          </div>

          {graphData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Kinetic Energy vs Velocity</h3>
              <div className="h-[250px]">
                <ChartContainer
                  config={{
                    classical: { label: "Classical KE", color: "hsl(var(--chart-1))" },
                    relativistic: { label: "Relativistic KE", color: "hsl(var(--chart-2))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis label={{ value: "Velocity (km/s)", position: "insideBottom", offset: -5 }} dataKey="velocity" />
                      <YAxis label={{ value: "KE (kJ)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="classical" stroke="#8884d8" strokeWidth={2} />
                      {useRelativistic && <Line type="monotone" dataKey="relativistic" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Classical KE follows a parabola (v²). Relativistic KE approaches infinity as v approaches c.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is Kinetic Energy?</CardTitle>
          <CardDescription>Understanding energy of motion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Kinetic energy is the energy an object has because it's moving. A stationary object has zero kinetic energy. Double the velocity, and you quadruple the kinetic energy (because of the v² in the formula). This is why high-speed crashes are so much more dangerous than low-speed ones.
          </p>
          <p className="text-sm text-muted-foreground">
            The classical formula KE = ½mv² works perfectly for everyday speeds. But as you approach the speed of light, Einstein's relativity kicks in. Mass effectively increases, requiring more and more energy for each additional m/s. At 90% of light speed, relativistic KE is already double the classical prediction.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Kinetic Energy Formulas</p>
            <div className="space-y-2">
              <p className="font-mono">Classical: KE = ½mv²</p>
              <p className="font-mono">Relativistic: KE = (γ - 1)mc²</p>
              <p className="text-xs text-muted-foreground">where γ = 1/√(1 - v²/c²)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kinetic Energy Examples</CardTitle>
          <CardDescription>Real-world kinetic energy values</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Object</TableHead>
                <TableHead>Mass</TableHead>
                <TableHead>Velocity</TableHead>
                <TableHead>Kinetic Energy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Walking person</TableCell>
                <TableCell className="font-mono text-xs">70 kg</TableCell>
                <TableCell className="font-mono text-xs">1.4 m/s</TableCell>
                <TableCell className="font-mono text-xs">69 J</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Car at city speed</TableCell>
                <TableCell className="font-mono text-xs">1500 kg</TableCell>
                <TableCell className="font-mono text-xs">14 m/s (50 km/h)</TableCell>
                <TableCell className="font-mono text-xs">147 kJ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Car at highway speed</TableCell>
                <TableCell className="font-mono text-xs">1500 kg</TableCell>
                <TableCell className="font-mono text-xs">28 m/s (100 km/h)</TableCell>
                <TableCell className="font-mono text-xs">588 kJ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bullet (rifle)</TableCell>
                <TableCell className="font-mono text-xs">0.01 kg</TableCell>
                <TableCell className="font-mono text-xs">900 m/s</TableCell>
                <TableCell className="font-mono text-xs">4,050 J</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Commercial jet</TableCell>
                <TableCell className="font-mono text-xs">70,000 kg</TableCell>
                <TableCell className="font-mono text-xs">250 m/s</TableCell>
                <TableCell className="font-mono text-xs">2.2 GJ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ISS in orbit</TableCell>
                <TableCell className="font-mono text-xs">420,000 kg</TableCell>
                <TableCell className="font-mono text-xs">7,660 m/s</TableCell>
                <TableCell className="font-mono text-xs">12.3 TJ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Notice: Doubling the car's speed from 50 to 100 km/h quadruples the kinetic energy (147 kJ → 588 kJ). This is why stopping distance increases dramatically at higher speeds.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Energy Unit Conversions</CardTitle>
          <CardDescription>Common energy units compared</CardDescription>
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
                <TableCell className="font-medium">Joule (J)</TableCell>
                <TableCell className="font-mono text-xs">1 J</TableCell>
                <TableCell className="text-xs">SI unit, physics</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kilojoule (kJ)</TableCell>
                <TableCell className="font-mono text-xs">0.001 kJ</TableCell>
                <TableCell className="text-xs">Food energy (outside US)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Calorie (cal)</TableCell>
                <TableCell className="font-mono text-xs">0.239 cal</TableCell>
                <TableCell className="text-xs">Chemistry, heat</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kilocalorie (kcal)</TableCell>
                <TableCell className="font-mono text-xs">0.000239 kcal</TableCell>
                <TableCell className="text-xs">Food energy (Calories)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Watt-hour (Wh)</TableCell>
                <TableCell className="font-mono text-xs">0.000278 Wh</TableCell>
                <TableCell className="text-xs">Electrical energy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">BTU</TableCell>
                <TableCell className="font-mono text-xs">0.000948 BTU</TableCell>
                <TableCell className="text-xs">Heating/cooling (US)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Electron volt (eV)</TableCell>
                <TableCell className="font-mono text-xs">6.24×10¹⁸ eV</TableCell>
                <TableCell className="text-xs">Particle physics</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does kinetic energy depend on velocity squared?</h4>
            <p className="text-xs text-muted-foreground">
              Because work equals force times distance, and stopping distance increases with the square of velocity. A car at 60 mph needs 4× the braking distance of a car at 30 mph, meaning it has 4× the energy to dissipate. The v² comes from integrating force over distance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When do I need relativistic calculations?</h4>
            <p className="text-xs text-muted-foreground">
              For particles in accelerators, cosmic rays, or anything above about 10% of light speed (30,000 km/s). For everyday objects – even bullets and spacecraft – classical physics is accurate to many decimal places. An orbital spacecraft at 8 km/s is only 0.003% of light speed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can kinetic energy be negative?</h4>
            <p className="text-xs text-muted-foreground">
              No. Mass is always positive, and velocity squared is always positive (even for negative velocity). Kinetic energy is a scalar, not a vector – it has magnitude but no direction. An object moving left has the same KE as one moving right at the same speed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens to kinetic energy when an object stops?</h4>
            <p className="text-xs text-muted-foreground">
              Energy is conserved, so it goes somewhere. Brakes convert it to heat. A collision converts it to deformation, sound, and heat. A pendulum converts it to potential energy as it swings upward. The kinetic energy doesn't disappear – it transforms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does kinetic energy relate to momentum?</h4>
            <p className="text-xs text-muted-foreground">
              Momentum p = mv, kinetic energy KE = ½mv². They're related by KE = p²/(2m). Momentum is a vector (has direction), kinetic energy is a scalar. In collisions, momentum is always conserved. Kinetic energy is only conserved in elastic collisions.
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
            <a href="/calculators/potential-energy-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Potential Energy Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate gravitational PE</p>
            </a>
            <a href="/calculators/velocity-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Velocity Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate velocity from displacement</p>
            </a>
            <a href="/calculators/momentum-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Momentum Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate momentum</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
