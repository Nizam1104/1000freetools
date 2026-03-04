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

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Torque</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Force Value</h3>
              <p className="text-sm text-muted-foreground">Input the force applied in Newtons (N). This is the push or pull acting on the lever arm.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Input Lever Arm Length</h3>
              <p className="text-sm text-muted-foreground">Enter the distance from the pivot point to where force is applied, measured in meters.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Instant Results</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see torque in N·m and ft-lb, with the formula used for your calculation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Torque Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Angle Support**</h3>
            <p className="text-sm text-muted-foreground">Optional angle input accounts for force applied at any angle, not just perpendicular (90°).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Dual Unit Display**</h3>
            <p className="text-sm text-muted-foreground">Results shown in both Newton-meters (N·m) and foot-pounds (ft-lb) for international use.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Physics-Accurate Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses τ = F × r × sin(θ) for precise calculations matching engineering standards.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Free & Instant**</h3>
            <p className="text-sm text-muted-foreground">No registration required. Get accurate torque calculations instantly in your browser.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is the formula for calculating torque?</h3>
            <p className="text-sm text-muted-foreground">Torque is calculated using τ = F × r × sin(θ), where F is force in Newtons, r is lever arm length in meters, and θ is the angle between force and lever arm. At 90°, sin(θ) = 1, simplifying to τ = F × r.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How do I convert Newton-meters to foot-pounds?</h3>
            <p className="text-sm text-muted-foreground">Multiply Newton-meters by 0.737562 to get foot-pounds. For example, 100 N·m equals approximately 73.76 ft-lb.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What angle gives maximum torque?</h3>
            <p className="text-sm text-muted-foreground">Maximum torque occurs at 90 degrees (perpendicular force). At 0° or 180°, torque is zero because the force is parallel to the lever arm.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Is torque the same as force?</h3>
            <p className="text-sm text-muted-foreground">No. Force is a push or pull (measured in Newtons), while torque is rotational force (measured in N·m). Torque depends on both force magnitude and where it&apos;s applied.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why is torque important in engines?</h3>
            <p className="text-sm text-muted-foreground">Engine torque determines how much rotational force is available for acceleration and towing. Higher torque at low RPM means better pulling power and quicker acceleration from a stop.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/torque-to-power-converter" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Torque to Power Converter</h3>
            <p className="text-sm text-muted-foreground">Convert engine torque and RPM to horsepower or kilowatts instantly.</p>
          </a>
          <a href="/calculators/power-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Power Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate mechanical or electrical power from various input parameters.</p>
          </a>
          <a href="/calculators/force-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Force Calculator</h3>
            <p className="text-sm text-muted-foreground">Compute force using Newton&apos;s second law (F = ma) for physics problems.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
