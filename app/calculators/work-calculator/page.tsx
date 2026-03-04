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

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Force</h3>
              <p className="text-sm text-muted-foreground">Input the force applied in Newtons. This is the push or pull on the object.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Distance</h3>
              <p className="text-sm text-muted-foreground">Enter the distance the object moves in meters while force is applied.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Work Results</h3>
              <p className="text-sm text-muted-foreground">See work in Joules plus conversions to kJ, ft-lb, and calories.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Work Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Angle Support**</h3>
            <p className="text-sm text-muted-foreground">Optional angle input for force applied at any direction, not just parallel to motion.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Multiple Unit Outputs**</h3>
            <p className="text-sm text-muted-foreground">Results shown in Joules, kilojoules, foot-pounds, and calories.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Physics-Accurate Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses W = F × d × cos(θ) for precise calculations matching physics standards.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free Educational Tool**</h3>
            <p className="text-sm text-muted-foreground">Perfect for physics students learning work and energy concepts.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is work in physics?</h3>
            <p className="text-sm text-muted-foreground">Work is energy transferred when a force moves an object. Work = Force × Distance × cos(angle). Measured in Joules (J).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">When is work zero?</h3>
            <p className="text-sm text-muted-foreground">Work is zero when: no force is applied, no movement occurs, or force is perpendicular to motion (90° angle, cos(90°) = 0).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the unit of work?</h3>
            <p className="text-sm text-muted-foreground">The SI unit is Joule (J). 1 Joule = 1 Newton-meter. Other units: kilojoules (kJ), foot-pounds (ft-lb), and calories.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How does angle affect work?</h3>
            <p className="text-sm text-muted-foreground">Maximum work occurs at 0° (force parallel to motion). At 90°, work is zero. At 180°, work is negative (force opposes motion).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Is work the same as energy?</h3>
            <p className="text-sm text-muted-foreground">Work transfers energy. They have the same units (Joules) but work is the process of energy transfer, while energy is the capacity to do work.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/force-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Force Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate force using Newton&apos;s second law (F = ma).</p>
          </a>
          <a href="/calculators/power-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Power Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate power as work done per unit time.</p>
          </a>
          <a href="/calculators/kinetic-energy-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Kinetic Energy Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate kinetic energy of moving objects.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
