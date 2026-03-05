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

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-sm mb-2">What Is Momentum?</h4>
            <p className="text-xs text-muted-foreground">
              Momentum (p) measures how hard it is to stop a moving object. p = mass × velocity. A heavy truck at low speed can have the same momentum as a bullet at high speed.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Momentum Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Choose your calculation method</p>
                <p>Use "p = mv" if you know mass and velocity. Use "p = F × t" if you know force and time.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the known values</p>
                <p>Input mass (kg) and velocity (m/s), or force (N) and time (s).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">Calculate momentum</p>
                <p>The calculator shows momentum in kg·m/s with the formula used.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Momentum Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Object</th>
                  <th className="text-left py-2 px-2 font-semibold">Mass</th>
                  <th className="text-left py-2 px-2 font-semibold">Velocity</th>
                  <th className="text-left py-2 px-2 font-semibold">Momentum</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Baseball (pitched)</td>
                  <td className="py-2 px-2">0.145 kg</td>
                  <td className="py-2 px-2">40 m/s</td>
                  <td className="py-2 px-2">5.8 kg·m/s</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Car (city driving)</td>
                  <td className="py-2 px-2">1500 kg</td>
                  <td className="py-2 px-2">15 m/s</td>
                  <td className="py-2 px-2">22,500 kg·m/s</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Bullet (rifle)</td>
                  <td className="py-2 px-2">0.01 kg</td>
                  <td className="py-2 px-2">900 m/s</td>
                  <td className="py-2 px-2">9 kg·m/s</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Person (running)</td>
                  <td className="py-2 px-2">70 kg</td>
                  <td className="py-2 px-2">5 m/s</td>
                  <td className="py-2 px-2">350 kg·m/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding Momentum and Impulse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Momentum is a vector quantity—it has both magnitude and direction. The direction of momentum is the same as the direction of velocity.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Conservation of Momentum</h4>
              <p>
                In a closed system, total momentum before a collision equals total momentum after. This principle explains why a gun recoils when fired—the bullet gains forward momentum, the gun gains equal backward momentum.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Impulse-Momentum Theorem</h4>
              <p>
                Impulse (F × t) equals change in momentum. A small force applied for a long time can produce the same momentum change as a large force applied briefly. This is why airbags work—they extend the time of impact, reducing the force.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Elastic vs Inelastic Collisions</h4>
              <p>
                In elastic collisions, both momentum and kinetic energy are conserved (billiard balls). In inelastic collisions, only momentum is conserved—some energy becomes heat or deformation (car crashes).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">What's the difference between momentum and inertia?</h4>
            <p className="text-xs text-muted-foreground">
              Inertia is an object's resistance to changes in motion—it depends only on mass. Momentum depends on both mass and velocity. A stationary object has inertia but zero momentum.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can momentum be negative?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Momentum is a vector. If you define right as positive, an object moving left has negative momentum. In 1D problems, sign indicates direction.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">How is impulse related to momentum?</h4>
            <p className="text-xs text-muted-foreground">
              Impulse equals change in momentum: J = Δp = F × t. Pushing a shopping cart for 5 seconds with 10 N gives an impulse of 50 N·s, changing its momentum by 50 kg·m/s.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Why do fielders pull their hands back when catching a ball?</h4>
            <p className="text-xs text-muted-foreground">
              Pulling back increases the time of impact. Since F = Δp/t, increasing t reduces the force on their hands. Same momentum change, less painful force.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Is momentum conserved in real collisions?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, if you include all objects involved. A car hitting a wall transfers momentum to the Earth through the wall. The Earth's huge mass means its velocity change is imperceptible, but momentum is still conserved.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/calculators/kinetic-energy-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Kinetic Energy</p>
              <p className="text-xs text-muted-foreground">Calculate KE = ½mv²</p>
            </a>
            <a href="/calculators/force-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Force Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate F = ma</p>
            </a>
            <a href="/calculators/velocity-calculator" className="p-3 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Velocity Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate speed and velocity</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
