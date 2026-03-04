"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeightDistributionResult {
  totalWeight: number;
  supportDistance: number;
  loadPosition: number;
  leftSupport: number;
  rightSupport: number;
  leftPercentage: number;
  rightPercentage: number;
  moment: number;
  isBalanced: boolean;
  recommendations: string[];
}

export default function WeightDistributionCalculatorPage() {
  const [totalWeight, setTotalWeight] = useState<string>("");
  const [supportDistance, setSupportDistance] = useState<string>("");
  const [loadPosition, setLoadPosition] = useState<string>("");
  const [unit, setUnit] = useState<string>("lbs");
  const [distanceUnit, setDistanceUnit] = useState<string>("inches");
  const [result, setResult] = useState<WeightDistributionResult | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(totalWeight) || 0;
    const distanceNum = parseFloat(supportDistance) || 0;
    const positionNum = parseFloat(loadPosition) || 0;

    if (weightNum === 0 || distanceNum === 0) return;

    // Calculate load distribution using lever principle
    // Left support carries: W × (distance - position) / distance
    // Right support carries: W × position / distance

    const leftSupport = (weightNum * (distanceNum - positionNum)) / distanceNum;
    const rightSupport = (weightNum * positionNum) / distanceNum;

    const leftPercentage = (leftSupport / weightNum) * 100;
    const rightPercentage = (rightSupport / weightNum) * 100;

    // Calculate moment (torque)
    const moment = weightNum * positionNum;

    // Check if balanced (within 10% of center)
    const centerPosition = distanceNum / 2;
    const isBalanced = Math.abs(positionNum - centerPosition) < (distanceNum * 0.1);

    // Generate recommendations
    const recommendations: string[] = [];

    if (leftPercentage > 70) {
      recommendations.push("⚠️ Heavy load on left support. Consider redistributing weight.");
    }
    if (rightPercentage > 70) {
      recommendations.push("⚠️ Heavy load on right support. Consider redistributing weight.");
    }
    if (isBalanced) {
      recommendations.push("✓ Load is well balanced between supports.");
    }
    if (positionNum < 0 || positionNum > distanceNum) {
      recommendations.push("⚠️ Load position is outside support range!");
    }

    // Vehicle-specific recommendations
    if (weightNum > 1000) {
      recommendations.push("For vehicles: Ensure axle ratings are not exceeded.");
      recommendations.push("Check tire pressure and suspension condition.");
    }

    setResult({
      totalWeight: weightNum,
      supportDistance: distanceNum,
      loadPosition: positionNum,
      leftSupport: parseFloat(Math.abs(leftSupport).toFixed(2)),
      rightSupport: parseFloat(rightSupport.toFixed(2)),
      leftPercentage: parseFloat(leftPercentage.toFixed(1)),
      rightPercentage: parseFloat(rightPercentage.toFixed(1)),
      moment: parseFloat(moment.toFixed(2)),
      isBalanced,
      recommendations,
    });
  };

  const reset = () => {
    setTotalWeight("");
    setSupportDistance("");
    setLoadPosition("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Weight Distribution Calculator – Calculate Load Distribution Across Axles & Points
          </h1>
          <p className="text-muted-foreground">
            Ensure safe load distribution with our Weight Distribution Calculator.
            Enter total load weight and distance from each support point or axle to calculate
            the weight carried at each point — essential for truck loading, trailer towing,
            and structural engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="total-weight">Total Weight</Label>
                <Input
                  id="total-weight"
                  type="number"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  placeholder="e.g., 5000"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="weight-unit">Weight Unit</Label>
                  <select
                    id="weight-unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                    <option value="tons">tons</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="distance-unit">Distance Unit</Label>
                  <select
                    id="distance-unit"
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="inches">inches</option>
                    <option value="feet">feet</option>
                    <option value="cm">cm</option>
                    <option value="meters">meters</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-distance">Distance Between Supports</Label>
                <Input
                  id="support-distance"
                  type="number"
                  value={supportDistance}
                  onChange={(e) => setSupportDistance(e.target.value)}
                  placeholder="e.g., 120"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="load-position">Load Position from Left Support</Label>
                <Input
                  id="load-position"
                  type="number"
                  value={loadPosition}
                  onChange={(e) => setLoadPosition(e.target.value)}
                  placeholder="e.g., 60"
                />
                <p className="text-xs text-muted-foreground">
                  Distance from left support to center of load
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Quick Examples:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Trailer: Wheelbase = support distance</li>
                  <li>• Beam: Span = support distance</li>
                  <li>• Truck: Axle spacing = support distance</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Distribution Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    {/* Visual representation */}
                    <div className="relative h-16 bg-muted-foreground/20 rounded-lg mb-4">
                      {/* Left support */}
                      <div className="absolute left-0 bottom-0 w-4 h-full bg-blue-500 rounded-l-lg" />
                      {/* Right support */}
                      <div className="absolute right-0 bottom-0 w-4 h-full bg-green-500 rounded-r-lg" />
                      {/* Load position indicator */}
                      <div
                        className="absolute bottom-0 w-1 h-3/4 bg-red-500"
                        style={{ left: `${(result.loadPosition / result.supportDistance) * 100}%` }}
                      />
                      {/* Labels */}
                      <span className="absolute left-1 top-1 text-xs text-blue-600 font-medium">L</span>
                      <span className="absolute right-1 top-1 text-xs text-green-600 font-medium">R</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                        <p className="text-xs text-blue-600 dark:text-blue-400">Left Support</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          {result.leftSupport} {unit}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{result.leftPercentage}%</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                        <p className="text-xs text-green-600 dark:text-green-400">Right Support</p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                          {result.rightSupport} {unit}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">{result.rightPercentage}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Weight:</span>
                      <span className="font-semibold">{result.totalWeight} {unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Support Distance:</span>
                      <span className="font-semibold">{result.supportDistance} {distanceUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Load Position:</span>
                      <span className="font-semibold">{result.loadPosition} {distanceUnit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Moment (Torque):</span>
                      <span className="font-semibold">{result.moment} {unit}·{distanceUnit}</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg text-center ${result.isBalanced ? "bg-green-50 dark:bg-green-950/20" : "bg-amber-50 dark:bg-amber-950/20"
                    }`}>
                    <p className={`font-medium ${result.isBalanced ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
                      }`}>
                      {result.isBalanced ? "✓ Load is balanced" : "⚠ Load is off-center"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter weight and dimensions to calculate distribution</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Weight Distribution
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Weight distribution is calculated using the principle of moments (levers):
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Formula:</strong> Left Load = W × (D - P) / D
                  </li>
                  <li>
                    <strong>Right Load:</strong> W × P / D
                  </li>
                  <li>
                    Where W = total weight, D = distance between supports, P = position from left
                  </li>
                  <li>
                    <strong>Moment:</strong> Force × Distance (torque on supports)
                  </li>
                </ul>
                <p>
                  <strong>Applications:</strong> Trailer loading, truck axle weight, beam loading,
                  bridge design, forklift stability, and more.
                </p>
                <p>
                  <strong>Safety Tip:</strong> For vehicles, never exceed Gross Axle Weight Rating
                  (GAWR) or Gross Vehicle Weight Rating (GVWR).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Weight Distribution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Total Weight</h3>
                <p className="text-sm text-muted-foreground">Input the total weight of the load being supported.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Set Support Distance & Position</h3>
                <p className="text-sm text-muted-foreground">Enter distance between supports and where the load is positioned.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Load Distribution</h3>
                <p className="text-sm text-muted-foreground">See how weight is distributed between left and right supports.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Weight Distribution Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Lever Principle**</h3>
              <p className="text-sm text-muted-foreground">Uses physics-based calculations to determine load on each support point.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Percentage Breakdown**</h3>
              <p className="text-sm text-muted-foreground">Shows exact percentage of weight carried by each support.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Balance Indicator**</h3>
              <p className="text-sm text-muted-foreground">Identifies if load is centered or biased toward one support.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Practical Recommendations**</h3>
              <p className="text-sm text-muted-foreground">Provides actionable advice for load balancing and safety.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How is weight distribution calculated?</h3>
              <p className="text-sm text-muted-foreground">Using the lever principle: Left support = W × (distance - position) / distance. Right support = W × position / distance. The closer the load to a support, the more weight it carries.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why is weight distribution important?</h3>
              <p className="text-sm text-muted-foreground">Proper weight distribution prevents overloading supports, ensures stability, and prevents tipping. Critical for vehicles, trailers, shelves, and structural beams.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is a balanced load?</h3>
              <p className="text-sm text-muted-foreground">A balanced load has weight evenly distributed between supports (50/50 split). This occurs when the load is positioned exactly at the center point.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How does this apply to trailers?</h3>
              <p className="text-sm text-muted-foreground">For trailers, proper tongue weight (10-15% of total) ensures stable towing. Too little causes sway; too much overloads the tow vehicle.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Can I use this for multiple loads?</h3>
              <p className="text-sm text-muted-foreground">For multiple loads, calculate each separately and add the results, or find the combined center of gravity and use that as a single load position.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/beam-bending-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Beam Bending Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate beam deflection and stress under load.</p>
            </a>
            <a href="/calculators/force-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Force Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate force using Newton&apos;s laws for physics problems.</p>
            </a>
            <a href="/calculators/torque-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Torque Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate torque and rotational force for mechanical systems.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
