"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ArrowRight, Zap } from "lucide-react";

interface ForceResult {
  force: number;
  unit: string;
  acceleration: number;
  description: string;
}

export default function ForceCalculatorPage() {
  const [mass, setMass] = useState<string>("");
  const [acceleration, setAcceleration] = useState<string>("");
  const [massUnit, setMassUnit] = useState<"kg" | "g" | "lb">("kg");
  const [accelUnit, setAccelUnit] = useState<"m/s2" | "ft/s2" | "g">("m/s2");
  const [result, setResult] = useState<ForceResult | null>(null);

  const calculateForce = () => {
    const m = parseFloat(mass);
    const a = parseFloat(acceleration);

    if (isNaN(m) || isNaN(a) || m <= 0 || a <= 0) {
      setResult(null);
      return;
    }

    let massInKg = m;
    let accelInMS2 = a;

    const massConversions = { kg: 1, g: 0.001, lb: 0.453592 };
    massInKg = m * massConversions[massUnit];

    const accelConversions = { "m/s2": 1, "ft/s2": 0.3048, g: 9.80665 };
    accelInMS2 = a * accelConversions[accelUnit];

    const force = massInKg * accelInMS2;

    let description = "";
    if (force < 1) description = "Very light force (like a feather)";
    else if (force < 10) description = "Light force (holding a small object)";
    else if (force < 50) description = "Moderate force (lifting a bag)";
    else if (force < 100) description = "Strong force (lifting a person)";
    else if (force < 500) description = "Very strong force (motorcycle weight)";
    else description = "Extreme force (car weight or more)";

    setResult({
      force: Math.round(force * 100) / 100,
      unit: "N",
      acceleration: accelInMS2,
      description,
    });
  };

  const reset = () => {
    setMass("");
    setAcceleration("");
    setResult(null);
  };

  useEffect(() => {
    calculateForce();
  }, [mass, acceleration, massUnit, accelUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Force Calculator – Calculate Force Using Newton's Second Law</h1>
          <p className="text-muted-foreground">
            Calculate force from mass and acceleration using F = ma. This physics calculator helps solve problems involving force, motion, and Newton's laws with instant results in newtons and other units.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Object Properties</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mass">Mass</Label>
                    <div className="flex gap-2">
                      <Input
                        id="mass"
                        type="number"
                        placeholder="e.g., 10"
                        value={mass}
                        onChange={(e) => setMass(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={massUnit}
                        onChange={(e) => setMassUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="acceleration">Acceleration</Label>
                    <div className="flex gap-2">
                      <Input
                        id="acceleration"
                        type="number"
                        placeholder="e.g., 9.8"
                        value={acceleration}
                        onChange={(e) => setAcceleration(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={accelUnit}
                        onChange={(e) => setAccelUnit(e.target.value as any)}
                        className="w-24 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="m/s2">m/s²</option>
                        <option value="ft/s2">ft/s²</option>
                        <option value="g">g</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Newton's Second Law: Force equals mass times acceleration (F = ma).
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateForce} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Force Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Force</p>
                    <p className="text-3xl font-bold text-primary">{result.force} N</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">kN</p>
                      <p className="text-lg font-semibold">{(result.force / 1000).toFixed(3)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">lbf</p>
                      <p className="text-lg font-semibold">{(result.force * 0.224809).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Context</p>
                    <p className="font-semibold">{result.description}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> F = m × a</p>
                    <p className="mt-1">F=force (N), m=mass (kg), a=acceleration (m/s²)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ArrowRight className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter mass and acceleration to calculate force</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Force Examples</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Common Forces:
                </h4>
                <ul className="space-y-1">
                  <li>Apple in hand: ~1 N</li>
                  <li>Laptop on desk: ~20 N</li>
                  <li>Average adult standing: ~700 N</li>
                  <li>Small car weight: ~15,000 N</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Acceleration Values:
                </h4>
                <ul className="space-y-1">
                  <li>Earth gravity: 9.81 m/s² (1g)</li>
                  <li>Moon gravity: 1.62 m/s²</li>
                  <li>Car braking: -5 to -8 m/s²</li>
                  <li>F1 car acceleration: 30+ m/s²</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Force</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Determine Mass</h3>
                <p className="text-sm text-muted-foreground">Find the object's mass in kilograms or convert from other units.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Find Acceleration</h3>
                <p className="text-sm text-muted-foreground">Determine the rate of acceleration in m/s² or g-force.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Multiply Together</h3>
                <p className="text-sm text-muted-foreground">Force equals mass times acceleration (F = ma).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Newton's Second Law
                </h3>
                <p className="text-sm text-muted-foreground">Classic F = ma equation for force calculation in physics.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple Mass Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for kilograms, grams, and pounds with auto-conversion.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Acceleration Options
                </h3>
                <p className="text-sm text-muted-foreground">Enter acceleration in m/s², ft/s², or g-force units.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Force Context
                </h3>
                <p className="text-sm text-muted-foreground">Provides real-world context for calculated force values.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is force in physics?</h3>
                <p className="text-sm text-muted-foreground">Force is a push or pull that causes objects to accelerate. Measured in newtons (N), force changes an object's velocity according to Newton's second law.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is one newton?</h3>
                <p className="text-sm text-muted-foreground">One newton is the force needed to accelerate 1 kg at 1 m/s². On Earth, it's roughly the weight of a small apple or smartphone.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I calculate weight?</h3>
                <p className="text-sm text-muted-foreground">Weight is force from gravity: W = mg. On Earth, multiply mass in kg by 9.81 m/s². A 70 kg person weighs about 687 N.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Is force the same as weight?</h3>
                <p className="text-sm text-muted-foreground">Weight is a specific type of force caused by gravity. All weight is force, but not all force is weight. Pushing a box applies force but not weight.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What's the difference between mass and weight?</h3>
                <p className="text-sm text-muted-foreground">Mass is the amount of matter (constant everywhere). Weight is the gravitational force on that mass (changes with gravity). Mass is kg, weight is N.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
