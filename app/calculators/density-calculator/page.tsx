"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Scale, Droplets, Box } from "lucide-react";

interface DensityResult {
  density: number;
  unit: string;
  specificGravity: number;
  category: string;
}

export default function DensityCalculatorPage() {
  const [mass, setMass] = useState<string>("");
  const [volume, setVolume] = useState<string>("");
  const [massUnit, setMassUnit] = useState<"g" | "kg" | "lb" | "oz">("g");
  const [volumeUnit, setVolumeUnit] = useState<"cm3" | "m3" | "L" | "mL" | "ft3" | "in3">("cm3");
  const [result, setResult] = useState<DensityResult | null>(null);

  const calculateDensity = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);

    if (isNaN(m) || isNaN(v) || m <= 0 || v <= 0) {
      setResult(null);
      return;
    }

    let massInGrams = m;
    let volumeInCm3 = v;

    const massConversions = { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 };
    massInGrams = m * massConversions[massUnit];

    const volumeConversions = { cm3: 1, m3: 1000000, L: 1000, mL: 1, ft3: 28316.8, in3: 16.3871 };
    volumeInCm3 = v * volumeConversions[volumeUnit];

    const density = massInGrams / volumeInCm3;
    const specificGravity = density;
    let category = "";

    if (density < 0.5) category = "Very Light (less than half of water)";
    else if (density < 0.8) category = "Light (floats easily)";
    else if (density < 1) category = "Lighter than water (floats)";
    else if (density < 1.2) category = "Similar to water";
    else if (density < 2) category = "Heavier than water (sinks)";
    else if (density < 5) category = "Dense material";
    else category = "Very dense material";

    setResult({
      density: Math.round(density * 1000) / 1000,
      unit: "g/cm³",
      specificGravity: Math.round(specificGravity * 100) / 100,
      category,
    });
  };

  const reset = () => {
    setMass("");
    setVolume("");
    setResult(null);
  };

  useEffect(() => {
    calculateDensity();
  }, [mass, volume, massUnit, volumeUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Density Calculator – Calculate Mass per Unit Volume</h1>
          <p className="text-muted-foreground">
            Find the density of any object or substance by entering mass and volume. This calculator converts between units automatically and shows specific gravity for quick comparison with water.
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
                        placeholder="e.g., 100"
                        value={mass}
                        onChange={(e) => setMass(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={massUnit}
                        onChange={(e) => setMassUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                        <option value="oz">oz</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <div className="flex gap-2">
                      <Input
                        id="volume"
                        type="number"
                        placeholder="e.g., 50"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={volumeUnit}
                        onChange={(e) => setVolumeUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="cm3">cm³</option>
                        <option value="m3">m³</option>
                        <option value="L">L</option>
                        <option value="mL">mL</option>
                        <option value="ft3">ft³</option>
                        <option value="in3">in³</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Density = Mass ÷ Volume. Water has a density of 1 g/cm³ (specific gravity = 1).
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDensity} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Density Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Density</p>
                    <p className="text-3xl font-bold text-primary">{result.density} {result.unit}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Specific Gravity</p>
                      <p className="text-lg font-semibold">{result.specificGravity}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">kg/m³</p>
                      <p className="text-lg font-semibold">{(result.density * 1000).toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Comparison</p>
                    <p className="font-semibold">{result.category}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> ρ = m / V</p>
                    <p className="mt-1">ρ=density, m=mass, V=volume</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Scale className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter mass and volume to calculate density</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Common Material Densities</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Liquids:
                </h4>
                <ul className="space-y-1">
                  <li>Water: 1.00 g/cm³</li>
                  <li>Seawater: 1.03 g/cm³</li>
                  <li>Gasoline: 0.74 g/cm³</li>
                  <li>Mercury: 13.5 g/cm³</li>
                  <li>Olive oil: 0.92 g/cm³</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  Solids:
                </h4>
                <ul className="space-y-1">
                  <li>Aluminum: 2.70 g/cm³</li>
                  <li>Steel: 7.85 g/cm³</li>
                  <li>Copper: 8.96 g/cm³</li>
                  <li>Gold: 19.3 g/cm³</li>
                  <li>Wood (oak): 0.75 g/cm³</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Density</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Measure Mass</h3>
                <p className="text-sm text-muted-foreground">Weigh the object using a scale in grams, kilograms, or pounds.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Measure Volume</h3>
                <p className="text-sm text-muted-foreground">Find volume by dimensions or water displacement method.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Divide Mass by Volume</h3>
                <p className="text-sm text-muted-foreground">Calculator divides mass by volume to get density automatically.</p>
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
                  Multiple Units
                </h3>
                <p className="text-sm text-muted-foreground">Support for grams, kilograms, pounds, ounces, and various volume units.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Specific Gravity
                </h3>
                <p className="text-sm text-muted-foreground">Shows density relative to water for quick float/sink判断.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Auto Conversion
                </h3>
                <p className="text-sm text-muted-foreground">Automatically converts all inputs to standard g/cm³ output.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Material Category
                </h3>
                <p className="text-sm text-muted-foreground">Classifies result as light, similar to water, or dense material.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is density?</h3>
                <p className="text-sm text-muted-foreground">Density measures how much mass is packed into a given volume. It tells you how heavy something is for its size. Water has a density of 1 g/cm³.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why do some objects float?</h3>
                <p className="text-sm text-muted-foreground">Objects with density less than 1 g/cm³ float in water. Objects denser than water sink. This is why wood floats but metal sinks.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do I find volume of irregular objects?</h3>
                <p className="text-sm text-muted-foreground">Use water displacement: submerge the object in a graduated cylinder and measure how much the water level rises. That increase equals the object's volume.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is specific gravity?</h3>
                <p className="text-sm text-muted-foreground">Specific gravity is density relative to water. A specific gravity of 2 means the material is twice as dense as water. It has no units.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Does temperature affect density?</h3>
                <p className="text-sm text-muted-foreground">Yes, most materials expand when heated, decreasing density. Water is densest at 4°C. This calculator assumes room temperature conditions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
