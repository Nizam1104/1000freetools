"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PotentialEnergyCalculator() {
  // Gravitational PE
  const [gravMass, setGravMass] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gravity, setGravity] = useState<string>("9.81");
  const [gravitationalPE, setGravitationalPE] = useState<number | null>(null);

  // Elastic PE
  const [springConstant, setSpringConstant] = useState<string>("");
  const [displacement, setDisplacement] = useState<string>("");
  const [elasticPE, setElasticPE] = useState<number | null>(null);

  const calculateGravitational = () => {
    const m = parseFloat(gravMass);
    const h = parseFloat(height);
    const g = parseFloat(gravity);

    if (isNaN(m) || isNaN(h) || isNaN(g) || m <= 0 || h <= 0 || g <= 0) return;

    const PE = m * g * h;
    setGravitationalPE(Math.round(PE * 100) / 100);
  };

  const calculateElastic = () => {
    const k = parseFloat(springConstant);
    const x = parseFloat(displacement);

    if (isNaN(k) || isNaN(x) || k <= 0 || x <= 0) return;

    const PE = 0.5 * k * x * x;
    setElasticPE(Math.round(PE * 100) / 100);
  };

  const resetGravitational = () => {
    setGravMass("");
    setHeight("");
    setGravity("9.81");
    setGravitationalPE(null);
  };

  const resetElastic = () => {
    setSpringConstant("");
    setDisplacement("");
    setElasticPE(null);
  };

  // Unit conversions
  const toKj = (joules: number) => joules / 1000;
  const toCal = (joules: number) => joules * 0.239006;
  const toKcal = (joules: number) => joules * 0.000239006;
  const toWh = (joules: number) => joules / 3600;
  const toFtLb = (joules: number) => joules * 0.737562;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Potential Energy Calculator</CardTitle>
          <CardDescription>
            Calculate gravitational potential energy (PE = mgh) or elastic potential energy (PE = ½kx²).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gravitational" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gravitational">Gravitational PE</TabsTrigger>
              <TabsTrigger value="elastic">Elastic PE</TabsTrigger>
            </TabsList>

            <TabsContent value="gravitational" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="gravMass">Mass (kg)</Label>
                <Input
                  id="gravMass"
                  type="number"
                  placeholder="e.g., 5"
                  value={gravMass}
                  onChange={(e) => setGravMass(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="height">Height (m)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 10"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
                  Default: 9.81 m/s² (Earth). Moon: 1.62 m/s², Mars: 3.71 m/s², Jupiter: 24.79 m/s²
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateGravitational}>Calculate PE</Button>
                <Button variant="outline" onClick={resetGravitational}>Reset</Button>
              </div>

              {gravitationalPE !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Gravitational Potential Energy</p>
                    <p className="text-4xl font-bold mt-1">{gravitationalPE} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(gravitationalPE) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(gravitationalPE) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(gravitationalPE) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(gravitationalPE) * 100) / 100} Wh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Foot-pounds</p>
                      <p className="text-lg font-medium">{Math.round(toFtLb(gravitationalPE) * 10) / 10} ft-lb</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: PE = m × g × h</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="elastic" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="springConstant">Spring Constant (N/m)</Label>
                <Input
                  id="springConstant"
                  type="number"
                  placeholder="e.g., 100"
                  value={springConstant}
                  onChange={(e) => setSpringConstant(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Also known as stiffness constant or force constant
                </p>
              </div>

              <div>
                <Label htmlFor="displacement">Displacement from Equilibrium (m)</Label>
                <Input
                  id="displacement"
                  type="number"
                  placeholder="e.g., 0.5"
                  value={displacement}
                  onChange={(e) => setDisplacement(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The distance the spring is compressed or stretched
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateElastic}>Calculate PE</Button>
                <Button variant="outline" onClick={resetElastic}>Reset</Button>
              </div>

              {elasticPE !== null && (
                <div className="p-4 bg-muted rounded-md space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Elastic Potential Energy</p>
                    <p className="text-4xl font-bold mt-1">{elasticPE} J</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Kilojoules</p>
                      <p className="text-lg font-medium">{Math.round(toKj(elasticPE) * 100) / 100} kJ</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-medium">{Math.round(toCal(elasticPE) * 10) / 10} cal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilocalories</p>
                      <p className="text-lg font-medium">{Math.round(toKcal(elasticPE) * 100) / 100} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Watt-hours</p>
                      <p className="text-lg font-medium">{Math.round(toWh(elasticPE) * 100) / 100} Wh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Foot-pounds</p>
                      <p className="text-lg font-medium">{Math.round(toFtLb(elasticPE) * 10) / 10} ft-lb</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Formula: PE = ½ × k × x²</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Potential Energy</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="font-semibold mb-2">Choose Energy Type</h3>
            <p className="text-sm text-muted-foreground">Select between gravitational PE (height-based) or elastic PE (spring-based).</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="font-semibold mb-2">Enter Values</h3>
            <p className="text-sm text-muted-foreground">Input mass, height, and gravity for gravitational PE, or spring constant and displacement for elastic PE.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="font-semibold mb-2">View Results</h3>
            <p className="text-sm text-muted-foreground">Get potential energy in joules plus conversions to kJ, calories, watt-hours, and foot-pounds.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Key Features of Potential Energy Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Dual Calculation Modes
            </h3>
            <p className="text-sm text-muted-foreground">Calculate both gravitational potential energy (PE = mgh) and elastic potential energy (PE = ½kx²).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Multiple Unit Conversions
            </h3>
            <p className="text-sm text-muted-foreground">Results automatically converted to kilojoules, calories, kilocalories, watt-hours, and foot-pounds.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Custom Gravity Values
            </h3>
            <p className="text-sm text-muted-foreground">Calculate PE for different planets — Earth (9.81), Moon (1.62), Mars (3.71), or Jupiter (24.79 m/s²).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">✓</span>
              Spring Physics Support
            </h3>
            <p className="text-sm text-muted-foreground">Elastic PE mode handles spring constant and displacement for Hooke's Law calculations.</p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">Potential Energy Formulas</h3>
          <div className="bg-card p-4 rounded font-mono text-sm mb-4 space-y-2">
            <div><strong>Gravitational PE:</strong> PE = m × g × h</div>
            <div><strong>Elastic PE:</strong> PE = ½ × k × x²</div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">Gravitational PE Variables:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• m = mass in kilograms (kg)</li>
                <li>• g = gravitational acceleration (m/s²)</li>
                <li>• h = height above reference point (m)</li>
                <li>• PE = potential energy in joules (J)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Elastic PE Variables:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• k = spring constant in N/m</li>
                <li>• x = displacement from equilibrium (m)</li>
                <li>• PE = stored elastic energy in joules (J)</li>
                <li>• Works for both compression and extension</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Potential Energy</h2>
        <div className="space-y-4">
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is potential energy?</h3>
            <p className="text-sm text-muted-foreground">Potential energy is stored energy due to an object's position or configuration. Gravitational PE comes from height above ground. Elastic PE is stored in stretched or compressed springs.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What units are used for potential energy?</h3>
            <p className="text-sm text-muted-foreground">The SI unit is the joule (J). One joule equals one newton-meter. Other common units include kilojoules (kJ), calories, and foot-pounds (ft-lb).</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How does height affect gravitational potential energy?</h3>
            <p className="text-sm text-muted-foreground">Gravitational PE is directly proportional to height. Double the height, double the potential energy. That's why objects falling from greater heights hit harder.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Why is there a ½ in the elastic PE formula?</h3>
            <p className="text-sm text-muted-foreground">The ½ comes from integrating Hooke's Law (F = kx) over the displacement. The force increases linearly as you stretch, so average force is half the maximum.</p>
          </div>
          <div className="p-5 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can potential energy be negative?</h3>
            <p className="text-sm text-muted-foreground">It depends on your reference point. If you set ground level as zero PE, objects below ground have negative PE. The important thing is the change in PE, not the absolute value.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Physics Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/kinetic-energy-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Kinetic Energy Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate the energy of moving objects.</p>
          </a>
          <a href="/calculators/force-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Force Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate force using Newton's second law (F = ma).</p>
          </a>
          <a href="/calculators/work-calculator" className="p-5 bg-card rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Work Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate work done by forces over distances.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
